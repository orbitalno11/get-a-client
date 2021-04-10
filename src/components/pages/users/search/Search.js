import { Button, Col, Grid, Row, Select } from "antd"
import React, { Fragment } from "react"
import { useHistory } from "react-router";
import Header from "../../../headerMobile/Header";
import style from "./styles.module.scss"
import InputComponents from "../../../input/InputComponets"
import TabHorizontal from "../../../tab/TabHorizontal"
const { useBreakpoint } = Grid;

export default function Search() {
    const screens = useBreakpoint();

    let history = useHistory();

    const tabTutorStart = {
        key: "all",
        name: "All"
    }

    const tabTutor = [
        {
            key: "all",
            name: "All",
        }
        , {
            key: "tutor",
            name: "Tutor",
        },
        {
            key: "course",
            name: "Course",
        },
    ]

    const tabGenderStart = {
        key: "non",
        name: "ไม่ระบุ"
    }

    const tabGender = [
        {
            key: "non",
            name: "ไม่ระบุ",
        }
        , {
            key: "female",
            name: "หญิง",
        },
        {
            key: "male",
            name: "ชาย",
        },
    ]

    const tabLocationStart = {
        key: "now",
        name: "ที่อยู่ปัจจุบัน"
    }

    const tabLocation = [
        {
            key: "now",
            name: "ที่อยู่ปัจจุบัน"
        }
        , {
            key: "set",
            name: "ที่อยู่ปัจจุบัน",
        },
        {
            key: "not",
            name: "ไม่ใช้",
        },
    ]

    const handleSearch = () => {
        history.push("/search/keyword?search=search&grade=grade");
    }

    return (
        <Fragment>
            {screens.xs || (screens.sm && !screens.md) ? <Header title="ค้นหา" /> : null}
            <Row className={style.body}>
                <Col lg={24} md={24} sm={24} xs={24}>
                    {
                        screens.md && (
                            <span className={style.titleH2}>ค้นหา</span>
                        )
                    }
                    <Row justify="space-between" className={style.paddingRight}>
                        <Col span={24} className={screens.md && style.marginTop20}>
                            <InputComponents
                                name="search"
                                placeholder="คำค้นหา"
                            />
                        </Col>
                        <Col lg={10} sm={24} xs={24} className={style.marginTop20} >
                            <p>ระดับชั้น</p>
                            <Select placeholder="ระดับชั้น">
                                <Select.Option value="all" >ทั้งหมด</Select.Option>
                            </Select>
                        </Col>
                        <Col lg={10} sm={24} xs={24} className={style.marginTop20} >
                            <p>วิชา</p>
                            <Select placeholder="วิชา">
                                <Select.Option value="all" >ทั้งหมด</Select.Option>
                            </Select>
                        </Col>
                        <Col lg={10} md={24} sm={24} xs={24} className={style.marginTop20} >
                            <p>เพศของ Tutor</p>
                            <TabHorizontal type="input" tabStart={tabGenderStart} tabDetail={tabGender} name="gender" />
                        </Col>
                        <Col lg={10} md={24} sm={24} xs={24} className={style.marginTop20} >
                            <p>ประเภทของการค้นหา</p>
                            <TabHorizontal type="input" tabStart={tabTutorStart} tabDetail={tabTutor} name="gender" />
                        </Col>
                        <Col lg={14} md={24} sm={24} xs={24} className={style.marginTop20} >
                            <p>ใช้สถานที่ช่วยค้นหา (ในระยะ 5 กิโลเมตร)</p>
                            <TabHorizontal type="input" tabStart={tabLocationStart} tabDetail={tabLocation} name="gender" />
                        </Col>

                    </Row>
                    <Row justify="space-around">
                        <Button className="backgroundMain buttonColor" style={{ marginTop: "2rem" }} shape="round" size="large" htmlType="submit" onClick={() => handleSearch()}>ค้นหา</Button>
                    </Row> 
                </Col>
            </Row>
        </Fragment>
    )
}