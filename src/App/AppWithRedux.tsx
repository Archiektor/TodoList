import React from 'react';
import {TaskType, Todolist} from '../TodoList/Todolist'
import AddItemForm from '../AddItemForm/AddItemForm';

import scss from './App.module.scss';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons'
import {addTodolist, changeTodolistFilter, changeTodolistTitle, removeTodolist} from '../store/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../store/taskslists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../store/store';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

export type TasksStateType = {
    [key: string]: Array<TaskType>,
}

function AppWithRedux() {
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    function removeTask(id: string, todoListId: string) {
        dispatch(removeTaskAC(id, todoListId));
    }

    function addTask(title: string, todoListId: string) {
        dispatch(addTaskAC(title, todoListId));
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId));
    }

    function changeFilter(value: FilterValuesType, todoListId: string,) {
        dispatch(changeTodolistFilter(todoListId, value));
    }

    const removeTodoList = (id: string) => {
        dispatch(removeTodolist(id));
        dispatch({type: 'REMOVE_TODOLIST', listId: id});
    }

    const renameTodoList = (str: string, todoListId: string) => {
        dispatch(changeTodolistTitle(todoListId, str));
    }

    function addTodoList(title: string) {
        let action = addTodolist(title);
        dispatch(action);
    }

    function changeTaskTitle(id: string, title: string, todoListId: string) {
        dispatch(changeTaskTitleAC(id, title, todoListId));
    }

    return (
        <div className={scss.App}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container style={{padding: '20px'}}>
                    {
                        todoLists.map((tl) => {
                            let allTasks = tasks[tl.id];
                            let tasksForTodolist = allTasks;

                            if (tl.filter === 'active') {
                                tasksForTodolist = allTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTasks.filter(t => t.isDone === true);
                            }

                            return (
                                <Grid item key={tl.id}>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            editTodoListTitle={renameTodoList}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
