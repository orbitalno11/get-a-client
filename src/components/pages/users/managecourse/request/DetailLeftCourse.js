import { faBook, faBookReader, faClock, faUsers, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row, Space } from "antd"
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React from 'react'
import { useSelector } from "react-redux"
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import isEmpty from "../../../../defaultFunction/checkEmptyObject";
import { styleComponent } from "../../../../defaultFunction/style";
import { color } from "../../../../defaultValue";
import { SkeletonComponent } from "../../../../loading/SkeletonComponent";
import style from "../styles.module.scss";

export default function DetailLeftCourse({courseId}) {
    const { loading } = useSelector(state => state.loading)
    const { data } = useSelector(state => courseId ? state.onlineCourse : state.offlineCourse)
    const { id } = useParams()
    const screens = useBreakpoint();

    const checkLoading = (text) => {
        return (
            loading ? <SkeletonComponent.SkeletonText /> : text
        )
    }

    return (
        <div>
            <Row className={`${screens.md && style.section} ${style.marginSection}`}>
                <Col span={24}>
                    <span className={style.headerTwo25}>{checkLoading(!isEmpty(data) && data.name)}</span>
                </Col>
                <Col className={style.paddingTopOneHalf} span={24}>
                    <FontAwesomeIcon icon={faBookReader} className={style.iconmarker} />
                    <span className={style.textOne25}>{checkLoading(!isEmpty(data) && data.grade.title)}</span>
                </Col>
                <Col className={style.paddingTopOneHalf} span={24}>
                    <FontAwesomeIcon icon={faBook} className={style.iconmarker} />
                    <span className={style.textOne25}>{checkLoading(!isEmpty(data) && data.subject.title)}</span>
                </Col>
                <Col className={style.paddingTopOneHalf} span={24}>
                    <FontAwesomeIcon icon={courseId ? faUsers : faClock} className={style.iconmarker} />
                    <span className={style.textOne25}>{checkLoading(!isEmpty(data) && (courseId ? data.numberOfView : data.timeText))}</span>
                </Col>
                <Col className={style.paddingTopOneHalf} span={24}>
                    <Space align="center" direction="horizontal">
                    {
                        courseId ? (<FontAwesomeIcon icon={faVideo} className={style.iconmarker} />) : (<styleComponent.iconCoin size="large" />)
                    }
                        <span className={`${style.textOne25} ${!courseId && style.marginLeftOneHalf}`}>{checkLoading(!isEmpty(data) && (courseId ? data.numberOfVideo : data.costText))}</span>
                    </Space>
                </Col>
                <Col className={style.paddingTopOneHalf} span={24}>
                    <styleComponent.iconStar size="large" />
                    <span className={`${style.textTwo} ${style.marginLeftOne}`}>{checkLoading(!isEmpty(data) && data.rating)}</span>
                </Col>
            </Row>
            {
                screens.lg && (
                    <Link to={`/${courseId ? "online" : "course"}/${courseId ? courseId : id}`}>
                        <Button className={`${style.buttonColor} ${style.marginSection}`} style={styleComponent.buttonFull(color.orange)}>รายละเอียดคอร์สเรียน</Button>
                    </Link>
                )
            }
        </div>
    )
}