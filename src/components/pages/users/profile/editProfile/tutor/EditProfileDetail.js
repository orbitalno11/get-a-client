import { Button, Col, Image, Row, Select, Typography } from "antd"
import TextArea from "antd/lib/input/TextArea";
import React, { Fragment, useCallback, useEffect, useState } from "react"
import style from "../../styles.module.scss"
import { profileTutorSchema } from "../../../../../../validation/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Header from "../../../../../headerMobile/Header";
import { useDispatch, useSelector } from "react-redux";
import { profileAction } from "../../../../../../redux/actions/profile.actions";
import isMobile from "../../../../../isMobile/isMobile";
const { Title } = Typography;

export default function EditProfileDetail() {
    const dispatch = useDispatch()
    const profile = useSelector(state => state.profile)
    const [detailProfile, setDetailProfile] = useState(null)

    const { register, handleSubmit, errors, control, reset } = useForm({
        resolver: yupResolver(profileTutorSchema),
    });

    const fetchProfile = useCallback(() => {
        dispatch(profileAction.getProfile())
    }, [dispatch])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    useEffect(()=>{
        setDetailProfile(profile.profile)
        reset({
            firstname:
              "firstname"
          });
    },[profile])
    
    const onSubmit = () => {
        // todo onSubmit
        // value
    }

    return (
        <Fragment>
            {
                detailProfile !== null &&
                    (
                        <div>
                            {isMobile() && <Header title="แก้ไข" pageBack="/tutor/1" /> }
                            <div className={!isMobile() && style.bodyEdit}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className={isMobile() ? style.mobilecenter : style.bannerEditProfile}>
                                        <Image
                                            className={style.imageProfile}
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                            preview={false} />
                                    </div>
                                    <Row className={style.alignCenter}>
                                        <Title level={3} className={!isMobile() && style.marginTop} >แก้ไขโปรไฟล์</Title>
                                    </Row>
                                    <Row className={style.paddingEdit} justify="space-between">
                                        <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                                            <p>ชื่อ</p>
                                            <input className="input" type="text" name="firstname" ref={register} defaultValue={detailProfile !== null && detailProfile.firstname} />
                                            {
                                                errors.firstname && <p className="error-input">{errors.firstname.message}</p>
                                            }
                                        </Col>
                                        <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                                            <p>นามสกุล</p>
                                            <input className="input" type="text" name="lastname" ref={register} defaultValue={detailProfile !== null && detailProfile.lastname} />
                                            {
                                                errors.lastname && <p className="error-input">{errors.lastname.message}</p>
                                            }
                                        </Col>
                                        <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                                            <p>เพศ</p>
                                            <Controller
                                                as={
                                                    <Select name="gender"  >
                                                        <Select.Option value="male" >male</Select.Option>
                                                        <Select.Option value="female" >female</Select.Option>
                                                    </Select>
                                                }
                                                name="gender"
                                                control={control}
                                                defaultValue={detailProfile !== null && detailProfile.sex}
                                            />
                                            {
                                                errors.gender && <p className="error-input">{errors.gender.message}</p>
                                            }
                                        </Col>
                                    </Row>
                                    <Row className={style.paddingEdit}>
                                        <Title level={5} className={style.marginTop}>ช่องทางในการติดต่อ</Title>
                                    </Row>
                                    <Row className={style.paddingEdit} justify="space-between">
                                        <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                                            <p >อีเมล</p>
                                            <input className="input" type="text" name="email" ref={register} defaultValue={detailProfile !== null && detailProfile.contact.email} />
                                            {
                                                errors.email && <p className="error-input">{errors.email.message}</p>
                                            }
                                        </Col>
                                        <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                                            <p >facebook</p>
                                            <input className="input" type="text" name="facebook" ref={register} defaultValue={detailProfile !== null && detailProfile.contact.facebook} />
                                        </Col>
                                        <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                                            <p >Line</p>
                                            <input className="input" type="text" name="line" ref={register} defaultValue={detailProfile !== null && detailProfile.contact.line} />
                                        </Col>
                                        <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                                            <p >หมายเลขโทรศัพท์</p>
                                            <input className="input" type="text" name="phone" ref={register} defaultValue={detailProfile !== null && detailProfile.contact.phone} />
                                        </Col>
                                    </Row>
                                    <Row className={style.paddingEdit} justify="space-between">
                                        <Col className={style.marginTop20} lg={24} sm={24} md={24} xs={24}>
                                            <p>ข้อความแนะนำตัว</p>
                                            <TextArea className="input" name="introduce" size="large" ref={register} defaultValue={detailProfile !== null && detailProfile.introduction} />
                                        </Col>
                                    </Row>
                                    <div className={style.buttonEdit}>
                                        <Button className="backgroundOrange buttonColor" shape="round" size="large" htmlType="submit">บันทึกข้อมูล</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
            }
        </Fragment>
    )
}
