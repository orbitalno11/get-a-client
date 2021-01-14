import React, { Fragment } from 'react'
import { Typography, Image } from 'antd';
import {
    faCoins,
    faMapMarkerAlt,
    faBookReader
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../../styles.module.scss'

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
                <Title level={3} className={style.marginLeft}>พิคาชู <br /> หนูเทพซาโตชิ</Title>
            </div>
            <div className={style.subProfile}>
                <Title level={5}>เหรียญของคุณ</Title>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faCoins} className={style.iconcoin} />
                    <span>dddddddddddddddddddddd</span>
                </div>
            </div>
            <div className={style.subProfile}>
                <Title level={5}>สถานที่สะดวกเรียน</Title>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className={style.iconmarker} />
                    <span>dd</span>
                </div>
            </div>
            <div className={style.subProfile}>
                <Title level={5}>ช่องทางติดต่อ</Title>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faBookReader} className={style.iconcoin} />
                    <span>dd</span>
                </div>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faBookReader} className={style.iconcoin} />
                    <span>dd</span>
                </div>
            </div>
        </Fragment>
    )
}
