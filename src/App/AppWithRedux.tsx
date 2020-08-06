import React, {useCallback} from 'react';
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

const AppWithRedux = React.memo(() => {
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    const removeTask = useCallback((id: string, todoListId: string) => {
        dispatch(removeTaskAC(id, todoListId));
    }, [dispatch])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId));
    }, [dispatch])

    const changeStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId));
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todoListId: string,) => {
        dispatch(changeTodolistFilter(todoListId, value));
    }, [dispatch])

    const removeTodoList = useCallback((id: string) => {
        dispatch(removeTodolist(id));
        dispatch({type: 'REMOVE_TODOLIST', listId: id});
    }, [dispatch])

    const renameTodoList = useCallback((str: string, todoListId: string) => {
        dispatch(changeTodolistTitle(todoListId, str));
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        let action = addTodolist(title);
        dispatch(action);
    }, [dispatch]);

    const changeTaskTitle = useCallback((id: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(id, title, todoListId));
    }, [dispatch])

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
                            return (
                                <Grid item key={tl.id}>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={allTasks}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTaskFromProps={addTask}
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
})

export default AppWithRedux;
