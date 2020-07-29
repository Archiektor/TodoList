import React, {useReducer} from 'react';
import {TaskType, Todolist} from '../TodoList/Todolist'
import {v1} from 'uuid';
import AddItemForm from '../AddItemForm/AddItemForm';

import scss from './App.module.scss';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons'
import {
    addTodolist,
    changeTodolistFilter,
    changeTodolistTitle,
    removeTodolist,
    todolistsReducer
} from '../store/todolists-reducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    taskslistsReducer
} from '../store/taskslists-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

export type TasksStateType = {
    [key: string]: Array<TaskType>,
}

function AppWithReducer() {

    const todoListId1 = v1();
    const todoListId2 = v1();

    let [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
        {id: todoListId1, title: 'Books', filter: 'all'},
        {id: todoListId2, title: 'Songs', filter: 'active'},
    ])

    let [tasks, dispatchToTasks] = useReducer(taskslistsReducer, {
        [todoListId1]: [
            {id: v1(), title: 'Harry Potter', isDone: true},
            {id: v1(), title: 'Star Wars', isDone: true},
            {id: v1(), title: 'Finansist', isDone: false},
            {id: v1(), title: '3 Friends', isDone: false},
            {id: v1(), title: 'The Gilded Age', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'LP - Numb', isDone: true},
            {id: v1(), title: 'Korn - Liar', isDone: true},
            {id: v1(), title: 'Sting - Shape of my heart', isDone: false},
            {id: v1(), title: 'Tatu - Ne ver', isDone: false},
            {id: v1(), title: 'dfsdfs', isDone: false},
        ]
    });

    function removeTask(id: string, todoListId: string) {
        dispatchToTasks(removeTaskAC(id, todoListId));
        dispatchToTasks(removeTaskAC(id, todoListId))
    }

    function addTask(title: string, todoListId: string) {
        dispatchToTasks(addTaskAC(title, todoListId));
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListId));
    }

    function changeFilter(value: FilterValuesType, todoListId: string,) {
        dispatchToTodoLists(changeTodolistFilter(todoListId, value));
    }

    const removeTodoList = (id: string) => {
        dispatchToTodoLists(removeTodolist(id));
        dispatchToTasks({type: 'REMOVE_TODOLIST', listId: id});
    }

    const renameTodoList = (str: string, todoListId: string) => {
        dispatchToTodoLists(changeTodolistTitle(todoListId, str));
    }

    function addTodoList(title: string) {
        let action = addTodolist(title);
        dispatchToTodoLists(action);
        dispatchToTasks(action);
    }

    function changeTaskTitle(id: string, title: string, todoListId: string) {
        dispatchToTasks(changeTaskTitleAC(id, title, todoListId));
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

export default AppWithReducer;
