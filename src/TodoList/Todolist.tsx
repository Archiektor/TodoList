import React, {useCallback} from 'react';
import {FilterValuesType} from '../App/App';
import AddItemForm from '../AddItemForm/AddItemForm';
import EditableSpan from '../EditableSpan/EditableSpan';

import s from './TodoList.module.scss';
import {Button} from '@material-ui/core';
import Task from '../Task/Task';


type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string, todoListId: string) => void,
    changeFilter: (value: FilterValuesType, todoListId: string) => void,
    addTaskFromProps: (title: string, todoListId: string) => void,
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

export const Todolist = React.memo((props: PropsType) => {
    const {
        id, changeFilter, addTaskFromProps,
        removeTodoList, editTodoListTitle, changeTaskTitle, changeTaskStatus, removeTask
    } = props;
    console.log('todolist called');
    const addTask = useCallback((title: string) => addTaskFromProps(title, id), [addTaskFromProps, id]);
    const onAllClickHandler = useCallback(() => changeFilter('all', id), [changeFilter, id])
    const onActiveClickHandler = useCallback(() => changeFilter('active', id), [changeFilter, id])
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', id), [changeFilter, id])
    const deleteTodoList = useCallback(() => removeTodoList(id), [removeTodoList, id])
    const changeTodoListTitle = useCallback((title: string) => {
        editTodoListTitle(title, id);
    }, [editTodoListTitle, id])

    let tasksForTodolist = props.tasks;

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }

    return <div className={s.wrapper}>
        <h3 className={s.wrapper__title}><EditableSpan title={props.title} saveTitle={changeTodoListTitle}/>
            <button className={`${s.btn} ${s.btn_deleteTodoList}`} onClick={deleteTodoList}>X</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div className={s.wrapper__list}>
            {tasksForTodolist &&
            tasksForTodolist.map(t => <Task key={t.id} task={t} todoListId={id} changeTaskStatus={changeTaskStatus}
                                            changeTaskTitle={changeTaskTitle} removeTask={removeTask}/>)
            }
        </div>
        <div className={s.btnBlock}>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color={'primary'}
                    variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={'primary'}
                    variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})

export default Todolist;
