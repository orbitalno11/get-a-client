import React, { Fragment, useCallback, useEffect, useState } from "react"
import style from "../../styles.module.scss"
import { Controller, useForm } from "react-hook-form";
import { Col, DatePicker, Image, Row, Select } from "antd";
import { profileTestSchema, profileEducationSchema } from "../../../../../../validation/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../../../../../headerMobile/Header";
import { useDispatch } from "react-redux";
import isMobile from "../../../../../isMobile/isMobile";
import { color, defaultValue } from "../../../../../defaultValue";
import { tutorAction } from "../../../../../../redux/actions/tutor.actions";
import ModalComponent from "../../../../../modal/ModalComponent";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import isEmpty from "../../../../../defaultFunction/checkEmptyObject";
import ducumentA4Sample from "../../../../../images/ducumentA4Sample.webp"
import moment from "moment";
import { modalAction } from "../../../../../../redux/actions";
import { typeModal } from "../../../../../modal/TypeModal";
import { sizeModal } from "../../../../../modal/SizeModal";
import resizeImage from "../../../../../defaultFunction/resizeImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../../../loading/Loading";
import findKeyObject from "../../../../../defaultFunction/findKeyObject";
import { styleComponent } from "../../../../../defaultFunction/style";

export default function AddEducation() {
    const params = useParams()
    const [type, setType] = useState(String(defaultValue.typeIdentity[params.type]));
    const { tutor, loading, auth } = useSelector(state => state)
    const [dataDetail, setDataDetail] = useState(null)
    const dispatch = useDispatch()
    const edit = params.idEducation !== "created"

    const [imageName, setImageName] = useState([]);

    const checkTypeTesting = () => {
        return type === String(defaultValue.typeIdentity["testing"])
    }

    const { register, handleSubmit, errors, control, reset } = useForm({
        resolver: yupResolver(checkTypeTesting() ? profileTestSchema() : profileEducationSchema()),
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
            dispatch(modalAction.openModal({
                text: "พบปัญหาในการโหลดหน้า",
                size: sizeModal.small,
                alert: typeModal.wrong,
                afterClose: "/me"
            }))
        }
        return () => {
            dispatch(tutorAction.clearListOfflineCourse())
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
        if (edit && !isEmpty(dataDetail)) {
            if (dataDetail.success && isEmpty(dataDetail.data)) {
                dispatch(modalAction.openModal({
                    text: "พบปัญหาในการโหลดข้อมูล",
                    size: sizeModal.small,
                    alert: typeModal.wrong,
                    afterClose: "/me"
                }))
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
                        status: findKeyObject(defaultValue.educationStatus, dataDetail.data.status),
                    })
                }
                document.getElementById("image1").value = "image"
                dataDetail.data.image && dataDetail.data.image.forEach((item, index) => {
                    setImageName(value => {
                        let array = [...value]
                        if (item) {
                            array[Number(index)] = {
                                "name": item
                            }
                            return array
                        }
                        return array
                    })
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
                    status: "กำลังศึกษา",
                    branch: "1",
                    institute: "1"
                })
            }
        }
    }, [type])


    const onChangeType = (value) => {
        setType(String(value))
        setImageName([])
        document.getElementById("myform").reset()
    }
