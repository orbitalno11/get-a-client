import React, { Fragment } from "react";
import { Row, Col,Button,Divider } from "antd";
import { faCoins,faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import style from "../styles.module.scss";
import isEmpty from "../../../../defaultFunction/checkEmptyObject";
import EmptyImage from "../../../../loading/EmptyImage";
import moment from "moment";

export default function RedeemList() {

  const detailRequest = useSelector((state) => state.coin.redeem);

  return (
    <Fragment>
        <div className={style.pageredeemsm}>
          <Row span={24} style={{marginBottom:"1rem"}}>
              <span className={style.headerOne75}>รายการแลกเหรียญ</span>
          </Row>
          {detailRequest && detailRequest.length ? (
          <div>
            {!isEmpty(detailRequest) &&
            detailRequest.map((data, index) => (
              <div style={{ paddingTop: "0.5rem" }} key={index}>
                <Row>
                  <Col xs={4} sm={8} className={style.centerPage}>
                    <FontAwesomeIcon icon={faCoins} className={style.Xs} />
                  </Col>
                  <Col xs={16} sm={16}>
                  <span className={style.textOne5}>{data && data.numberOfCoin} เหรียญ</span>
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
                  <span className={style.textOne5}>{data && data.numberOfBaht}</span>
                  </Col>
                </Row>
                <Row style={{ marginTop: "0.2rem" }}>
                  <Col xs={24} sm={8}>
                    <span className={style.textOne5}>วันที่ขอ : {moment(data.requestDate).format("DD/MM/YYYY")}</span>
                  </Col>
                </Row>
                <Row style={{ paddingTop: "0.2rem" }}>
                  <Col xs={24} sm={8}>
                  <span className={style.textOne5}>วันที่พิจารณา : {moment(data.approveDate).format("DD/MM/YYYY")}</span>
                  </Col>
                </Row>
                <Divider/>
              </div>
              ))}
            </div>
            ) : (
              <div align="center">
                <EmptyImage size="default" />
                  <p className={style.textNormal}>
                       ยังไม่มีข้อมูลการแลกเหรียญ&nbsp;
                  </p>
              </div>
            )}
        </div>
    </Fragment>
  );
}
