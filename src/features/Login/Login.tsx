import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./login-reducer";
import {AppRootStateType} from "../../app/store";
import {Redirect} from 'react-router-dom';

export const Login = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLogenIn)

    const formik = useFormik({
            initialValues: {
                email: '',
                password: '',
                rememberMe: false
            },
            validate: (values) => {
                if (!values.email) {
                    return {
                        email: 'Email is required'
                    }
                }
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    return {
                        email: 'Invalid email address'
                    }
                }
                if (!values.password) {
                    return {
                        password: 'Password is required'
                    }
                }
                if (values.password.length < 3) {
                    return {
                        password: 'Password length at least 5 characters '
                    }
                }
            },
            onSubmit: values => {
                dispatch(loginTC(values))
            },
        }
    )
    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }


    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}>here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            name='email'
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            name='password'
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={
                                <Checkbox name='rememberMe' {...formik.getFieldProps('rememberMe')}
                                          checked={formik.values.rememberMe}
                                />
                            }
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
