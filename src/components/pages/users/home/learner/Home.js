
import React, { Fragment } from "react"
import style from "../styles.module.scss"
import CourseComponet from "./CourseComponet"
import Header from "../../../../headerMobile/Header"
import isMobile from "../../../../isMobile/isMobile"
import { useDispatch } from "react-redux"
import { homeActions } from "../../../../../redux/actions"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import Loading from "../../../../loading/Loading"
import subjectList from "../../../../defaultValue/subjectList"
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SliderComponent from "./SliderComponent"
import { useHistory } from "react-router"

export default function Home() {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loading)
    const { offlineCourseRank, onlineCourseRank } = useSelector(state => state.home)
    const screens = useBreakpoint()
    const history = useHistory()

    useEffect(() => {
        dispatch(homeActions.getRank(5))
        dispatch(homeActions.getRankOnline(5))
    }, [])

    const onHandleSearch = (subject) => {
        history.push(`/search?grade=&subject=${subject}&gender=&type=&location=`)
    }
    const data = () => {
        return (
            subjectList && subjectList.map((item, index) => {
                return (
                    <div className={`${style.fullWidth} ${style.cursor}`} align="center" key={index} onClick={() => onHandleSearch(item.id)} >
                        <FontAwesomeIcon className={style.iconlarge} icon={item.icon} style={{ backgroundColor: item.color }} />
                        <p className={style.textOne}>{item.subject}</p>
                    </div>
                )
            })
        )
    }

    return (
        <Fragment >
            {isMobile() && <Header title="หน้าหลัก" />}
            {
                loading.loading && (
                    <Loading />
                )
            }
            <div  className={style.paddingBottomBody}>
                <div className={style.banner}>
                    ติวเตอร์ที่ใช่ สถานที่ที่ชอบ คุณภาพการสอนที่ลงตัว
                </div>
                <div className="container">
                    {
                        screens.lg ? (
                            <div className={`${style.subjectMenu} ${style.section}`}>
                                {data()}
                            </div>
                        ) : (
                            <div className={`${style.section}`}>
                                <SliderComponent data={data()} />
                            </div>
                        )
                    }
                </div>
                <div className={!isMobile() ? "container" : ""}>
                    {/* For Offline Course */}
                    <div className={style.marginSection}>
                        <CourseComponet title="ครูสอนพิเศษยอดนิยม" array={offlineCourseRank} type="course" />
                    </div>
                    {/* For Online Course */}
                    <div className={style.marginSection}>
                        <CourseComponet title="คอร์สเรียนออนไลน์ยอดนิยม" array={onlineCourseRank} type="online" />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}