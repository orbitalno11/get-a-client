import { Col, Divider, Row, Grid, Button } from "antd"
import React, { Fragment } from "react"
import { profileSchema } from "../../../../../../validation/validation";
import style from "../../styles.module.scss"
import EditProfileDetail from "./EditProfileDetail"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import EditProfileMap from "./EditProfileMap";
import Header from "../../../../../headerMobile/Header";
import responseMobile from "../../../../../response/responseMobile";

const { useBreakpoint } = Grid;

export default function EditProfile() {
    const screens = useBreakpoint();
    const { register, handleSubmit, errors, control } = useForm({
        resolver: yupResolver(profileSchema),
    });

    const onSubmit = () => {
        // todo onSubmit
        // value
    }

    const editProfile = () => {
        return (
            <Fragment>
                {responseMobile() && <Header title="แก้ไขข้อมูล" pageBack="/learner/1" />}
                <div className={style.body}>
                    <Row justify="center">
                        <Col lg={11} md={11} sm={24}>
                            {
                                screens.md ? (<EditProfileDetail refs={register} error={errors} controls={control} />): (<EditProfileDetail />)
                            }
                        </Col>
                        {
                            screens.md &&
                            (
                                <Fragment>
                                    <Col sm={1} lg={1} xl={2} className={style.alignCenter}>
                                        <Divider type="vertical" style={{ height: "100%" }} />
                                    </Col>
                                    <Col lg={11} md={11} sm={24}>
                                        <EditProfileMap refs={register} />
                                    </Col>
                                </Fragment>
                            )
                        }
                    </Row>
                    {
                        screens.md &&
                        (
                            <Row justify="center" className={style.marginTop}>
                                <Button className="backgroundOrange buttonColor" shape="round" size="large" htmlType="submit">บันทึกข้อมูล</Button>
                            </Row>
                        )
                    }
                </div>
            </Fragment>
        )
    }

    return (
        <Fragment>
            {
                screens.md ?
                    <form onSubmit={handleSubmit(onSubmit)}>{editProfile()}</form>
                    : editProfile()
            }
        </Fragment>
    )
}
