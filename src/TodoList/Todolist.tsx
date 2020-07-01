import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../App/App';
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";

import s from "./TodoList.module.scss";


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


    return <div className={s.wrapper}>
        <h3 className={s.wrapper__title}><EditableSpan title={props.title} saveTitle={changeTodoListTitle}/>
            <button className={`${s.btn} ${s.btn_deleteTodoList}`} onClick={deleteTodoList}>X</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul className={s.wrapper__list}>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                    }
                    const onTitleCallback = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.id)
                    }
                    let isDoneForStyle = t.isDone ? "is-done" : "";
                    return <li className={`${s.wrapper__listItem} ${isDoneForStyle}`} key={t.id}>
                        <div>
                            <input className={s.wrapper__flag} type="checkbox"
                                   onChange={onChangeStatusHandler}
                                   checked={t.isDone}/>
                            <EditableSpan saveTitle={onTitleCallback} title={t.title}/>
                        </div>
                        <button className={`${s.btn} ${s.btn_deleteItem}`} onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div className={s.btnBlock}>
            <button className={props.filter === 'all' ? `${s.btnBlock_active}` : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? `${s.btnBlock_active}` : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? `${s.btnBlock_active}` : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

export default Todolist;
