import React, { Fragment } from "react"
import { Col, Row, Grid, Button } from "antd"
import style from "../../../styles.module.scss"
import {
   faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
const { useBreakpoint } = Grid;

export default function ProfileIdentity() {
    const screens = useBreakpoint();

    return (
        <Fragment>
            <div className={screens.md ? null : style.subProfile}>
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
                <Row className={screens.md ? style.marginTop20 : style.TitleCoin} >
                    <Col>
                    <h2 className={style.titleH4}>เกียรติประวัติ</h2>
                    </Col>
                    <Col className={style.marginLeft}>
                        <NavLink to="/tutor/1/add/education">
                            <Button className="backgroundBlue buttonColor" shape="circle" icon={<FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />} />
                        </NavLink>
                    </Col>
                </Row>
                {/* for show list of education */}
                {/* <EducationTutor data={item} addData={true} status={true}  index={index}/> */}
            </div>
        </Fragment>
    )
}