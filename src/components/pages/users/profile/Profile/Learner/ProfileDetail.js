import React, { Fragment, useEffect, useState } from 'react'
import { Typography, Image, Badge, Button, Grid } from 'antd';
import {
    faCoins,
    faMapMarkerAlt,
    faBookReader,
    faEdit
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../../styles.module.scss'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function ProfileDetail() {
    const screens = useBreakpoint();
    const profile = useSelector(state => state.profile)
    const [profileDetail, setProfileDetail] = useState(null)

    useEffect(() => {
        if (profile.profile) {
            setProfileDetail(profile.profile)
        }
    }, [profile])

    return (
        <Fragment>
            <div className={style.profileSet}>
                <Image
                    className={style.imageProfile}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    preview={false}
                />
                <NavLink to="/learner/profile/edit">
                    <Badge className="icon-addimage" count={<FontAwesomeIcon icon={faEdit} />} offset={[18, 0]}>
                        <Title level={3} className={style.marginLeft}>{profileDetail && profileDetail.firstname}  {profileDetail && profileDetail.lastname}</Title>
                    </Badge>
                </NavLink>
            </div>
            <div className={style.subProfile}>
                <div className={style.TitleCoin}>
                    <Title level={5}>เหรียญของคุณ</Title>
                </div>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faCoins} className={style.iconcoin} />
                    <span>{profileDetail && profileDetail.coin}</span>
                    <div className={style.floatLeft}>
                        <Button className="backgroundYellow buttonColor" shape="round" size="middle" style={{ width: '100px' }}>ซื้อเหรียญ</Button>
                    </div>
                </div>
            </div>
            <div className={style.subProfile}>
                <Title level={5}>สถานที่สะดวกเรียน</Title>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className={style.iconmarker} />
                    <span>{profileDetail && profileDetail.place}</span>
                    {
                        !screens.md &&
                        (
                            <div className={style.floatLeft}>
                                <NavLink to="/learner/profile/edit/map">
                                    <Button className="backgroundBlue buttonColor" shape="round" size="middle" style={{ width: '100px' }}>แก้ไข</Button>
                                </NavLink>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={style.subProfile}>
                <Title level={5}>ช่องทางติดต่อ</Title>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faBookReader} className={style.iconcoin} />
                    <span>{profileDetail && profileDetail.contact.facebook}</span>
                </div>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faBookReader} className={style.iconcoin} />
                    <span>{profileDetail && profileDetail.contact.facebook}</span>
                </div>
            </div>
        </Fragment>
    )
}
