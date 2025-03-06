export interface Project {
    id: number;
    name: string;
    status: string;
    clients: { id: number, description: string }[];
}

export interface ProjectRequest {
    id?: number;
    name: string;
    status: string;
    clientIds: number[];
}