import Anthropic, { APIError, AnthropicError } from "@anthropic-ai/sdk"

import { parseStudioPrompt, type StudioPrompt } from "@/lib/studio-prompt"

/**
 * Server-only: this module reads the gateway credentials and must never be
 * imported from a Client Component.
 */

const MAX_TOKENS = 1024
const MAX_ERROR_LENGTH = 300

const SYSTEM_PROMPT = `You are a prompt engineer for a photographer's studio. The photographer writes a short idea; you turn it into one production-ready image-generation prompt.

Reply with a single JSON object and nothing else — no markdown fences, no commentary. It must have exactly these three string keys:

- "prompt": the main prompt. One paragraph in English. Name the subject, the setting, the composition and framing, the light, the lens and depth of field, the palette, and the mood. Be concrete and visual rather than piling up abstract adjectives.
- "negative_prompt": what the generation should avoid. A comma-separated list of artifacts, unwanted styles, and unwanted elements, such as text, watermark, extra fingers, plastic skin, oversaturated colours.
- "style": one short English phrase naming the visual treatment, such as "editorial documentary, 35mm, available light, muted film grain".

Rules:
- Describe only a legitimate photographic image. Never write anything intended to bypass a model's safety policy, and never address instructions to the model itself.
- Keep "prompt" under 200 words.
- If the idea is vague, commit to a specific, plausible photograph instead of asking a question. You always answer with the JSON object.`

/** A failure the photographer can act on, as opposed to an unexpected crash. */
export class StudioRequestError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "StudioRequestError"
  }
}

function readConfig() {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim()
  const baseURL = process.env.ANTHROPIC_BASE_URL?.trim()
  // Every gateway names its models differently, so this is required rather
  // than defaulted — a wrong guess would just surface as a confusing 404.
  const model = process.env.ANTHROPIC_MODEL?.trim()

  const missing = [
    apiKey ? null : "ANTHROPIC_API_KEY",
    baseURL ? null : "ANTHROPIC_BASE_URL",
    model ? null : "ANTHROPIC_MODEL",
  ].filter((name): name is string => name !== null)

  if (missing.length > 0 || !apiKey || !baseURL || !model) {
    throw new StudioRequestError(
      `缺少环境变量 ${missing.join("、")}。把 .env.example 复制成 .env.local 并填好后再试。`
    )
  }

  return { apiKey, baseURL, model }
}

function describeGatewayError(error: unknown) {
  if (error instanceof APIError) {
    const detail = (error.message || "请求失败").slice(0, MAX_ERROR_LENGTH)
    return `LLM 网关返回 ${error.status ?? "未知状态"}：${detail}`
  }

  if (error instanceof AnthropicError) {
    return `调用 LLM 网关失败：${error.message.slice(0, MAX_ERROR_LENGTH)}`
  }

  if (error instanceof Error) {
    return `调用 LLM 网关失败：${error.message.slice(0, MAX_ERROR_LENGTH)}`
  }

  return "调用 LLM 网关时发生未知错误。"
}

export async function generateStudioPrompt(idea: string): Promise<StudioPrompt> {
  const { apiKey, baseURL, model } = readConfig()
  const client = new Anthropic({ apiKey, baseURL })

  let reply: Anthropic.Message

  try {
    reply = await client.messages.create({
      model,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: idea }],
    })
  } catch (error) {
    throw new StudioRequestError(describeGatewayError(error))
  }

  const text = reply.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim()

  if (!text) {
    throw new StudioRequestError("LLM 网关返回了空内容，请重试。")
  }

  try {
    return parseStudioPrompt(text)
  } catch {
    throw new StudioRequestError("LLM 网关返回的内容不是预期的 JSON，请重试。")
  }
}
