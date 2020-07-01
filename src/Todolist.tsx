import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm/AddItemForm";
import EditableSpan from "./EditableSpan/EditableSpan";

type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string, todoListId: string) => void,
    changeFilter: (value: FilterValuesType, todoListId: string) => void,
    addTask: (title: string, todoListId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void,
    filter: FilterValuesType,
    removeTodoList: (id: string) => void,
    changeTaskTitle: (id: string, title: string, todoListId: string) => void,
    editTodoListTitle: (str: string, todoListId: string) => void,
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => props.addTask(title, props.id);
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const deleteTodoList = () => props.removeTodoList(props.id);

    const changeTodoListTitle = (title: string) => {
        props.editTodoListTitle(title, props.id);
    }


    return <div>
        <h3><EditableSpan title={props.title} saveTitle={changeTodoListTitle}/>
            <button onClick={deleteTodoList}>X</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                    }
                    const onTitleCallback = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.id)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeStatusHandler}
                               checked={t.isDone}/>
                        <EditableSpan saveTitle={onTitleCallback} title={t.title}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
