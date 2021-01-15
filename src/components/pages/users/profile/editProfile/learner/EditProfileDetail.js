import { Badge, Col, Image, Upload, Row, Button } from 'antd'
import React, { Fragment, useState } from 'react'
import style from '../../styles.module.scss'
import {
    faEdit
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileSchema } from '../../../../../../validation/validation';
import { useForm } from 'react-hook-form';

export default function EditProfileDetail({ refs, error, controls }) {
    const [image, setimage] = useState("https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png")
    const { register, handleSubmit, errors, control } = useForm({
        resolver: yupResolver(profileSchema),
    });

    const onSubmit = (value) => {
        console.log(value)
    }

    const editForm = () => {
        return (
            <div>
                <Upload
                    showUploadList={false}
                    // onChange={onChange}
                    name="profile"
                    className={style.alignCenter}
                >
                    <Badge className="icon-addimage" count={<FontAwesomeIcon icon={faEdit} />} offset={[2, 0]}>
                        <Image
                            className={style.imageProfile}
                            src={image}
                            preview={false}
                        />
                    </Badge>
                </Upload>
                <Row justify="space-around" align="middle">
                    <Col span={18} className={style.marginTop20}>
                        <p>ชื่อ</p>
                        <input className="input" type="text" name="firstname" ref={refs ? refs : register} />
                        {
                            error ?
                                error.firstname && <p className="error-input">{error.firstname.message}</p>
                                :
                                errors.firstname && <p className="error-input">{errors.firstname.message}</p>
                        }
                    </Col>
                    <Col span={18} className={style.marginTop20}>
                        <p>นามสกุล</p>
                        <input className="input" type="text" name="lastname" ref={refs ? refs : register} />
                        {
                            error ?
                                error.lastname && <p className="error-input">{error.lastname.message}</p>
                                :
                                errors.lastname && <p className="error-input">{errors.lastname.message}</p>
                        }
                    </Col>
                    <Col span={18} className={style.marginTop20}>
                        <p>อีเมล</p>
                        <input className="input" type="text" name="email" ref={refs ? refs : register} />
                        {
                            error ?
                                error.email && <p className="error-input">{error.email.message}</p>
                                :
                                errors.email && <p className="error-input">{errors.email.message}</p>
                        }
                    </Col>
                    <Col span={18} className={style.marginTop20}>
                        <p>ระดับชั้น</p>
                        <input className="input" type="text" name="grade" ref={refs ? refs : register} />
                        {
                            error ?
                                error.grade && <p className="error-input">{error.grade.message}</p>
                                :
                                errors.grade && <p className="error-input">{errors.grade.message}</p>
                        }
                    </Col>
                    {
                        refs ? null
                            : 
                            <Col span={18} className={style.marginTop20}>
                                <Button htmlType="submit">dd</Button>
                            </Col>
                    }
                </Row>
            </div>
        )
    }
    return (
        <Fragment>
            {
                refs ? <div>{editForm()}</div> : <form className={refs?style.body:null} onSubmit={handleSubmit(onSubmit)}>{editForm()}</form>
            }
        </Fragment>
    )
}

