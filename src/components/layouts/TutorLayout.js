import React from "react"
import { Route, Switch } from "react-router-dom"
import ProfileTutor from "../pages/users/profile/profile/tutor/privateProfile/Profile"
import EditProfileDetail from "../pages/users/profile/editProfile/tutor/EditProfileDetail"
import AddEducation from "../pages/users/profile/editProfile/tutor/AddEducation"
import Home from "../pages/users/home/tutor/Home"


export default function UserLayout() {
    return (
            <Switch>
                <Route exact path="/tutor" component={Home} />
                <Route exact path="/tutor/:id" component={ProfileTutor} />
                <Route exact path="/tutor/:id/edit" component={EditProfileDetail} />
                <Route exact path="/tutor/:id/add/education" component={AddEducation} />
            </Switch>
    )
}

