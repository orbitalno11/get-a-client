import React from "react"
import style from "./styles.module.scss"
import { faGraduationCap ,faMinus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "antd"

export default function EducationTutor({ data, addData, status, size ,index}) {

    const removeEducation = () =>{
        // for remove education list
    }

    return (
        <div className={style.educationRow}>
            {
                addData ? <Button className="backgroundGray buttonColor" size="middle" shape="circle" icon={<FontAwesomeIcon icon={faMinus} onClick={()=>removeEducation(index)}/>} /> : null
            }
            <FontAwesomeIcon className={size==="small"?style.smallSizeIcon:style.largeSizeIcon} icon={faGraduationCap} />
            <div className={style.subProfile}>
                <span>{data ? data.name : null}</span>
                <br />
                <span>{data ? data.brance : null}</span>
                <br />
                <span>{data ? data.grade : null}</span>
            </div>
            {
                status ?
                    <div className={style.floatLeft}>
                        <span>กำลังตรวจสอบ</span>
                    </div> : null
            }
        </div>
    )
}
