import React, { Fragment } from "react";
import { Row} from "antd";
import style from "../styles.module.scss";
import Header from "../../../../headerMobile/Header";
import EnrollRequestDetail from "./EnrollRequestDetail"
import isMobile from "../../../../isMobile/isMobile"

export default function EnrollRequest() {
  return (
    <Fragment>
      {isMobile() && (
        <Header title="คำขอเรียน" pageBack />
      )}
        <Row className={style.body}>       
            <EnrollRequestDetail/>
        </Row>
    </Fragment>
  );
}