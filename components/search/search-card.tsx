import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { SearchResult } from "@/lib/mock-data"

export function SearchCard({ item }: { item: SearchResult }) {
  const authors =
    Array.isArray((item as any).byPeople) && (item as any).byPeople.length
      ? ((item as any).byPeople as string[])
      : [item.byPeople]
  

  const abstractText =
    typeof (item as any).abstract === "string" && (item as any).abstract.length ? (item as any).abstract : item.summary

  const objectives: string[] =
    Array.isArray((item as any).objectives) && (item as any).objectives.length
      ? (item as any).objectives
      : [`Understand: ${item.title}`, `Apply concepts related to ${item.tags.slice(0, 1).join(", ") || "the topic"}`]

  const keyPoints: string[] =
    Array.isArray((item as any).keyPoints) && (item as any).keyPoints.length
      ? (item as any).keyPoints
      : [`Primary tag: ${item.tags[0] ?? "n/a"}`, `Author: ${item.byPeople}`, `ID: ${item.id}`]

  const externalUrl =
    typeof (item as any).url === "string" && (item as any).url.length
      ? (item as any).url
      : `https://example.com/docs/${encodeURIComponent(item.id)}`

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className="border bg-card cursor-pointer transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          role="button"
          tabIndex={0}
          aria-label={`Open details for ${item.title}`}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-balance">{item.title}</CardTitle>
            <div className="text-xs text-muted-foreground">
              {"Author: "}
              {item.byPeople.join(", ")}
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm leading-relaxed text-pretty">{item.summary}</p>
            <div className="mt-3 text-xs text-muted-foreground">
              {"ID: "}
              {item.id}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-pretty">{item.title}</DialogTitle>
          <DialogDescription>{"Detailed result information"}</DialogDescription>
        </DialogHeader>

        {/* Title */}
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">{"Title"}</div>
          <div className="text-sm">{item.title}</div>
        </div>

        {/* Authors */}
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">{"Authors"}</div>
          <div className="text-sm">{authors.join(", ")}</div>
        </div>

        {/* ID */}
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">{"ID"}</div>
          <div className="text-sm">{item.id}</div>
        </div>

        {/* Abstract */}
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">{"Abstract"}</div>
          <p className="text-sm leading-relaxed text-pretty">{abstractText}</p>
        </div>

        {/* Summary */}
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">{"Summary"}</div>
          <p className="text-sm leading-relaxed text-pretty">{item.summary}</p>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">{"Tags"}</div>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
        </div>

        {/* Objectives */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">{"Objectives"}</div>
          <ul className="list-disc pl-5 space-y-1">
            {objectives.map((o, i) => (
              <li key={i} className="text-sm leading-relaxed">
                {o}
              </li>
            ))}
          </ul>
        </div>

        {/* Key-Points */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">{"Key-Points"}</div>
          <ul className="list-disc pl-5 space-y-1">
            {keyPoints.map((kp, i) => (
              <li key={i} className="text-sm leading-relaxed">
                {kp}
              </li>
            ))}
          </ul>
        </div>

        {/* External URL */}
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">{"URL to actual document"}</div>
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline underline-offset-4 hover:opacity-90"
          >
            {externalUrl}
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
