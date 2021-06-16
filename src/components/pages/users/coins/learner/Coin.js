import React, { Fragment } from "react";
import { Col, Row, Grid, Divider } from "antd";
import style from "../styles.module.scss";
import Header from "../../../../headerMobile/Header";
import isMobile from "../../../../isMobile/isMobile";
const { useBreakpoint } = Grid;

export default function Coin() {
  const screens = useBreakpoint();

  return (
    <Fragment>
      {isMobile() && <Header title="ร้านค้า" />}
        <Row className={style.container}>
          {screens.md && (
            <Col md={3} lg={3} xl={2}>
              <Divider
                type="vertical"
                style={{ height: "100%", marginLeft: "3rem" }}
              />
            </Col>
          )}
        </Row>
    </Fragment>
  );
}