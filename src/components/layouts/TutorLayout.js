import React from "react"
import { Route, Switch } from "react-router-dom"
import ProfileTutor from "../pages/users/profile/profile/tutor/privateProfile/Profile"
import EditProfileDetail from "../pages/users/profile/editProfile/tutor/EditProfileDetail"
import AddEducation from "../pages/users/profile/editProfile/tutor/AddEducation"
import Home from "../pages/users/home/tutor/Home"
import ManageCourse from "../pages/users/managecourse/offlineCourse/ManageCourse"
import AddCourse from "../pages/users/managecourse/editOfflineCourse/AddCourse"
import EnrollRequest from "../pages/users/managecourse/request/EnrollRequest"
import ManageClip from "../pages/users/managecourse/onlineCourse/clip/ManageClip"
import CreateClip from "../pages/users/managecourse/editOnlineCourse/create/CreateClip"
import MangeLesson from "../pages/users/managecourse/onlineCourse/lesson/MangeLesson"
import AddClip from "../pages/users/managecourse/editOnlineCourse/edit/AddClip"
import EditClip from "../pages/users/managecourse/editOnlineCourse/edit/EditClip"
import VDO from "../pages/users/managecourse/onlineCourse/player/VDO"
import ProfileIdentityForm from "../pages/users/profile/editProfile/tutor/ProfileIdentityForm"
import OfflineCourse from "../pages/users/managecourse/offlineCourse/OfflineCourse"
import EditProfileMap from "../pages/users/profile/editProfile/learner/EditProfileMap"


export default function TutorLayout() {
    return (
        <Switch>
            <Route exact path="/tutor" component={Home} />
            <Route exact path="/tutor/course" component={ManageCourse} />
            <Route exact path="/tutor/course/create" component={AddCourse} />
            <Route exact path="/tutor/course/:id/edit" component={AddCourse} />
            <Route exact path="/tutor/course/:id/enroll" component={EnrollRequest} />
            <Route exact path="/tutor/online" component={ManageClip} />
            <Route exact path="/tutor/online/create" component={CreateClip} />
            <Route exact path="/tutor/online/{courseId}" component={MangeLesson} />
            <Route exact path="/tutor/online/{courseId}/video/create" component={AddClip} />
            <Route exact path="/tutor/online/{courseId}/video/{videoId}" component={VDO} />
            <Route exact path="/tutor/online/{courseId}/video/{videoId}/edit" component={EditClip} />
            <Route exact path="/tutor/:id" component={ProfileTutor} />
            <Route exact path="/tutor/:id/edit" component={EditProfileDetail} />
            <Route exact path="/tutor/:id/add/:type/:idEducation" component={AddEducation} />
            <Route exact path="/tutor/edit/identity" component={ProfileIdentityForm} />
            <Route exact path="/tutor/course/:id" component={OfflineCourse} />
            <Route exact path="/tutor/:id/edit/map" component={EditProfileMap} />
        </Switch >
    )
}