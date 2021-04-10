import React, { Fragment, useEffect, useState } from "react"
import { Col, Row, Grid, Typography, Button, Divider } from "antd"
import style from "../../../styles.module.scss"
import {
   faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import EducationTutor from "../../../../../../educationTutor/EducationTutor";
import { useSelector } from "react-redux";
const { useBreakpoint } = Grid;
const { Title } = Typography;

export default function ProfileIdentity({}) {
    const screens = useBreakpoint();
    const profile = useSelector(state => state.profile)
    const [history, setHistory] = useState(null)

    useEffect(() => {
        if(profile.profile){
            setHistory(profile.profile.history)
        }
    }, [profile])

    return (
        <Fragment>
            <div className={screens.md ? null : style.subProfile}>
                <div className={style.TitleCoin}>
                    <Title level={screens.md ? 2 : 5}>ยืนยันตัวตน</Title>
                    <Col className={style.floatLeft}>
                        <Button className="buttonColor backgroundGreen" shape="round" size="middle" style={{ width: "100px" }}>ยืนยัน</Button>
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
                {
                    history!==null && history.map((item, index) => {
                        return (                            
                            <div key={index}>
                                <EducationTutor data={item} addData={true} status={true}  index={index}/>
                                <Divider />
                            </div>
                        )
                    })
                }
            </div>
        </Fragment>
    )
}
