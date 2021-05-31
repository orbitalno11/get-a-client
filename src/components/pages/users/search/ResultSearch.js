import React, { Fragment } from 'react'
import TabHorizontal from "../../../tab/TabHorizontal"
import { useState } from "react"

export default function ResultSearch() {
    const type = "offline"
    const [tabStart, setTabStart] = useState({
        key: "all",
        name: "ทั้งหมด",
    })

    const tabDetail = () => {
        const data =  [
            {
                key: "all",
                name: "ทั้งหมด",
            },
            {
                key: "near",
                name: "ใกล้คุณ",
            },
            {
                key: "online",
                name: "ออนไลน์",
            },
        ]

        if(type === "offline"){
            return data
        }else if(type === "N/A"){
            return data.filter(value => value.key !== "online")
        }
    }

    const handleSetSelectTab = (key) => {
        const tabActive = tabDetail().filter(value => value.key === key)[0]
        setTabStart(tabActive)
    }

    return (
        <Fragment>
            {
                type !== "online" && (
                    <TabHorizontal type="tab" tabStart={tabStart} tabDetail={tabDetail()} style={"TabPane"} handleSetSelectTab={handleSetSelectTab} />
                )
            }
        </Fragment>
    )
}