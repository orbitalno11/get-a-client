import { Badge, Col, DatePicker, Image, Row, Select } from "antd"
import React, { Fragment, useEffect, useState } from "react"
import style from "../../styles.module.scss"
import {
    faEdit
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { defaultValue } from "../../../../../defaultValue";
import findKeyObject from "../../../../../defaultFunction/findKeyObject";
import moment from 'moment';
import ModalComponent from "../../../../../modal/ModalComponent";
import InputComponents from "../../../../../input/InputComponets";

export default function EditProfileDetail({ register, error, controls, reset }) {
    const profile = useSelector(state => state.profile)
    const detailProfile = profile.profile && profile.profile
    const [image, setimage] = useState("")


    const fetchProfile = useCallback(() => {
        if (profile.profile) {
            setimage(profile.profile.profileUrl)
            reset({
                firstname: detailProfile.firstname,
                lastname: detailProfile.lastname,
                gender: findKeyObject(defaultValue.gender, detailProfile.gender),
                dateOfBirth: moment(detailProfile.dateOfBirth, defaultValue.dateFormat),
                grade: 12,
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

    return (
        <Fragment>
            <ModalComponent />
            <div className={style.horizontalCenter}>
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
                    {
                        error && error.image && <p className="error-input">{error.image.message}</p>
                    }
                    <input id="file-input" name="image" type="file" ref={register && register} onChange={onChange} />
                </div>
            </div>

            <Row justify="space-around" align="middle">
                <Col span={18} className={style.marginTop20}>
                    <InputComponents
                        title="ชื่อ"
                        type="text"
                        name="firstname"
                        register={register}
                        error={error.firstname}
                        placeholder="ชื่อ"
                    />
                </Col>
                <Col span={18} className={style.marginTop20}>
                    <InputComponents
                        title="นามสกุล"
                        type="text"
                        name="lastname"
                        register={register}
                        error={error.lastname}
                        placeholder="นามสกุล"
                    />
                </Col>
                <Col span={18} className={style.marginTop20}>
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
                        control={controls}
                        placeholder="เพศ"
                        defaultValue={2}
                    />
                    {
                        error && error.gender && <p className="error-input">{error.gender.message}</p>
                    }
                </Col>
                <Col className={style.marginTop20} span={18} >
                    <p>วันเดือนปีเกิด</p>
                    <Controller
                        as={
                            <DatePicker placeholder="" />
                        }
                        name="dateOfBirth"
                        placeholder="วันเดือนปีเกิด"
                        control={controls}
                        defaultValue={moment()}
                    />
                    {
                        error.dateOfBirth && <p className="error-input">{error.dateOfBirth.message}</p>
                    }
                </Col>
                <Col span={18} className={style.marginTop20}>
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
                        control={controls}
                        defaultValue={1}
                    />
                    {
                        error && error.grade && <p className="error-input">{error.grade.message}</p>
                    }
                </Col>
                <Col span={18} className={style.marginTop20}>
                    <InputComponents
                        title="อีเมล"
                        type="email"
                        name="email"
                        register={register}
                        error={error.email}
                        placeholder="อีเมล"
                    />
                </Col>
                <Col span={18} className={style.marginTop20}>
                    <InputComponents
                        title="Facebook"
                        type="text"
                        name="facebook"
                        register={register}
                        error={error.facebook}
                        placeholder="facebook"
                    />
                </Col>
                <Col span={18} className={style.marginTop20}>
                    <InputComponents
                        title="ID Line"
                        type="text"
                        name="line"
                        register={register}
                        error={error.line}
                        placeholder="ID Line"
                    />

                </Col>
                <Col span={18} className={style.marginTop20}>
                    <InputComponents
                        title="เบอร์โทรศัพท์"
                        type="text"
                        name="phoneNumber"
                        register={register}
                        error={error.phoneNumber}
                        placeholder="เบอร์โทรศัพท์"
                    />
                </Col>
            </Row>
        </Fragment>
    )
}

