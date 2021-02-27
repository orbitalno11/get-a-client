import { Image, Row, Col, Typography, Grid, Button } from "antd"
import React, { Fragment, useEffect, useState } from "react"
import profileSample from "../../../../../../images/profile.webp"
import style from "../../../styles.module.scss"
import {
    faInfo,
    faHeart
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const { useBreakpoint } = Grid;
const { Title } = Typography;

export default function ProfileIntroduce({ mainPage }) {
    const screens = useBreakpoint();
    const data = useSelector(state => state.profile)
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        setProfile(data.profileHandle)
    }, [data])

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
                        ((screens.sm && !screens.md)|| screens.xs )  &&
                        (
                            <div className={style.infogroup}>
                                {
                                    mainPage &&
                                    (
                                        <NavLink to={`/profile/tutor/history/${1}`}>
                                            <Button className={style.infoButton} shape="circle" icon={<FontAwesomeIcon icon={faInfo} />} />
                                        </NavLink>
                                    )
                                }
                                <Button className={style.colorGray} shape="circle" icon={<FontAwesomeIcon icon={faHeart} style={{ fontSize: "19pt" }} />} />
                            </div>
                        )
                    }
                </Col>
                <Col lg={17} md={17} sm={24} xs={24} className={screens.xs || (screens.sm && !screens.md) ? style.marginTop20 : style.columnJustify}>
                    {
                        profile &&
                        (
                            <Title className={screens.xs || (screens.sm && !screens.md) ? style.textAlign : null} level={3}>
                                {profile.firstname}  {profile.lastname}
                            </Title>
                        )
                    }

                    <span className={screens.xs || (screens.sm && !screens.md) ? style.textAlign : null}>
                        {
                            profile && profile.introduction
                        }
                    </span>
                </Col>
            </Row>
        </Fragment>
    )
}
