import React, { useEffect } from "react";
import { Collapse, Space, Row, Col } from "antd";
import style from "../../styles.module.scss";
import TableList from "./detailList/TableList";
import DeletePromotion from "./DeletePromotion";
import EditPromotion from "./EditPromotion";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { coinAction } from "../../../../../../redux/actions";
const { Panel } = Collapse;

export default function PromotionList() {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.coin.rateCoin);

  useEffect(() => {
    dispatch(coinAction.getCoinRatesAdmin());
  }, []);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {list &&
        list
          .filter((data) => data.type === "promo")
          .map((data, index) => (
            <Collapse key={index}>
              <Panel header={data && data.title}>
                <Row style={{ marginLeft: "3rem" }}>
                  <Col span={2} className={style.textNormal}>วันที่เริ่มต้น </Col>
                  <Col span={8}>
                    <p className={`${style.datetime} ${style.textNormal}`}>
                      {moment(data.startDate).format("DD/MM/YYYY")}
                    </p>
                  </Col>
                  <Col span={2} style={{ marginLeft: "2rem" }} className={style.textNormal}>
                    วันที่สิ้นสุด
                  </Col>
                  <Col span={8}>
                    <p className={`${style.datetime} ${style.textNormal}`}>
                      {moment(data.endDate).format("DD/MM/YYYY")}
                    </p>
                  </Col>
                </Row>
                <Row style={{ marginLeft: "3rem", marginTop: "1rem" }}>
                  <Col span={2} className={style.textNormal}>เวลาเริ่มต้น </Col>
                  <Col span={8} className={style.textNormal}>
                    <p className={`${style.datetime} ${style.textNormal}`}>
                      {moment(data.startDate).format("HH:mm")}
                    </p>
                  </Col>
                  <Col span={2} style={{ marginLeft: "2rem" }} className={style.textNormal}>
                    เวลาสิ้นสุด
                  </Col>
                  <Col span={8} className={style.textNormal}>
                    <p className={`${style.datetime} ${style.textNormal}`}>
                      {moment(data.endDate).format("HH:mm")}
                    </p>
                  </Col>
                  <Col span={21}>
                    <TableList data={data} />
                  </Col>
                </Row>
                <Row className={style.promotion}>
                  <Col md={6} lg={5} xl={3}>
                    <EditPromotion />
                  </Col>
                  <Col>
                    <DeletePromotion />
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          ))}
    </Space>
  );
}
