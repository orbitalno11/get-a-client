import React, {Fragment} from 'react'
import { Col, Row, Grid} from 'antd'
import style from '../styles.module.scss'
import CoinDetail from './CoinDetail'
import Header from '../../../../headerMobile/Header'
const { useBreakpoint } = Grid;

export default function Coin() {
    const screens = useBreakpoint();


    return (
        <Fragment>
            {screens.xs || (screens.sm && !screens.md) ? <Header title="ร้านค้า" /> : null}
            <Row className={style.body}>
                <Col xs={24} sm={24} md={11} lg={9} xl={8} >
                    <CoinDetail />
                </Col>
            </Row>
        </Fragment>
    )
}
