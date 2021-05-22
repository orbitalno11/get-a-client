import React from "react"
import { useEffect } from "react"
import { Fragment } from "react"
import { useParams } from "react-router"
import { trackImpressTutorProfile } from "../../../../../../analytic/Analytic"
import PubilcProfile from "./PubilcProfile"

export default function PubilcProfileCourse() {
    const { id } = useParams()
    const trackImpress = () => {
        if (id?.isSafeNotBlank()) {
            trackImpressTutorProfile(id)
        }
    }

    useEffect(() => {
        trackImpress()
    }, [])

    return (
        <Fragment>
            <PubilcProfile isCourse/>
        </Fragment>
    )
}