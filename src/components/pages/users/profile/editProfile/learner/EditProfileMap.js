import { Button, Col, Row, Typography } from 'antd';
import React from 'react'
import style from '../../styles.module.scss'
import {
    faCrosshairs
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { Title } = Typography;

export default function EditProfileMap({ refs }) {
    return (
        <div className={refs ? style.paddingbody : style.paddingEdit}>
            <div className={refs ? style.body : style.TitleCoin}>
                <Title level={4}>สถานที่ปัจจุบัน</Title>
                <div className={style.floatLeft}>
                    <Button className="buttonColor backgroupBlue" size="middle" shape="round" >ใช้ที่อยู่นี้</Button>
                </div>
            </div>
            <div className={style.subTitle}>
                <FontAwesomeIcon icon={faCrosshairs} className={style.iconMap} />
                <span >126 ถ.ประชาอุทิศ แขวงบางมด เขตทุ่งครุ กทม.</span>
            </div>
            <div className={refs ? style.body : style.TitleCoin}>
                <Title level={4}>เลือกจากแผนที่</Title>
            </div>
        </div>
    )
}
