import { Badge, Button, Col, DatePicker, Grid, Image, Row, Select } from "antd"
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
import { profileAction } from "../../../../../../redux/actions";
import { defaultValue } from "../../../../../defaultValue";
import { formUpdateProfile } from "../formUpdateProfile";
import findKeyObject from "../../../../../defaultFunction/findKeyObject";
import ModalComponent from "../../../../../modal/ModalComponent";
import moment from "moment";
import Loading from "../../../../../loading/Loading"
import ProfileSample from "../../../../../images/profile.webp"
import InputComponents from "../../../../../input/InputComponets";

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
                dateOfBirth: moment(detailProfile.dateOfBirth, defaultValue.dateFormat),
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
            {isMobile() && <Header title="แก้ไข" pageBack={"/tutor/" + auth.profile} />}
            <ModalComponent />
            {
                loader && (
                    <Loading />
                )}
            <div>
                <div className={screens.md ? style.bodyEdit : null}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={!screens.md ? style.mobilecenter : style.bannerEditProfile}>
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
                        </div>
                        {
                            screens.md && (
                                <Row align="center">
                                    <h2 className={`${style.marginTop} ${style.titleH2}`}>แก้ไขโปรไฟล์</h2>
                                </Row>
                            )
                        }
                        <Row className={style.paddingbody} justify="space-between">
                            <Col className={screens.md ? style.marginTop20 : null} lg={7} sm={24} md={10} xs={24}>
                                <InputComponents
                                    title="ชื่อ"
                                    type="text"
                                    name="firstname"
                                    register={register}
                                    error={errors.firstname}
                                    placeholder="ชื่อ"
                                />
                            </Col>
                            <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
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
                            <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                                <p>วันเดือนปีเกิด</p>
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

                            <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                                <p>ระดับชั้น</p>
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
                                    defaultValue={1}
                                />
                                {
                                    errors && errors.grade && <p className="error-input">{errors.grade.message}</p>
                                }
                            </Col>
                        </Row>
                        <Row className={style.paddingbody}>
                            <span className={`${style.marginTop} ${style.titleH4}`}>ช่องทางในการติดต่อ</span>
                        </Row>
                        <Row className={style.paddingbody} justify="space-between">
                            <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                                <InputComponents
                                    title="อีเมล"
                                    type="email"
                                    name="email"
                                    register={register}
                                    error={errors.email}
                                    placeholder="อีเมล"
                                />
                            </Col>
                            <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                                <InputComponents
                                    title="Facebook"
                                    type="text"
                                    name="facebook"
                                    register={register}
                                    error={errors.facebook}
                                    placeholder="facebook"
                                />
                            </Col>
                            <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                                <InputComponents
                                    title="Line ID"
                                    type="text"
                                    name="line"
                                    register={register}
                                    error={errors.line}
                                    placeholder="line"
                                />
                            </Col>
                            <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
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
                            <Button className="backgroundOrange buttonColor" shape="round" size="large" htmlType="submit">บันทึกข้อมูล</Button>
                        </div>
                    </form>
                </div>
            </div>
            
        </Fragment>
    )
}
