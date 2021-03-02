import {Dispatch} from "redux";
import {authAPI} from "../api/todolist-api";
import {handleServerNetworkError} from "../utils/errorUtils";
import {setIsLoggedInAC, setIsLoggedInType} from "../features/Login/login-reducer";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null,
    isInitialized: false
}


export const appReducer = (state: AppInitialStateType = initialState, action: ActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'App/SET-STATUS':
            return {...state, status: action.status}
        case 'App/SET-ERROR': {
            return {...state, error: action.error}
        }
        case "App/SET-INITIALIZED":
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

// AC

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'App/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'App/SET-ERROR', error} as const)
export const setInitializedAC = (value: boolean) => ({type: 'App/SET-INITIALIZED', value} as const)

// TC

export const initializeAppTC = () => (dispatch: Dispatch<ActionsType>) => {
    return authAPI.authMe().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
        }
        dispatch(setInitializedAC(true))


    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

type ActionsType =
    | SetAppStatusActionType
    | SetAppErrorActionType
    | ReturnType<typeof setInitializedAC>
    | setIsLoggedInType


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppInitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}