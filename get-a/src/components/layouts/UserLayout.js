import React from 'react'

import { Route, Switch } from 'react-router-dom'

import NavMenu from '../NavMenu'

import Home from '../pages/users/Home'
import Login from '../pages/users/Login'


export default function UserLayout() {
    return (
        <div>
            <NavMenu/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>

            </Switch>
        </div>
    )
}
