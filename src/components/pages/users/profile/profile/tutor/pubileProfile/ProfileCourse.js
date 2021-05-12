import { Col, Row } from "antd"
import React, { Fragment } from "react"
import { useSelector } from "react-redux"
import CardCourseTutor from "../../../../../../card/CardCourseTutor"
import style from "../../../styles.module.scss"

export default function ProfileCourse() {
    const { offlineCourse } = useSelector(state => state.tutor)

    return (
        <Fragment>
            <div className={style.marginTop}>
                <Row className={style.paddingbody}>
                    <Col span={24}>
                        <span className={style.titleH3}>วิชาที่สอน</span>
                    </Col>
                    {
                        
                        offlineCourse.data && offlineCourse.data.map((item) => (
                            <Col xs={24} sm={24} md={24} lg={20} xl={12} className={style.padding} key={item.id}>
                                <CardCourseTutor data={item} />
                            </Col>
                        ))
                    }

                </Row>
            </div>
        </Fragment>
    )
}
