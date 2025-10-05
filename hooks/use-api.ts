import { SearchResult } from "@/lib/mock-data"

export const API_BASE_URL = "https://sbke.vercel.app/api"

export async function search(query: string): Promise<{status: number, data: SearchResult[]}> {
   return await fetch(`${API_BASE_URL}/docBySearch?q=${encodeURIComponent(query)}`).then((res) => res.json())
}

export async function getAllTags(): Promise<{tags: string[]}> {
    return await fetch(`${API_BASE_URL}/docByTags`).then((res) => res.json())
}

export async function getDocByTag(tag: string): Promise<{status:number, data: SearchResult[]}> {
   return await fetch(`${API_BASE_URL}/docByTags?tags=${encodeURIComponent(tag)}`).then((res) => res.json())
}

export async function getDocById(id: string): Promise<{status: number, data: SearchResult}> {
    return await fetch(`${API_BASE_URL}/docById/${id}`).then((res) => res.json())
}