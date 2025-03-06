import { DataListResponse } from "../model/DataListResponse";
import { DropdownOption } from "../model/DropdownOption";

export interface IBaseStore<T> {
    renderCell: any,
    columns: string[],
    editEntity?: (data: any) => void;
    createEntity?: (data: any) => void;
    deleteEntity?: (id: string) => void;
    entityList?: DataListResponse<T> | null;
    list?: (page?: any, pageSize?: any, search?: any) => void;
    entityDropdownList?: DataListResponse<DropdownOption> | null;
}