import { Badge, Button, Col, DatePicker, Grid, Image, Row, Select } from "antd"
import TextArea from "antd/lib/input/TextArea";
import React, { Fragment, useCallback, useEffect, useState } from "react"
import style from "../../styles.module.scss"
import { profileTutorSchema } from "../../../../../../validation/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Header from "../../../../../headerMobile/Header";
import { useDispatch, useSelector } from "react-redux";
import isMobile from "../../../../../isMobile/isMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { profileAction } from "../../../../../../redux/actions";
import { defaultValue } from "../../../../../defaultValue";
import { formUpdateProfile } from "../formUpdateProfile";
import findKeyObject from "../../../../../defaultFunction/findKeyObject";
import ModalComponent from "../../../../../modal/ModalComponent";
import moment from "moment";
import InputComponents from "../../../../../input/InputComponets";
import Loading from "../../../../../loading/Loading";

const { useBreakpoint } = Grid;

export default function EditProfileDetail() {
    const { profile, auth, loading } = useSelector(state => state)
    const dispatch = useDispatch()
    const detailProfile = profile.profile && profile.profile
    const loader = loading.loading
    const screens = useBreakpoint();
    const [image, setimage] = useState("")
    const { register, handleSubmit, errors, control, reset, watch } = useForm({
        resolver: yupResolver(profileTutorSchema)
    });

    const watchInput = watch()

    useEffect(() => {
        if (watchInput.subject && watchInput.subject.length > 3) {
            reset({
                firstname: watchInput.firstname,
                lastname: watchInput.lastname,
                gender: watchInput.gender,
                dateOfBirth: watchInput.dateOfBirth,
                subject: [watchInput.subject[0], watchInput.subject[1], watchInput.subject[2]],
                email: watchInput.email,
                facebook: watchInput.facebook,
                line: watchInput.line,
                phoneNumber: watchInput.phoneNumber,
                introduce: watchInput.introduce,
            })
        }
    }, [watchInput])


    useEffect(() => {
        dispatch(profileAction.getProfile())
    }, [])


    const fetchProfile = useCallback(() => {
        if (profile.profile) {
            setimage(profile.profile.profileUrl)
            let arraySubject = []
            detailProfile.subject && detailProfile.subject.forEach((item, index) => {
                arraySubject[index] = item.title
            })

            reset({
                firstname: detailProfile.firstname,
                lastname: detailProfile.lastname,
                gender: findKeyObject(defaultValue.gender, detailProfile.gender),
                dateOfBirth: moment(detailProfile.dateOfBirth, defaultValue.dateFormat),
                subject: arraySubject && arraySubject,
                email: detailProfile.email,
                facebook: detailProfile.contact.facebookUrl,
                line: detailProfile.contact.lineId,
                phoneNumber: detailProfile.contact.phoneNumber,
                introduce: detailProfile.introduction
            })
        }
    }, [profile])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    const onChange = data => {
        const fileInput = data.target.files[0]
        if (fileInput) {
            const imageURL = URL.createObjectURL(fileInput)
            setimage({ file: fileInput, imageURL: imageURL })
        }
    }

    const onSubmit = (data) => {
        if (data) {
            const formData = formUpdateProfile("tutor", data)
            dispatch(profileAction.updateProfileLearner(formData, auth.profile))
        }
    }

    return (
        <Fragment>
            {isMobile() && <Header title="แก้ไข" pageBack={"/tutor/" + auth.profile} />}
            <ModalComponent />
            {
                (loader) && (
                    <Loading />
                )
            }
            <div>
                <div className={style.container}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Row justify="space-between" align="middle">
                            <Col span={24} align="center">
                                <h2 className={style.titleH2}>แก้ไขโปรไฟล์</h2>
                            </Col>
                            <Col lg={5} md={6} sm={24} xs={24} align="center">
                                <div className="imageUpload" >
                                    <label htmlFor="file-input" >
                                        <Badge className="icon-addimage" count={<FontAwesomeIcon icon={faEdit} />} offset={[2, 0]}>
                                            <Image
                                                className={style.imageProfile}
                                                src={image.imageURL ? image.imageURL : image}
                                                preview={false}
                                            />
                                        </Badge>
                                    </label>
                                    <input id="file-input" name="image" type="file" ref={register} onChange={onChange} />
                                </div>
                                {
                                    errors.image && <p className="error-input">{errors.image.message}</p>
                                }
                            </Col>
                            <Col lg={17} md={17} sm={24} xs={24}>
                                <Row justify="space-around">
                                    <Col className={screens.md ? style.marginTop20 : null} lg={11} sm={24} md={10} xs={24}>
                                        <InputComponents
                                            title="ชื่อ"
                                            type="text"
                                            name="firstname"
                                            register={register}
                                            error={errors.firstname}
                                            placeholder="ชื่อ"
                                        />
                                    </Col>
                                    <Col className={style.marginTop20} lg={11} sm={24} md={10} xs={24}>
                                        <InputComponents
                                            title="นามสกุล"
                                            type="text"
                                            name="lastname"
                                            register={register}
                                            error={errors.lastname}
                                            placeholder="นามสกุล"
                                        />
                                    </Col>
                                    <input name="gender" type="string" ref={register} hidden />
                                    <Col className={style.marginTop20} lg={11} sm={24} md={10} xs={24}>
                                        <p className={style.textNormal}>วันเดือนปีเกิด</p>
                                        <Controller
                                            as={
                                                <DatePicker placeholder="" disabled />
                                            }
                                            name="dateOfBirth"
                                            control={control}
                                            defaultValue={moment()}
                                            placeholder="วันเดือนปีเกิด"
                                        />
                                        {
                                            errors.dateOfBirth && <p className="error-input">{errors.dateOfBirth.message}</p>
                                        }
                                    </Col>

                                    <Col className={style.marginTop20} lg={11} sm={24} md={10} xs={24}>
                                        <p className={style.textNormal}>วิชาที่สอน (สอนได้มากสุด 3 วิชา)</p>
                                        <Controller
                                            as={
                                                <Select name="subject" optionLabelProp="label" mode="multiple" >
                                                    {
                                                        Object.entries(defaultValue.subject).map(([key]) => (
                                                            <Select.Option key={key} value={key}>{key}</Select.Option>
                                                        ))
                                                    }
                                                </Select>
                                            }
                                            name="subject"
                                            control={control}
                                            placeholder="วิชาที่สอน"
                                            defaultValue={[]}
                                        />
                                        {
                                            errors.subject && <p className="error-input">{errors.subject.message}</p>
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row justify="space-between" className={style.marginTop} style={{ paddingTop: !isMobile() ? "1.5rem" : "0rem" }}>
                            <Col span={24}>
                                <span className={`${style.marginTop} ${style.titleH3}`}>ช่องทางในการติดต่อ</span>
                            </Col>
                            <Col className={style.marginTop20} lg={11} sm={24} md={10} xs={24}>
                                <InputComponents
                                    title="อีเมล"
                                    type="email"
                                    name="email"
                                    register={register}
                                    error={errors.email}
                                    placeholder="อีเมล"
                                />
                            </Col>
                            <Col className={style.marginTop20} lg={11} sm={24} md={10} xs={24}>
                                <InputComponents
                                    title="Facebook"
                                    type="text"
                                    name="facebook"
                                    register={register}
                                    error={errors.facebook}
                                    placeholder="facebook"
                                />
                            </Col>
                            <Col className={style.marginTop20} lg={11} sm={24} md={10} xs={24}>
                                <InputComponents
                                    title="Line ID"
                                    type="text"
                                    name="line"
                                    register={register}
                                    error={errors.line}
                                    placeholder="line"
                                />
                            </Col>
                            <Col className={style.marginTop20} lg={11} sm={24} md={10} xs={24}>
                                <InputComponents
                                    title="หมายเลขโทรศัพท์"
                                    type="text"
                                    name="phoneNumber"
                                    register={register}
                                    error={errors.phoneNumber}
                                    placeholder="เบอร์โทรศัพท์"
                                />
                            </Col>
                            <Col className={style.marginTop20} xl={24} lg={24} sm={24} md={24} xs={24}>
                                <p className={style.textNormal}>ข้อความแนะนำตัว</p>
                                <Controller
                                    as={
                                        <TextArea className="input" name="introduce" size="large" />
                                    }
                                    name="introduce"
                                    control={control}
                                    defaultValue={"ยินดีที่ได้รู้จัก"}
                                    placeholder="แนะนำตัว"
                                />

                            </Col>
                        </Row>
                        <div className={style.buttonEdit}>
                            <Button className="backgroundOrange buttonColor" shape="round" size="large" htmlType="submit">บันทึกข้อมูล</Button>
                        </div>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}
