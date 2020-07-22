import {FilterValuesType, TasksStateType, TodoListType} from '../App/App';
import {v1} from 'uuid';
import {AddTodolistACType, RemoveTodolistACType} from './todolists-reducer';

enum Actions {
    REMOVE_TASK = 'REMOVE_TASK',
    ADD_TASK = 'ADD_TASK',
    CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS',
    CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
}

type StateType = TasksStateType;

type RemoveTaskACType = { type: typeof Actions.REMOVE_TASK, taskId: string, todolistId: string }
export type AddTaskACType = { type: typeof Actions.ADD_TASK, title: string, todolistId: string }
type ChangeTaskStatusACType = { type: typeof Actions.CHANGE_TASK_STATUS, taskId: string, isDone: boolean, todolistId: string }
type ChangeTaskTitleACType = { type: typeof Actions.CHANGE_TASK_TITLE, taskId: string, title: string, todolistId: string }

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskACType => ({
    type: Actions.REMOVE_TASK,
    taskId,
    todolistId
})
export const addTaskAC = (title: string, todolistId: string): AddTaskACType => ({
    type: Actions.ADD_TASK,
    title,
    todolistId
})
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusACType => ({
    type: Actions.CHANGE_TASK_STATUS,
    taskId,
    isDone,
    todolistId
})

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleACType => ({
    type: Actions.CHANGE_TASK_TITLE,
    taskId,
    title,
    todolistId
})

type ReducersActionsType =
    RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType | RemoveTodolistACType;

export const taskslistsReducer = (partOfState: StateType, action: ReducersActionsType): StateType => {
    switch (action.type) {
        case Actions.REMOVE_TASK: {
            let copyState = {...partOfState};
            copyState[action.todolistId] = copyState[action.todolistId].filter(t => t.id !== action.taskId);
            return copyState;
        }
        case Actions.ADD_TASK: {
            let copyState = {...partOfState};
            copyState[action.todolistId] = [{
                id: v1(),
                title: action.title,
                isDone: false
            }, ...copyState[action.todolistId]];
            return copyState;
        }
        case Actions.CHANGE_TASK_STATUS: {
            return {
                ...partOfState, [action.todolistId]: partOfState[action.todolistId].map(t => {
                    if (t.id === action.taskId) {
                        return {...t, isDone: action.isDone}
                    } else {
                        return t;
                    }
                })
            }
        }
        case Actions.CHANGE_TASK_TITLE: {
            return {
                ...partOfState, [action.todolistId]: partOfState[action.todolistId].map(t => {
                    if (t.id === action.taskId) {
                        return {...t, title: action.title}
                    } else {
                        return t;
                    }
                })
            }
        }
        case 'ADD_TODOLIST': {
            return {...partOfState, [action.id]: []}
        }
        case "REMOVE_TODOLIST": {
            delete partOfState[action.listId]
            return partOfState;
        }
        default:
            throw new Error('I don\'t understand this type')
    }


}

