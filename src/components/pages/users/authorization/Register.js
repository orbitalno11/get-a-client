import { Button, Row } from "antd"
import React, { Fragment } from "react"
import {
    faBookReader,
    faChalkboardTeacher
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./styles.module.scss"
import Header from "../../../headerMobile/Header"
import { color } from "../../../defaultValue";
import isMobile from "../../../isMobile/isMobile";
import { Link } from "react-router-dom";

export default function Register() {

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

    const fullHeight = {
        height: "100%",
    }

    const buttonRegister = (colorIcon) => {
        return {
            backgroundColor: colorIcon,
            width: !isMobile() ? "10rem" : "80%",
        }
    }

    const listButton = {
        display: "flex",
        flexFlow: !isMobile() ? "row" : "column"
    }

    return (
        <Fragment>
            {isMobile() && <Header title="สมัครสมาชิก" pageBack="/login"/>}
            <div className={`${style.centerPage} ${style.bodyPaddingTopBottom}`} style={fullHeight} align="center" >
                <div className={`${!isMobile() ? style.section : null}`} >
                    <span className={style.headerThree}>ประเภทสมาชิก</span>
                    <Row style={listButton} justify="center" align="center">
                        {
                            typeRegister.map((item) => (

                                <Button key={item.type} className={style.boxRegister} style={buttonRegister(item.color)}>
                                    <Link to={`/register/${item.id}`}>
                                        <FontAwesomeIcon className={`${style.iconLargeRegister}  ${style.white}`} icon={item.icon} />
                                        <h2 className={`${style.headerOne75} ${style.white} ${style.marginSection}`}>{item.type}</h2>
                                    </Link>
                                </Button>
                            ))
                        }
                    </Row>
                </div>
            </div>
        </Fragment>
    )
}