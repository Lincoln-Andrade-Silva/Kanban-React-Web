export interface Client {
    id: number,
    name: string,
    project: { id: number, description: string }
}

export interface ClientRequest {
    id: number | null,
    name: string,
    projectId: number
}