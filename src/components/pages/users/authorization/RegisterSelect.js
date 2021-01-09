import { Button, Col, Row } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import {
    faBookReader,
    faChalkboardTeacher
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function RegisterSelect() {
    const iconStyle = {
        fontSize: '50px',
        marginBottom: '10px'
    }

    const typeRegister = [
        {
            id : '0',
            type: "TUTOR",
            icon: "",
            color: "#303A53"
        },
        {
            id : '1',
            type: "LEARNER",
            icon: "faBookReader",
            color: "#F26419"
        },
    ]
    return (
        <div className="align-center-page">
            <span className="h2 ">ประเภทสมาชิก</span>
            <Row className="row-width" >
                {
                    typeRegister.map((item) => (
                        <Col justify="space-around" align="middle" key={item.type} xs={24} sm={24} md={12}>
                            <NavLink to={`/register/form/${item.id}`}>
                                <Button className="big-button white" style={{ backgroundColor: item.color }} shape="round">
                                    <FontAwesomeIcon icon={item.type === "LEARNER" ? faBookReader : faChalkboardTeacher} style={iconStyle} />
                                    <br /> {item.type}
                                </Button>
                            </NavLink>
                        </Col>
                    ))
                }

             


            </Row>
        </div>
    )
}
