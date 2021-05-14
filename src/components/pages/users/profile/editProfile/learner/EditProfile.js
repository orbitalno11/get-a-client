import { Col, Divider, Row, Grid, Button } from "antd"
import React, { Fragment, useEffect } from "react"
import { profileSchema } from "../../../../../../validation/validation";
import style from "../../styles.module.scss"
import EditProfileDetail from "./EditProfileDetail"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import EditProfileMap from "./EditProfileMap";
import Header from "../../../../../headerMobile/Header";
import isMobile from "../../../../../isMobile/isMobile";
import { useSelector, useDispatch } from "react-redux";
import { profileAction } from "../../../../../../redux/actions/profile.actions";
import { formUpdateProfile } from "../formUpdateProfile";

const { useBreakpoint } = Grid;

export default function EditProfile() {
    const screens = useBreakpoint();
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loading.loading)
    const auth = useSelector(state => state.auth)

    const { register, handleSubmit, errors, control, reset } = useForm({
        resolver: yupResolver(profileSchema),
    });

    useEffect(() => {
        dispatch(profileAction.getProfile(auth.profile))
       
    }, [])

    const onSubmit = (data) => {
        if (data) {
            const formData = formUpdateProfile("learner", data)
            dispatch(profileAction.updateProfileLearner(formData, auth.profile))
        }
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                {isMobile() && <Header title="แก้ไขข้อมูล" pageBack={"/learner/"+auth.profile} />}
               
                {
                    !loading ? (
                        <div className={style.body}>
                            <Row justify="center">
                                <Col lg={11} md={11} sm={24}>
                                    <EditProfileDetail register={register} error={errors} controls={control} reset={reset}/>
                                </Col>
                                {
                                    screens.md &&
                                    (
                                        <Fragment>
                                            <Col sm={1} lg={1} xl={2} className={style.horizontalCenter}>
                                                <Divider type="vertical" style={{ height: "100%" }} />
                                            </Col>
                                            <Col lg={11} md={11} sm={24}>
                                                <EditProfileMap refs={register} />
                                            </Col>
                                        </Fragment>
                                    )
                                }
                            </Row>
                            <Row justify="center" className={style.marginTop}>
                                <Button className="backgroundOrange buttonColor" shape="round" size="large" htmlType="submit">บันทึกข้อมูล</Button>
                            </Row>
                        </div>
                    ) : (
                        <div className={style.loader}></div>
                    )
                }
            </form>
        </Fragment>
    )
}
