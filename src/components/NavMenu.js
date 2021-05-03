import React, { Fragment } from "react"
import { Menu, Grid, Button, Row, Col } from "antd";
import { NavLink } from "react-router-dom";
import {
    faHome,
    faChalkboardTeacher,
    faSearch,
    faHeart,
    faUserCircle,
    faTachometerAlt,
    faGraduationCap,
    faBell
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/auth.actions";
const { useBreakpoint } = Grid;

const NavMenu = () => {
    const screens = useBreakpoint();
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const statusTutor = auth.role === 2
    const status = auth.isAuthenticated
    const admin = auth.role === 0
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
                <Menu.Item key="/search" >
                    <NavLink to="/search">
                        ค้นหา
                </NavLink>
                </Menu.Item>
                {
                    status ? (
                        <Menu.Item key="/learner/1" >
                            <NavLink to="/learner/1">
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
                    status ? (
                        <Menu.Item key="/tutor/1" >
                            <NavLink to="/tutor/1">
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
                    <NavLink to="/favorite">
                        <FontAwesomeIcon icon={faHeart} className="icon" />
                    </NavLink>
                </Col>
                <Col span={4} className="iconMenu">
                    <NavLink to="/learner/1">
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
                    <NavLink to="/tutor">
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
                            !status ? (
                                <Col style={{ display: "flex", alignItems: "center" }}>
                                    <NavLink to="/login">
                                        <Button id="/login" className="buttonColor backgroundBlue" shape="round" size="middle">เข้าสู่ระบบ</Button>
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
                !admin && (
                    <div className="fixMenu">
                        {screens.xs || (screens.sm && !screens.md) ? <MenuMobile /> : <MenuDesktop />}
                    </div>
                )
            }
        </Fragment>

    )
}

export default NavMenu;