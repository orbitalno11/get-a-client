import { Badge, Col, DatePicker, Grid, Image, Row, Select } from "antd"
import React, { Fragment, useCallback, useEffect, useState } from "react"
import style from "../../styles.module.scss"
import { profileSchema } from "../../../../../../validation/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Header from "../../../../../headerMobile/Header";
import { useDispatch, useSelector } from "react-redux";
import isMobile from "../../../../../isMobile/isMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { profileAction, userActions } from "../../../../../../redux/actions";
import { color, defaultValue } from "../../../../../defaultValue";
import { formUpdateProfile } from "../formUpdateProfile";
import findKeyObject from "../../../../../defaultFunction/findKeyObject";
import ModalComponent from "../../../../../modal/ModalComponent";
import moment from "moment";
import Loading from "../../../../../loading/Loading"
import ProfileSample from "../../../../../images/profile.webp"
import InputComponents from "../../../../../input/InputComponets";
import { styleComponent } from "../../../../../defaultFunction/style";
const { useBreakpoint } = Grid;

export default function EditProfile() {
    const { profile, auth, loading } = useSelector(state => state)
    const dispatch = useDispatch()
    const detailProfile = profile.profile && profile.profile
    const loader = loading.loading
    const screens = useBreakpoint();
    const [image, setimage] = useState(ProfileSample)
    const { register, handleSubmit, errors, control, reset } = useForm({
        resolver: yupResolver(profileSchema)
    });

    useEffect(() => {
        dispatch(profileAction.getProfile())
    }, [])

    const fetchProfile = useCallback(() => {
        if (profile.profile) {
            setimage(profile.profile.profileUrl)
            reset({
                firstname: detailProfile.firstname,
                lastname: detailProfile.lastname,
                gender: findKeyObject(defaultValue.gender, detailProfile.gender),
                dateOfBirth: (moment(new Date(detailProfile.dateOfBirth), defaultValue.dateFormat)),
                grade: detailProfile.grade.grade,
                email: detailProfile.email,
                facebook: detailProfile.contact.facebookUrl,
                line: detailProfile.contact.lineId,
                phoneNumber: detailProfile.contact.phoneNumber
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
            const formData = formUpdateProfile("learner", data)
            dispatch(profileAction.updateProfileLearner(formData, auth.profile))
        }
    }

    return (
        <Fragment>
            {isMobile() && <Header title="แก้ไขข้อมูลส่วนตัว" pageBack={"goback"} />}
            <ModalComponent />
            {
                loader && (
                    <Loading />
                )}
            <div className="container">
                <div className={style.container}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Row justify="space-between" align="middle">
                            {
                                !isMobile() && (
                                    <Col className={style.section} span={24} align="center">
                                        <span className={style.headerThree}>แก้ไขโปรไฟล์</span>
                                    </Col>
                                )
                            }
                        </Row>
                        <Row className={`${style.section} ${!isMobile() && style.marginSection}`} align="middle" justify={"space-between"}>
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
                            <Col lg={17} md={15} sm={24} xs={24}>
                                <Row justify="space-around">
                                    <Col className={screens.md ? style.marginTop20 : null} lg={11} sm={24} md={20} xs={24}>
                                        <InputComponents
                                            title="ชื่อ"
                                            type="text"
                                            name="firstname"
                                            register={register}
                                            error={errors.firstname}
                                            placeholder="ชื่อ"
                                        />
                                    </Col>
                                    <Col className={style.marginTop20} lg={11} sm={24} md={20} xs={24}>
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
                                    <Col className={style.marginTop20} lg={11} sm={24} md={20} xs={24}>
                                        <p className={style.textOne5}>วันเดือนปีเกิด</p>
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

                                    <Col className={style.marginTop20} lg={11} sm={24} md={20} xs={24}>
                                        <p className={style.textOne5}>ระดับชั้น</p>
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
                                            placeholder="ระดับชั้น"
                                            control={control}
                                            defaultValue={null}
                                        />
                                        {
                                            errors && errors.grade && <p className="error-input">{errors.grade.message}</p>
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row justify="space-between" className={`${style.section} ${style.marginSection} ${style.marginTop}`} style={{ paddingTop: !isMobile() ? "1.5rem" : "0rem" }}>
                            <Col span={24}>
                                <span className={`${style.marginTop} ${style.headerOne75}`}>ช่องทางในการติดต่อ</span>
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
                        </Row>
                        <div className={style.buttonEdit}>
                            {
                                isMobile() && <button className={`${style.buttonColor} ${style.margintop20}`} style={styleComponent.buttonFull(color.gray, "7rem")} type="button" onClick={()=>dispatch(userActions.logout())}>ออกจากระบบ</button>
                            }
                            <button className={`${style.buttonColor} ${style.margintop20} ${style.marginLeftOne}`} style={styleComponent.buttonFull(color.orange, "7rem")} type="submit">บันทึกข้อมูล</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}