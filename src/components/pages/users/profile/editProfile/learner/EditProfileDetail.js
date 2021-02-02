import { Badge, Col, Image, Row, Button } from "antd"
import React, { Fragment, useCallback, useEffect, useState } from "react"
import style from "../../styles.module.scss"
import {
    faEdit
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "../../../../../../validation/validation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editProfileDetail, getProfile } from "../../../../../../redux/actions/profileActions";

export default function EditProfileDetail({ refs, error }) {
    const [image, setimage] = useState("https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png")
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(profileSchema),
    });
    const dispatch = useDispatch()
    const profile = useSelector(state => state.profile)
    const [detailProfile, setDetailProfile] = useState(null)

    const fetchProfile = useCallback(() => {
        dispatch(getProfile())
    }, [dispatch])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    useEffect(()=>{
        setDetailProfile(profile.profile)
    },[profile])

    const onChange = data => {
        setimage(URL.createObjectURL(data.target.files[0]))
    }

    const onSubmit = (value) => {
        dispatch(editProfileDetail(value))
    }

    const editForm = () => {
        return (
            detailProfile !== null ?
                (
                    <div>
                        <div className={style.alignCenter}>
                            <div className="imageUpload" >
                                <label htmlFor="file-input" >
                                    <Badge className="icon-addimage" count={<FontAwesomeIcon icon={faEdit} />} offset={[2, 0]}>
                                        <Image
                                            className={style.imageProfile}
                                            src={image}
                                            preview={false}
                                        />
                                    </Badge>
                                </label>
                                <input id="file-input" name="profile" type="file" ref={register} onChange={onChange} />
                            </div>
                        </div>
                        <Row justify="space-around" align="middle">
                            <Col span={18} className={style.marginTop20}>
                                <p>ชื่อ</p>
                                <input className="input" type="text" name="firstname" ref={refs ? refs : register} defaultValue={detailProfile !== null && detailProfile.firstname} />
                                {
                                    error ?
                                        error.firstname && <p className="error-input">{error.firstname.message}</p>
                                        :
                                        errors.firstname && <p className="error-input">{errors.firstname.message}</p>
                                }
                            </Col>
                            <Col span={18} className={style.marginTop20}>
                                <p>นามสกุล</p>
                                <input className="input" type="text" name="lastname" ref={refs ? refs : register} defaultValue={detailProfile !== null && detailProfile.lastname} />
                                {
                                    error ?
                                        error.lastname && <p className="error-input">{error.lastname.message}</p>
                                        :
                                        errors.lastname && <p className="error-input">{errors.lastname.message}</p>
                                }
                            </Col>
                            <Col span={18} className={style.marginTop20}>
                                <p>อีเมล</p>
                                <input className="input" type="text" name="email" ref={refs ? refs : register} defaultValue={detailProfile !== null && detailProfile.contact.email} />
                                {
                                    error ?
                                        error.email && <p className="error-input">{error.email.message}</p>
                                        :
                                        errors.email && <p className="error-input">{errors.email.message}</p>
                                }
                            </Col>
                            <Col span={18} className={style.marginTop20}>
                                <p>ระดับชั้น</p>
                                <input className="input" type="text" name="grade" ref={refs ? refs : register} defaultValue={detailProfile !== null && detailProfile.grade} />
                                {
                                    error ?
                                        error.grade && <p className="error-input">{error.grade.message}</p>
                                        :
                                        errors.grade && <p className="error-input">{errors.grade.message}</p>
                                }
                            </Col>
                        </Row>
                        <Row className={style.alignCenter}>
                            {
                                !refs &&
                                (
                                    <Col className={style.marginTop20}>
                                        <Button className="backgroundMain buttonColor" shape="round" size="large" htmlType="submit">บันทึกข้อมูล</Button>
                                    </Col>
                                )
                            }
                        </Row>
                    </div>
                )
                : null
        )
    }
    return (
        <Fragment>
            {
                refs ?
                    (
                        <div>{editForm()}</div>
                    ) : (
                        <form className={refs ? style.body : null} onSubmit={handleSubmit(onSubmit)}>{editForm()}</form>
                    )
            }
        </Fragment>
    )
}

