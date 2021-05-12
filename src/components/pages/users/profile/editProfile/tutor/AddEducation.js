import React, { Fragment, useCallback, useEffect, useState } from "react"
import style from "../../styles.module.scss"
import { Controller, useForm } from "react-hook-form";
import { Alert, Button, Col, DatePicker, Image, Row, Select, Typography } from "antd";
import { profileTestSchema, profileEducationSchema } from "../../../../../../validation/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../../../../../headerMobile/Header";
import { useDispatch } from "react-redux";
import isMobile from "../../../../../isMobile/isMobile";
import { defaultValue } from "../../../../../defaultValue";
import { tutorAction } from "../../../../../../redux/actions/tutor.actions";
import ModalComponent from "../../../../../modal/ModalComponent";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import isEmpty from "../../../../../defaultFunction/checkEmptyObject";
import imageUpload from "../../../../../images/imageUpload.webp"
import moment from "moment";
const { Title } = Typography;

export default function AddEducation() {
    const params = useParams()
    const [type, setType] = useState(String(defaultValue.typeIdentity[params.type]));
    const { tutor, loading, auth } = useSelector(state => state)
    const [dataDetail, setDataDetail] = useState(null)
    const dispatch = useDispatch()
    const edit = params.idEducation !== "created"


    const imageStyle = {
        height: "10rem",
        width: "15rem"
    }

    const [imageName, setimageName] = useState({
        file: "",
        name: ""
    });

    const checkTypeTesting = () => {
        return type === String(defaultValue.typeIdentity["testing"])
    }

    const { register, handleSubmit, errors, control, reset } = useForm({
        resolver: yupResolver(checkTypeTesting() ? profileTestSchema(edit) : profileEducationSchema(edit)),
    });

    const fetchProfile = useCallback(() => {
        if (params.idEducation && !isEmpty(type)) {
            if (checkTypeTesting()) {
                dispatch(tutorAction.getTesting(params.idEducation))
            } else {
                dispatch(tutorAction.getEducation(params.idEducation))
            }
        }
    }, [type])

    useEffect(() => {
        if (!isEmpty(defaultValue.typeIdentity[params.type])) {
            if (edit) {
                fetchProfile()
            } else {
                reset({
                    test: "O-NET",
                    subject: "คณิตศาสตร์",
                })
            }
        } else {
            window.location.href = "/"
        }
    }, [fetchProfile])


    useEffect(() => {
        if (edit) {
            if (checkTypeTesting()) {
                setDataDetail(tutor.testing)
            } else {
                setDataDetail(tutor.education)
            }
        }

    }, [tutor])

    useEffect(() => {
        console.log(dataDetail)
        if (edit && !isEmpty(dataDetail)) {
            if (dataDetail.success && isEmpty(dataDetail.data)) {
                // open modal "have some problem"
                // page back to tutor profile 

            } else {
                if (checkTypeTesting()) {
                    reset({
                        test: dataDetail.data.exam,
                        subject: dataDetail.data.subject,
                        score: dataDetail.data.score,
                        year: moment(dataDetail.data.year),
                    })
                } else {
                    reset({
                        grade: dataDetail.data.grade,
                        branch: dataDetail.data.branch,
                        institute: dataDetail.data.institute,
                        gpax: dataDetail.data.gpax,
                        status: dataDetail.data.status,
                    })
                }
                setimageName({
                    ...imageName,
                    name: dataDetail.data.image
                })
            }
        }
    }, [dataDetail])

    useEffect(() => {
        if (params.idEducation === "created") {
            if (checkTypeTesting()) {
                reset({
                    test: "O-NET",
                    subject: "คณิตศาสตร์",
                })
            } else {
                reset({
                    grade: "ม.4",
                    status: "จบแล้ว",
                    branch: "1",
                    institute: "1"
                })
            }
        }
    }, [type])

    const onChangeType = (value) => {
        setType(String(value))
        setimageName({
            file: "",
            name: ""
        })
        document.getElementById("myform").reset()
    }

    const onHandleChangeImage = (value) => {
        const fileInput = value.target.files[0]
        if (fileInput) {
            const imageURL = URL.createObjectURL(fileInput)
            setimageName({
                name: imageURL,
                file: fileInput
            })
        }
    }

    const onSubmit = (data) => {
        console.log(data)
        if (data) {
            let formData = new FormData()
            if (checkTypeTesting()) {
                let mydate = new Date(data.year);
                formData.append("examId", defaultValue.examType[data.test])
                formData.append("subjectCode", defaultValue.subject[data.subject])
                formData.append("score", data.score)
                formData.append("year", mydate.getYear())
                formData.append("file", imageName.file)

                if (!edit) {
                    dispatch(tutorAction.createTesting(formData, auth.profile))
                } else {
                    dispatch(tutorAction.updateTesting(formData, params.idEducation, auth.profile))
                }

            } else {
                formData.append("grade", defaultValue.grade[data.grade])
                formData.append("branch", "1")
                formData.append("institute", "1")
                formData.append("status", edit ? data.status : defaultValue.educationStatus[data.status])
                formData.append("gpax", data.gpax)
                formData.append("file", imageName.file)

                if (!edit) {
                    dispatch(tutorAction.createEducation(formData, auth.profile))
                } else {
                    dispatch(tutorAction.updateEducation(formData, params.idEducation, auth.profile))
                }
            }
        }
    }

    return (
        <Fragment>
            {isMobile() && <Header title="เพิ่มข้อมูล" pageBack="/tutor/1" />}
            <ModalComponent />
            {
                loading.loading ? (
                    <div className={style.loader}></div>
                ) : (
                    <div className={style.body}>
                        <form id="myform" onSubmit={handleSubmit(onSubmit)}>
                            <Row justify="center" >
                                <Title level={3}>{edit && "แก้ไข"}ประวัติการศึกษา</Title>
                            </Row>
                            {
                                edit && (
                                    <Row justify="center" >
                                        <Alert message="คำเตือน : หากทำการแก้ไขประวัติการศึกษา ผู้ดูระบบจะต้องตรวจสอบข้อมูลอีกครั้ง" type="warning" />
                                    </Row>
                                )
                            }
                            <Row className={style.paddingbody} justify="space-around" align="top">
                                <Col xl={10} md={20} sm={20} xs={24} className={style.marginTop}>
                                    <p>ประเภท</p>
                                    <Select name="type" onChange={onChangeType} defaultValue={type} disabled={edit ? true : false}>
                                        <Select.Option value="1" >คะแนนสอบ</Select.Option>
                                        <Select.Option value="0" >ประวัติการศึกษา</Select.Option>
                                    </Select>
                                </Col>
                                <Col xl={10} md={20} sm={20} xs={24} className={style.marginTop} >
                                    <p>{checkTypeTesting() ? "การสอบ" : "ระดับชั้น"}</p>
                                    <Controller
                                        as={
                                            <Select ref={register}>
                                                {
                                                    checkTypeTesting() ? (
                                                        defaultValue.examType && Object.entries(defaultValue.examType).map(([key]) => (
                                                            <Select.Option key={key} value={key}>{key}</Select.Option>
                                                        ))
                                                    ) : (
                                                        defaultValue.grade && Object.entries(defaultValue.grade).map(([value, key]) => (
                                                            <Select.Option key={key} value={key}>{value}</Select.Option>
                                                        ))
                                                    )
                                                }
                                            </Select>
                                        }
                                        name={checkTypeTesting() ? "test" : "grade"}
                                        control={control}
                                        defaultValue={""}
                                    />
                                    {
                                        checkTypeTesting() ?
                                            errors.test && <p className="error-input">{errors.test.message}</p>
                                            :
                                            errors.grade && <p className="error-input">{errors.grade.message}</p>
                                    }
                                </Col>
                                <Col xl={10} md={20} sm={20} xs={24} className={style.marginTop}>
                                    <p>{checkTypeTesting() ? "วิชา" : "สาขา"}</p>
                                    <Controller
                                        as={
                                            <Select  >
                                                {
                                                    checkTypeTesting() ? (
                                                        defaultValue.subject && Object.entries(defaultValue.subject).map(([key]) => (
                                                            <Select.Option key={key} value={key}>{key}</Select.Option>
                                                        ))
                                                    ) : (
                                                        <Select.Option value="1" >สาขา 1</Select.Option>
                                                    )
                                                }
                                            </Select>
                                        }
                                        name={checkTypeTesting() ? "subject" : "branch"}
                                        control={control}
                                        defaultValue={""}
                                    />
                                    {
                                        checkTypeTesting() ?
                                            errors.subject && <p className="error-input">{errors.subject.message}</p>
                                            :
                                            errors.branch && <p className="error-input">{errors.branch.message}</p>
                                    }
                                </Col>
                                <Col xl={10} md={20} sm={20} xs={24} className={style.marginTop}>
                                    <p>{checkTypeTesting() ? "คะแนนที่ได้" : "สถาบัน"}</p>
                                    {
                                        checkTypeTesting() ? (
                                            <input className="input" type="number" step=".01" name="score" ref={register} placeholder="คะแนนที่ได้" />
                                        ) : (
                                            <Controller
                                                as={
                                                    <Select  >
                                                        <Select.Option value="1" >สาขา 1</Select.Option>
                                                    </Select>
                                                }
                                                name="institute"
                                                control={control}
                                                defaultValue={""}
                                            />
                                        )
                                    }
                                    {
                                        checkTypeTesting() ?
                                            errors.score && <p className="error-input">{errors.score.message}</p>
                                            :
                                            errors.institute && <p className="error-input">{errors.institute.message}</p>
                                    }
                                </Col>
                                <Col xl={10} md={20} sm={20} xs={24} className={style.marginTop}>
                                    <p>{checkTypeTesting() ? "ปี" : "เกรดเฉลี่ย"}</p>
                                    {
                                        checkTypeTesting() ? (
                                            <Controller
                                                as={
                                                    <DatePicker picker="year"/>
                                                }
                                                name="year"
                                                control={control}
                                                defaultValue={""}
                                                placeholder="ปีที่ได้รับผลสอบ"
                                            />
                                        ) : (
                                            <input className="input" step=".01" type="number" name={"gpax"} ref={register} placeholder={"เกรดเฉลี่ย"} />
                                        )
                                    }
                                    
                                    {
                                        checkTypeTesting() ?
                                            errors.year && <p className="error-input">{errors.year.message}</p>
                                            :
                                            errors.gpax && <p className="error-input">{errors.gpax.message}</p>
                                    }
                                </Col>
                                {
                                    !checkTypeTesting() && (
                                        <Col xl={10} md={20} sm={20} xs={24} className={style.marginTop}>
                                            <p>สถานะ</p>
                                            <Controller
                                                as={
                                                    <Select  >
                                                        {
                                                            defaultValue.educationStatus && Object.entries(defaultValue.educationStatus).map(([key, value]) => (
                                                                <Select.Option key={value} value={value}>{key}</Select.Option>
                                                            ))
                                                        }
                                                    </Select>
                                                }
                                                name="status"
                                                control={control}
                                                defaultValue={""}
                                            />
                                            {errors.status && <p className="error-input">{errors.status.message}</p>}
                                        </Col>
                                    )
                                }
                                <Col xl={10} md={20} sm={20} xs={24} className={style.marginTop}>
                                    <p>เอกสารยืนยัน </p>
                                    <div>
                                        <div className="imageUpload ">
                                            <label htmlFor="file-input">
                                                <Image
                                                    className={!isEmpty(imageName.name) ? style.borderImage : null}
                                                    style={imageStyle}
                                                    src={!isEmpty(imageName.name) ? imageName.name : imageUpload}
                                                    preview={false}
                                                />
                                            </label>
                                            <input id="file-input" type="file" name="image" onChange={onHandleChangeImage} ref={register} />
                                        </div>
                                    </div>
                                    {errors.image && <p className="error-input">{errors.image.message}</p>}
                                </Col>
                                <Col xl={checkTypeTesting() ? 24 : 10} md={checkTypeTesting() ? 24 : 20} sm={20} xs={24} className={style.marginTop + " " + style.alignCenter}>
                                    <Button className="buttonColor backgroundOrange" size="large" shape="round" style={{ width: "120px", marginTop: "40px" }} htmlType="submit">บันทึก</Button>
                                </Col>
                            </Row>
                        </form>
                    </div>
                )
            }

        </Fragment>
    )
}
