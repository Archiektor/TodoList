import React, {useEffect, useState} from 'react'
import {todolistApi} from '../api/todolist-api';
import {taskslistsApi} from '../api/taskslists-api';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistApi.getTodolists()
            .then(data => {
                setState(data);
            })

    }, [])

    return (
        <div> {JSON.stringify(state)}</div>
    )
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.createTodoList('my own todolist')
            .then(data => setState(data))
        ;

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'ae3d33ea-23c3-474e-b99f-31458740048d';
        todolistApi.deleteTodolists(todolistId)
            .then(data => {
                setState(`status code : ${data.resultCode}`);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = `393fe98f-792e-4c19-9416-a9d912009701`;
        todolistApi.updateTodolistTitle(todolistId, 'node + express + mongoDB')
            .then(data => setState(`status code: ${data.resultCode}`));
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const GetTasksLists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = `393fe98f-792e-4c19-9416-a9d912009701`;
        taskslistsApi.getTaskslists(todolistId)
            .then(data => {
                setState(data);
            })

    }, [])

    return (
        <div> {JSON.stringify(state)}</div>
    )
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = `393fe98f-792e-4c19-9416-a9d912009701`;
        taskslistsApi.createTask(todolistId, 'my first task')
            .then(data => {
                setState(data);
            })
        ;
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '393fe98f-792e-4c19-9416-a9d912009701';
        const taskId = '310039ae-13bf-4bdb-8ce4-57077a26c572';
        taskslistsApi.deleteTask(todolistId, taskId)
            .then(data => {
                setState(`status code : ${data.resultCode}`);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '393fe98f-792e-4c19-9416-a9d912009701';
        const taskId = '496e884e-3d3a-487c-aac7-3d3a1881b508';
        const updateTaskModel = {
            title: 'React + Redux',
            description: null,
            isDone: false,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null,
        }
        taskslistsApi.updateTask(todolistId, taskId, updateTaskModel)
            .then(data => {
                console.log('res', data);
                setState(`status code: ${data.resultCode}`);
            });
    }, [])

    return <div> {JSON.stringify(state)}</div>
}