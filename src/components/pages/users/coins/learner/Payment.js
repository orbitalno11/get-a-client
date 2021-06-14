import React, { Fragment } from "react";
import { Col, Row, Grid, Divider } from "antd";
import style from "../styles.module.scss";
import Header from "../../../../headerMobile/Header";
import isMobile from "../../../../isMobile/isMobile";
const { useBreakpoint } = Grid;

export default function Payment() {
  const screens = useBreakpoint();

  return (
    <Fragment>
      {isMobile() && (
        <Header pageBack="/coin" />
      )}
      {isMobile() ? (
        <Row className={style.body}>
        </Row>
      ) : (
        <Row className={style.body}>
          {screens.md && (
            <Col md={3} lg={2} xl={2}>
              <Divider
                type="vertical"
                style={{ height: "100%", marginLeft: "3rem" }}
              />
            </Col>
          )}
        </Row>
      )}
    </Fragment>
  );
}
