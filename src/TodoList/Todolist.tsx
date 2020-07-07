import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../App/App';
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";

import s from "./TodoList.module.scss";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


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
        <div className={s.wrapper__list}>
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
                    return <div className={`${s.wrapper__listItem} ${isDoneForStyle}`} key={t.id}>
                        <div>
                            <Checkbox className={s.wrapper__flag}
                                      color={"primary"}
                                      onChange={onChangeStatusHandler}
                                      checked={t.isDone}/>
                            <EditableSpan saveTitle={onTitleCallback} title={t.title}/>
                        </div>
                        {/*<button className={`${s.btn} ${s.btn_deleteItem}`} onClick={onClickHandler}>x</button>*/}
                        <IconButton onClick={onClickHandler}><Delete/></IconButton>
                    </div>
                })
            }
        </div>
        <div className={s.btnBlock}>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    color={"primary"}
                // className={props.filter === 'all' ? `${s.btnBlock_active}` : ""}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color={"primary"}
                    variant={props.filter === 'active' ? 'outlined' : 'text'}
                // className={props.filter === 'active' ? `${s.btnBlock_active}` : ""}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={"primary"}
                    variant={props.filter === 'completed' ? 'outlined' : 'text'}
                // className={props.filter === 'completed' ? `${s.btnBlock_active}` : ""}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}

export default Todolist;
