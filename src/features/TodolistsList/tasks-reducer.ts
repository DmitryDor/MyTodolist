import {TasksStateType} from '../../trash/AppExample';
import {TaskStatuses, TaskType, todolistAPI, TodoTaskPriorities, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)
            }

        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }

        case "UPDATE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.module} : t)
            }

        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolist.id]: []
            }

        case 'REMOVE-TODOLIST':
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;

        case "SET-TODOLIST":
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy

        case "SET-TASKS":
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        default:
            return state;
    }
}

// AC

export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, module: UpdateDomainTaskModelType, todolistId: string) => ({
    type: "UPDATE-TASK",
    taskId,
    module,
    todolistId
} as const)
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => ({
    type: "SET-TASKS",
    todolistId,
    tasks
} as const)

// TC

export const setTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.getTasks(todolistId).then(res => dispatch(setTasksAC(todolistId, res.data.items)))
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.deleteTasks(todolistId, taskId).then(res => dispatch(removeTaskAC(taskId, todolistId)))
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.createTasks(todolistId, title).then(res => dispatch(addTaskAC(res.data.data.item)))
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('Task not found ')
            return
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        todolistAPI.updateTasks(todolistId, taskId, apiModel).then(res =>
            dispatch(updateTaskAC(taskId, domainModel, todolistId)))
    }


// types

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TodoTaskPriorities
    startDate?: string
    deadline?: string
}
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTaskAC>