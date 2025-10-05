"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function TagsPanel({
  tags,
  onSelect,
  selectedTag,
  limit = 10,
}: {
  tags: string[]
  onSelect: (tag: string) => void
  selectedTag?: string | null
  limit?: number
}) {
  const [showAll, setShowAll] = useState(false)
  const visibleTags = useMemo(() => (showAll ? tags : tags.slice(0, limit)), [showAll, tags, limit])

  return (
    <aside className="sticky top-4 max-h-[70vh] space-y-3 rounded-md border bg-card p-3" aria-label="Tags filter">
      <div className="font-medium">{"Tags"}</div>
      <ScrollArea className="max-h-[60vh] pr-2">
        <div className="grid grid-cols-2 gap-2">
          {visibleTags.map((tag) => {
            const isActive = selectedTag === tag
            return (
              <Button
                key={tag}
                size="sm"
                variant={isActive ? "default" : "outline"}
                className="justify-center"
                onClick={() => onSelect(tag)}
                aria-pressed={isActive}
              >
                {tag.substring(0, 15)}...
              </Button>
            )
          })}
        </div>
      </ScrollArea>
      {tags.length > limit && (
        <Button variant="ghost" className="w-full" onClick={() => setShowAll((s) => !s)}>
          {showAll ? "Show less" : "Show all tags"}
        </Button>
      )}
    </aside>
  )
}