//
    const onHandleChangeImage = async (value) => {
        document.getElementById("image1").value = "image"
        const fileInput = value.target.files[0]
        if (fileInput) {
            try {
                const newImageFile = await resizeImage(fileInput, "file", 720, 1280)
                const imageURL = URL.createObjectURL(newImageFile)
                setImageName([...imageName, {
                    name: imageURL,
                    file: newImageFile
                }])
            } catch {
                dispatch(modalAction.openModal({
                    text: "เพื่มรูปไม่สำเร็จ",
                    size: sizeModal.small,
                    alert: typeModal.wrong,
                }))
            }
        }
    }

    useEffect(() => {
        if (imageName.length === 0) {
            document.getElementById("image1").value = ""
        }
    }, [imageName])

    const onSubmit = (data) => {

        if (data) {
            let formData = new FormData()
            if (checkTypeTesting()) {
                let mydate = new Date(data.year);
                formData.append("examId", defaultValue.examType[data.test])
                formData.append("subjectCode", defaultValue.subject[data.subject])
                formData.append("score", data.score)
                formData.append("year", mydate.getYear())
                imageName.forEach((item, index) =>
                    formData.append(`document${index + 1}`, item.file)
                )

                if (!edit) {
                    dispatch(tutorAction.createTesting(formData, auth.profile))
                } else {
                    dispatch(tutorAction.updateTesting(formData, params.idEducation, auth.profile))
                }

            } else {
                formData.append("grade", defaultValue.grade[data.grade])
                formData.append("branch", "1")
                formData.append("institute", "1")
                formData.append("status", defaultValue.educationStatus[data.status])
                formData.append("gpax", data.gpax)
                imageName.forEach((item, index) =>
                    formData.append(`document${index + 1}`, item.file)
                )

                if (!edit) {
                    dispatch(tutorAction.createEducation(formData, auth.profile))
                } else {
                    dispatch(tutorAction.updateEducation(formData, params.idEducation, auth.profile))
                }
            }
        }
    }

    const removeImage = (index) => {
        imageName.splice(index, 1)
        setImageName([...imageName])
    }

    const removeButton = {
        position: "absolute",
        transform: "translateX(-50%)",
        marginTop: '-9.5rem',
        backgroundColor: color.red
    }


    return (
        <Fragment>
            {isMobile() && <Header title={`${edit ? "แก้ไข" : "เพ่ิม"}ข้อมูลการศึกษา`} pageBack={"/me"} />}
            <ModalComponent />
            {
                loading.loading && (
                    <Loading />
                )
            }
            <div className="container">
                <form id="myform" onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.bodyPaddingTopBottom} >
                        {
                            !isMobile() && (
                                <Row justify="center" className={style.section}>
                                    <span className={style.headerThree}>{edit && "แก้ไข"}ประวัติการศึกษา</span>
                                </Row>
                            )

                        }
                        <Row justify="space-around" align="top" className={`${!isMobile() && style.marginSection} ${style.section}`}>
                            <Col xl={9} lg={9} md={20} sm={20} xs={24} >
                                <p className={style.textOne5}>ประเภท</p>
                                <Select name="type" onChange={onChangeType} defaultValue={type} disabled={edit ? true : false}>
                                    <Select.Option value="1" >คะแนนสอบ</Select.Option>
                                    <Select.Option value="0" >ประวัติการศึกษา</Select.Option>
                                </Select>
                                <div className={style.marginTop20}>
                                    <p className={style.textOne5}>{checkTypeTesting() ? "การสอบ" : "ระดับชั้น"}</p>
                                    <Controller
                                        as={
                                            <Select ref={register}>
                                                {
                                                    checkTypeTesting() ? (
                                                        defaultValue.examType && Object.entries(defaultValue.examType).map(([key]) => (
                                                            <Select.Option key={key} value={key}>{key}</Select.Option>
                                                        ))
                                                    ) : (
                                                        defaultValue.grade && Object.entries(defaultValue.grade).map(([value]) => (
                                                            <Select.Option key={value} value={value}>{value}</Select.Option>
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
                                </div>

                                <div className={style.marginTop20}>
                                    <p className={style.textOne5}>{checkTypeTesting() ? "วิชา" : "สาขา"}</p>
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
                                </div>
                                <div className={style.marginTop20}>

                                    <p className={style.textOne5}>{checkTypeTesting() ? "คะแนนที่ได้" : "สถาบัน"}</p>
                                    {
                                        checkTypeTesting() ? (
                                            <input className="input" type="number" step=".01" name="score" min="0" ref={register} placeholder="คะแนนที่ได้" />
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
                                </div>
                                <div className={style.marginTop20}>

                                    <p className={style.textOne5}>{checkTypeTesting() ? "ปี" : "เกรดเฉลี่ย"}</p>
                                    {
                                        checkTypeTesting() ? (
                                            <Controller
                                                as={
                                                    <DatePicker picker="year" disabledDate={value => value && value > moment()} />
                                                }
                                                name="year"
                                                control={control}
                                                defaultValue={""}
                                                placeholder="ปีที่ได้รับผลสอบ"
                                            />
                                        ) : (
                                            <input className="input" step=".01" type="number" max="4" name={"gpax"} ref={register} placeholder={"เกรดเฉลี่ย"} />
                                        )
                                    }

                                    {
                                        checkTypeTesting() ?
                                            errors.year && <p className="error-input">{errors.year.message}</p>
                                            :
                                            errors.gpax && <p className="error-input">{errors.gpax.message}</p>
                                    }
                                </div>

                                <div className={style.marginTop20}>
                                    {
                                        !checkTypeTesting() && (
                                            <div>
                                                <p className={style.textNormal}>สถานะ</p>
                                                <Controller
                                                    as={
                                                        <Select  >
                                                            {
                                                                defaultValue.educationStatus && Object.entries(defaultValue.educationStatus).map(([key, value]) => (
                                                                    <Select.Option key={value} value={key}>{key}</Select.Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    }
                                                    name="status"
                                                    control={control}
                                                    defaultValue={""}
                                                />
                                                {errors.status && <p className="error-input">{errors.status.message}</p>}
                                            </div>
                                        )
                                    }
                                </div>
                            </Col>
                            <Col xl={9} lg={9} md={20} sm={20} xs={24} align="center">
                                <p className={style.textOne5}>เอกสารยืนยัน </p>
                                {
                                    !isEmpty(imageName) && (
                                        imageName.map((item, index) => {
                                            return (
                                                <div key={index} >
                                                    <div className={style.marginTop20}>
                                                        <Image
                                                            className={`${style.a4Image} ${style.borderImage}`}
                                                            src={item.name ? item.name : ducumentA4Sample}
                                                            preview={false}
                                                        />
                                                    </div>
                                                    <div align="center" >
                                                        <button type="button" className={style.editButton} style={removeButton} onClick={() => removeImage(index)}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    )
                                }
                                {
                                    imageName.length < 3 && (
                                        <div className={style.marginTop20} align="center">
                                            <div className="imageUpload ">
                                                <label htmlFor={`file-input-document1`}>
                                                    <Image
                                                        className={`${style.a4Image} ${style.borderImage}`}
                                                        src={ducumentA4Sample}
                                                        preview={false}
                                                    />
                                                </label>
                                                <input id={`file-input-document1`} type="file" name="image" onChange={onHandleChangeImage} ref={register} />
                                            </div>
                                        </div>
                                    )
                                }
                                <input text="text" id="image1" name="image1" ref={register} hidden />
                                {errors["image1"] && <p className="error-input">{errors["image1"].message}</p>}

                            </Col>
                            <Col align="center" xl={checkTypeTesting() ? 24 : 10} md={checkTypeTesting() ? 24 : 20} sm={20} xs={24} className={style.marginTop20 + " " + style.alignCenter}>
                                <button className={style.buttonColor} style={styleComponent.buttonFull(color.orange, "7rem")} type="submit">บันทึกข้อมูล</button>
                            </Col>
                        </Row>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}