import React, { Fragment, useState } from "react"
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
import isEmpty from "./defaultFunction/checkEmptyObject"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/auth.actions";
import isMobile from "./isMobile/isMobile";
import { styleComponent } from "./defaultFunction/style";
import { color } from "./defaultValue";
import style from "./../stylesDefault.module.scss"
import { useEffect } from "react";

const NavMenu = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [currentPath, setCurrentPath] = useState("/")
    const pathName = window.location.pathname
    const device = isMobile() ? "mobile" : "desktop"
    
    const pathFocus = {
        "tutor": ["/", "/tutor", "/tutor/course", "/tutor/online", "/me"],
        "learner": {
            "mobile": ["/", "/course", "/search", "/favorite", "/me"],
            "desktop": ["/", "/popular", "/search", "/favorite", "/me"]
        },
        "visitor": ["/", "/search"]
    }

    const statusUser = () => {
        if (auth.role === 2) {
            return "tutor"
        } else if (auth.role === 1) {
            return "learner"
        } else if (!auth.isAuthenticated) {
            return "visitor"
        }
    }

    const checkPath = () => {
        if (statusUser() === "tutor" || statusUser() === "visitor") {
            return pathFocus[statusUser()].find(value => value === pathName)
        } else if (statusUser() === "learner") {
            return pathFocus[statusUser()][device].find(value => value === pathName)
        }
    }

    useEffect(() => {
        if(!isEmpty(checkPath())){
            handleChangePath(checkPath())
        }
    }, [pathName])

    const handleChangePath = (path) => {
        setCurrentPath(path)
    }


    const UserMenu = () => {
        return (
            <Menu className="menuBar" onClick={(e) => handleChangePath(e.key)} selectedKeys={[currentPath]} mode="horizontal" defaultSelectedKeys={["/"]} >
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
                <Menu.Item key="/search" >
                    <NavLink to="/search">
                        ค้นหา
                    </NavLink>
                </Menu.Item>
                {
                    statusUser() === "learner" && (
                        <Menu.Item key="/favorite" >
                            <NavLink to="/favorite">
                                รายการที่ถูกใจ
                            </NavLink>
                        </Menu.Item>
                    )
                }
                {
                    statusUser() !== "visitor" ? (
                        <Menu.Item key="/me" >
                            <NavLink to="/me">
                                โปรไฟล์
                            </NavLink>
                        </Menu.Item>
                    ) : null
                }
                {
                    statusUser() !== "visitor" ? (
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
            <Menu className="menuBar" mode="horizontal" onClick={(e) => handleChangePath(e.key)} selectedKeys={[currentPath]} defaultSelectedKeys={["/tutor"]} >
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
                {
                    statusUser() !== "visitor" ? (
                        <Menu.Item key="/me" >
                            <NavLink to="/me">
                                โปรไฟล์
                            </NavLink>
                        </Menu.Item>
                    ) : null
                }
                {
                    statusUser() !== "visitor" ? (
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
            <Row justify="space-around" >
                <Col span={4} className="iconMenu" onClick={() => handleChangePath("/")}>
                    <NavLink to="/">
                        <FontAwesomeIcon icon={faHome} className={currentPath === "/" ? "iconActive" : "icon"} />
                    </NavLink>
                </Col>
                <Col span={4} className="iconMenu" onClick={() => handleChangePath("/course")}>
                    <NavLink to="/course">
                        <FontAwesomeIcon icon={faChalkboardTeacher} className={currentPath === "/course" ? "iconActive" : "icon"} />
                    </NavLink>
                </Col>
                <Col span={4} className="iconMenu" onClick={() => handleChangePath("/search")}>
                    <NavLink to="/search">
                        <FontAwesomeIcon icon={faSearch} className={currentPath === "/search" ? "iconActive" : "icon"} />
                    </NavLink>
                </Col>
                <Col span={4} className="iconMenu" onClick={() => handleChangePath("/favorite")}>
                    <NavLink to="/favorite">
                        <FontAwesomeIcon icon={faHeart} className={currentPath === "/favorite" ? "iconActive" : "icon"} />
                    </NavLink>
                </Col>
                <Col span={4} className="iconMenu" onClick={() => handleChangePath("/me")}>
                    <NavLink to="/me">
                        <FontAwesomeIcon icon={faUserCircle} className={currentPath === "/me" ? "iconActive" : "icon"} />
                    </NavLink>
                </Col>
            </Row>

        )
    }



    const ToturMenuMobile = () => {
        return (
            <Row justify="space-around" onClick={(e) => handleChangePath(e)}>
                <Col span={6.5} className="iconMenu" onClick={() => handleChangePath("/")}>
                    <NavLink to="/">
                        <FontAwesomeIcon icon={faHome} className={currentPath === "/" ? "iconActive" : "icon"} />
                    </NavLink>
                </Col>
                <Col span={6.5} className="iconMenu" onClick={() => handleChangePath("/tutor")}>
                    <NavLink to="/tutor">
                        <FontAwesomeIcon icon={faTachometerAlt} className={currentPath === "/tutor" ? "iconActive" : "icon"} />
                    </NavLink>
                </Col>

                <Col span={6.5} className="iconMenu" onClick={() => handleChangePath("/tutor/course")}>
                    <NavLink to="/tutor/course">
                        <FontAwesomeIcon icon={faGraduationCap} className={currentPath === "/tutor/course" ? "iconActive" : "icon"} />
                    </NavLink>
                </Col>
                <Col span={6.5} className="iconMenu" onClick={() => handleChangePath("/tutor/online")}>
                    <NavLink to="/tutor/online">
                        <FontAwesomeIcon icon={faChalkboardTeacher} className={currentPath === "/tutor/online" ? "iconActive" : "icon"} />
                    </NavLink>
                </Col>
                <Col span={6.5} className="iconMenu" onClick={() => handleChangePath("/me")}>
                    <NavLink to="/me">
                        <FontAwesomeIcon icon={faUserCircle} className={currentPath === "/me" ? "iconActive" : "icon"} />
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
                                statusUser() === "tutor" ? <TutorMenu /> : <UserMenu />
                            }
                        </Col>
                        {
                            statusUser() === "visitor" ? (
                                <Col className={style.textOne25}>
                                    <NavLink to="/login">
                                        <Button id="/login" className={`${style.buttonColor} ${style.textOne25}`} style={styleComponent.buttonFull(color.blue, "auto")} shape="round" size="middle">เข้าสู่ระบบ</Button>
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
                    statusUser() === "tutor" ? <ToturMenuMobile /> : <UserMenuMobile />
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