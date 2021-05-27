import React, { useState } from 'react'
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
import { useParams } from "react-router"
import TabHorizontal from "../../../../tab/TabHorizontal"

export default function Ranking() {
    const { loading, home } = useSelector(state => state)
    const { type } = useParams()
    const dispatch = useDispatch()
    const course = type === "course" ? home.offlineCourseRank : home.onlineCourseRank
    const [ tabStart, setTabStart] = useState({
        key: "course",
        name: "คอร์ส"
    })

    useEffect(() => {
        if(type === "course"){
            dispatch(homeActions.getRank(20))
        }else{
            dispatch(homeActions.getRankOnline(20))
        }
        return () =>{
            dispatch(homeActions.clearHome())
        }
    }, [])

    const handleSetSelectTab = (key) =>{
        const tabActive = tabDetail.filter(value=>value.key===key)[0]
        setTabStart(tabActive)
    }

    const tabDetail = [
        {
            key: "course",
            name: "คอร์ส",
        },
        {
            key: "clip",
            name: "คลิปวิดิโอ",
        },
    ]
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
                <TabHorizontal type="tab" tabStart={tabStart} tabDetail={tabDetail} style={!isMobile() ? "TabPane" : ""} handleSetSelectTab={handleSetSelectTab}/>
                <Row >
                    {
                        course && course.map((item) => (
                            <Col align="center" lg={8} md={12} sm={24} xs={24} key={item.id} style={{ padding: "0.5rem" }}>
                                <CardCourseLearner data={item} verizontal="true" type={type}/>
                            </Col>

                        ))
                    }
                </Row>
            </div>
        </Fragment>
    )
}
