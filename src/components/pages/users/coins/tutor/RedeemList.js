import React, { Fragment } from "react";
import { Row, Col,Button,Divider } from "antd";
import { faCoins,faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../styles.module.scss";

export default function RedeemList() {
  return (
    <Fragment>
        <div className={style.pageredeemsm}>
          <div style={{ paddingTop: "0.5rem" }}>
            <Row>
              <Col xs={4} sm={8} className={style.centerPage}>
                <FontAwesomeIcon icon={faCoins} className={style.Xs} />
              </Col>
              <Col xs={16} sm={16}>
              <span className={style.textOne5}>10,000 เหรียญ</span>
              </Col>
              <Col align="end" xs={4} sm={4} >
                <Button
                    className="backgroundRed buttonColor"
                    shape="circle"
                    icon={
                      <FontAwesomeIcon icon={faTimes} style={{ color: "white" }} />
                    }
                  />              
              </Col>
            </Row>
            <Row style={{ paddingTop: "0.3rem" }}>
              <Col xs={4} sm={8}>
                <span className={style.headerOne5}>THB</span>
              </Col>
              <Col xs={16} sm={16}>
              <span className={style.textOne5}>100</span>
              </Col>
            </Row>
            <Row style={{ marginTop: "0.2rem" }}>
              <Col xs={24} sm={8}>
                <span className={style.textOne5}>วันที่ขอ : 30/12/2563</span>
              </Col>
            </Row>
            <Row style={{ paddingTop: "0.2rem" }}>
              <Col xs={24} sm={8}>
              <span className={style.textOne5}>วันที่พิจารณา : 04/01/2564</span>
              </Col>
            </Row>
            <Row style={{ paddingTop: "0.2rem" }}>
              <Col xs={24} sm={8}>
              <span className={style.textOne5}>วันที่อนุมัติ : 04/01/2564</span>
              </Col>
            </Row>
          </div>
          <Divider/>
        </div>
    </Fragment>
  );
}
