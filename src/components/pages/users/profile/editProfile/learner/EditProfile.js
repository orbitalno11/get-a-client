import { Col, Divider, Row, Grid, Button } from 'antd'
import React, { Fragment } from 'react'
import { profileSchema } from '../../../../../../validation/validation';
import style from '../../styles.module.scss'
import EditProfileDetail from './EditProfileDetail'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import EditProfileMap from './EditProfileMap';

const { useBreakpoint } = Grid;

export default function EditProfile() {
    const screens = useBreakpoint();
    const { register, handleSubmit, errors, control } = useForm({
        resolver: yupResolver(profileSchema),
    });

    const onSubmit = (value) => {
        console.log(value)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.body}>
                <Row justify="center">
                    <Col lg={11} md={11} sm={24}>
                        <EditProfileDetail refs={register} error={errors} controls={control} />
                    </Col>
                    {
                        !screens.md ? null
                            :
                            <Fragment>
                                <Col sm={1} lg={1} xl={2} className={style.alignCenter}>
                                    <Divider type="vertical" style={{ height: '100%' }} />
                                </Col>
                                <Col lg={11} md={11} sm={24}>
                                    <EditProfileMap/>
                                </Col>
                            </Fragment>
                    }
                </Row>
                <Row justify="center" className={style.marginTop}>
                    <Button className="backgroupMain buttonColor" shape="round" size="large" htmlType="submit">บันทึกข้อมูล</Button>
                </Row>
            </div>
        </form>
    )
}
