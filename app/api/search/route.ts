import type { NextRequest } from "next/server"
import { searchByQuery, searchByTag, allResults, SearchResult } from "@/lib/mock-data"
import { getDocByTag, search } from "@/hooks/use-api"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q") || ""
  const tag = searchParams.get("tag") || ""

  let results: SearchResult[] = []
  if (tag) {
    results = (await getDocByTag(tag)).data
  } else if (q) {
    results = (await search(q)).data
  } else {
    results = []
  }
  console.log(results)
  return Response.json({
    results,
    total: results.length,
    mode: tag ? "tag" : q ? "query" : "none",
  })
}
