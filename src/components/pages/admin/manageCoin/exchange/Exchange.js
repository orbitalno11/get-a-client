import React, { Fragment } from "react";
import { Row, Col } from "antd";
import Promotion from "./promotions/Promotion";
import CreatePrice from "./prices/CreatePrice";
import Loading from "../../../../loading/Loading";
import { useSelector } from "react-redux";

export default function Exchange() {
  const { loading } = useSelector((state) => state);
  return (
    <Fragment>
      {loading.loading && <Loading />}
      <Row>
        <Col span={24}>
          <CreatePrice type="rate"/>
        </Col>
        <Col span={24} style={{ paddingTop: "2rem" }}>
          <CreatePrice />
        </Col>
        <Col span={24} style={{ paddingTop: "2rem" }}>
          <Promotion />
        </Col>
      </Row>
    </Fragment>
  );
}
