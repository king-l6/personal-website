"use client"

import { useActionState, useEffect, useState } from "react"

import { Eyebrow } from "@/components/eyebrow"
import { Button } from "@/components/ui/button"
import { INITIAL_STUDIO_STATE, type StudioPrompt } from "@/lib/studio-prompt"

import { generatePromptAction } from "./actions"

export function StudioForm() {
  const [state, formAction, isPending] = useActionState(
    generatePromptAction,
    INITIAL_STUDIO_STATE
  )
  const [idea, setIdea] = useState("")

  return (
    <div className="space-y-10">
      <form action={formAction}>
        <label
          htmlFor="idea"
          className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase"
        >
          你的想法 / 关键词
        </label>

        <textarea
          id="idea"
          name="idea"
          value={idea}
          onChange={(event) => setIdea(event.target.value)}
          rows={3}
          maxLength={2000}
          placeholder="例如：清晨的渔港，雾气还没散，一个人坐在船边"
          className="mt-4 w-full resize-y border border-border bg-background px-4 py-3 text-[15px] leading-[1.7] outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
        />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            模型会把这句话扩写成一条结构化的图片生成提示词。
          </p>
          <Button type="submit" disabled={isPending}>
            {isPending ? "生成中…" : "生成提示词"}
          </Button>
        </div>
      </form>

      {/* One polite live region covers both outcomes. The generated prompt
          itself is far too long to read out, so success announces a summary
          and the three fields are reachable by normal navigation below. */}
      <p role="status" aria-live="polite" className="sr-only">
        {state.status === "ok"
          ? "已生成结构化提示词，结果在下方。"
          : state.status === "error"
            ? state.message
            : ""}
      </p>

      {state.status === "error" ? (
        <p className="border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {state.status === "ok" ? (
            <PromptResult
              idea={state.idea}
              prompt={state.prompt}
              recordId={state.recordId}
            />
          ) : (
            <div className="flex h-full min-h-[16rem] items-center border border-border bg-muted/20 px-6 py-16">
              <p className="text-sm text-muted-foreground">
                生成结果会显示在这里：主提示词、负面提示词与风格参数。
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
          <ImageSlot />
        </div>
      </div>
    </div>
  )
}

function PromptResult({
  idea,
  prompt,
  recordId,
}: {
  idea: string
  prompt: StudioPrompt
  recordId: number
}) {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
        <p className="font-mono text-[11px] text-muted-foreground">
          想法：{idea}
        </p>
        <p className="font-mono text-[11px] text-muted-foreground">
          #{recordId} · 已写入 generation_requests
        </p>
      </div>

      <PromptField
        label="主提示词"
        value={prompt.prompt}
        emphasis
      />

      {prompt.negativePrompt ? (
        <PromptField label="负面提示词" value={prompt.negativePrompt} />
      ) : null}

      {prompt.style ? <PromptField label="风格" value={prompt.style} /> : null}
    </div>
  )
}

function PromptField({
  label,
  value,
  emphasis = false,
}: {
  label: string
  value: string
  emphasis?: boolean
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Eyebrow className="text-muted-foreground">{label}</Eyebrow>
        <CopyButton value={value} />
      </div>
      <p
        className={
          emphasis
            ? "mt-4 text-[15px] leading-[1.85] text-pretty"
            : "mt-3 font-mono text-[13px] leading-[1.8] text-muted-foreground"
        }
      >
        {value}
      </p>
    </div>
  )
}

function CopyButton({ value }: { value: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle")

  useEffect(() => {
    if (status === "idle") return

    const timer = window.setTimeout(() => setStatus("idle"), 2400)
    return () => window.clearTimeout(timer)
  }, [status])

  async function copy() {
    // `navigator.clipboard` is undefined outside a secure context, so a plain
    // http deployment fails here rather than throwing.
    if (!navigator.clipboard) {
      setStatus("failed")
      return
    }

    try {
      await navigator.clipboard.writeText(value)
      setStatus("copied")
    } catch {
      setStatus("failed")
    }
  }

  return (
    <span className="flex flex-wrap items-center justify-end gap-2">
      <Button
        type="button"
        variant="outline"
        size="xs"
        onClick={copy}
        aria-live="polite"
      >
        {status === "copied" ? "已复制" : status === "failed" ? "复制失败" : "复制"}
      </Button>
      {status === "failed" ? (
        <span className="font-mono text-[10px] text-destructive">
          浏览器不允许自动复制，请手动选中
        </span>
      ) : null}
    </span>
  )
}

function ImageSlot() {
  return (
    <div className="flex h-full min-h-[16rem] flex-col items-center justify-center gap-4 border border-dashed border-border bg-muted/20 px-6 py-16 text-center">
      <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
        Image
      </span>
      <p className="max-w-xs font-mono text-[11px] leading-[1.9] text-muted-foreground">
        绘图模型未接入 —— 待接入后此处显示生成结果
      </p>
    </div>
  )
}
