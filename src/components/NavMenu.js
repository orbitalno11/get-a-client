import React, { Fragment } from 'react'
import { Menu, Grid, Button, Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';
import {
    faHome,
    faChalkboardTeacher,
    faSearch,
    faHeart,
    faUserCircle,
    faTachometerAlt,
    faGraduationCap,
    faBell
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const { useBreakpoint } = Grid;
const statusTutor = true
const auth = true

const UserMenu = () => {

    return (
        <Menu className="menuBar" mode="horizontal" defaultSelectedKeys={["/"]} >
            <Menu.Item key="/">
                <NavLink to="/">
                    หน้าแรก
                </NavLink>
            </Menu.Item>
            <Menu.Item key="/tutor" >
                <NavLink to="/tutor">
                    ติวเตอร์
                </NavLink></Menu.Item>
            <Menu.Item key="/couse" >
                <NavLink to="/tutor">
                    คอร์สเรียน
                </NavLink>
            </Menu.Item>
            {
            auth ? (
                        <Menu.Item key="/profile" >
                            <NavLink to="/profile">
                                โปรไฟล์
                        </NavLink>
                        </Menu.Item>
                ) : null
            }
            {
                auth ? (
                        <Menu.Item key="/logout" >
                            <NavLink to="/logout">
                                ออกจากระบบ
                        </NavLink>
                        </Menu.Item>
                ) : null
            }
        </Menu>
    )
}

const TutorMenu = () => {
    return (
        <Menu className="menuBar" mode="horizontal" defaultSelectedKeys={["/"]} >
            <Menu.Item key="/" >
                <NavLink to="/">
                    หน้าแรก
                </NavLink>
            </Menu.Item>
            <Menu.Item key="/manageCouse"  >
                <NavLink to="/manageCouse">
                    จัดการคอร์สเรียน
                </NavLink>
            </Menu.Item>
            <Menu.Item key="/notification"  >
                <NavLink to="/notification">
                    แจ้งเตือน
                </NavLink>
            </Menu.Item>
            {
            auth ? (
                        <Menu.Item key="/profile/tutor" >
                            <NavLink to="/profile/tutor">
                                โปรไฟล์
                        </NavLink>
                        </Menu.Item>
                ) : null
            }
            {
                auth ? (
                        <Menu.Item key="/logout" >
                            <NavLink to="/logout">
                                ออกจากระบบ
                        </NavLink>
                        </Menu.Item>
                ) : null
            }
        </Menu>
    )
}


const UserMenuMobile = () => {
    return (
        <Row justify="space-around">
            <Col span={4} className="iconMenu">
                <NavLink to="/">
                    <FontAwesomeIcon icon={faHome} className="icon" />
                </NavLink>
            </Col>
            <Col span={4} className="iconMenu">
                <NavLink to="/">
                    <FontAwesomeIcon icon={faChalkboardTeacher} className="icon" />
                </NavLink>
            </Col>
            <Col span={4} className="iconMenu">
                <NavLink to="/">
                    <FontAwesomeIcon icon={faSearch} className="icon" />
                </NavLink>
            </Col>
            <Col span={4} className="iconMenu">
                <NavLink to="/">
                    <FontAwesomeIcon icon={faHeart} className="icon" />
                </NavLink>
            </Col>
            <Col span={4} className="iconMenu">
                <NavLink to="/">
                    <FontAwesomeIcon icon={faUserCircle} className="icon" />
                </NavLink>
            </Col>
        </Row>

    )
}



const ToturMenuMobile = () => {
    return (
        <Row justify="space-around">
            <Col span={6.5} className="iconMenu">
                <NavLink to="/">
                    <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
                </NavLink>
            </Col>

            <Col span={6.5} className="iconMenu">
                <NavLink to="/">
                    <FontAwesomeIcon icon={faGraduationCap} className="icon" />
                </NavLink>
            </Col>
            <Col span={6.5} className="iconMenu">
                <NavLink to="/">
                    <FontAwesomeIcon icon={faChalkboardTeacher} className="icon" />
                </NavLink>
            </Col>
            <Col span={6.5} className="iconMenu">
                <NavLink to="/">
                    <FontAwesomeIcon icon={faBell} className="icon" />
                </NavLink>
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
                                <NavLink to="/login">
                                    <Button id="/login" className="buttonBlueColor" shape="round" size="middle">เข้าสู่ระบบ</Button>
                                </NavLink>
                                <NavLink to="/register">
                                    <Button className="buttonText" type="link" >หรือ เข้าสู่ระบบ</Button>
                                </NavLink>
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
            <div className="fixMenu">
                {screens.xs || (screens.sm && !screens.md) ? <MenuMobile /> : <MenuDesktop />}
            </div>
        </Fragment>
    )
}

export default NavMenu;