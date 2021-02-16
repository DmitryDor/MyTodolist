import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../../state/tasks-reducer'
import {todolistsReducer} from '../../state/todolists-reducer'
import {v1} from 'uuid'
import {AppRootStateType} from '../../state/store'
import {TaskStatuses, TodoTaskPriorities} from "../../API/todolist-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: "What to learn", filter: "all", order: 0, addedDate: ''},
        {id: 'todolistId2', title: "What to buy", filter: "all", order: 0, addedDate: ''}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, completed: true, addedDate: '', deadline: '', description: '', order: 0, priority: TodoTaskPriorities.Middle, startDate: '', todoListId: 'todolistId1'},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, completed: true, addedDate: '', deadline: '', description: '', order: 0,priority: TodoTaskPriorities.Middle, startDate: '', todoListId: 'todolistId1'},
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, completed: true, addedDate: '', deadline: '', description: '', order: 0, priority: TodoTaskPriorities.Middle, startDate: '', todoListId: 'todolistId1'},
            {id: v1(), title: "Book", status: TaskStatuses.Completed, completed: true, addedDate: '', deadline: '', description: '', order: 0,priority: TodoTaskPriorities.Middle, startDate: '', todoListId: 'todolistId1'}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
