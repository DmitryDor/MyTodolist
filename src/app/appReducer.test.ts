import {AppInitialStateType, appReducer, setAppErrorAC, setAppStatusAC} from "./appReducer";
import {action} from "@storybook/addon-actions";

let startState: AppInitialStateType

beforeEach(() => {
    startState = {
        error: null,
        status: "idle"
    }
})

test(' correct error should be set', () => {

    const endState = appReducer(startState, setAppErrorAC('Bla'))

    expect(endState.error).toBe('Bla')
})

test(' correct status should be set', () => {

    const endState = appReducer(startState, setAppStatusAC('failed'))

    expect(endState.status).toBe('failed')
})
