import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavMenu from '../NavMenu'
import Home from '../pages/users/Home'
import Login from '../pages/users/authorization/Login'
import Register from '../pages/users/authorization/Register'
import RegisterForm from '../pages/users/authorization/RegisterForm'

export default function UserLayout() {
    return (
        <div>
            <NavMenu />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/register/:id" component={RegisterForm} />
            </Switch>
        </div>
    )
}
