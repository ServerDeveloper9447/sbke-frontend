import { readFileSync, readSync } from "fs"

export type SearchResult = {
  id: string,
  title: string,
  abstract: string,
  byPeople: string[],
  url: string,
  summary: string,
  keyPoints: string,
  tags: string[],
  confidence: number,
  objectives: string[],
}

const DATA: SearchResult[] = JSON.parse(readFileSync("lib/processed.json").toString())

export function allResults(): SearchResult[] {
  return DATA
}

export function allTags(): string[] {
  const s = new Set<string>()
  for (const d of DATA) for (const t of d.tags) s.add(t)
  return Array.from(s).sort((a, b) => a.localeCompare(b))
}

export function searchByQuery(q: string): SearchResult[] {
  const query = q.trim().toLowerCase()
  if (!query) return []
  return DATA.filter((d) => {
    return (
      d.title.toLowerCase().includes(query) ||
      d.summary.toLowerCase().includes(query) ||
      d.id.toLowerCase().includes(query)
    )
  })
}

export function searchByTag(tag: string): SearchResult[] {
  const t = tag.trim().toLowerCase()
  if (!t) return []
  return DATA.filter((d) => d.tags.some((x) => x.toLowerCase() === t))
}
