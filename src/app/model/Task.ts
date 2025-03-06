export interface TaskResponse {
    id: number;
    name: string;
    status: string;
    projectId: number;
    client: { id: number, description: string };
}

export interface TaskRequest {
    id: number | null,
    name: string,
    status: string,
    clientId: number,
    projectId: number,
}
