import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavMenu from '../NavMenu'
import Login from '../pages/users/authorization/Login'
import HomeTutor from "../pages/users/home/tutor/Home"
import HomeLarnner from "../pages/users/home/learner/Home"
import Register from "../pages/users/authorization/Register"
import RegisterForm from "../pages/users/authorization/RegisterForm"
import ProfileLearner from "../pages/users/profile/profile/learner/Profile"
import ProfileTutor from "../pages/users/profile/profile/tutor/privateProfile/Profile"
import EditProfileDetail from "../pages/users/profile/editProfile/tutor/EditProfileDetail"
import EditProfile from "../pages/users/profile/editProfile/learner/EditProfile"
import AddEducation from "../pages/users/profile/editProfile/tutor/AddEducation"
import EditProfileMap from "../pages/users/profile/editProfile/learner/EditProfileMap"
import PubilcProfile from "../pages/users/profile/profile/tutor/pubileProfile/PubilcProfile"
import ProfileDetail from "../pages/users/profile/profile/tutor/pubileProfile/ProfileDetail"

export default function UserLayout() {
    return (
        <div>
            <NavMenu />
            <Switch>
                <Route exact path="/" component={HomeLarnner} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/register/:id" component={RegisterForm} />
                <Route exact path="/profile" component={ProfileLearner} />
                <Route exact path="/learner/profile/edit" component={EditProfile} />
                <Route exact path="/learner/profile/edit/map" component={EditProfileMap} />
                <Route exact path="/tutor" component={HomeTutor} />
                <Route exact path="/tutor/profile" component={ProfileTutor} />
                <Route exact path="/tutor/profile/edit" component={EditProfileDetail} />
                <Route exact path="/tutor/profile/add/education" component={AddEducation} />
                <Route exact path="/profile/tutor/:id" component={PubilcProfile} />
                <Route exact path="/profile/tutor/history/:id" component={ProfileDetail} />
            </Switch>
        </div>
    )
}
