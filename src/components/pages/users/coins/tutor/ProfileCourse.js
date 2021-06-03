 import React from 'react'
 import { Button } from "antd"
 
 export default function ProfileCourse({onHandleChange}) {
     return (
         <div>
             คำขอแลกเหรียญ
            <Button onClick={()=>onHandleChange()}>ยกเลิกคำขอ</Button>
         </div>
     )
 }
 
 