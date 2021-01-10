import { Badge, Image, Upload, Row, Col, Grid, Select, Button } from 'antd'
import React, { useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import {
    faEdit
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { learnnerRegisSchema, tutorRegisSchema } from '../../../../validation/validation'
import { yupResolver } from '@hookform/resolvers/yup';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    }
    );
}

export default function RegisterForm() {
    const [image, setimage] = useState("https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png")
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const params = useParams();
    const type = params.id

    const inputForm = {
        width: ((screens.sm && !screens.lg) || (!screens.sm && screens.xs)) ? '70%' : '35%',
    }

    const { register, handleSubmit, errors, control } = useForm({
        resolver: yupResolver(type === '0' ? tutorRegisSchema : learnnerRegisSchema),
    });

    const onChange = async data => {
        if (!data.file.url && !data.file.preview && data.file.originFileObj.type.match('image.*')) {
            data.file.preview = await getBase64(data.file.originFileObj);
        }
        setimage(data.file.url || data.file.preview)
    }

    const onSubmit = data => {
        console.log(JSON.stringify(data));
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="align-center-page" >
                <span className="h2">ลงทะเบียน{type === '0' ? "ครูสอนพิเศษ" : "นักเรียน"}</span>
                <Controller
                    as={
                        <Upload
                            showUploadList={false}
                            onChange={onChange}
                            name="profile"
                            className="margintop20"
                        >
                            <Badge className="icon-addimage" count={<FontAwesomeIcon icon={faEdit} />} offset={[2, 0]}>
                                <Image
                                    className="image-person"
                                    src={image}
                                    preview={false}
                                />
                            </Badge>
                        </Upload>
                    }
                    name="profile"
                    control={control}
                    defaultValue={{}}
                />
                {
                    errors.profile && <p className="error-input">{errors.profile.message}</p>
                }
                <Row className="input-form" style={inputForm} justify="space-between">
                    <Col className="margintop10" xs={24} sm={24} md={24} >
                        <p>ชื่อ</p>
                        <input className="input" type="text" name="firstname" ref={register} />
                        {
                            errors.firstname && <p className="error-input">{errors.firstname.message}</p>
                        }
                    </Col>
                    <Col className="margintop10" xs={24} sm={24} md={24} >
                        <p>นามสกุล</p>
                        <input className="input" type="text" name="lastname" ref={register} />
                        {
                            errors.lastname && <p className="error-input">{errors.lastname.message}</p>
                        }
                    </Col>
                    <Col className="margintop10" xs={24} sm={24} md={24} >
                        <p>{type === '0' ? "วิชาที่สอน" : "ระดับชั้น"}</p>
                        <Controller
                            as={
                                <Select name={type === '0' ? "subject" : "grade"} optionLabelProp="label" mode={type === '0' ? "multiple" : false}  >
                                    <Select.Option value="20" label="20">20</Select.Option>
                                    <Select.Option value="30" label="30">30</Select.Option>
                                </Select>
                            }
                            name={type === '0' ? "subject" : "grade"}
                            control={control}
                            defaultValue={type === '0' ? ["20"] : ""}
                        />
                        {
                            type === '0' ?
                                errors.subject && <p className="error-input">{errors.subject.message}</p>
                                :
                                errors.grade && <p className="error-input">{errors.grade.message}</p>
                        }
                    </Col>
                    <Col className="margintop10" xs={24} sm={24} md={24} >
                        <p>อีเมล</p>
                        <input className="input" type="email" name="email" ref={register} />
                        {
                            errors.email && <p className="error-input">{errors.email.message}</p>
                        }
                    </Col>
                    <Col className="margintop10" xs={24} sm={24} md={24} >
                        <p>รหัสผ่าน</p>
                        <input className="input" type="password" name="password" ref={register} />
                        {
                            errors.password && <p className="error-input">{errors.password.message}</p>
                        }
                    </Col>
                    <Col className="margintop10" xs={24} sm={24} md={24} >
                        <p>ยืนยันรหัสผ่าน</p>
                        <input className="input" type="comfirmpassword" name="comfirmpassword" ref={register} />
                        {
                            errors.comfirmpassword && <p className="error-input">{errors.comfirmpassword.message}</p>
                        }
                    </Col>
                </Row>
                <Button className="buttonBlueColor margintop20" shape="round" size="large" htmlType="submit">ลงทะเบียน</Button>
            </div>
        </form>
    )
}
