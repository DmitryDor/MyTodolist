import React, {useEffect, useState} from 'react'
import {TaskStatuses, todolistAPI, TodoTaskPriorities, UpdateTaskModelType} from "../API/todolist-api";


export default {
    title: 'API-TASKS'
}

export const getTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'e9a107f3-02bd-40a6-96ff-ea49e8d790a8'
    useEffect(() => {
        todolistAPI.getTasks(todolistId)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const title = 'HTML'
    const todolistId = 'e9a107f3-02bd-40a6-96ff-ea49e8d790a8'

    useEffect(() => {
        todolistAPI.createTasks(todolistId, title)
            .then(res => res.data)
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'e9a107f3-02bd-40a6-96ff-ea49e8d790a8'
    const taskId = 'd5443e8b-7b9d-43e3-b402-205d4e562a88'
    useEffect(() => {
        todolistAPI.deleteTasks(todolistId, taskId)
            .then(res => setState(res.data))

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTasksTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'e9a107f3-02bd-40a6-96ff-ea49e8d790a8'
    const taskId = '2747cdeb-68c5-4dea-b4dc-caf686379bdd'
    const model: UpdateTaskModelType = {
        title: 'Dimon',
        description: 'task.description',
        status: TaskStatuses.New,
        priority: TodoTaskPriorities.Hi,
        startDate: "task.startDate",
        deadline: "task.deadline"
    }

    useEffect(() => {
        todolistAPI.updateTasks(todolistId, taskId, model)
            .then(res => setState(res.data))
    }, [])


    return <div> {JSON.stringify(state)}</div>
}
