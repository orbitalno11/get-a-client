
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

export default function Home() {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loading)
    const { offlineCourseRank, onlineCourseRank } = useSelector(state => state.home)

    useEffect(() => {
        dispatch(homeActions.getRank())
        dispatch(homeActions.getRankOnline())
    }, [])

    // const renderSlides = () => {
    //     let size = !screens.xs ? screens.md ? 6 : 5 : 3
    //     const chunksSubject = chunksArray(subject, size)
    //     return (
    //         chunksSubject && chunksSubject.map((item, index) => (
    //             <div key={index}>
    //                 {
    //                     item && item.map((item1, index) => (
    //                         <Fragment key={index}>
    //                             <Button className={style.button}>
    //                                 <FontAwesomeIcon className={style.iconSmall} icon={item1.icon} style={{ backgroundColor: item1.color, fontSize: "10pt" }} />
    //                                 <p>{item1.subject}</p>
    //                             </Button>
    //                         </Fragment>
    //                     ))
    //                 }
    //             </div>
    //         ))
    //     )
    // }

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
                <div className={style.paddingTop}>
                    {/* {
                        screens.lg ?
                            (
                                <div className={style.subjectMenu}>
                                    {
                                        subject && subject.map((item, index) => {
                                            return (
                                                <div key={index} style={{ width: "100px" }}>
                                                    <Button className={style.button}>
                                                        <FontAwesomeIcon className={style.iconlarge} icon={item.icon} style={{ backgroundColor: item.color, fontSize: "10pt" }} />
                                                        <p>{item.subject}</p>
                                                    </Button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) :
                            (
                                <div className={style.Slide}>
                                    <SliderComponent dot={true} item={renderSlides()} />
                                </div>
                            )
                    } */}
                </div>
                <div className={!isMobile() ? "container" : "" }>
                    {/* For Offline Course */}
                    <CourseComponet title="ครูสอนพิเศษยอดนิยม" array={offlineCourseRank} type="course" />
                    {/* For Online Course */}
                    <div className={style.marginSection}>
                    <CourseComponet title="คอร์สเรียนออนไลน์ยอดนิยม" array={onlineCourseRank} type="online" />
                    </div>
                   
                </div>
            </div>
        </Fragment>
    )
}
