import type { Metadata } from "next"
import Link from "next/link"

import { Eyebrow } from "@/components/eyebrow"
import { SiteFooter } from "@/components/site-footer"
import { site } from "@/lib/content"
import { listGenerationRequests } from "@/lib/db"
import { readStoredPrompt } from "@/lib/studio-prompt"

import { StudioForm } from "./studio-form"

// Reads SQLite and calls the LLM gateway per request, so this page cannot be
// prerendered. better-sqlite3 also requires the Node runtime.
export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export const metadata: Metadata = {
  title: `Studio — ${site.name}`,
  description:
    "Turn a one-line idea into a structured image-generation prompt.",
  // A private working page: reachable by URL, not listed anywhere public.
  robots: { index: false, follow: false },
}

const HISTORY_LIMIT = 20

function formatTimestamp(value: string) {
  return `${value.replace("T", " ").slice(0, 19)} UTC`
}

export default function StudioPage() {
  const history = listGenerationRequests(HISTORY_LIMIT)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:py-5">
          <p className="shrink-0 text-[11px] font-medium tracking-[0.2em] whitespace-nowrap uppercase sm:tracking-[0.28em]">
            {site.name} · Studio
          </p>
          <Link
            href="/"
            className="text-[10px] tracking-[0.14em] whitespace-nowrap text-muted-foreground uppercase transition-colors hover:text-foreground sm:text-[11px] sm:tracking-[0.16em]"
          >
            ← 返回作品集
          </Link>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
          <Eyebrow className="text-muted-foreground">Studio</Eyebrow>
          <h1 className="mt-8 max-w-3xl font-heading text-[2.2rem] leading-[1.08] font-light tracking-[-0.015em] text-balance sm:text-5xl">
            一句想法，一条可用的图片生成提示词。
          </h1>
          <p className="mt-7 max-w-2xl text-[15px] leading-[1.85] text-pretty text-muted-foreground">
            写下你脑子里的画面，服务端会调用公司 LLM 网关，把它扩写成结构化的提示词。
            绘图模型还没有接入，图片位置先留占位；接入时只需要替换「生成图片」这一步，
            提示词与数据表都可以直接复用。
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24 sm:pb-32">
          <StudioForm />
        </section>

        <section className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <Eyebrow className="text-muted-foreground">History</Eyebrow>
            <h2 className="mt-6 font-heading text-3xl leading-[1.15] font-light">
              历史提示词
            </h2>

            {history.length === 0 ? (
              <p className="mt-8 text-sm text-muted-foreground">
                还没有记录。生成一次之后，历史会出现在这里。
              </p>
            ) : (
              <ol className="mt-10 border-t border-border">
                {history.map((record) => {
                  const stored = readStoredPrompt(record.generatedPrompt)

                  return (
                    <li
                      key={record.id}
                      className="grid gap-4 border-b border-border py-6 sm:grid-cols-12 sm:gap-8"
                    >
                      <div className="sm:col-span-3">
                        <p className="font-mono text-[11px] text-muted-foreground">
                          #{record.id} · {formatTimestamp(record.createdAt)}
                        </p>
                        <p className="mt-2 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                          {record.status}
                        </p>
                      </div>

                      <div className="space-y-3 sm:col-span-9">
                        <p className="text-sm text-muted-foreground">
                          想法：{record.userPrompt}
                        </p>
                        <p className="text-[15px] leading-[1.85] text-pretty">
                          {stored?.prompt ?? "（这条记录里没有可显示的提示词）"}
                        </p>
                        {stored?.negativePrompt ? (
                          <p className="font-mono text-[11px] leading-[1.8] text-muted-foreground">
                            负面提示词：{stored.negativePrompt}
                          </p>
                        ) : null}
                        {stored?.style ? (
                          <p className="font-mono text-[11px] leading-[1.8] text-muted-foreground">
                            风格：{stored.style}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  )
                })}
              </ol>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
