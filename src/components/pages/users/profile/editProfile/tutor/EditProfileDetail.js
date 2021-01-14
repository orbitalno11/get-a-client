import { Button, Col, Image, Row, Select, Typography } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import React from 'react'
import style from '../../styles.module.scss'
import { profileTutorSchema } from '../../../../../../validation/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
const { Title } = Typography;

export default function EditProfileDetail() {
    const { register, handleSubmit, errors, control } = useForm({
        resolver: yupResolver(profileTutorSchema),
    });

    const onSubmit = (value) => {
        console.log(value)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.banner}>
                <Image
                    className={style.imageProfile}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    preview={false}
                ></Image>
            </div>
            <Row className={style.alignCenter}>
                <Title level={3} className={style.marginTop}>แก้ไขโปรไฟล์</Title>
            </Row>
            <Row className={style.paddingEdit} justify="space-between">
                <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
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
                        defaultValue="male"
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
                    <input className="input" type="text" name="email" ref={register} />
                    {
                        errors.email && <p className="error-input">{errors.email.message}</p>
                    }
                </Col>
                <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                    <p >facebook</p>
                    <input className="input" type="text" name="facebook" ref={register} />
                </Col>
                <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                    <p >Line</p>
                    <input className="input" type="text" name="line" ref={register} />
                </Col>
                <Col className={style.marginTop20} lg={7} sm={24} md={10} xs={24}>
                    <p >หมายเลขโทรศัพท์</p>
                    <input className="input" type="text" name="phone" ref={register} />
                </Col>
            </Row>
            <Row className={style.paddingEdit} justify="space-between">
                <Col className={style.marginTop20} lg={24} sm={24} md={24} xs={24}>
                    <p>ข้อความแนะนำตัว</p>
                    <TextArea className="input" name="introduce" size="large" ref={register} />
                </Col>
            </Row>
            <div className={style.buttonEdit}>
                <Button className="buttonMainColor" shape="round" size="large" htmlType="submit">บันทึกข้อมูล</Button>
            </div>
        </form>
    )
}
