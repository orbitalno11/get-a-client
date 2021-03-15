import React, { Fragment } from "react";
import { Grid, Row, Col,Button,Divider } from "antd";
import { faCoins, faCheck,faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableList from "./TableList";
import style from "../styles.module.scss";

const { useBreakpoint } = Grid;

export default function RedeemList() {
  const screens = useBreakpoint();
  return (
    <Fragment>
      {screens.xs || (screens.sm && !screens.md) ? (
        <div className={style.pageredeemsm}>
          <div style={{ paddingTop: "1.8rem" }}>
            <Row>
              <Col xs={4} sm={8}>
                <FontAwesomeIcon icon={faCoins} className={style.Xs} />
              </Col>
              <Col xs={16} sm={16}>
                10,000 เหรียญ
              </Col>
            </Row>
            <Row style={{ paddingTop: "0.3rem" }}>
              <Col xs={4} sm={8}>
                <span className={style.titleH5}>THB</span>
              </Col>
              <Col xs={16} sm={16}>
                10,000 เหรียญ
              </Col>
            </Row>
            <Row style={{ paddingTop: "0.2rem", marginTop: "-0.5rem" }}>
              <Col xs={5} sm={8}>
                วันที่ขอ
              </Col>
              <Col xs={16} sm={16}>
                30/12/2563
              </Col>
            </Row>
            <Row style={{ paddingTop: "0.2rem" }}>
              <Col xs={9} sm={8}>
                วันที่พิจารณา
              </Col>
              <Col xs={15} sm={16}>
               04/01/2564
              </Col>
            </Row>
            <Row style={{ paddingTop: "0.2rem" }}>
              <Col xs={7} sm={8}>
                วันที่อนุมัติ
              </Col>
              <Col xs={16} sm={16}>
              04/01/2564
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col className={style.allow}>
                <Button
                  className="backgroundRed buttonColor"
                  shape="circle"
                  icon={
                    <FontAwesomeIcon icon={faTimes} style={{ color: "white" }} />
                  }
                />
              </Col>
            </Row>
          </div>
          <Divider/>
          <div style={{ paddingTop: "1rem" }}>
            <Row>
              <Col xs={4} sm={8}>
                <FontAwesomeIcon icon={faCoins} className={style.Xs} />
              </Col>
              <Col xs={16} sm={16}>
                10,000 เหรียญ
              </Col>
            </Row>
            <Row style={{ paddingTop: "0.3rem" }}>
              <Col xs={4} sm={8}>
                <span className={style.titleH5}>THB</span>
              </Col>
              <Col xs={16} sm={16}>
                10,000 เหรียญ
              </Col>
            </Row>
            <Row style={{ paddingTop: "0.2rem", marginTop: "-0.5rem" }}>
              <Col xs={5} sm={8}>
                วันที่ขอ
              </Col>
              <Col xs={16} sm={16}>
                30/12/2563
              </Col>
            </Row>
            <Row style={{ paddingTop: "0.2rem" }}>
              <Col xs={9} sm={8}>
                วันที่พิจารณา
              </Col>
              <Col xs={15} sm={16}>
                04/01/2564
              </Col>
            </Row>
            <Row style={{ paddingTop: "0.2rem" }}>
              <Col xs={7} sm={8}>
                วันที่อนุมัติ
              </Col>
              <Col xs={16} sm={16}>
              04/01/2564
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col className={style.allow}>
                <Button
                  className="backgroundGreen buttonColor"
                  shape="circle"
                  icon={
                    <FontAwesomeIcon icon={faCheck} style={{ color: "white" }} />
                  }
                />
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <TableList />
      )}
    </Fragment>
  );
}
