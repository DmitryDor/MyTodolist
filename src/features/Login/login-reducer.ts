import {Dispatch} from "redux";
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/appReducer";
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";

type InitialStateType = {
    isLogenIn: boolean
}

const initialState: InitialStateType = {
    isLogenIn: false
}

export type setIsLoggedInType = ReturnType<typeof setIsLoggedInAC>

type ActionsType = setIsLoggedInType | SetAppStatusActionType | SetAppErrorActionType


export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "Login/SET-IS-LOGGED-IN":
            return {...state, isLogenIn: action.isLogged}

        default: {
            return state
        }
    }
}

// AC

export const setIsLoggedInAC = (isLogged: boolean) => ({type: 'Login/SET-IS-LOGGED-IN', isLogged} as const)

// TC

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(dispatch(setAppStatusAC('loading')))
    authAPI.login(data).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('idle'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(dispatch(setAppStatusAC('loading')))
    authAPI.logout().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('idle'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types