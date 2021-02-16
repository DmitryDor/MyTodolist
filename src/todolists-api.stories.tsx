import React, {useEffect, useState} from 'react'

import {todolistAPI} from "./API/todolist-api";

export default {
    title: 'API-TODOLISTS'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const title = 'Dimka333'
    useEffect(() => {
        todolistAPI.createTodolist(title)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'fea3daea-1662-4e36-9270-ded2dad725e9'
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
            .then(res => res.data)

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '7d38487f-f0e9-46c2-8230-fc8299575ac1'
    const title = 'helloDimon'
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, title)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
