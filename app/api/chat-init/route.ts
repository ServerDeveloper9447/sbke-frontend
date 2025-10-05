export async function POST(req: Request) {
  const { id } = await req.json()
  if (!id || typeof id !== "string" || !id.trim()) {
    return new Response(JSON.stringify({ ok: false, error: "Invalid ID" }), {
      status: 400,
    })
  }

  return Response.json({ ok: true, chatId: id.trim() })
}
