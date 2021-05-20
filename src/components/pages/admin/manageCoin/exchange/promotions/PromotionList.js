import React, { useEffect } from "react";
import { Collapse, Space, Row, Col } from "antd";
import style from "../../styles.module.scss";
import AddList from "./detailList/AddList";
import TableList from "./detailList/TableList";
import DeletePromotion from "./DeletePromotion";
import EditPromotion from "./EditPromotion";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { coinAction } from "../../../../../../redux/actions";
const { Panel } = Collapse;

export default function PromotionList() {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.coin.data);

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
                <Col span={24} style={{ marginBottom: "1rem" }}>
                  <AddList />
                </Col>
                <Row style={{ marginLeft: "3rem" }}>
                  <Col span={2}>วันที่เริ่มต้น </Col>
                  <Col span={8}>
                    <p className={style.datetime}>
                      {moment(data.startDate).format("DD/MM/YYYY")}
                    </p>
                  </Col>
                  <Col span={2} style={{ marginLeft: "2rem" }}>
                    วันที่สิ้นสุด
                  </Col>
                  <Col span={8}>
                    <p className={style.datetime}>
                      {moment(data.endDate).format("DD/MM/YYYY")}
                    </p>
                  </Col>
                </Row>
                <Row style={{ marginLeft: "3rem", marginTop: "1rem" }}>
                  <Col span={2}>เวลาเริ่มต้น </Col>
                  <Col span={8}>
                    <p className={style.datetime}>
                      {moment(data.startDate).format("HH:mm")}
                    </p>
                  </Col>
                  <Col span={2} style={{ marginLeft: "2rem" }}>
                    เวลาสิ้นสุด
                  </Col>
                  <Col span={8}>
                    <p className={style.datetime}>
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
