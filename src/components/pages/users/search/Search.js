import { Col, Grid, Row, Select } from "antd"
import React, { Fragment } from "react"
import Header from "../../../headerMobile/Header";
import style from "./styles.module.scss"
import isMobile from "../../../isMobile/isMobile";
import { color, defaultValue } from "../../../defaultValue";
import { styleComponent } from "../../../defaultFunction/style";
import ResultSearch from "./ResultSearch";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchSchema } from "../../../../validation/validation";
import findKeyObject from "../../../defaultFunction/findKeyObject";

const { useBreakpoint } = Grid;

export default function Search() {
    const screens = useBreakpoint();
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(searchSchema),
    });

    const onSubmit = () => {
        //for connect api search
    }

    return (
        <Fragment>
            {isMobile() ? <Header title="ค้นหา" /> : null}
            <div className="container">
                <div className={style.bodyPaddingTopBottom}>
                    {
                        !isMobile() && (
                            <Row className={`${style.section} ${style.headerFour}`} >
                                ค้นหา
                            </Row>
                        )
                    }
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Row className={`${style.section} ${!isMobile () && style.marginSection}`} align="middle" justify={"space-between"}>
                            <Col xl={20} lg={20} md={24} sm={24} xs={24}>
                                <Row justify="space-between">
                                    <Col xl={11} lg={11} md={24} sm={24} xs={24}>
                                        <Row>
                                            {/* grade */}
                                            <Col span={24} className={style.flexRow}>
                                                <span className={`${style.textOne5} ${style.widthSearchForm}`}>ระดับชั้น</span>
                                                <div style={{ width: "100%" }}>
                                                    <Controller
                                                        as={
                                                            <Select name="grade"  >
                                                                {
                                                                    defaultValue.grade && Object.entries(defaultValue.grade).map(([key, value]) => (
                                                                        <Select.Option key={value} value={value}>{key}</Select.Option>
                                                                    ))
                                                                }
                                                            </Select>
                                                        }
                                                        name="grade"
                                                        control={control}
                                                        defaultValue={findKeyObject(defaultValue.grade, 7)}
                                                    />
                                                </div>
                                            </Col>

                                            {/* subject */}
                                            <Col span={24} className={`${style.flexRow} ${style.marginTop2}`}>
                                                <span className={`${style.textOne5} ${style.widthSearchForm}`}>วิชา</span>
                                                <Controller
                                                    as={
                                                        <Select name="subject"  >
                                                            {
                                                                defaultValue.subject && Object.entries(defaultValue.subject).map(([key, value]) => (
                                                                    <Select.Option key={value} value={value}>{key}</Select.Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    }
                                                    name="subject"
                                                    control={control}
                                                    defaultValue={findKeyObject(defaultValue.subject, "MTH")}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col xl={11} lg={11} md={24} sm={24} xs={24} className={!screens.lg ? style.marginTop2 : null}>
                                        <Row>
                                            {/* sex */}
                                            <Col span={24} className={style.flexRow}>
                                                <span className={`${style.textOne5} ${style.widthSearchForm}`}>เพศของติวเตอร์</span>
                                                <Controller
                                                    as={
                                                        <Select name="gender"  >
                                                            <Select.Option value="N/A">ไม่ระบุ</Select.Option>
                                                            {
                                                                defaultValue.gender && Object.entries(defaultValue.gender).map(([key, value]) => (
                                                                    <Select.Option key={value} value={value}>{key}</Select.Option>
                                                                ))
                                                            }

                                                        </Select>
                                                    }
                                                    name="gender"
                                                    control={control}
                                                    defaultValue={"ไม่ระบุ"}
                                                />
                                            </Col>

                                            {/* course */}
                                            <Col span={24} className={`${style.flexRow} ${style.marginTop2}`}>
                                                <span className={`${style.textOne5} ${style.widthSearchForm}`}>ประเภทบทเรียน</span>
                                                <Controller
                                                    as={
                                                        <Select name="courseType"  >
                                                            <Select.Option value="N/A">ไม่ระบุ</Select.Option>
                                                            {
                                                                defaultValue.typeCourse && Object.entries(defaultValue.typeCourse).map(([key, value]) => (
                                                                    <Select.Option key={value} value={value}>{key}</Select.Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    }
                                                    name="courseType"
                                                    control={control}
                                                    defaultValue={"ไม่ระบุ"}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xl={3} lg={3} md={24} sm={24} xs={24} className={!screens.lg ? style.marginTop2 : null} >
                                <button className={style.buttonColor} style={styleComponent.buttonFull(color.orange)} type="submit">ค้นหา</button>
                            </Col>

                        </Row>
                    </form>

                    <Row className={`${style.section} ${style.marginSection}`}>
                        <Col span={24}>
                            <span className={style.textTwo}>ผลการค้นหา</span>
                        </Col>
                        <Col span={24} className={style.marginSection}>
                            <ResultSearch />
                        </Col>
                    </Row>

                </div>
            </div>
            {/* <TabHorizontal type="input" tabStart={tabLocationStart} tabDetail={tabLocation} name="gender" /> */}
        </Fragment>
    )
}