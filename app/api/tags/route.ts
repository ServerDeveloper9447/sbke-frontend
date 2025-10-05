import { getAllTags, getDocByTag } from "@/hooks/use-api"
import { allTags } from "@/lib/mock-data"

export async function GET() {
  const tags = (await getAllTags()).tags
  return Response.json({ tags, total: tags.length })
}
