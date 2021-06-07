import React, { Fragment } from "react";
import { Row, Col, Divider } from "antd";
import { faCoins, faTimes, faHourglass, faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import style from "../styles.module.scss";
import isEmpty from "../../../../defaultFunction/checkEmptyObject";
import { color } from "../../../../defaultValue";
import EmptyImage from "../../../../loading/EmptyImage";
import { styleComponent } from "../../../../defaultFunction/style";
import moment from "moment";

export default function RedeemList({ onHandleChange}) {

  const detailRequest = useSelector((state) => state.coin.redeem);

  const statusRedeem = {
    0: {
      icon: faHourglass,
      color: color.yellow
    },
    1: {
      icon: faCheck,
      color: color.green
    },
    3: {
      icon: faTimes,
      color: color.red
    },
    4: {
      icon: faBan,
      color: color.red
    }
  }

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
              <div style={{ paddingTop: "0.5rem" }} key={index}  onClick={() => onHandleChange(true,data.id)}>
                <Row>
                  <Col xs={4} sm={3} className={style.centerPage}>
                    <FontAwesomeIcon icon={faCoins} className={style.Xs} />
                  </Col>
                  <Col xs={16} sm={15}>
                  <span className={style.textOne5}>{data && data.amountCoin}&nbsp; เหรียญ</span>
                  </Col>
                  <Col align="end" xs={3} sm={2} >
                    <button 
                        className={style.buttonCircle} 
                        style={styleComponent.buttonFull((!isEmpty(data.status) ) ? statusRedeem[data.status].color : color.blue)}>
                            <FontAwesomeIcon icon={statusRedeem[data.status].icon} className={style.iconSmall} />
                    </button> 
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
                  {data.approveDate ? (
                    <span className={style.textOne5}>วันที่พิจารณา : {moment(data.approveDate).format("DD/MM/YYYY")}</span>               
                  ) : (  
                    <span className={style.textOne5}>วันที่พิจารณา : - </span>
                  )}
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
