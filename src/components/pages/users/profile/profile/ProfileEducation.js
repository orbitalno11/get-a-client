import React from 'react'
import isMobile from "../../../../isMobile/isMobile"
import ProfileContact from "./ProfileContact"
import style from "./../styles.module.scss"
import { Button, Col, Row, Tooltip } from "antd"
import { styleComponent } from "../../../../defaultFunction/style"
import { color, defaultValue } from "../../../../defaultValue"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import isEmpty from "../../../../defaultFunction/checkEmptyObject"
import EducationTutor from "../editProfile/tutor/EducationTutor"

export default function ProfileEducation() {
    const auth = useSelector(state => state.auth)
    const tutorData = useSelector(state => state.tutor)
    const profile = useSelector(state => state.profile)
    const { listTesting, listEducation } = tutorData
    const testingVerrifyPass = !isEmpty(listTesting) && listTesting.filter((item) => item.verified === 1)
    const testingVerrifyChecking = !isEmpty(listTesting) && listTesting.filter((item) => item.verified === 0)
    const testingVerrifyFailed = !isEmpty(listTesting) && listTesting.filter((item) => item.verified === -1)
    const educationVerrifyPass = !isEmpty(listEducation) && listEducation.filter((item) => item.verified === 1)
    const educationVerrifyChecking = !isEmpty(listEducation) && listEducation.filter((item) => item.verified === 0)
    const educationVerrifyFailed = !isEmpty(listEducation) && listEducation.filter((item) => item.verified === -1)

    return (
        <div>
            <Row align="middle" className={`${!isMobile() && style.section} ${style.marginSection} ${isMobile() && style.paddingProfileMobile}`} >
                <Col span={18}>
                    <span className={style.textOne75}>การยืนยันตัวตน</span >
                </Col>
                <Col span={6} align="end">
                    <Link to={"/tutor/edit/identity"}>
                        <Button className={`${style.buttonColor} ${style.textOne}`} style={styleComponent.buttonFull(color.yellow, "5rem")} size="small">ยืนยัน</Button>
                    </Link>
                </Col>
            </Row>
            <Row align="middle" className={`${!isMobile() && style.section} ${style.marginSection} ${isMobile() && style.paddingProfileMobile}`} >
                <span className={style.textOne75}>ประวัติการศึกษา</span >
                <Link to={`/tutor/${auth.profile}/add/testing/created`}>
                    <Tooltip className={style.marginLeftOne} placement="topLeft" title="เพิ่มเกียรติประวัติ">
                        <Button className={style.button} style={styleComponent.buttonFull(color.blue, "auto")} shape={"circle"} >
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </Tooltip>
                </Link>
            </Row>
            {
                testingVerrifyPass && <EducationTutor data={testingVerrifyPass} type={defaultValue.typeIdentity["testing"]} />
            }
            {
                educationVerrifyPass && <EducationTutor data={educationVerrifyPass} type={defaultValue.typeIdentity["education"]} />
            }
            {
                testingVerrifyChecking && <EducationTutor data={testingVerrifyChecking} type={defaultValue.typeIdentity["testing"]} />
            }
            {
                educationVerrifyChecking && <EducationTutor data={educationVerrifyChecking} type={defaultValue.typeIdentity["education"]} />
            }
            {
                testingVerrifyFailed && <EducationTutor data={testingVerrifyFailed} type={defaultValue.typeIdentity["testing"]} />
            }
            {
                educationVerrifyFailed && <EducationTutor data={educationVerrifyFailed} type={defaultValue.typeIdentity["education"]} />
            }
            {
                (isMobile()) && ( <ProfileContact data={profile.profile && profile.profile.contact} /> )
            }
        </div>
    )
}