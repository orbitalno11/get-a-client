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
import isEmpty from "../../../defaultFunction/checkEmptyObject";
import { searchActions } from "../../../../redux/actions/search.actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { apiURL } from "../../../../utils/setAxios";
import { LONGDO_MAP_KEY } from "../../../../config/environmentConfig";
import { useSelector } from "react-redux";
import Loading from "../../../loading/Loading";
import { useHistory } from "react-router";
import findKeyObject from "../../../defaultFunction/findKeyObject";
import { loadingActions } from "../../../../redux/actions/loading.actions";

const { useBreakpoint } = Grid;

export default function Search() {
    const screens = useBreakpoint();
    const dispatch = useDispatch()
    const { control, handleSubmit, reset } = useForm({
        resolver: yupResolver(searchSchema),
    })
    const [geolocation, setGeolocation] = useState({})
    const [currentLocation, setCurrentLocation] = useState({})
    const { loading } = useSelector(state => state.loading)
    const history = useHistory()
    let params = new URLSearchParams(window.location.search);

    const getGeolocation = async () => {
        try {
            const dataAddress = await apiURL.apiMap.get("/services/address?", {
                params: {
                    key: LONGDO_MAP_KEY,
                    locale: "th",
                    lon: currentLocation.lon,
                    lat: currentLocation.lat,
                }
            })
            setGeolocation({
                request: true,
                data: dataAddress.data.geocode.substring(0, 4),
                success: true
            })
        } catch {
            setGeolocation({
                request: true,
                data: null,
                success: true
            })
        } finally{
            dispatch(loadingActions.stopLoading())
        }
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCurrentLocation({
                    permission: true,
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                })
            },
            () => {
                setCurrentLocation({ permission: false })
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        )

    }, [])

    useEffect(() => {
        dispatch(loadingActions.startLoading())
        if (!isEmpty(currentLocation)) {
            getGeolocation()
        }
    }, [currentLocation])

    useEffect(() => {
        if (!isEmpty(geolocation?.request)) {
            if (params.has("type")) {
                const formData = {
                    grade: !isEmpty(params.get("grade")) && Number(params.get("grade")),
                    subject: params.get("subject"),
                    gender: !isEmpty(params.get("gender")) && Number(params.get("gender")),
                    type: !isEmpty(params.get("type")) && Number(params.get("type")),
                    location: !isEmpty(params.get("location")) && Number(params.get("location")),
                }

                reset({
                    grade: findKeyObject(defaultValue.grade, formData.grade) ? findKeyObject(defaultValue.grade, formData.grade) : "ไม่ระบุ",
                    subject: findKeyObject(defaultValue.subject, formData.subject) ? findKeyObject(defaultValue.subject, formData.subject) : "ไม่ระบุ",
                    gender: findKeyObject(defaultValue.gender, formData.gender) ? findKeyObject(defaultValue.gender, formData.gender) : "ไม่ระบุ",
                    courseType: findKeyObject(defaultValue.typeCourse, formData.type) ? findKeyObject(defaultValue.typeCourse, formData.type) : "ไม่ระบุ",
                })

                dispatch(searchActions.getSearch({
                    data: formData,
                    redirectPath: "/search",
                    limit: 5,
                    type: formData.type
                }))
            } else {
                const formData = {
                    grade: null,
                    subject: null,
                    gender: null,
                    type: null,
                    location: (currentLocation.permission && geolocation.success) ? geolocation.data : null,
                }

                reset({
                    grade: "ไม่ระบุ",
                    subject: "ไม่ระบุ",
                    gender: "ไม่ระบุ",
                    courseType: "ไม่ระบุ",
                })

                dispatch(searchActions.getSearch({
                    data: formData,
                    redirectPath: "/search",
                    limit: 5,
                    type: formData.type
                }))
            }
        }
        return () => {
            dispatch(searchActions.clearSearch())
        }
    }, [params.toString(), geolocation?.request])

    const onSubmit = (data) => {
        if ((currentLocation.permission && geolocation.success) || !currentLocation.permission) {
            const dataVariable = ["grade", "subject", "gender", "type", "location"]
            const formData = {
                grade: data.grade,
                subject: data.subject,
                gender: defaultValue.gender[data.gender],
                type: defaultValue.typeCourse[data.courseType],
                location: (currentLocation.permission && geolocation.success) ? geolocation.data : null
            }
            dataVariable.forEach(value => {
                params.set(value, !isEmpty(formData[value]) ? formData[value] : "")
            });
            history.push("/search?" + params)
        }
    }

    return (
        <Fragment>
            {isMobile() ? <Header title="ค้นหา" /> : null}
            {
                loading && <Loading />
            }
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
                        <Row className={`${style.section} ${!isMobile() && style.marginSection}`} align="middle" justify={"space-between"}>
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
                                                                <Select.Option value="N/A">ไม่ระบุ</Select.Option>
                                                                {
                                                                    defaultValue.grade && Object.entries(defaultValue.grade).map(([key, value]) => (
                                                                        <Select.Option key={value} value={value}>{key}</Select.Option>
                                                                    ))
                                                                }
                                                            </Select>
                                                        }
                                                        name="grade"
                                                        control={control}
                                                        defaultValue={"N/A"}
                                                    />
                                                </div>
                                            </Col>

                                            {/* subject */}
                                            <Col span={24} className={`${style.flexRow} ${style.marginTop2}`}>
                                                <span className={`${style.textOne5} ${style.widthSearchForm}`}>วิชา</span>
                                                <Controller
                                                    as={
                                                        <Select name="subject"  >
                                                            <Select.Option value="N/A">ไม่ระบุ</Select.Option>
                                                            {
                                                                 defaultValue.subject && Object.entries(defaultValue.subject).map(([key, value]) => (
                                                                    <Select.Option key={value} value={value}>{key}</Select.Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    }
                                                    name="subject"
                                                    control={control}
                                                    defaultValue={"N/A"}
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
                                                                    <Select.Option key={value} value={key}>{key}</Select.Option>
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
                                                                    <Select.Option key={value} value={key}>{key}</Select.Option>
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
                    <div className={`${!isMobile() && style.marginSection}`} >
                        <Row className={`${style.section}`}  >
                            <Col id="searchResult">
                                <span className={style.textTwo} span={24} >ผลการค้นหา</span>
                            </Col>
                            <Col span={24} className={style.marginSection} >
                                <ResultSearch />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}