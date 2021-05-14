import { Image, Row, Col, Grid, Button } from "antd"
import React, { Fragment } from "react"
import profileSample from "../images/profile.webp"
import style from "./styles.module.scss"
import {
    faInfo,
    faHeart
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { SkeletonComponent } from "../loading/SkeletonComponent";

const { useBreakpoint } = Grid;

export default function HeaderVerizontal({ mainPage, review, data}) {
    const screens = useBreakpoint();

    return (
        <Fragment>
            <Row className={style.paddingbody}>
                <Col lg={4} md={6} sm={24} xs={24} className={screens.xs || (screens.sm && !screens.md) ? style.alignCenter : null} >
                    <Image
                        className={style.imageProfilePubile}
                        src={profileSample}
                        preview={false}
                    ></Image>
                    {
                        (!review &&((screens.sm && !screens.md)|| screens.xs )) &&
                        (
                            <div className={style.infogroup}>
                                {
                                    mainPage &&
                                    (

                                        <Link to={`/profile/${1}`}>
                                            <Button className={style.infoButton} shape="circle" icon={<FontAwesomeIcon icon={faInfo} />} />
                                        </Link>
                                    )
                                }
                                <Button className={style.colorGray} shape="circle" icon={<FontAwesomeIcon icon={faHeart} style={{ fontSize: "19pt" }} />} />
                            </div>
                        )
                    }
                </Col>
                <Col lg={17} md={17} sm={24} xs={24} className={screens.xs || (screens.sm && !screens.md) ? style.marginTop20 : style.columnJustify}>
                    {
                        data ?
                        (
                            <span className={screens.xs || (screens.sm && !screens.md) ? `${style.textAlign} ${style.titleH2}` : style.titleH2} >
                                {data.firstname}  {data.lastname}
                            </span>
                        ):(
                            <SkeletonComponent.SkeletonText size="default"/>
                        )
                    }
                </Col>
            </Row>
        </Fragment>
    )
}
