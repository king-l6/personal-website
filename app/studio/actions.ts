"use server"

import { revalidatePath } from "next/cache"

import { insertGenerationRequest, STATUS_PROMPT_READY } from "@/lib/db"
import { generateStudioPrompt, StudioRequestError } from "@/lib/studio-llm"
import type { StudioFormState } from "@/lib/studio-prompt"

const MAX_IDEA_LENGTH = 2000

export async function generatePromptAction(
  _prevState: StudioFormState,
  formData: FormData
): Promise<StudioFormState> {
  const idea = String(formData.get("idea") ?? "").trim()

  if (!idea) {
    return { status: "error", idea, message: "先写一句想法或几个关键词。" }
  }

  if (idea.length > MAX_IDEA_LENGTH) {
    return {
      status: "error",
      idea,
      message: `想法太长了，请控制在 ${MAX_IDEA_LENGTH} 个字符以内。`,
    }
  }

  try {
    const prompt = await generateStudioPrompt(idea)

    // The drawing model is not wired up yet, so `image_path` stays NULL and
    // the row is parked at `prompt_ready`. Wiring a model up means filling
    // those two columns in — the shape of this row does not have to change.
    const record = insertGenerationRequest({
      userPrompt: idea,
      generatedPrompt: JSON.stringify({
        prompt: prompt.prompt,
        negative_prompt: prompt.negativePrompt,
        style: prompt.style,
      }),
      status: STATUS_PROMPT_READY,
    })

    revalidatePath("/studio")

    return { status: "ok", idea, prompt, recordId: record.id }
  } catch (error) {
    if (error instanceof StudioRequestError) {
      return { status: "error", idea, message: error.message }
    }

    console.error("generatePromptAction failed", error)

    return {
      status: "error",
      idea,
      message: "生成失败：服务端出现了未预期的错误，详情见开发终端日志。",
    }
  }
}
