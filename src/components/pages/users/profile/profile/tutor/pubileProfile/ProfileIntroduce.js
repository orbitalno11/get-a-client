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
import ResponseMobile from "../../../../../../response/ResponseMobile";

const { useBreakpoint } = Grid;
const { Title } = Typography;

export default function ProfileIntroduce({ mainPage, review}) {
    const screens = useBreakpoint();
    const data = useSelector(state => state.profile)
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        setProfile(data.profileHandle)
    }, [data])

    return (
        <Fragment>
            <Row className={style.paddingbody}>
                <Col lg={4} md={6} sm={24} xs={24} className={ResponseMobile() ? style.alignCenter : null} >
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
                                        <NavLink to={`/profile/${1}`}>
                                            <Button className={style.infoButton} shape="circle" icon={<FontAwesomeIcon icon={faInfo} />} />
                                        </NavLink>
                                    )
                                }
                                <Button className={style.colorGray} shape="circle" icon={<FontAwesomeIcon icon={faHeart} style={{ fontSize: "19pt" }} />} />
                            </div>
                        )
                    }
                </Col>
                <Col lg={17} md={17} sm={24} xs={24} className={ResponseMobile() ? style.marginTop20 : style.columnJustify}>
                    {
                        profile &&
                        (
                            <Title className={ResponseMobile() && style.textAlign } level={3}>
                                {profile.firstname}  {profile.lastname}
                            </Title>
                        )
                    }
                    <span className={ResponseMobile() && style.textAlign }>
                        {
                            (!review && profile) && profile.introduction
                        }
                    </span>
                </Col>
            </Row>
        </Fragment>
    )
}
