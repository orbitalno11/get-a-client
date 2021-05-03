import React, { Fragment } from "react";
import { Row, Grid } from "antd";
import style from "../styles.module.scss";
import HistoryDetails from "./HistoryDetails";
import Header from "../../../../headerMobile/Header";
const { useBreakpoint } = Grid;

export default function Historycoin() {
  const screens = useBreakpoint();

  return (
    <Fragment>
      {(screens.xs || (screens.sm && !screens.md)) && (
        <Header title="ประวัติการซื้อเหรียญ" pageBack="/learner/1" />
      )}
      <Row className={style.body}>
          <HistoryDetails />
      </Row>
    </Fragment>
  );
}
