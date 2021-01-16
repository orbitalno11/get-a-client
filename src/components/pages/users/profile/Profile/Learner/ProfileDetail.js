import React, { Fragment } from 'react'
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
const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function ProfileDetail() {
    const screens = useBreakpoint();
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
                        <Title level={3} className={style.marginLeft}>พิคาชู <br /> หนูเทพซาโตชิ </Title>

                    </Badge>
                </NavLink>
            </div>
            <div className={style.subProfile}>
                <div className={style.TitleCoin}>
                    <Title level={5}>เหรียญของคุณ</Title>
                </div>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faCoins} className={style.iconcoin} />
                    <span>100,000 เหรียญ</span>
                    <div className={style.floatLeft}>
                        <Button className="backgroupYello buttonColor" shape="round" size="middle" style={{width:'100px'}}>ซื้อเหรียญ</Button>
                    </div>
                </div>
            </div>
            <div className={style.subProfile}>
                <Title level={5}>สถานที่สะดวกเรียน</Title>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className={style.iconmarker} />
                    <span>บางมด, กทม.</span>
                    {
                        screens.md ? null :
                        <div className={style.floatLeft}>
                            <NavLink to="/learner/profile/edit/map">
                                    <Button className="backgroupBlue buttonColor" shape="round" size="middle" style={{width:'100px'}}>แก้ไข</Button>
                            </NavLink>
                            </div>
                    }
                </div>
            </div>
            <div className={style.subProfile}>
                <Title level={5}>ช่องทางติดต่อ</Title>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faBookReader} className={style.iconcoin} />
                    <span>Picacha</span>
                </div>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faBookReader} className={style.iconcoin} />
                    <span>Picacha.Line</span>
                </div>
            </div>
        </Fragment>
    )
}
