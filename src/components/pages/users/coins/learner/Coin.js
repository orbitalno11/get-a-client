import React, { Fragment, useEffect } from "react";
import { Col, Row, Grid, Divider } from "antd";
import style from "../styles.module.scss";
import CoinDetail from "./CoinDetail";
import Header from "../../../../headerMobile/Header";
import Aboutcoin from "../learner/AboutCoin";
import isMobile from "../../../../isMobile/isMobile";
import { useDispatch, useSelector } from "react-redux";
import { coinAction } from "../../../../../redux/actions";
const { useBreakpoint } = Grid;

export default function Coin() {
  const screens = useBreakpoint();

  const dispatch = useDispatch();

  const list = useSelector((state) => state.coin.rateCoin);

  const loading = useSelector((state) => state.loading.loading);

  useEffect(() => {
    dispatch(coinAction.getCoinRatesLearner());
  }, []);

  return (
    <Fragment>
      {isMobile() && <Header title="ร้านค้า" />}
      {!loading ? (
        <Row className={style.body}>
          {list &&
            list
              .map((data, index) => (
                <Col xs={24} sm={24} md={9} lg={8} xl={8} key={index}>
                  <CoinDetail data={data} />
                </Col>
              ))}
          {screens.md && (
            <Col md={3} lg={2} xl={2}>
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
      ) : (
        <div className={style.loader}></div>
      )}
    </Fragment>
  );
}
