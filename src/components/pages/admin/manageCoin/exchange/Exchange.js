import React, { Fragment } from "react";
import { Row, Col } from "antd";
import ExchangeDetail from "./ratecoin/ExchangeDetail";
import Promotion from "./promotions/Promotion";
import Price from "./prices/Price";

export default function Exchange() {
  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <ExchangeDetail />
        </Col>
        <Col span={24} style={{paddingTop:"2rem" }}>
          <Price/>
        </Col>
        <Col span={24} style={{paddingTop:"2rem" }}>
          <Promotion />
        </Col>
      </Row>
    </Fragment>
  );
}