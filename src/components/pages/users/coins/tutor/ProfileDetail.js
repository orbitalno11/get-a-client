import { Button } from "antd"
import React from 'react'

export default function ProfileDetail({onHandleChange}) {
    return (
        <div>
            left
            <Button onClick={()=>onHandleChange()}>แลกเหรียญ</Button>
        </div>
    )
}