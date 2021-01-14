import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavMenu from '../NavMenu'
import Home from '../pages/users/Home'
import Login from '../pages/users/authorization/Login'
import Register from '../pages/users/authorization/Register'
import RegisterForm from '../pages/users/authorization/RegisterForm'
import ProfileLearner from '../pages/users/profile/Profile/Learner/Profile'
import ProfileTutor from '../pages/users/profile/Profile/Tutor/Profile'

export default function UserLayout() {
    return (
        <div>
            <NavMenu />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/register/:id" component={RegisterForm} />
                <Route exact path="/profile" component={ProfileLearner} />
                <Route exact path="/profile/tutor" component={ProfileTutor} />
            </Switch>
        </div>
    )
}
