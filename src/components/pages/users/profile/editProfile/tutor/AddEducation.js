import React, { Fragment, useCallback, useEffect, useState } from "react"
import style from "../../styles.module.scss"
import { Controller, useForm } from "react-hook-form";
import { Button, Col, Row, Select, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCloudUploadAlt
} from "@fortawesome/free-solid-svg-icons";
import { profileTestSchema, profileEducationSchema } from "../../../../../../validation/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../../../../../headerMobile/Header";
import { useDispatch } from "react-redux";
import { addHistory, getProfile } from "../../../../../../redux/actions/profile.actions";
import ResponseMobile from "../../../../../response/ResponseMobile";

const { Title } = Typography;

export default function AddEducation() {
    const [type, setType] = useState("test");
    const [imageName, setimageName] = useState(null);
    const dispatch = useDispatch()

    const fetchProfile = useCallback(()=>{
        dispatch(getProfile())
    },[dispatch])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])


    const { register, handleSubmit, errors, control } = useForm({
        resolver: yupResolver(type === "test" ? profileTestSchema : profileEducationSchema),
    });

    const onChangeType = (value) => {
        setType(value)
        setimageName(null)
        document.getElementById("myform").reset()
    }

    const onHandleChangeImage = (value) => {
        setimageName(value.target.files[0].name)
    }

    const onSubmit = data => {
        const education = {
            type: data.type,
            name: data.type||data.grade,
            brance: data.subject||data.brance,
            grade: data.year||data.gradeScore,
            status: "0"
        }
        dispatch(addHistory(education))
    };

    return (
        <Fragment>
            {ResponseMobile() && <Header title="เพิ่มข้อมูล" pageBack="/tutor/1"/> }
            <div className={style.body}>
                <form id="myform" onSubmit={handleSubmit(onSubmit)}>
                    <Row justify="center" >
                        <Title level={3}>ประวัติการศึกษา </Title>
                    </Row>
                    <Row className={style.paddingbody} justify="space-around" align="middle">
                        <Col xl={10} md={20} sm={20} xs={24} className={style.marginTop}>
                            <p>ประเภท</p>
                            <Select name="type" onChange={onChangeType} defaultValue={type}>
                                <Select.Option value="test" >คะแนนสอบ</Select.Option>
                                <Select.Option value="education" >ประวัติการศึกษา</Select.Option>
                            </Select>
                            <Controller
                                name="type"
                                control={control}
                                defaultValue={type}
                            />
                            { errors.type && <p className="error-input">{errors.type.message}</p>}
                        </Col>
                        <Col xl={10} md={20} sm={20} xs={24} className={style.marginTop} >
                            <p>{type === "test" ? "การสอบ" : "ระดับชั้น"}</p>
                            <Controller
                                as={
                                    <Select ref={register}>
                                        <Select.Option value="onet" >O-NET</Select.Option>
                                    </Select>
                                }
                                name={type === "test" ? "test" : "grade"}
                                control={control}
                                defaultValue={""}
                            />
                            {
                                type === "test" ?
                                    errors.test && <p className="error-input">{errors.test.message}</p>
                                    :
                                    errors.grade && <p className="error-input">{errors.grade.message}</p>
                            }
                        </Col>
                        <Col xl={10} md={20} sm={20} xs={24} className={style.marginTop}>
                            <p>{type === "test" ? "วิชา" : "สาขา"}</p>
                            <Controller
                                as={
                                    <Select  >
                                        <Select.Option value="mth" >คณิตศาสตร์</Select.Option>
                                    </Select>
                                }
                                name={type === "test" ? "subject" : "brance"}
                                control={control}
                                defaultValue={""}
                            />
                            {
                                type === "test" ?
                                    errors.subject && <p className="error-input">{errors.subject.message}</p>
                                    :
                                    errors.brance && <p className="error-input">{errors.brance.message}</p>
                            }
                        </Col>
                        <Col xl={10} md={20} sm={20} xs={24} className={style.marginTop}>
                            <p>{type === "test" ? "คะแนนที่ได้" : "สถาบัน"}</p>
                            <input className="input" type={type === "test" ? "number" : "text"} name={type === "test" ? "score" : "university"} ref={register} />
                            {
                                type === "test" ?
                                    errors.score && <p className="error-input">{errors.score.message}</p>
                                    :
                                    errors.university && <p className="error-input">{errors.university.message}</p>
                            }
                        </Col>
                        <Col xl={10} md={20} sm={20} xs={24} className={style.marginTop}>
                            <p>{type === "test" ? "ปี" : "เกรดเฉลี่ย"}</p>
                            <input className="input" type={type === "test" ? "number" : "number"} name={type === "test" ? "year" : "gradeScore"} ref={register} />
                            {
                                type === "test" ?
                                    errors.year && <p className="error-input">{errors.year.message}</p>
                                    :
                                    errors.gradeScore && <p className="error-input">{errors.gradeScore.message}</p>
                            }
                        </Col>
                        {
                            type === "test" ? null :
                                <Col xl={10} md={20} sm={20} xs={24} className={style.marginTop}>
                                    <p>สถานะ</p>
                                    <Controller
                                        as={
                                            <Select  >
                                                <Select.Option value="mth" >กำลังศึกษาอยู่</Select.Option>
                                            </Select>
                                        }
                                        name="status"
                                        control={control}
                                        defaultValue={""}
                                    />
                                    { errors.status && <p className="error-input">{errors.status.message}</p>}
                                </Col>
                        }
                        <Col xl={10} md={20} sm={20} xs={24} className={style.marginTop}>
                            <p>เอกสารยืนยัน</p>
                            <div>
                                <div className="imageUpload ">
                                    <label htmlFor="file-input">
                                        <FontAwesomeIcon icon={faCloudUploadAlt} className={style.icon} style={{ fontSize: "30pt", marginTop: "5px" }} />
                                    </label>
                                    <input id="file-input" type="file" name="image" onChange={onHandleChangeImage} ref={register} />
                                    <span>{imageName}</span>
                                </div>
                            </div>
                            {errors.image && <p className="error-input">{errors.image.message}</p>}
                        </Col>
                        <Col xl={type === "test" ? 24 : 10} md={type === "test" ? 24 : 20} sm={20} xs={24} className={style.marginTop + " " + style.alignCenter}>
                            <Button className="buttonColor backgroundOrange" size="large" shape="round" style={{ width: "120px", marginTop: "40px" }} htmlType="submit">บันทึก</Button>
                        </Col>
                    </Row>
                </form>
            </div>
        </Fragment>
    )
}
