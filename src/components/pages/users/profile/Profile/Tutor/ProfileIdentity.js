import React, { Fragment } from 'react'
import { Col, Row, Grid, Typography, Button, Divider } from 'antd'
import style from '../../styles.module.scss'
import {
    faCheck, faPlus, faGraduationCap
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
const { useBreakpoint } = Grid;
const { Title } = Typography;

export default function ProfileIdentity() {
    const screens = useBreakpoint();
    const history = [
        {
            type: 'education',
            name: 'โรงชื่อยาว',
            brance: ' วิทยาศาสตร์ - คณิตศาสตร์',
            grade: '4.00',
            status: '2'
        },
        {
            type: 'test',
            name: 'ผลสอบ O-NET',
            brance: 'คณิตศาสตร์',
            grade: '150',
            status: '0'
        },

    ]

    return (
        <Fragment>
            <div className={screens.md ? null : style.subProfile}>
                <div className={style.TitleCoin}>
                    <Title level={screens.md ? 2 : 5}>ยืนยันตัวตน </Title>
                    <Col className={style.floatLeft}>
                        <Button className="buttonColor backgroupGreen" shape="round" size="middle" style={{ width: '100px' }}>ยืนยัน</Button>
                    </Col>
                </div>
            </div>

            <div >
                <Row className={screens.md ? style.marginTop20 : style.subTitle} >
                    <Col>
                        <Title level={screens.md ? 4 : 5}>เกียรติประวัติ  </Title>
                    </Col>
                    <Col className={style.marginLeft}>
                        <NavLink to="/learner/profile/add/education">
                            <Button className="backgroupBlue buttonColor" shape="circle" icon={<FontAwesomeIcon icon={faPlus} style={{ color: 'white' }} />} />
                        </NavLink>
                    </Col>
                </Row>
                {
                    history && history.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className={style.subTitle}>
                                    <Button className="backgroupGray buttonColor" size="middle" shape="circle" icon={<FontAwesomeIcon icon={faPlus} style={{ color: 'white' }} />} />
                                    <FontAwesomeIcon className={style.iconEducation} icon={faGraduationCap} />
                                    <div className={style.subProfile}>
                                        <span>{item.name}</span>
                                        <br />
                                        <span>{item.brance}</span>
                                        <br />
                                        <span>{item.grade}</span>
                                    </div>
                                    <div className={style.floatLeft}>
                                        <span>กำลังตรวจสอบ</span>
                                    </div>
                                </div>
                                <Divider />
                            </div>
                        )
                    })
                }
            </div>
        </Fragment>
    )
}
