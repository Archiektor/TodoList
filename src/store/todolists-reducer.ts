import {FilterValuesType, TodoListType} from "../App/App";
import {v1} from "uuid";
import { AddTaskACType } from "./taskslists-reducer";

const REMOVE_TODOLIST = "REMOVE_TODOLIST";
const ADD_TODOLIST = "ADD_TODOLIST";
const CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE";
const CHANGE_TODOLIST_FILTER = "CHANGE_TODOLIST_FILTER";

export type RemoveTodolistACType = {
    type: typeof REMOVE_TODOLIST,
    listId: string
}
export type AddTodolistACType = {
    type: typeof ADD_TODOLIST,
    title: string,
    id: string,
}
type ChangeTodolistTitleACType = {
    type: typeof CHANGE_TODOLIST_TITLE,
    id: string,
    title: string,
}
type ChangeTodolistFilterACType = {
    type: typeof CHANGE_TODOLIST_FILTER,
    tdListId: string,
    filter: FilterValuesType,
}

export const removeTodolist = (id: string): RemoveTodolistACType => ({type: REMOVE_TODOLIST, listId: id});
export const addTodolist = (title: string): AddTodolistACType => ({type: ADD_TODOLIST, title, id: v1()});
export const changeTodolistTitle = (todolistId: string, title: string): ChangeTodolistTitleACType => ({
    type: CHANGE_TODOLIST_TITLE,
    id: todolistId,
    title,
})
export const changeTodolistFilter = (tdListId: string, filter: FilterValuesType): ChangeTodolistFilterACType => ({
    type: CHANGE_TODOLIST_FILTER,
    tdListId,
    filter,
})

type ReducersActionsType =
    RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType
    | AddTaskACType;

type StateType = Array<TodoListType>
let initialState: StateType = [];

export const todolistsReducer = (partOfState: StateType = initialState, action: ReducersActionsType): StateType => {
    switch (action.type) {
        // come array of lists
        case "REMOVE_TODOLIST": {
            return partOfState.filter(list => list.id !== action.listId)
        }
        case "ADD_TODOLIST": {
            //let newTodoListId = v1();
            let newTodoList: TodoListType = {id: action.id, title: action.title, filter: "all"};
            return [...partOfState, newTodoList];
        }
        case "CHANGE_TODOLIST_TITLE": {
            return partOfState.map(tdlist => {
                if (tdlist.id === action.id) {
                    tdlist.title = action.title
                }
                return tdlist;
            })
        }
        case "CHANGE_TODOLIST_FILTER": {
            return partOfState.map(tdlist => {
                if (tdlist.id === action.tdListId) {
                    tdlist.filter = action.filter
                }
                return tdlist;
            })
        }

        default:
            return partOfState
    }
}

