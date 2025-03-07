import { makeAutoObservable } from "mobx";
import { TaskRequest, TaskResponse } from "../../../app/model/Task";
import { DropdownOption } from "../../model/DropdownOption";
import service from "../../service/service";
import { store } from "../store";

export default class KanbanStore {
    tasks: TaskResponse[] = [];
    STATUS = ["novo", "em progresso", "em teste", "finalizado"];

    selectedProject: number = 0;
    entityDropdownList: { data: DropdownOption[] } | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async list(projectId: number) {
        const response = await service.task.list(projectId);
        this.tasks = response.data.map((task) => ({
            ...task,
            status: task.status.toLowerCase().replace("_", " "),
        }));
    }

    async createTask(newTask: TaskRequest) {
        await service.task.create(newTask);
        this.list(newTask.projectId);
    }

    async editTask(updatedTask: TaskRequest) {
        await service.task.edit(updatedTask.id!, updatedTask);
        this.list(updatedTask.projectId);
    }

    async deleteTask(task: TaskResponse) {
        await service.task.delete(task.id);
        await this.list(task.projectId);
    }

    setSelectedProject(projectId: number) {
        this.selectedProject = projectId;
        store.clientStore.listByProject(projectId);
        this.list(projectId);
    }

    toTitleCase = (str: string): string => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

}
