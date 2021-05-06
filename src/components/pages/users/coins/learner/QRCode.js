import React, { Fragment} from "react";
import { Col, Row, Grid, Image } from "antd";
import style from "../styles.module.scss";
import QR from "../../../../images/QR.webp";
import Header from "../../../../headerMobile/Header";
const { useBreakpoint } = Grid;

export default function QRCode() {
  const screens = useBreakpoint();
  return (
    <Fragment>
      {(screens.xs || (screens.sm && !screens.md)) && (
        <Header pageBack="/coinshop/payment" />
      )}
      <Row className={style.body}>
        <Col span={24} className={style.alignCenter}>
          <Image width={200} src={QR} />
        </Col>
        <Col span={24} className={style.alignCenter}>
          <span className={style.titleH4}>SCAN ME</span>
        </Col>
      </Row>
    </Fragment>
  );
}
