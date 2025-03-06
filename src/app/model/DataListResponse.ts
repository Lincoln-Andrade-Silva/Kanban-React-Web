export interface DataListResponse<T> {
    data: T[];
    totalPages: number;
    totalElements: number;
}