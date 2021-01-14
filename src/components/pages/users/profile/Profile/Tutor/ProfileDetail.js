import React, { Fragment } from 'react'
import { Typography, Image, Button, Badge } from 'antd';
import {
    faCoins,
    faMapMarkerAlt,
    faBookReader,
    faEdit
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../../styles.module.scss'
import { NavLink } from 'react-router-dom';

const { Title } = Typography;
export default function ProfileDetail() {
    return (
        <Fragment>
            <div className={style.profileSet}>
                <Image
                    className={style.imageProfile}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    preview={false}
                />
                <NavLink to="/tutor/profile/edit">
                    <Badge className="icon-addimage" count={<FontAwesomeIcon icon={faEdit} />} offset={[18, 0]}>
                        <Title level={3} className={style.marginLeft}>พิคาชู <br /> หนูเทพซาโตชิ </Title>
                    </Badge>
                </NavLink>
            </div>
            <div className={style.subProfile}>
                <div className={style.TitleCoin}>
                    <Title level={5}>เหรียญของคุณ</Title>
                    <Button className={style.floatLeft}>dd</Button>
                </div>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faCoins} className={style.iconcoin} />
                    <span>dd</span>
                    <Button className={style.floatLeft}>dd</Button>
                </div>
            </div>
            <div className={style.subProfile}>
                <Title level={5}>สถานที่สะดวกเรียน</Title>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className={style.iconmarker} />
                    <span>dd</span>
                    <Button className={style.floatLeft}>dd</Button>
                </div>
            </div>
            <div className={style.subProfile}>
                <Title level={5}>ช่องทางติดต่อ</Title>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faBookReader} className={style.iconcoin} />
                    <span>dd</span>
                    <Button className={style.floatLeft}>dd</Button>
                </div>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faBookReader} className={style.iconcoin} />
                    <span>dd</span>
                    <Button className={style.floatLeft}>dd</Button>
                </div>
            </div>
        </Fragment>
    )
}
