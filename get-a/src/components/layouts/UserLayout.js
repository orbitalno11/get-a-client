import React from 'react'

import { Route, Switch } from 'react-router-dom'

import NavMenu from '../NavMenu'

import Home from '../pages/users/Home'


export default function UserLayout() {
    return (
        <div>
            <NavMenu/>
            <Switch>
                <Route path="/" component={Home}/>
            </Switch>
        </div>
    )
}
