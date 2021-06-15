import { Badge, Image, Row, Col, Select, DatePicker } from "antd"
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
import profile from "../../../images/profile.webp"
import ModalComponent from "../../../modal/ModalComponent";
import Header from "../../../headerMobile/Header";
import { color, defaultValue } from "../../../defaultValue"
import isMobile from "../../../isMobile/isMobile";
import { useSelector } from "react-redux";
import Loading from "../../../loading/Loading";
import { useEffect } from "react";
import isEmpty from "../../../defaultFunction/checkEmptyObject";
import { styleComponent } from "../../../defaultFunction/style";
import { userActions } from "../../../../redux/actions";
import moment from "moment";

export default function RegisterForm() {
    const { loading } = useSelector(state => state)
    const [image, setimage] = useState({
        file: null,
        imageURL: null
    })
    const dispatch = useDispatch()
    const params = useParams();
    const type = params.type
    const inputForm = {
        width: (isMobile() ? "100%" : "50%"),
    }

    const { register, handleSubmit, errors, control, watch } = useForm({
        resolver: yupResolver(type === "tutor" ? tutorRegisSchema : learnnerRegisSchema),
    });

    const watchInput = watch()

    const onChangeImage = data => {
        const fileInput = data.target.files[0]
        if (fileInput) {
            const imageURL = URL.createObjectURL(fileInput)
            setimage({ file: fileInput, imageURL: imageURL })
        }
    }

    useEffect(() => {
        if (!isEmpty(errors) && Object.keys(errors)[0] === "image") {
            let element = document.getElementById("imageUpload");
            let headerOffset = 45;
            let elementPosition = element.getBoundingClientRect().top;
            let offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    }, [errors])

    const onSubmit = data => {
        if (data && image) {
            const formatted_date = Number(data.dateOfBirth.getFullYear()) + "/" + Number(data.dateOfBirth.getMonth() + 1) + "/" + Number(data.dateOfBirth.getDate())
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
                formdata.append("grade", data.grade)
                dispatch(userActions.signUpLearner(formdata))
            } else if (type === "tutor") {
                formdata.append(`subject1`, data.subject1)
                if(data.subject2 !== "N/A" && !isEmpty(data?.subject2)){
                    formdata.append(`subject2`, data.subject2 )
                }
                if(data.subject3 !== "N/A" && !isEmpty(data?.subject3)){
                    formdata.append(`subject3`, data.subject3 )
                }
                dispatch(userActions.signUpTutor(formdata))
            }
        }
    }

    return (
        <Fragment>
            {isMobile() && <Header pageBack="goback" />}
            <ModalComponent />
            {
                loading.loading && (
                    <Loading />
                )
            }
            <div className="container" align="center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.bodyPaddingTopBottom} >
                        <div className={!isMobile() && style.section}>
                            <span className={`${style.headerThree}`}>ลงทะเบียน{type === "tutor" ? "ครูสอนพิเศษ" : "นักเรียน"}</span>
                        </div>

                        <div className={`${style.section} ${!isMobile() && style.marginSection}`}>
                            <div className="imageUpload" id="imageUpload">
                                <label htmlFor="file-input" >
                                    <Badge className="icon-addimage" count={<FontAwesomeIcon icon={faEdit} />} offset={[2, 0]}>
                                        <Image
                                            className={`${style.imagepPerson} ${!isMobile() && style.marginSection}`}
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
                                <Col className={style.marginSection} span={24} align="start">
                                    <InputComponents
                                        title="ชื่อ"
                                        type="text"
                                        name="firstname"
                                        register={register}
                                        error={errors.firstname}
                                        placeholder="ชื่อจริง"
                                    />
                                </Col>
                                <Col className={style.marginSection} span={24} align="start">
                                    <InputComponents
                                        title="นามสกุล"
                                        type="text"
                                        name="lastname"
                                        register={register}
                                        error={errors.lastname}
                                        placeholder="นามสกุล"
                                    />
                                </Col>
                                <Col className={style.marginSection} span={24} align="start">
                                    <p className={style.textOne5}>เพศ</p>
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
                                        placeholder={"เพศ"}
                                    />
                                    {
                                        errors.gender && <p className="error-input">{errors.gender.message}</p>
                                    }
                                </Col>
                                <Col className={style.marginSection} span={24} align="start">
                                    <p className={style.textOne5}>วันเดือนปีเกิด</p>
                                    <Controller
                                        as={
                                            <DatePicker placeholder="" disabledDate={value => value && value > moment()} />
                                        }
                                        name="dateOfBirth"
                                        control={control}
                                        defaultValue={null}
                                        placeholder="วันเดือนปีเกิด"
                                    />
                                    {
                                        errors.dateOfBirth && <p className="error-input">{errors.dateOfBirth.message}</p>
                                    }
                                </Col>
                                {
                                    type === "tutor" ? (
                                        <Fragment>
                                            <Col className={style.marginSection} span={24} align="start">
                                                <p className={style.textOne5}>วิชาที่สอนอับดับ1</p>
                                                <Controller
                                                    as={
                                                        <Select name={"subject1"}>
                                                            {
                                                                defaultValue.subject && Object.entries(defaultValue.subject).map(([key, value]) => (
                                                                    <Select.Option key={value} value={value}>{key}</Select.Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    }
                                                    name={`subject1`}
                                                    control={control}
                                                    defaultValue={null}
                                                    placeholder={"วิชาที่ต้องการสอน"}
                                                />
                                                {
                                                    errors.subject1 && <p className="error-input">{errors.subject1.message}</p>
                                                }
                                            </Col>
                                            {
                                                !isEmpty(watchInput.subject1) && (
                                                    <Col className={style.marginSection} span={24} align="start">
                                                        <p className={style.textOne5}>วิชาที่สอนอับดับ2</p>
                                                        <Controller
                                                            as={
                                                                <Select name={"subject2"}>
                                                                    <Select.Option value="N/A">ไม่ระบุ</Select.Option>
                                                                    {
                                                                        defaultValue.subject && Object.entries(defaultValue.subject).filter(value => value[1] !== watchInput.subject1).map(([key, value]) => (
                                                                            <Select.Option key={value} value={value}>{key}</Select.Option>
                                                                        ))
                                                                    }
                                                                </Select>
                                                            }
                                                            name={`subject2`}
                                                            control={control}
                                                            defaultValue={"N/A"}
                                                            placeholder={"วิชาที่ต้องการสอน"}
                                                        />
                                                        {
                                                            errors.subject2 && <p className="error-input">{errors.subject2.message}</p>
                                                        }
                                                    </Col>
                                                )
                                            }
                                            {
                                                !isEmpty(watchInput.subject2) && watchInput?.subject2 !== "N/A" && (
                                                    <Col className={style.marginSection} span={24} align="start">
                                                        <p className={style.textOne5}>วิชาที่สอนอับดับ3</p>
                                                        <Controller
                                                            as={
                                                                <Select name={"subject3"}>
                                                                    <Select.Option value="N/A">ไม่ระบุ</Select.Option>
                                                                    {
                                                                        defaultValue.subject && Object.entries(defaultValue.subject).filter(value => value[1] !== watchInput.subject1 && value[1] !== watchInput.subject2).map(([key, value]) => (
                                                                            <Select.Option key={value} value={value}>{key}</Select.Option>
                                                                        ))
                                                                    }
                                                                </Select>
                                                            }
                                                            name={`subject3`}
                                                            control={control}
                                                            defaultValue={"N/A"}
                                                            placeholder={"วิชาที่ต้องการสอน"}
                                                        />
                                                        {
                                                            errors.subject3 && <p className="error-input">{errors.subject3.message}</p>
                                                        }
                                                    </Col>
                                                )
                                            }
                                        </Fragment>
                                    ) : (
                                        <Col className={style.marginSection} span={24} align="start">
                                            <p className={style.textOne5}>{"ระดับชั้น"}</p>
                                            <Controller
                                                as={
                                                    <Select name={"grade"}>
                                                        {
                                                            defaultValue.grade && Object.entries(defaultValue.grade).map(([key, value]) => (
                                                                <Select.Option key={value} value={value}>{key}</Select.Option>
                                                            ))
                                                        }
                                                    </Select>
                                                }
                                                name={"grade"}
                                                control={control}
                                                defaultValue={null}
                                                placeholder={"ระดับชั้น"}
                                            />
                                            {
                                                errors.grade && <p className="error-input">{errors.grade.message}</p>
                                            }
                                        </Col>
                                    )
                                }
                                <Col className={style.marginSection} span={24} align="start">
                                    <InputComponents
                                        title="อีเมล"
                                        type="email"
                                        name="email"
                                        register={register}
                                        error={errors.email}
                                        placeholder="อีเมล"
                                    />
                                </Col>
                                <Col className={style.marginSection} span={24} align="start">
                                    <InputComponents
                                        title="เบอร์โทรศัพท์"
                                        type="number"
                                        name="phoneNumber"
                                        register={register}
                                        error={errors.phoneNumber}
                                        placeholder="เบอร์โทรศัพท์"
                                    />
                                </Col>
                                <Col className={style.marginSection} span={24} align="start">
                                    <InputComponents
                                        title="รหัสผ่าน"
                                        type="password"
                                        name="password"
                                        register={register}
                                        error={errors.password}
                                        placeholder="รหัสผ่าน"
                                    />
                                </Col>
                                <Col className={style.marginSection} span={24} align="start">
                                    <InputComponents
                                        title="ยืนยันรหัสผ่าน"
                                        type="password"
                                        name="confirmPassword"
                                        register={register}
                                        error={errors.confirmPassword}
                                        placeholder="ยืนยันรหัสผ่าน"
                                    />
                                </Col>
                            </Row>
                            <div className={style.marginSection}>
                                <button className={`${style.buttonColor} ${style.margintop20}`} style={styleComponent.buttonFull(color.orange, "7rem")} type="submit">ลงทะเบียน</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}