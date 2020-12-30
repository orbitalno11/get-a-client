import React, { Fragment, useState } from 'react'
import { Menu, Grid, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import {    faHome, 
            faChalkboardTeacher, 
            faSearch, 
            faHeart, 
            faUserCircle,
            faTachometerAlt,
            faGraduationCap,
            faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const { useBreakpoint } = Grid;


const statusTutor = false
const auth = false


const UserMenu = () => {

    return (
        <Menu className="menuBar" mode="horizontal" defaultSelectedKeys={["/"]} >
            <Menu.Item key="/">
                <Link to="/">
                    หน้าแรก
                </Link>
            </Menu.Item>
            <Menu.Item key="/tutor" >
                <Link to="/tutor">
                    ติวเตอร์
                </Link></Menu.Item>
            <Menu.Item key="/couse" >
                <Link to="/tutor">
                    คอร์สเรียน
                </Link>
            </Menu.Item>
            {
                auth ? (<Menu.Item key="logout" >ออกจากระบบ</Menu.Item>) : null
            }
        </Menu>
    )
}

const TutorMenu = () => {
    return (
        <Menu className="menuBar" mode="horizontal" defaultSelectedKeys={["/"]} >
            <Menu.Item key="/" >
                <Link to="/">
                    หน้าแรก
                </Link>
            </Menu.Item>
            <Menu.Item key="/manageCouse"  >
                <Link to="/manageCouse">
                    จัดการคอร์สเรียน
                </Link>
            </Menu.Item>
            <Menu.Item key="/notification"  >
                <Link to="/notification">
                    แจ้งเตือน
                </Link>
            </Menu.Item>
            {
                auth ? (<Menu.Item key="logout"  >ออกจากระบบ</Menu.Item>) : null
            }
        </Menu>
    )
}


const UserMenuMobile = () => {
    return (
        <Row justify="space-around">
            <Col span={4} className="iconMenu">
                <Link to="/">
                    <FontAwesomeIcon icon={faHome} className="icon" />
                </Link>
            </Col>
            <Col span={4} className="iconMenu">
                <Link to="/">
                    <FontAwesomeIcon icon={faChalkboardTeacher} className="icon" />
                </Link>
            </Col>
            <Col span={4} className="iconMenu">
                <Link to="/">
                    <FontAwesomeIcon icon={faSearch} className="icon" />
                </Link>
            </Col>
            <Col span={4} className="iconMenu">
                <Link to="/">
                    <FontAwesomeIcon icon={faHeart} className="icon" />
                </Link>
            </Col>
            <Col span={4} className="iconMenu">
                <Link to="/">
                    <FontAwesomeIcon icon={faUserCircle} className="icon" />
                </Link>
            </Col>
        </Row>

    )
}



const ToturMenuMobile = () => {
    return (
        <Row justify="space-around">
            <Col span={6.5} className="iconMenu">
                <Link to="/">
                    <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
                </Link>
            </Col>
           
            <Col span={6.5} className="iconMenu">
                <Link to="/">
                    <FontAwesomeIcon icon={faGraduationCap} className="icon" />
                </Link>
            </Col>
            <Col span={6.5} className="iconMenu">
                <Link to="/">
                    <FontAwesomeIcon icon={faChalkboardTeacher} className="icon" />
                </Link>
            </Col>
            <Col span={6.5} className="iconMenu">
                <Link to="/">
                    <FontAwesomeIcon icon={faBell} className="icon" />
                </Link>
            </Col>
           
        </Row>

    )
}
const MenuDesktop = () => {
    return (
        <nav className="menuBar">
            <div  >
                <span className="logo">GET-A</span>
            </div>
            <div className="floatRight">
                <Row>
                    <Col >
                        {
                            statusTutor ? <TutorMenu /> : <UserMenu />
                        }
                    </Col>
                    {
                        !auth ? (
                            <Col style={{ display: "flex", alignItems: "center" }}>
                                <Button className="buttonBlueColor" shape="round" size="middle" >เข้าสู่ระบบ</Button>
                                <Button className="buttonText" type="text" >หรือ เข้าสู่ระบบ</Button>
                            </Col>
                        ) : null
                    }
                </Row>
            </div>
        </nav>
    )
}

const MenuMobile = () => {
    return (
        <nav className="navbarBottom" >
            {
                statusTutor ? <ToturMenuMobile /> : <UserMenuMobile />
            }
        </nav>
    )
}


const NavMenu = () => {
    const screens = useBreakpoint();
    return (
        <Fragment>
            {screens.xs || (screens.sm && !screens.md ) ? <MenuMobile/>: <MenuDesktop/>}
        </Fragment>
    )
}

export default NavMenu;