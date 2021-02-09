import React, {Fragment} from "react"
import { Col, Row, Grid} from "antd"
import style from "../styles.module.scss"
import PaymentDetail from "./PaymentDetail"
import Header from "../../../../headerMobile/Header"
const { useBreakpoint } = Grid;

export default function Payment() {
    const screens = useBreakpoint();


    return (
        <Fragment>
            {screens.xs || (screens.sm && !screens.md) ? <Header pageBack="/coin"  /> : null}
            <Row className={style.body}>
                <Col xs={24} sm={24} md={11} lg={9} xl={8} >
                    <PaymentDetail />
                </Col>
            </Row>
        </Fragment>
    )
}
