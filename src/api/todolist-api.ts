import axios from 'axios';
import {CommonResponseType, instance} from './api';

type TodolistItemType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
}

export const todolistApi = {
    getTodolists: async (): Promise<CommonResponseType> => {
        try {
            const {data} = await instance.get(`todo-lists`);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    createTodoList: async (title: string): Promise<CommonResponseType<TodolistItemType>> => { // : Promise<getTaskResponseType>
        try {
            const {data} = await instance.post(`todo-lists/`, {title: title});
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    deleteTodolists: async (todolistId: string): Promise<CommonResponseType> => {
        try {
            const {data} = await instance.delete(`todo-lists/${todolistId}`);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    updateTodolistTitle: async (todolistId: string, title: string): Promise<CommonResponseType> => {
        try {
            const {data} = await instance.put(`todo-lists/${todolistId}`, {title: title});
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }
}
