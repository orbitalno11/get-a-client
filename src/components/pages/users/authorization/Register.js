import { Button, Col, Grid, Row } from "antd"
import React, { Fragment } from "react"
import { NavLink } from "react-router-dom"
import {
    faBookReader,
    faChalkboardTeacher
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./styles.module.scss"
import Header from "../../../headerMobile/Header"
import { color } from "../../../defaultValue";

export default function Register() {
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    const typeRegister = [
        {
            id: "tutor",
            type: "TUTOR",
            icon: faChalkboardTeacher,
            color: color.darkBlue
        },
        {
            id: "learner",
            type: "LEARNER",
            icon: faBookReader,
            color: color.orange
        },
    ]
    return (
        <Fragment>
            {screens.xs || (screens.sm && !screens.md) ? <Header title="สมัครสมาชิก" /> : null}
            <div className={style.alignCenterPage}>
                <span className={style.titleH2}>ประเภทสมาชิก</span>
                <Row className={style.rowWidth} >
                    {
                        typeRegister.map((item) => (
                            <Col justify="space-around" align="middle" key={item.type} xs={24} sm={24} md={12}>
                                <NavLink to={`/register/${item.id}`}>
                                    <Button className="big-button white" style={{ backgroundColor: item.color }} shape="round">
                                        <FontAwesomeIcon icon={item.icon} className={style.iconStyle} />
                                        <br /> {item.type}
                                    </Button>
                                </NavLink>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        </Fragment>
    )
}