import React, {useState} from 'react';
import {TaskType, Todolist} from "../TodoList/Todolist"
import {v1} from 'uuid';
import AddItemForm from "../AddItemForm/AddItemForm";

import scss from "./App.module.scss";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons"

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

export type TasksStateType = {
    [key: string]: Array<TaskType>,
}

function App() {

    const todoListId1 = v1();
    const todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "Books", filter: "all"},
        {id: todoListId2, title: "Songs", filter: "active"},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "Harry Potter", isDone: true},
            {id: v1(), title: "Star Wars", isDone: true},
            {id: v1(), title: "Finansist", isDone: false},
            {id: v1(), title: "3 Friends", isDone: false},
            {id: v1(), title: "The Gilded Age", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "LP - Numb", isDone: true},
            {id: v1(), title: "Korn - Liar", isDone: true},
            {id: v1(), title: "Sting - Shape of my heart", isDone: false},
            {id: v1(), title: "Tatu - Ne ver", isDone: false},
            {id: v1(), title: "dfsdfs", isDone: false},
        ]
    });

    function removeTask(id: string, todoListId: string) {
        let filteredTasks = tasks[todoListId].filter(t => t.id !== id);
        tasks[todoListId] = filteredTasks;
        setTasks({...tasks});
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todoListTasks = tasks[todoListId];
        let newTasks = [task, ...todoListTasks];
        tasks[todoListId] = newTasks;
        setTasks({...tasks});
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        let task = todoListTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasks});
    }

    function changeFilter(value: FilterValuesType, todoListId: string,) {
        let modifiedTodoList = todoLists.find(tl => tl.id === todoListId);
        if (modifiedTodoList) {
            modifiedTodoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }

    const removeTodoList = (id: string) => {
        let newTodoLists = todoLists.filter(tl => tl.id !== id);
        setTodoLists([...newTodoLists]);
        delete tasks[id];
        setTasks({...tasks});
    }

    const renameTodoList = (str: string, todoListId: string) => {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.title = str;
            setTodoLists([...todoLists]);
        }


    }

    function addTodoList(title: string) {
        let newTodoListId = v1();
        let newTodoList: TodoListType = {id: newTodoListId, title: title, filter: "all"};
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({
            ...tasks, [newTodoListId]: []
        })
    }

    function changeTaskTitle(id: string, title: string, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.title = title;
        }
        setTasks({...tasks});
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
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container style={{padding: "20px"}}>
                    {
                        todoLists.map((tl) => {
                            let allTasks = tasks[tl.id];
                            let tasksForTodolist = allTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTasks.filter(t => t.isDone === true);
                            }

                            return (
                                <Grid item key={tl.id}>
                                    <Paper style={{padding: "10px"}}>
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

export default App;
