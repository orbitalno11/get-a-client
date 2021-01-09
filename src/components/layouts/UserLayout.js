import React from 'react'

import { Route, Switch } from 'react-router-dom'

import NavMenu from '../NavMenu'

import Home from '../pages/users/Home'
import Login from '../pages/users/authorization/Login'
import RegisterSelect from '../pages/users/authorization/RegisterSelect'
import RegisterForm from '../pages/users/authorization/RegisterForm'


export default function UserLayout() {
    return (
        <div>
            <NavMenu />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register/select" component={RegisterSelect} />
                <Route exact path="/register/form/:id" component={RegisterForm} />

            </Switch>
        </div>
    )
}
