import React, { Fragment } from "react";
import { Col, Row, Grid, Divider } from "antd";
import style from "../styles.module.scss";
import CoinDetail from "./CoinDetail";
import Header from "../../../../headerMobile/Header";
import Aboutcoin from "../learner/AboutCoin";
import isMobile from "../../../../isMobile/isMobile";
const { useBreakpoint } = Grid;

export default function Coin() {
  const screens = useBreakpoint();

  return (
    <Fragment>
      {isMobile() && <Header title="ร้านค้า" />}
        <Row className={style.container}>
           <Col xs={24} sm={24} md={9} lg={8} xl={8}>
              <CoinDetail/>
           </Col>
          {screens.md && (
            <Col md={3} lg={3} xl={2}>
              <Divider
                type="vertical"
                style={{ height: "100%", marginLeft: "3rem" }}
              />
            </Col>
          )}
          <Col xs={24} sm={24} md={12} lg={13} xl={14}>
            <Aboutcoin />
          </Col>
        </Row>
    </Fragment>
  );
}