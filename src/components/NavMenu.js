import React, { Fragment } from "react"
import { Menu, Button, Row, Col } from "antd";
import { NavLink } from "react-router-dom";
import {
    faHome,
    faChalkboardTeacher,
    faUserCircle,
    faTachometerAlt,
    faGraduationCap,
    faSearch,
    faHeart
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/auth.actions";
import isMobile from "./isMobile/isMobile";
import { styleComponent } from "./defaultFunction/style";
import { color } from "./defaultValue";
import style from "./../stylesDefault.module.scss"

const NavMenu = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const statusTutor = auth.role === 2
    const status = auth.isAuthenticated
    const isLearner = auth.role === 1
    const UserMenu = () => {

        return (
            <Menu className="menuBar" mode="horizontal" defaultSelectedKeys={["/"]} >
                <Menu.Item key="/">
                    <NavLink to="/">
                        หน้าแรก
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="/popular" >
                    <NavLink to="/popular">
                        ติวเตอร์
                    </NavLink>
                </Menu.Item>
                {/* <Menu.Item key="/course" >
                    <NavLink to="/course">
                        คอร์สเรียน
                </NavLink>
                </Menu.Item>
                */}
                <Menu.Item key="/search" >
                    <NavLink to="/search">
                        ค้นหา
                </NavLink>
                </Menu.Item>
                {
                    isLearner && (
                        <Menu.Item key="/favorite" >
                            <NavLink to="/favorite">
                                รายการที่ถูกใจ
                        </NavLink>
                        </Menu.Item>
                    )
                }
                {
                    status ? (
                        <Menu.Item key="/me" >
                            <NavLink to="/me">
                                โปรไฟล์
                        </NavLink>
                        </Menu.Item>
                    ) : null
                }
                {
                    status ? (
                        <Menu.Item key="/logout" onClick={() => dispatch(userActions.logout())}>
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
            <Menu className="menuBar" mode="horizontal" defaultSelectedKeys={["/tutor"]} >
                <Menu.Item key="/tutor" >
                    <NavLink to="/tutor">
                        หน้าแรก
                </NavLink>
                </Menu.Item>
                <Menu.Item key="/tutor/course"  >
                    <NavLink to="/tutor/course">
                        จัดการคอร์สเรียน
                </NavLink>
                </Menu.Item>
                <Menu.Item key="/tutor/online"  >
                    <NavLink to="/tutor/online">
                        จัดการคอร์สออนไลน์
                </NavLink>
                </Menu.Item>
                {/* <Menu.Item key="/notification"  >
                    <NavLink to="/notification">
                        แจ้งเตือน
                </NavLink>
                </Menu.Item> */}
                {
                    status ? (
                        <Menu.Item key="/me" >
                            <NavLink to="/me">
                                โปรไฟล์
                        </NavLink>
                        </Menu.Item>
                    ) : null
                }
                {
                    status ? (
                        <Menu.Item key="/logout" onClick={() => dispatch(userActions.logout())}>
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
                    <NavLink to="/course">
                        <FontAwesomeIcon icon={faChalkboardTeacher} className="icon" />
                    </NavLink>
                </Col>
                <Col span={4} className="iconMenu">
                    <NavLink to="/search">
                        <FontAwesomeIcon icon={faSearch} className="icon" />
                    </NavLink>
                </Col> 
                <Col span={4} className="iconMenu">
                    <NavLink to="/favorite">
                        <FontAwesomeIcon icon={faHeart} className="icon" />
                    </NavLink>
                </Col>
                <Col span={4} className="iconMenu">
                    <NavLink to="/me">
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
                        <FontAwesomeIcon icon={faHome} className="icon" />
                    </NavLink>
                </Col>
                <Col span={6.5} className="iconMenu">
                    <NavLink to="/tutor">
                        <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
                    </NavLink>
                </Col>

                <Col span={6.5} className="iconMenu">
                    <NavLink to="/tutor/course">
                        <FontAwesomeIcon icon={faGraduationCap} className="icon" />
                    </NavLink>
                </Col>
                <Col span={6.5} className="iconMenu">
                    <NavLink to="/tutor/online">
                        <FontAwesomeIcon icon={faChalkboardTeacher} className="icon" />
                    </NavLink>
                </Col>
                {/* <Col span={6.5} className="iconMenu">
                    <NavLink to="/">
                        <FontAwesomeIcon icon={faBell} className="icon" />
                    </NavLink>
                </Col> */}
                <Col span={6.5} className="iconMenu">
                    <NavLink to="/me">
                        <FontAwesomeIcon icon={faUserCircle} className="icon" />
                    </NavLink>
                </Col>
            </Row>

        )
    }
    const MenuDesktop = () => {
        return (
            <nav className="menuBar">
                <NavLink to="/">
                    <span className="logo">GET-A</span>
                </NavLink>
                <div className="floatRight">
                    <Row align="middle">
                        <Col >
                            {
                                statusTutor ? <TutorMenu /> : <UserMenu />
                            }
                        </Col>
                        {
                            !status ? (
                                <Col>
                                    <NavLink to="/login">
                                        <Button id="/login" className={`${style.buttonColor} ${style.textOne}`} style={styleComponent.buttonFull(color.blue, "auto")} shape="round" size="middle">เข้าสู่ระบบ</Button>
                                    </NavLink>
                                    <NavLink to="/register">
                                        <Button className="buttonText" type="link" >หรือ สมัครสมาชิก</Button>
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



    return (
        <Fragment>
            {
                <div className="fixMenu">
                    {isMobile() ? <MenuMobile /> : <MenuDesktop />}
                </div>
            }
        </Fragment>

    )
}

export default NavMenu;