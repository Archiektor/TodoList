import {createStore, combineReducers} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import {taskslistsReducer} from './taskslists-reducer';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: taskslistsReducer,
})

export const store = createStore(rootReducer);

export type AppRootStateType =  ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;