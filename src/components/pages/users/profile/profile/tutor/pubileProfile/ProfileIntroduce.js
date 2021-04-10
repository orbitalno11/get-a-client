import React, { Fragment, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import HeaderVerizontal from "../../../../../../headerVerizontal/HeaderVerizontal";

export default function ProfileIntroduce({mainPage}) {
    const data = useSelector(state => state.profile)
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        setProfile(data.profileHandle)
    }, [data])

    return (
        <Fragment>
            <HeaderVerizontal mainPage={mainPage} data={profile}/>
        </Fragment>
    )
}
