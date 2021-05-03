import React, { Fragment } from "react";
import { Row } from "antd";
import style from "../styles.module.scss";
import HistoryDetails from "./HistoryDetails";
import Header from "../../../../headerMobile/Header";
import responseMobile from "../../../../response/ResponseMobile";

export default function HistoryCoin() {

  return (
    <Fragment>
       {responseMobile() && <Header title="ประวัติการซื้อเหรียญ" pageBack="/learner/1" />}
      <Row className={style.body}>
          <HistoryDetails />
      </Row>
    </Fragment>
  );
}
