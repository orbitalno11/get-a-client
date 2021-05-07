
import { Badge, Image, Row, Col, Grid, Select, Button, DatePicker } from "antd"
import React, { Fragment, useState } from "react"
import { Controller, useForm } from "react-hook-form";
import {
    faEdit
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { learnnerRegisSchema, tutorRegisSchema } from "../../../../validation/validation"
import { yupResolver } from "@hookform/resolvers/yup";
import style from "./styles.module.scss"
import InputComponents from "../../../input/InputComponets";
import { useDispatch } from "react-redux";
import { userActions } from "../../../../redux/actions/auth.actions";
import profile from "../../../images/profile.webp"
import ModalComponent from "../../../modal/ModalComponent";
import Header from "../../../headerMobile/Header";
import { defaultValue } from "../../../defaultValue"
import isMobile from "../../../isMobile/isMobile";

export default function RegisterForm() {
    const [image, setimage] = useState({
        file: null,
        imageURL: null
    })
    const dispatch = useDispatch()
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const params = useParams();
    const type = params.type
    const inputForm = {
        width: ((screens.sm && !screens.lg) || (!screens.sm && screens.xs)) ? "70%" : "35%",
    }

    const { register, handleSubmit, errors, control } = useForm({
        resolver: yupResolver(type === "tutor" ? tutorRegisSchema : learnnerRegisSchema),
    });

    const onChangeImage = data => {
        const fileInput = data.target.files[0]
        if (fileInput) {
            const imageURL = URL.createObjectURL(fileInput)
            setimage({ file: fileInput, imageURL: imageURL })
        }
    }

    const onSubmit = data => {
        if (data && image) {
            console.log(data)
            const formatted_date = (data.dateOfBirth.getFullYear()) + "/" + data.dateOfBirth.getMonth() + "/" + data.dateOfBirth.getDate()
            let formdata = new FormData()
            formdata.append("firstname", data.firstname)
            formdata.append("lastname", data.lastname)
            formdata.append("gender", data.gender)
            formdata.append("dateOfBirth", formatted_date)
            formdata.append("email", data.email)
            formdata.append("phoneNumber", data.phoneNumber)
            formdata.append("password", data.password)
            formdata.append("confirmPassword", data.confirmPassword)
            formdata.append("image", image.file)
            if (type === "learner") {
                console.log(image.file)
                formdata.append("grade",defaultValue.grade[data.grade])
                dispatch(userActions.signUpLearner(formdata))
                
            } else if (type === "tutor") {
                const length = data.subject.length
                for (let i = 0; i < length; i++) {
                    formdata.append(`subject${i + 1}`,defaultValue.subject[data.subject[i]])
                }
                dispatch(userActions.signUpTutor(formdata))
            }
        }
    };


    return (
        <Fragment>
            {isMobile() && <Header pageBack="goback" /> }
            <ModalComponent />
            <div className={style.paddingBottomBody}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.alignCenterPageDestop} >
                        <div className={style.marginbottom20}>
                            <span className={style.titleH2}>ลงทะเบียน{type === "tutor" ? "ครูสอนพิเศษ" : "นักเรียน"}</span>
                        </div>
                        <div className="imageUpload" >
                            <label htmlFor="file-input" >
                                <Badge className="icon-addimage" count={<FontAwesomeIcon icon={faEdit} />} offset={[2, 0]}>
                                    <Image
                                        className={style.imagepPerson}
                                        src={image.imageURL ? image.imageURL : profile}
                                        preview={false}
                                    />
                                </Badge>
                            </label>
                            <input id="file-input" name="image" type="file" accept="image/*" ref={register} onChange={onChangeImage} />
                        </div>
                        {
                            errors.image && <p className="error-input">{errors.image.message}</p>
                        }
                        <Row className="input-form" style={inputForm} justify="space-between">
                            <Col xs={24} sm={24} md={24} >
                                <InputComponents
                                    title="ชื่อ"
                                    type="text"
                                    name="firstname"
                                    register={register}
                                    error={errors.firstname}
                                />
                            </Col>
                            <Col className={style.margintop10} xs={24} sm={24} md={24} >
                                <InputComponents
                                    title="นามสกุล"
                                    type="text"
                                    name="lastname"
                                    register={register}
                                    error={errors.lastname}
                                />
                            </Col>
                            <Col className={style.margintop10} xs={24} sm={24} md={24} >
                                <p>เพศ</p>
                                <Controller
                                    as={
                                        <Select name="gender"  >
                                            {
                                                defaultValue.gender && Object.entries(defaultValue.gender).map(([key, value]) => (
                                                    <Select.Option key={value} value={value}>{key}</Select.Option>
                                                ))
                                            }
                                        </Select>
                                    }
                                    name="gender"
                                    control={control}
                                    defaultValue={null}
                                />
                                {
                                    errors.gender && <p className="error-input">{errors.gender.message}</p>
                                }
                            </Col>
                            <Col className={style.margintop10} xs={24} sm={24} md={24} >
                                <p>วันเดือนปีเกิด</p>
                                <Controller
                                    as={
                                        <DatePicker placeholder="" />
                                    }
                                    name="dateOfBirth"
                                    control={control}
                                    defaultValue={null}
                                />
                                {
                                    errors.dateOfBirth && <p className="error-input">{errors.dateOfBirth.message}</p>
                                }
                            </Col>
                            <Col className={style.margintop10} xs={24} sm={24} md={24} >
                                <p>{type === "tutor" ? "วิชาที่สอน" : "ระดับชั้น"}</p>
                                <Controller
                                    as={
                                        <Select name={type === "tutor" ? "subject" : "grade"} optionLabelProp="label" mode={type === "tutor" ? "multiple" : false}  >
                                            {
                                                type === "tutor" ?
                                                    (
                                                        Object.entries(defaultValue.subject).map(([key]) => (
                                                            <Select.Option key={key} value={key}>{key}</Select.Option>
                                                        ))
                                                    ): 
                                                    (
                                                        Object.entries(defaultValue.grade).map(([key]) => (
                                                            <Select.Option key={key} value={key}>{key}</Select.Option>
                                                        ))
                                                    )
                                            }
                                        </Select>
                                    }
                                    name={type === "tutor" ? "subject" : "grade"}
                                    control={control}
                                    defaultValue={type === "tutor" ? [] : null}
                                />
                                {
                                    type === "tutor" ?
                                        errors.subject && <p className="error-input">{errors.subject.message}</p>
                                        :
                                        errors.grade && <p className="error-input">{errors.grade.message}</p>
                                }
                            </Col>
                            <Col className={style.margintop10} xs={24} sm={24} md={24} >
                                <InputComponents
                                    title="อีเมล"
                                    type="email"
                                    name="email"
                                    register={register}
                                    error={errors.email}
                                />
                            </Col>
                            <Col className={style.margintop10} xs={24} sm={24} md={24} >
                                <InputComponents
                                    title="เบอร์โทรศัพท์"
                                    type="number"
                                    name="phoneNumber"
                                    register={register}
                                    error={errors.phoneNumber}
                                />
                            </Col>
                            <Col className={style.margintop10} xs={24} sm={24} md={24} >
                                <InputComponents
                                    title="รหัสผ่าน"
                                    type="password"
                                    name="password"
                                    register={register}
                                    error={errors.password}
                                />
                            </Col>
                            <Col className={style.margintop10} xs={24} sm={24} md={24} >
                                <InputComponents
                                    title="ยืนยันรหัสผ่าน"
                                    type="password"
                                    name="confirmPassword"
                                    register={register}
                                    error={errors.confirmPassword}
                                />
                            </Col>
                        </Row>
                        <div className={style.margintop20}>
                            <Button className="buttonColor backgroundOrange" shape="round" size="large" htmlType="submit">ลงทะเบียน</Button>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}