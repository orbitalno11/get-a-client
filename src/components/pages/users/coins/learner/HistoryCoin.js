import React, { Fragment } from "react";
import { Row } from "antd";
import style from "../styles.module.scss";
import HistoryDetails from "./HistoryDetails";
import Header from "../../../../headerMobile/Header";
import ResponseMobile from "../../../../response/ResponseMobile";

export default function HistoryCoin() {

  return (
    <Fragment>
       {ResponseMobile() && <Header title="ประวัติการซื้อเหรียญ" pageBack="/learner/1" />}
      <Row className={style.body}>
          <HistoryDetails />
      </Row>
    </Fragment>
  );
}
