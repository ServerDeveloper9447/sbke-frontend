"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchBar({
  onSearch,
  initialQuery = "",
}: {
  onSearch: (q: string) => void
  initialQuery?: string
}) {
  const [value, setValue] = useState(initialQuery)

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        onSearch(value)
      }}
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by title, author, summary, or ID"
        className="flex-1"
        aria-label="Search"
      />
      <Button type="submit">{"Search"}</Button>
    </form>
  )
}
