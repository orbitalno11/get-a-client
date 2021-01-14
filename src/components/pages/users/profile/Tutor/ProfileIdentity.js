import React, { Fragment } from 'react'
import { Col, Row, Grid, Typography, Button, Divider } from 'antd'
import style from '../styles.module.scss'
import {
    faCheck, faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                    <Button className={style.floatLeft}>dd</Button>
                </div>
            </div>

            <div >
                <Row className={screens.md ? style.marginTop20 : style.subTitle} >
                    <Col>
                    <Title level={screens.md ? 4 : 5}>เกียรติประวัติ  </Title> 
                    </Col>
                    <Col>
                    <Button className={style.floatLeft}>dd</Button>
                    </Col>
                </Row>
                
                {
                    history && history.map((item) => {
                        return (
                            <div>
                                  <div className={style.subTitle}>
                                <Button >dd</Button>
                                <div className={style.subProfile}>
                                <span>dd</span>
                                <br />
                                <span>dd</span>
                                <br />
                                <span>dd</span>
                                </div>
                                <Button className={style.floatLeft}>dd</Button>
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


{/* </div>
            <Row className={style.marginTop}>
                <Title level={4}>ประวัติ </Title>
                <Button className={style.marginLeft}>dd</Button>
            </Row>
            {
                history && history.map((item) => {
                    return (
                        <Row align="middle" className={style.marginTop}>
                            <Col md={2}>
                                <Button >dd</Button>
                            </Col>
                            <Col md={4}>
                                <Button className={style.marginLeft}>dd</Button>
                            </Col>
                            <Col md={10} className={style.marginLeft}>
                                <span>dd</span>
                                <br />
                                <span>dd</span>
                                <br />
                                <span>dd</span>
                            </Col>
                            <Col >
                                <Button className={style.floatLeft}>dd</Button>
                            </Col>
                            <Divider />
                        </Row>
                    )
                }
                )
            } */}