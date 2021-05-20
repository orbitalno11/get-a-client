import { Col, Row } from "antd"
import React, { Fragment } from "react"
import { useSelector } from "react-redux"
import CardCourseTutor from "../../../../../../card/CardCourseTutor"
import isEmpty from "../../../../../../defaultFunction/checkEmptyObject"
import EmptyImage from "../../../../../../loading/EmptyImage"
import style from "../../../styles.module.scss"

export default function ProfileCourse() {
    const { offlineCourse } = useSelector(state => state.tutor)
    const loading = useSelector(state => state.loading)

    return (
        <Fragment>
            <div className={style.marginTop}>
                <Row className={style.paddingbody}>
                    <Col span={24}>
                        <span className={style.titleH3}>วิชาที่สอน</span>
                    </Col>
                    {
                        offlineCourse.success && (
                            !isEmpty(offlineCourse.data) ? (
                                offlineCourse.data.map((item) => (
                                    <Col xs={24} sm={24} md={24} lg={20} xl={12} className={style.padding} key={item.id}>
                                        <CardCourseTutor data={item} />
                                    </Col>
                                ))) : (
                                !loading.loading && (
                                    <div align="center">
                                        <EmptyImage size="small" />
                                        <span className={style.marginTop20}>ยังไม่มีคอร์สเรียน</span>
                                    </div>
                                )

                            )
                        )

                    }
                </Row>
            </div>
        </Fragment>
    )
}
