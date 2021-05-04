import React, { Fragment} from "react"
import style from "../../styles.module.scss"
import { useForm } from "react-hook-form";
import { Col, Row,Grid } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import {courseSchema} from "../../../../../../validation/course/courseSchema"
const { useBreakpoint } = Grid;

export default function EditClipDeail() {

    const screens = useBreakpoint();

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(courseSchema),
    });

    const onSubmit = () => {
        // todo onSubmit
        // value
    } 

    return (
        <Fragment>
            <div>
                <form id="editOnlineCourse" onSubmit={handleSubmit(onSubmit)}>
                    {screens.md && (
                        <Row >
                            <span className={style.titleH2}>แก้ไขบทเรียน</span>
                        </Row>
                    )}
                    <Row justify="space-around" align="middle">
                        <Col xl={24} md={24} sm={24} xs={24} className={style.marginTop}>
                            <p>ชื่อคลิป</p>
                            <input className="input" type="namecourse" name="namecourse" ref={register}/>
                            {
                                errors.namecourse && <p className="error-input">{errors.namecourse.message}</p>
                            }
                        </Col>
                        <Col xl={24} md={24} sm={24} xs={24} className={style.marginTop}>
                            <p>รายละเอียด</p>
                            <input className="input" type="namecourse" name="namecourse" ref={register} style={{height:"15rem"}}/>
                        </Col>
                    </Row>
                </form>
            </div>
        </Fragment>
    )
}
