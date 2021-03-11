import React, { Fragment } from "react";
import { Col, Row, Grid, Divider } from "antd";
import style from "../styles.module.scss";
import CoinDetail from "./CoinDetail";
import Header from "../../../../headerMobile/Header";
import Aboutcoin from "../learner/AboutCoin";
const { useBreakpoint } = Grid;

export default function Coin() {
  const screens = useBreakpoint();

  return (
    <Fragment>
      {(screens.xs || (screens.sm && !screens.md)) && (
        <Header title="ร้านค้า" />
      )}
      <Row className={style.body}>
        <Col xs={22} sm={15} md={11} lg={8} xl={8}>
          <CoinDetail />
        </Col>
        {screens.md && (
          <Col md={2} lg={2} xl={2}>
            <Divider
              type="vertical"
              style={{ height: "100%", marginLeft: "3rem" }}
            />
          </Col>
        )}
        <Col xs={24} sm={24} md={11} lg={13} xl={14}>
          <Aboutcoin />
        </Col>
      </Row>
    </Fragment>
  );
}
