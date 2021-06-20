import React from "react"
import { Fragment } from "react"
import style from "../styles.module.scss"
import Loading from "../../../../loading/Loading"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { homeActions} from "../../../../../redux/actions"
import { useEffect } from "react"
import CardCourseLearner from "../../../../card/CardCourseLearner"
import { Col, Row } from "antd"
import { useHistory } from "react-router"
import isEmpty from "../../../../defaultFunction/checkEmptyObject"
import subjectList from "../../../../defaultValue/subjectList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"
import { color } from "../../../../defaultValue";
import { Link } from "react-router-dom";

export default function Recommend() {
    const screens = useBreakpoint()
    const dispatch = useDispatch();
    const history = useHistory()
    const { loading, home } = useSelector((state) => state);

    useEffect(() => {
        dispatch(homeActions.getRankOnline(5));
    }, []);

    const iconSubject = (color) => {
        return ({
            backgroundColor: color,
        })
    }

    const onHandleSearch = (subject) => {
        history.push(`/search?grade=&subject=${subject}&gender=&type=&location=`)
    }

    const paddingCard = {
        paddingBottom: "1rem",
    }

    const CourseSection = () => {
        return (
            (!isEmpty(home) && !loading.loading) && (
                <Fragment>
                    <Row gutter={[16, 0]} className={`${style.marginSection}`} justify={"space-between"}>               
                            {home.onlineCourseRank && home.onlineCourseRank.map((item) => (
                                <Col align="center" xl={12} lg={12} md={12} sm={24} xs={24} key={item.id} style={paddingCard}>
                                    <CardCourseLearner data={item} verizontal="true" type="online" ranking={!screens.md ? false : true} />
                                </Col>
                            ))}
                    </Row>
                </Fragment>
            )
        )
    }
    
    return (
        <Fragment>
            {
                loading.loading && (
                    <Loading />
                )
            }
                <div>
                    {
                        <div className={style.section}>
                            <span className={style.headerTwo25}>คอร์สเรียนยอดนิยม</span>
                            <Link to="/popular/online" >
                                <u className={style.marginLeftOneHalf} style={{ color: color.black }}>ดูเพิ่มเติม</u>
                            </Link>
                        </div>
                    }
                    <Row justify={"space-between"}>
                        <Col xl={18} lg={18} md={18} sm={24} xs={24}>
                            <CourseSection />
                        </Col>

                        {
                            screens.md && (
                                <Col xl={5} lg={5} md={5} >
                                    <div className={`${style.section} ${style.marginSection}`} >
                                        <b className={style.textOne25}>ค้นหาจากรายวิชา</b>
                                        {
                                            subjectList && subjectList.map((item, index) => (
                                                <div key={index} onClick={() => onHandleSearch(item.id)}>
                                                    <Row align="middle" className={style.subjectSelect}>
                                                        <FontAwesomeIcon className={style.iconSubjectSmall} icon={item.icon} style={iconSubject(item.color)} />
                                                        <span className={`${style.textOne} ${style.marginLeftOneHalf}`}>{item.subject}</span>
                                                    </Row>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Col>
                            )
                        }
                    </Row>
                </div>
        </Fragment>
    )
}