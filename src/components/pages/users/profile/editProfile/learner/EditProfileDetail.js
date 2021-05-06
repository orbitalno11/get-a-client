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

export default function EditProfileDetail({ register, error, controls }) {
    const profile = useSelector(state => state.profile)
    const detailProfile = profile.profile && profile.profile
    const [image, setimage] = useState("")
    

    const fetchProfile = useCallback(() => {
        if (profile.profile) {
            
            setimage(profile.profile.profileUrl)
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
            {
                detailProfile &&
                (

                    <div>
                        <div className={style.alignCenter}>
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
                                <input id="file-input" name="image" type="file" ref={register && register} onChange={onChange} />
                            </div>
                        </div>

                        <Row justify="space-around" align="middle">
                            <Col span={18} className={style.marginTop20}>
                                <p>ชื่อ</p>
                                <input className="input" type="text" name="firstname" ref={register && register} defaultValue={detailProfile && detailProfile.firstname} />
                                {
                                    error && error.firstname && <p className="error-input">{error.firstname.message}</p>
                                }
                            </Col>
                            <Col span={18} className={style.marginTop20}>
                                <p>นามสกุล</p>
                                <input className="input" type="text" name="lastname" ref={register && register} defaultValue={detailProfile && detailProfile.lastname} />
                                {
                                    error && error.lastname && <p className="error-input">{error.lastname.message}</p>
                                }
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
                                    defaultValue={detailProfile.gender && findKeyObject(defaultValue.gender,detailProfile.gender)}
                                />
                                {
                                    error && error.email && <p className="error-input">{error.grade.message}</p>
                                }
                            </Col>
                            <Col className={style.marginTop20} span={18} >
                                <p>วันเดือนปีเกิด</p>
                                <Controller
                                    as={
                                        <DatePicker placeholder="" />
                                    }
                                    name="dateOfBirth"
                                    control={controls}
                                    defaultValue={moment(detailProfile.dateOfBirth && detailProfile.dateOfBirth, defaultValue.dateFormat)}
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
                                    control={controls}
                                    defaultValue={null}
                                />
                                {
                                    error && error.grade && <p className="error-input">{error.grade.message}</p>
                                }
                            </Col>
                            <Col span={18} className={style.marginTop20}>
                                <p>อีเมล</p>
                                <input className="input" type="text" name="email" ref={register && register} defaultValue={detailProfile && detailProfile.email} />
                                {
                                    error && error.email && <p className="error-input">{error.email.message}</p>
                                }
                            </Col>
                            <Col span={18} className={style.marginTop20}>
                                <p>Facebook</p>
                                <input className="input" type="text" name="facebook" ref={register && register} defaultValue={detailProfile && detailProfile.contact.facebookUrl} />
                                {
                                    error && error.facebook && <p className="error-input">{error.facebook.message}</p>
                                }
                            </Col>
                            <Col span={18} className={style.marginTop20}>
                                <p>ID Line</p>
                                <input className="input" type="text" name="line" ref={register && register} defaultValue={detailProfile && detailProfile.contact.lineId} />
                                {
                                    error && error.line && <p className="error-input">{error.line.message}</p>
                                }
                            </Col>
                            <Col span={18} className={style.marginTop20}>
                                <p>เบอร์โทรศัพท์</p>
                                <input className="input" type="text" name="phoneNumber" ref={register && register} defaultValue={detailProfile && detailProfile.contact.phoneNumber} />
                                {
                                    error && error.phoneNumber && <p className="error-input">{error.phoneNumber.message}</p>
                                }
                            </Col>
                        </Row>
                    </div>
                )
            }
        </Fragment>
    )
}

