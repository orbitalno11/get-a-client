import React, { useEffect } from "react";
import { Collapse, Space, Row, Col,Button } from "antd";
import style from "../../styles.module.scss";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeletePromotion from "./DeletePromotion";
import EditPromotion from "./EditPromotion";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { coinAction } from "../../../../../../redux/actions";
import isEmpty from "../../../../../defaultFunction/checkEmptyObject";
const { Panel } = Collapse;

export default function PromotionList() {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.coin.rateCoin);

  useEffect(() => {
    dispatch(coinAction.getCoinRatesAdmin());
  }, []);

  const handOnActivate = (rateId) => {
    dispatch(coinAction.activateRate(rateId));
}

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {!isEmpty(list) && list.length !== 0 && 
        list
          .filter((data) => data.type === "promo")
          .map((data, index) => (
            <Collapse key={index}>
              <Panel header={data && data.title} className={style.textOne25}>
                <Row align="end">
                    {data.active ? (
                        <Button
                          className="backgroundGreen buttonColor"
                          shape="round"
                          size="middle"
                          style={{ width: "60px" }}
                          icon={
                            <FontAwesomeIcon
                              icon={faPowerOff}
                              style={{ color: "white" }}
                            />
                          }
                          onClick={() => handOnActivate(data.id)}
                        ></Button>
                      ) : (
                        <Button
                          className="backgroundGray buttonColor"
                          shape="round"
                          size="middle"
                          style={{ width: "60px" }}
                          icon={
                            <FontAwesomeIcon
                              icon={faPowerOff}
                              style={{ color: "white" }}
                            />
                          }
                          onClick={() => handOnActivate(data.id)}
                        ></Button>
                      )}
                </Row>
                <Row style={{ marginLeft: "2rem",marginTop:"1rem" }}>
                  <Col md={4} lg={3} className={style.textOne25}>วันที่เริ่มต้น </Col>
                  <Col  md={7} lg={6} align="center">
                    <p className={`${style.datetime} ${style.textOne25}`}>
                      {moment(data.startDate).format("DD/MM/YYYY")}
                    </p>
                  </Col>
                  <Col md={4} lg={4} align="center" className={style.textOne25}>
                    วันที่สิ้นสุด
                  </Col>
                  <Col md={7} lg={6}>
                    <p className={`${style.datetime} ${style.textOne25}`}>
                      {moment(data.endDate).format("DD/MM/YYYY")}
                    </p>
                  </Col>
                </Row>
                <span className={style.headerOne35} style={{ marginLeft: "2rem"}}>อัตราการซื้อเหรียญ</span>
                <Row style={{ marginLeft: "2rem", marginTop: "1rem" }}>
                  <Col md={3} lg={3} className={style.textOne25}>ราคา </Col>
                  <Col md={6} lg={6} className={style.textOne25} align="center">
                    <p className={`${style.datetime} ${style.textOneo25}`}>
                      {data.baht}
                    </p>
                  </Col>
                  <Col md={4} lg={4} className={style.textOne25} align="center">
                    เท่ากับ
                  </Col>
                  <Col md={6} lg={6} className={style.textOne25}>
                    <p className={`${style.datetime} ${style.textOne25}`} align="center">
                      {data.coin}
                    </p>
                  </Col>
                  <Col md={4} lg={3} className={style.textOne25} align="center">เหรียญ </Col>
                </Row>
                <Row className={style.promotion}>
                  <Col md={5} lg={4} xl={2}>
                    <EditPromotion dataPromo={data}/>
                  </Col>
                  <Col>
                    <DeletePromotion  data={data} />
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          ))}
    </Space>
  );
}
