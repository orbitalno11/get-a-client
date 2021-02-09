import React, { Fragment } from "react";
import {Row, Grid } from "antd";
import style from "../styles.module.scss";
import HistoryDetail from "./historyDetail";
import Header from "../../../../headerMobile/Header";
const { useBreakpoint } = Grid;

export default function Payment() {
  const screens = useBreakpoint();

  return (
    <Fragment>
      {screens.xs || (screens.sm && !screens.md) ? (
        <Header title="ประวัติการซื้อเหรียญ" pageBack="/profile" />
      ) : null}
      <Row className={style.body}>
        <HistoryDetail />
      </Row>
    </Fragment>
  );
}
