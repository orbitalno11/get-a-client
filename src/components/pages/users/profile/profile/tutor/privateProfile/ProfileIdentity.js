import React, { Fragment } from "react"
import { Col, Row, Button, Tooltip } from "antd"
import style from "../../../styles.module.scss"
import {
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import isMobile from "../../../../../../isMobile/isMobile"
import { useSelector } from "react-redux";
import EducationTutor from "../../../editProfile/tutor/EducationTutor"
import { defaultValue } from "../../../../../../defaultValue";
import isEmpty from "../../../../../../defaultFunction/checkEmptyObject";
import ModalComponent from "../../../../../../modal/ModalComponent";

export default function ProfileIdentity() {
    const tutorData = useSelector(state => state.tutor)
    const { listTesting, listEducation } = tutorData

    // Classify startus verify
    const testingVerrifyPass = !isEmpty(listTesting) && listTesting.filter((item) => item.verified === 1)
    const testingVerrifyChecking = !isEmpty(listTesting) && listTesting.filter((item) => item.verified === 0)
    const testingVerrifyFailed = !isEmpty(listTesting) && listTesting.filter((item) => item.verified === -1)
    const educationVerrifyPass = !isEmpty(listEducation) && listEducation.filter((item) => item.verified === 1)
    const educationVerrifyChecking = !isEmpty(listEducation) && listEducation.filter((item) => item.verified === 0)
    const educationVerrifyFailed = !isEmpty(listEducation) && listEducation.filter((item) => item.verified === -1)

    return (
        <Fragment>
            <ModalComponent />
            <div className={!isMobile() ? null : style.subProfile}>
                <div className={style.TitleCoin}>
                    <h2 className={style.titleH4}>ยืนยันตัวตน</h2>
                    <Col className={style.floatLeft}>
                        <NavLink to={"/tutor/edit/identity"}>
                            <Button className="buttonColor backgroundGreen" shape="round" size="middle" style={{ width: "6.25rem" }}>ยืนยัน</Button>
                        </NavLink>
                    </Col>
                </div>
            </div>
            <div >
                <Row className={!isMobile() ? style.marginTop20 : style.TitleCoin} >
                    <Col>
                        <h2 className={style.titleH4}>เกียรติประวัติ</h2>
                    </Col>
                    <Col className={style.marginLeft}>
                        <NavLink to="/tutor/1/add/testing/created">
                        <Tooltip placement="topLeft" title="เพิ่มเกียรติประวัติ">
                            <button className={style.editButton}  >
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            </Tooltip>
                        </NavLink>
                    </Col>
                </Row>
            </div>
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
        </Fragment>
    )
}