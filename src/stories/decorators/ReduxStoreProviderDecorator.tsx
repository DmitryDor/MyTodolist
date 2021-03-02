export const d = 10


/*
import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {tasksReducer} from '../../features/TodolistsList/tasks-reducer'
import {todolistsReducer} from '../../features/TodolistsList/todolists-reducer'
import {v1} from 'uuid'
import {AppRootStateType} from '../../app/store'
import {TaskStatuses, TodoTaskPriorities} from "../../api/todolist-api";
import {appReducer} from "../../app/appReducer";
import thunkMiddleware from "redux-thunk";
import {loginReducer} from "../../features/Login/login-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    login: loginReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: "What to learn", filter: "all", order: 0, addedDate: '', entityStatus: 'idle'},
        {id: 'todolistId2', title: "What to buy", filter: "all", order: 0, addedDate: '', entityStatus: 'loading'}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                completed: true,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TodoTaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                completed: true,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TodoTaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            },
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.Completed,
                completed: true,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TodoTaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: v1(),
                title: "Book",
                status: TaskStatuses.Completed,
                completed: true,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TodoTaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistId1'
            }
        ]
    },
    app: {
        error: null as string | null,
        status: 'idle'
    },
    login: {
        isLogenIn: false
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunkMiddleware));

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
*/
