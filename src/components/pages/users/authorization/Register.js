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

export default function Register() {
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    const typeRegister = [
        {
            id: "0",
            type: "TUTOR",
            icon: "",
            color: "#303A53"
        },
        {
            id: "1",
            type: "LEARNER",
            icon: "faBookReader",
            color: "#F26419"
        },
    ]
    return (
        <Fragment>
            {screens.xs || (screens.sm && !screens.md) ? <Header title="สมัครสมาชิก" /> : null}
            <div className={style.alignCenterPage}>
                <span className="h2 ">ประเภทสมาชิก</span>
                <Row className={style.rowWidth} >
                    {
                        typeRegister.map((item) => (
                            <Col justify="space-around" align="middle" key={item.type} xs={24} sm={24} md={12}>
                                <NavLink to={`/register/${item.id}`}>
                                    <Button className="big-button white" style={{ backgroundColor: item.color }} shape="round">
                                        <FontAwesomeIcon icon={item.type === "LEARNER" ? faBookReader : faChalkboardTeacher} className={style.iconStyle} />
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
