import React, { Fragment } from "react";
import { Row, Col, Divider } from "antd";
import { faCoins, faTimes, faHourglass, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import style from "../styles.module.scss";
import isEmpty from "../../../../defaultFunction/checkEmptyObject";
import { color } from "../../../../defaultValue";
import EmptyImage from "../../../../loading/EmptyImage";
import moment from "moment";

export default function RedeemList({ onHandleChange }) {

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
              <div style={{ paddingTop: "0.5rem" }} key={index}  onClick={() => onHandleChange(false)}>
                <Row>
                  <Col xs={4} sm={8} className={style.centerPage}>
                    <FontAwesomeIcon icon={faCoins} className={style.Xs} />
                  </Col>
                  <Col xs={16} sm={16}>
                  <span className={style.textOne5}>{data && data.amountCoin}&nbsp; เหรียญ</span>
                  </Col>
                  <Col align="end" xs={4} sm={4} >
                    {
                      data.status === 0 && (
                        <button className={style.buttonCircle} style={{ backgroundColor: color.yellow }}>
                            <FontAwesomeIcon icon={faHourglass} className={style.iconSmall} />
                        </button> 
                      )
                    }
                    {
                      data.status === 1 && (
                        <button className={style.buttonCircle} style={{ backgroundColor: color.green }}>
                            <FontAwesomeIcon icon={faCheck} className={style.iconSmall} />
                        </button> 
                      )
                    }
                    {
                      data.status === 3 && (
                        <button className={style.buttonCircle} style={{ backgroundColor: color.red }}>
                            <FontAwesomeIcon icon={faTimes} className={style.iconSmall} />
                        </button> 
                      )
                    }
                    {
                      data.status === 4 && (
                        <button className={style.buttonCircle} style={{ backgroundColor: color.blue }}>
                            <FontAwesomeIcon icon={faTimes} className={style.iconSmall} />
                        </button> 
                      )
                    }
                  </Col>
                </Row>
                <Row style={{ paddingTop: "0.3rem" }}>
                  <Col xs={4} sm={8}>
                    <span className={style.headerOne5}>THB</span>
                  </Col>
                  <Col xs={16} sm={16}>
                  <span className={style.textOne5}>{data && data.amount}</span>
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
