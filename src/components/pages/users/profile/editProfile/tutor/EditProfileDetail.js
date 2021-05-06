import { Badge, Button, Col, DatePicker, Grid, Image, Row, Select, Typography } from "antd"
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

const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function EditProfileDetail() {
    const { profile, auth, loading} = useSelector(state => state)
    const dispatch = useDispatch()
    const detailProfile = profile.profile && profile.profile
    const loader = loading.loading
    const screens = useBreakpoint();
    const [image, setimage] = useState("")

    const { register, handleSubmit, errors, control, reset } = useForm({
        resolver: yupResolver(profileTutorSchema)
    });

    const fetchProfile = useCallback(() => {
        dispatch(profileAction.getProfile())
        if (profile.profile) {
            setimage(profile.profile.profileUrl)
            reset({
                firstname: detailProfile.firstname,
                lastname: detailProfile.lastname,
                gender: findKeyObject(defaultValue.gender, detailProfile.gender),
                dateOfBirth: moment(detailProfile.dateOfBirth, defaultValue.dateFormat),
                subject: ['คณิตศาสตร์'],
                email: detailProfile.email,
                facebook: detailProfile.contact.facebookUrl,
                line: detailProfile.contact.lineId,
                phoneNumber: detailProfile.contact.phoneNumber,
                introduce: detailProfile.introduce
            })
        }
        console.log("dd")
    }, [dispatch])

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
            {isMobile() && <Header title="แก้ไข" pageBack="/tutor/1" />}
            <ModalComponent />
            {
                detailProfile && !loader ? (
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
                                        <Row className={style.alignCenter}>
                                            <Title level={3} className={style.marginTop} >แก้ไขโปรไฟล์</Title>
                                        </Row>
                                    )
                                }
                                <Row className={style.paddingEdit} justify="space-between">
                                    <Col className={screens.md ? style.marginTop20 : null} lg={7} sm={24} md={10} xs={24}>
                                        <p>ชื่อ</p>
                                        <input className="input" type="text" name="firstname" ref={register} />
                                        {
                                            errors.firstname && <p className="error-input">{errors.firstname.message}</p>
                                        }
                                    </Col>
                                    <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                                        <p>นามสกุล</p>
                                        <input className="input" type="text" name="lastname" ref={register} />
                                        {
                                            errors.lastname && <p className="error-input">{errors.lastname.message}</p>
                                        }
                                    </Col>
                                    <input  name="gender" type="string" ref={register} hidden/>
                                    <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                                        <p>วันเดือนปีเกิด</p>
                                        <Controller
                                            as={
                                                <DatePicker placeholder="" />
                                            }
                                            name="dateOfBirth"
                                            control={control}
                                            defaultValue={moment()}
                                        />
                                        {
                                            errors.dateOfBirth && <p className="error-input">{errors.dateOfBirth.message}</p>
                                        }
                                    </Col>

                                    <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                                        <p>วิชาที่สอน</p>
                                        <Controller
                                            as={
                                                <Select name="subject" optionLabelProp="label" mode="multiple"  >
                                                    {
                                                        Object.entries(defaultValue.subject).map(([key]) => (
                                                            <Select.Option key={key} value={key}>{key}</Select.Option>
                                                        ))
                                                    }
                                                </Select>
                                            }
                                            name="subject"
                                            control={control}
                                            defaultValue={[]}
                                        />
                                        {
                                            errors.subject && <p className="error-input">{errors.subject.message}</p>
                                        }
                                    </Col>
                                </Row>
                                <Row className={style.paddingEdit}>
                                    <Title level={5} className={style.marginTop}>ช่องทางในการติดต่อ</Title>
                                </Row>
                                <Row className={style.paddingEdit} justify="space-between">
                                    <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                                        <p >อีเมล</p>
                                        <input className="input" type="text" name="email" ref={register}/>
                                        {
                                            errors.email && <p className="error-input">{errors.email.message}</p>
                                        }
                                    </Col>
                                    <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                                        <p >facebook</p>
                                        <input className="input" type="text" name="facebook" ref={register}/>
                                    </Col>
                                    <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                                        <p >Line</p>
                                        <input className="input" type="text" name="line" ref={register}/>
                                    </Col>
                                    <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                                        <p >หมายเลขโทรศัพท์</p>
                                        <input className="input" type="text" name="phoneNumber" ref={register} />
                                    </Col>
                                </Row>
                                <Row className={style.paddingEdit} justify="space-between">
                                    <Col className={style.marginTop20} lg={24} sm={24} md={24} xs={24}>
                                        <p>ข้อความแนะนำตัว</p>
                                        <Controller
                                            as={
                                                <TextArea className="input" name="introduce" size="large"/>
                                            }
                                            name="introduce"
                                            control={control}
                                            defaultValue={"ยินดีที่ได้รู้จัก"}
                                        />
                                        
                                    </Col>
                                </Row>
                                <div className={style.buttonEdit}>
                                    <Button className="backgroundOrange buttonColor" shape="round" size="large" htmlType="submit">บันทึกข้อมูล</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className={style.loader}></div>
                )
            }
        </Fragment>
    )
}
