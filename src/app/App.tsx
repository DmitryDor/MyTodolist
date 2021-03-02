import React, {useCallback, useEffect} from 'react'
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskType} from "../api/todolist-api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/errorSnackbar/errorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./appReducer";
import {TodolistDomainType} from "../features/TodolistsList/todolists-reducer";
import {Redirect, Route} from 'react-router-dom';
import {Login} from "../features/Login/Login";
import {logoutTC, setIsLoggedInAC} from "../features/Login/login-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type AppPropsType = {
    demo?: boolean
}

function App({demo = false}: AppPropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLogenIn)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const isLoggedInHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!initialized) {
        return <div style={{position: 'fixed', top: '30%', left: '45%'}}>
            <CircularProgress/>
        </div>
    }



    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={isLoggedInHandler}>Logout</Button>}
                </Toolbar>
                {status === "loading" && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Route path={'/'} exact render={() => <TodolistsList demo={demo}/>}/>
                <Route path={'/login'} render={() => <Login/>}/>
            </Container>
        </div>
    );
}

export default App;
