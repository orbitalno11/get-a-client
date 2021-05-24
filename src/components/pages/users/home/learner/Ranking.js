import React from 'react'
import { Fragment } from "react"
import Header from "../../../../headerMobile/Header"
import isMobile from "../../../../isMobile/isMobile"
import style from "../styles.module.scss"
import Loading from "../../../../loading/Loading"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { homeActions } from "../../../../../redux/actions"
import { useEffect } from "react"
import CardCourseLearner from "../../../../card/CardCourseLearner"
import { Col, Row } from "antd"

export default function Ranking() {
    const { loading, home } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(homeActions.getRank(20))
    }, [])

    return (
        <Fragment>
            {
                loading.loading && (
                    <Loading />
                )
            }

            {
                isMobile() && <Header title="ติวเตอร์ยอดนิยม" />
            }
            <div className={style.container}>
                {
                    !isMobile() && <h1 className={style.titleH2}>ติวเตอร์ยอดนิยม</h1>
                }
                <Row >
                    {
                        home.offlineCourseRank && home.offlineCourseRank.map((item) => (
                            <Col align="center" lg={8} md={12} sm={20} xs={24} key={item.id} style={{ padding: "0.5rem" }}>
                                <CardCourseLearner data={item} verizontal="true"/>
                            </Col>

                        ))
                    }
                </Row>
            </div>
        </Fragment>
    )
}
