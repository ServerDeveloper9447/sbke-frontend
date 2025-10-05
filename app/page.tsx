"use client"

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search/search-bar"
import { ResultsList } from "@/components/search/results-list"
import { TagsPanel } from "@/components/search/tags-panel"
import useSWR from "swr"
import { Suspense } from "react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function SearchContent() {
  // Controlled search state lives here to coordinate SWR keys
  const [query, setQuery] = React.useState<string>("")
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null)

  const { data: tagsData, isLoading: tagsLoading } = useSWR<{ tags: string[]; total: number }>("/api/tags", fetcher)
  const resultsKey = selectedTag
    ? `/api/search?tag=${encodeURIComponent(selectedTag)}`
    : query.trim()
      ? `/api/search?q=${encodeURIComponent(query)}`
      : null

  const { data: resultsData, isLoading } = useSWR<{ results: any[]; total: number; mode: string } | undefined>(
    resultsKey,
    fetcher,
  )

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4">
        <SearchBar
          onSearch={(q) => {
            setSelectedTag(null)
            setQuery(q)
          }}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_280px]">
        <section>
          {isLoading ? (
            <div className="grid gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-md border bg-card p-4">
                  <Skeleton className="h-5 w-2/3" />
                  <div className="mt-2 flex items-center gap-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                  <div className="mt-3 space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-11/12" />
                    <Skeleton className="h-3 w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ResultsList results={resultsData?.results ?? []} />
          )}
        </section>

        <div>
          {tagsLoading ? (
            <aside
              className="sticky top-4 max-h-[70vh] space-y-3 rounded-md border bg-card p-3"
              aria-label="Tags loading"
            >
              <div className="font-medium">{"Tags"}</div>
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full rounded-md" />
                ))}
              </div>
              <Skeleton className="h-8 w-full rounded-md" />
            </aside>
          ) : (
            <TagsPanel
              tags={tagsData?.tags ?? []}
              selectedTag={selectedTag}
              onSelect={(tag) => {
                setSelectedTag(tag)
                setQuery("")
              }}
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default function Page() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="p-4">{"Loading..."}</div>}>
        {/* @ts-expect-error Async RSC boundary not needed here, wrapping for consistency */}
        <SearchContent />
      </Suspense>
    </>
  )
}
