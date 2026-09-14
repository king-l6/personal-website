/**
 * The structured image-generation prompt that /studio asks the LLM for.
 *
 * This is the shape a drawing model will consume once one is wired up, so it
 * is kept free of any server-only imports: the browser bundle imports the
 * type from here too.
 */
export type StudioPrompt = {
  /** Main prompt: subject, composition, light, lens, palette, mood. */
  prompt: string
  /** What the generation should avoid. May be empty. */
  negativePrompt: string
  /** Short phrase naming the visual treatment. May be empty. */
  style: string
}

/**
 * What the Server Action hands back to the form. Shared here rather than in
 * the action module because a `"use server"` file may only export async
 * functions.
 */
export type StudioFormState =
  | { status: "idle" }
  | { status: "ok"; idea: string; prompt: StudioPrompt; recordId: number }
  | { status: "error"; idea: string; message: string }

export const INITIAL_STUDIO_STATE: StudioFormState = { status: "idle" }

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

/**
 * Pulls the JSON object out of a model reply. Models sometimes wrap it in a
 * markdown fence or add a sentence before it, so this is deliberately tolerant
 * about everything outside the outermost braces.
 */
function extractJsonObject(raw: string) {
  const cleaned = raw.replace(/```(?:json)?/gi, "").trim()
  const start = cleaned.indexOf("{")
  const end = cleaned.lastIndexOf("}")

  if (start === -1 || end <= start) {
    throw new Error("no JSON object found in the model reply")
  }

  return JSON.parse(cleaned.slice(start, end + 1)) as Record<string, unknown>
}

export function parseStudioPrompt(raw: string): StudioPrompt {
  const data = extractJsonObject(raw)
  const prompt = asString(data.prompt)

  if (!prompt) {
    throw new Error("the model reply has no `prompt` field")
  }

  return {
    prompt,
    negativePrompt: asString(data.negative_prompt),
    style: asString(data.style),
  }
}

/**
 * Reads a `generation_requests.generated_prompt` value back into a prompt.
 * Rows written before a schema change, or a reply that failed to parse, fall
 * back to showing the stored text as the main prompt rather than nothing.
 */
export function readStoredPrompt(value: string | null): StudioPrompt | null {
  if (!value) return null

  try {
    return parseStudioPrompt(value)
  } catch {
    return { prompt: value, negativePrompt: "", style: "" }
  }
}
