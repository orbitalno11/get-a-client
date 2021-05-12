import React, { Fragment } from "react"
import { Col, Row, Grid, Typography, Button } from "antd"
import style from "../../../styles.module.scss"
import {
   faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
const { useBreakpoint } = Grid;
const { Title } = Typography;

export default function ProfileIdentity() {
    const screens = useBreakpoint();

    return (
        <Fragment>
            <div className={screens.md ? null : style.subProfile}>
                <div className={style.TitleCoin}>
                    <Title level={screens.md ? 2 : 5}>ยืนยันตัวตน</Title>
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
                        <Title level={screens.md ? 4 : 5}>เกียรติประวัติ  </Title>
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