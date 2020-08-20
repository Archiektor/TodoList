import axios from 'axios';
import {CommonResponseType, instance, ResultCodesEnum} from './api';

type TaskType = {
    description: string,
    title: string,
    isDone: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
}

type getTaskResponseType = {
    items: Array<TaskType>,
    totalCount: number,
    error: string | null,
}

type UpdateTaskModelType = {
    title: string,
    description: string | null,
    isDone: boolean,
    status: number,
    priority: number,
    startDate: string | null,
    deadline: string | null,
}

type CommonTaskResponseType<I = {}, R = ResultCodesEnum> = {
    item: I,
    messages: Array<string>,
    resultCode: ResultCodesEnum,
}

export const taskslistsApi = {
    getTaskslists: async (todolistId: string): Promise<getTaskResponseType> => {
        try {
            const {data} = await instance.get(`todo-lists/${todolistId}/tasks`);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    createTask: async (todolistId: string, title: string): Promise<CommonTaskResponseType<TaskType>> => {
        try {
            const {data} = await instance.post(`todo-lists/${todolistId}/tasks`, {title: title});
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },

    deleteTask: async (todolistId: string, taskId: string): Promise<CommonResponseType> => {
        try {
            const {data} = await instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    updateTask: async (todolistId: string, taskId: string, taskModel: UpdateTaskModelType) => {
        try {
            const {data} = await instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, {...taskModel});
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }
}