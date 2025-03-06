import { makeAutoObservable, runInAction } from "mobx";
import { Client, ClientRequest } from "../../model/Client";
import { DataListResponse } from "../../model/DataListResponse";
import { DropdownOption } from "../../model/DropdownOption";
import service from "../../service/service";
import { IBaseStore } from "../IBaseStore";
import { store } from "../store";

export default class ClientStore implements IBaseStore<Client> {

    columns = ["Id", "Name", "Project"];
    entityList: DataListResponse<Client> | null = null;
    entityDropdownList: DataListResponse<DropdownOption> | null = null;
    entityDropdownListByProject: DataListResponse<DropdownOption> | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    renderCell = (entity: Client, column: string) => {
        switch (column) {
            case this.columns[0]:
                return entity.id;
            case this.columns[1]:
                return entity.name;
            case this.columns[2]:
                return entity.project?.description || 'No project';
            default:
                return null;
        }
    };

    list = async (page?: any, pageSize?: any) => {
        const response = await service.client.list(page, pageSize);
        runInAction(() => {
            this.entityList = response;
        });
    }

    listByProject = async (id: number) => {
        const response = await service.project.listClients(id);
        runInAction(() => {
            this.entityDropdownListByProject = response;
        });
    }

    listForDropdown = async () => {
        const response = await service.client.listForDropdown();
        runInAction(() => {
            this.entityDropdownList = response;
        });
    }

    createEntity = async (data: { name: string; projectId: number }) => {
        await service.client.create(data);
        runInAction(() => {
            this.list(1, 10)
            this.listForDropdown()
            store.projectStore.list(1, 10)
        });
    };

    editEntity = async (data: ClientRequest) => {
        await service.client.edit(data, data.id!);

        runInAction(() => {
            this.list(1, 10)
            this.listForDropdown()
            store.projectStore.list(1, 10)
        });
    };

    deleteEntity = async (entity: any) => {
        await service.client.delete(entity.id);
        runInAction(() => {
            this.list(1, 10)
            this.listForDropdown()
            store.projectStore.list(1, 10)
        });
    }
}