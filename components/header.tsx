import Link from "next/link"

export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold">
          {"Dashboard"}
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            {"Search"}
          </Link>
          <Link href="/chat" className="text-sm text-muted-foreground hover:text-foreground">
            {"Live AI Chat"}
          </Link>
        </nav>
      </div>
    </header>
  )
}
