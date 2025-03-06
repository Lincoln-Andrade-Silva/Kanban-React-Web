import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Client, ClientRequest } from '../model/Client';
import { DataListResponse } from '../model/DataListResponse';
import { DropdownOption } from '../model/DropdownOption';
import { Project, ProjectRequest } from '../model/Project';
import { TaskRequest, TaskResponse } from '../model/Task';
import ErrorHandler from './error-handler';

const localhost = "http://localhost:8080";

const response = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.response.use(
    response => {
        if (response.status === 200 && response.config.method !== 'get') {
            toast.success("Operação realizada com sucesso!");
        }
        return response;
    },
    (error: AxiosError<any>) => {
        return ErrorHandler.handleError(error);
    }
);

const requests = {
    get: <T>(url: string, baseURL: string = axios.defaults.baseURL ?? '') => axios.get<T>(baseURL + url).then(response),
    delete: <T>(url: string, baseURL: string = axios.defaults.baseURL ?? '') => axios.delete<T>(baseURL + url).then(response),
    put: <T>(url: string, body?: {}, baseURL: string = axios.defaults.baseURL ?? '') => axios.put<T>(baseURL + url, body).then(response),
    post: <T>(url: string, body: {}, baseURL: string = axios.defaults.baseURL ?? '') => axios.post<T>(baseURL + url, body).then(response),
};

const client = {
    delete: (id: number) => requests.delete<void>(`/client/${id}`, localhost),
    listForDropdown: () => requests.get<DataListResponse<DropdownOption>>('/client/dropdown', localhost),
    create: (data: { name: string; projectId: number }) => requests.post<void>('/client', data, localhost),
    edit: (data: ClientRequest, id: number) => requests.put<void>(`/client/${id}`, data, localhost),
    list: (page?: number, pageSize?: number) => requests.get<DataListResponse<Client>>(`/client?page=${page}&pageSize=${pageSize}`, localhost),
};

const project = {
    delete: (id: number) => requests.delete<void>(`/project/${id}`, localhost),
    create: (data: ProjectRequest) => requests.post<void>('/project', data, localhost),
    edit: (data: ProjectRequest, id: number) => requests.put<void>(`/project/${id}`, data, localhost),
    listForDropdown: () => requests.get<DataListResponse<DropdownOption>>('/project/dropdown', localhost),
    listClients: (id?: number) => requests.get<DataListResponse<DropdownOption>>(`/project/${id}/clients`, localhost),
    list: (page?: number, pageSize?: number) => requests.get<DataListResponse<Project>>(`/project?page=${page}&pageSize=${pageSize}`, localhost),
};

const task = {
    list: (projectId: number) => requests.get<DataListResponse<TaskResponse>>(`/task?projectId=${projectId}`, localhost),
    create: (data: TaskRequest) => requests.post<void>('/task', data, localhost),
    edit: (id: number, data: TaskRequest) => requests.put<void>(`/task/${id}`, data, localhost),
    delete: (id: number) => requests.delete<void>(`/task/${id}`, localhost),
};


const service = { client, project, task }

export default service;