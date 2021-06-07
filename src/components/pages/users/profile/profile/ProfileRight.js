import React from 'react'
import ProfileEducation from "./ProfileEducation"
import ProfileCourse from "./ProfileCourse"

export default function ProfileRight({ isTutor }) {
    return (
        <div>
            { isTutor ? <ProfileEducation/> : <ProfileCourse/> }
        </div>
    )
}