import { faAmilia } from "@fortawesome/free-brands-svg-icons"
import {
    faSquareRootAlt,
    faInfinity,
    faAtom,
    faDna,
    faMicroscope,
    faGlobeAsia,
    faBookOpen
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Grid } from "antd"
import React, { Fragment } from "react"
import { chunksArray, SliderComponent } from "../../../../slider/SliderComponent"
import style from "../styles.module.scss"
import CourseComponet from "./CourseComponet"
import Header from "../../../../headerMobile/Header"
import responseMobile from "../../../../response/ResponseMobile"
const { useBreakpoint } = Grid;

export default function Home() {
    const screens = useBreakpoint();

    const subject = [
        {
            subject: "คณิตศาสตร์",
            link: "",
            icon: faSquareRootAlt,
            color: "#F7D7C2"
        },
        {
            subject: "คณิตศาสตร์2",
            link: "",
            icon: faInfinity,
            color: "#F7D7C2"
        },
        {
            subject: "วิทยาศาสตร์",
            link: "",
            icon: faMicroscope,
            color: "#F7D7C2"
        },
        {
            subject: "ชีววิทยา",
            link: "",
            icon: faDna,
            color: "#F7D7C2"
        },
        {
            subject: "เคมี",
            link: "faFlask",
            icon: faAtom,
            color: "#F7D7C2"
        },
        {
            subject: "ฟิสิกส์",
            link: "",
            icon: faAtom,
            color: "#F7D7C2"
        },
        {
            subject: "อังกฤษ",
            link: "",
            icon: faAmilia,
            color: "#F7D7C2"
        },
        {
            subject: "สังคมศึกษา",
            link: "",
            icon: faGlobeAsia,
            color: "#F7D7C2"
        },
        {
            subject: "ภาษาไทย",
            link: "",
            icon: faBookOpen,
            color: "#F7D7C2"
        },
    ]

    const courseTutor = [
        {
            name: "1 หนูเทพซาโตชิ",
            place: "บางมด, ทุ่งครุ",
            subject: "ชีววิทยา",
            date: "1 มกราคม 2563"
        },
        {
            name: "2 พิคาชู",
            place: "บางมด, ทุ่งครุ",
            subject: "ชีววิทยา",
            date: "1 มกราคม 2563"
        },
        {
            name: "3 หนูเทพซาโตชิ",
            place: "บางมด, ทุ่งครุ",
            subject: "ชีววิทยา",
            date: "1 มกราคม 2563"
        },
        {
            name: "4 พิคาชู หนูเทพซาโตชิ",
            place: "บางมด, ทุ่งครุ",
            subject: "ชีววิทยา",
            date: "1 มกราคม 2563"
        },
        {
            name: "5 หนูเทพซาโตชิ",
            place: "บางมด, ทุ่งครุ",
            subject: "ชีววิทยา",
            date: "1 มกราคม 2563"
        },
        {
            name: "6 พิคาชู หนูเทพซาโตชิ",
            place: "บางมด, ทุ่งครุ",
            subject: "ชีววิทยา",
            date: "1 มกราคม 2563"
        }
    ]


    const courseTutor1 = [
        {
            name: "1 หนูเทพซาโตชิ",
            place: "บางมด, ทุ่งครุ",
            subject: "ชีววิทยา",
            date: "1 มกราคม 2563"
        },
        {
            name: "2 พิคาชู",
            place: "บางมด, ทุ่งครุ",
            subject: "ชีววิทยา",
            date: "1 มกราคม 2563"
        },
        {
            name: "3 หนูเทพซาโตชิ",
            place: "บางมด, ทุ่งครุ",
            subject: "ชีววิทยา",
            date: "1 มกราคม 2563"
        },
        {
            name: "4 พิคาชู หนูเทพซาโตชิ",
            place: "บางมด, ทุ่งครุ",
            subject: "ชีววิทยา",
            date: "1 มกราคม 2563"
        },
        {
            name: "5 หนูเทพซาโตชิ",
            place: "บางมด, ทุ่งครุ",
            subject: "ชีววิทยา",
            date: "1 มกราคม 2563"
        },
        {
            name: "6 พิคาชู หนูเทพซาโตชิ",
            place: "บางมด, ทุ่งครุ",
            subject: "ชีววิทยา",
            date: "1 มกราคม 2563"
        }
    ]

    const renderSlides = () => {
        let size = !screens.xs ? screens.md ? 6 : 5 : 4
        const chunksSubject = chunksArray(subject, size)
        return (
            chunksSubject && chunksSubject.map((item, index) => (
                <div key={index}>
                    {
                        item && item.map((item1, index) => (
                            <Fragment key={index}>
                                <Button className={style.button}>
                                    <FontAwesomeIcon className={style.iconSmall} icon={item1.icon} style={{ backgroundColor: item1.color, fontSize: "10pt" }} />
                                    <p>{item1.subject}</p>
                                </Button>
                            </Fragment>
                        ))
                    }
                </div>
            ))
        )
    }

    return (
        <Fragment >
            {responseMobile() && <Header title="โปรไฟล์" />}
            <div className={style.paddingBottomBody}>
                <div className={style.banner}>
                    ติวเตอร์ที่ใช่ สถานที่ที่ชอบ คุณภาพการสอนที่ลงตัว
                </div>
                <div className={style.paddingTop}>
                    {
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
                    }
                </div>
                <div className={style.paddingBody}>
                    <CourseComponet title="ติวเตอร์ยอดนิยม" link="/" array={courseTutor} />
                </div>

                <div className={style.paddingBody}>
                    <CourseComponet title="คอร์สเรียนยอดนิยม" link="/" array={courseTutor1} />
                </div>
            </div>
        </Fragment>
    )
}
