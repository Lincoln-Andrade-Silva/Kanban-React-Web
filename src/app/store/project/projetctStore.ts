import { makeAutoObservable, runInAction } from "mobx";
import { DataListResponse } from "../../model/DataListResponse";
import { DropdownOption } from "../../model/DropdownOption";
import { Project, ProjectRequest } from "../../model/Project";
import service from "../../service/service";
import { IBaseStore } from "../IBaseStore";
import { store } from "../store";

export default class ProjetctStore implements IBaseStore<Project> {

    columns = ["Id", "Name", "Status", "Clients"];
    entityList: DataListResponse<Project> | null = null;
    entityDropdownList: DataListResponse<DropdownOption> | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    statusOptions = [
        { key: 'em_andamento', text: 'Em Andamento', value: 'Em Andamento' },
        { key: 'cancelado', text: 'Cancelado', value: 'Cancelado' },
        { key: 'finalizado', text: 'Finalizado', value: 'Finalizado' }
    ];

    renderCell = (entity: Project, column: string) => {
        switch (column) {
            case this.columns[0]:
                return entity.id;
            case this.columns[1]:
                return entity.name;
            case this.columns[2]:
                return entity.status;
            case this.columns[3]:
                return entity.clients.map(client => client.description).join("; ");
            default:
                return null;
        }
    };

    list = async (page?: any, pageSize?: any) => {
        const response = await service.project.list(page, pageSize);
        runInAction(() => {
            this.entityList = response;
        });
    }

    listForDropdown = async () => {
        const response = await service.project.listForDropdown();
        runInAction(() => {
            this.entityDropdownList = response;
        });
    }

    createEntity = async (data: ProjectRequest) => {
        await service.project.create(data);
        runInAction(() => {
            this.list(1, 10)
            this.listForDropdown()
            store.clientStore.list(1, 10)
        });
    };

    editEntity = async (data: ProjectRequest) => {
        await service.project.edit(data, data.id!);

        runInAction(() => {
            this.list(1, 10);
            this.listForDropdown();
            store.clientStore.list(1, 10)
        });
    };

    deleteEntity = async (entity: any) => {
        await service.project.delete(entity.id);
        runInAction(() => {
            this.list(1, 10)
            this.listForDropdown()
            store.clientStore.list(1, 10)
        });
    }
}