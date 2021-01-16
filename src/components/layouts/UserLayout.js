import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavMenu from '../NavMenu'
import Home from '../pages/users/Home'
import Login from '../pages/users/authorization/Login'
import Register from '../pages/users/authorization/Register'
import RegisterForm from '../pages/users/authorization/RegisterForm'
import ProfileLearner from '../pages/users/profile/profile/learner/Profile'
import ProfileTutor from '../pages/users/profile/profile/tutor/Profile'
import EditProfileDetail from '../pages/users/profile/editProfile/tutor/EditProfileDetail'
import EditProfile from '../pages/users/profile/editProfile/learner/EditProfile'
import AddEducation from '../pages/users/profile/editProfile/tutor/AddEducation'
import EditProfileMap from '../pages/users/profile/editProfile/learner/EditProfileMap'


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
                <Route exact path="/tutor/profile" component={ProfileTutor} />
                <Route exact path="/tutor/profile/edit" component={EditProfileDetail} />
                <Route exact path="/learner/profile/edit" component={EditProfile} />
                <Route exact path="/learner/profile/edit/map" component={EditProfileMap} />
            </Switch>
        </div>
    )
}
