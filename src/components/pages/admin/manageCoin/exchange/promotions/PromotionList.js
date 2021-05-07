import React from "react";
import { Collapse, Space, Row, Col } from "antd";
import style from "../../styles.module.scss";
import AddList from "./detailList/AddList";
import TableList from "./detailList/TableList";
import DeletePromotion from "./DeletePromotion";
import EditPromotion from "./EditPromotion";

const { Panel } = Collapse;

export default function PromotionList() {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Collapse>
        <Panel header="โปรโมชั่น 12.12">
          <Col span={24} style={{ marginBottom: "1rem"}}>
              <AddList />
          </Col>
          <Row style={{ marginLeft: "3rem" }}>
            <Col span={2}>วันที่เริ่มต้น </Col>
            <Col span={8}>
              <p className={style.datetime}>12/12/2564</p>
            </Col>
            <Col span={2} style={{ marginLeft: "2rem" }}>
              วันที่สิ้นสุด
            </Col>
            <Col span={8}>
              <p className={style.datetime}>12/13/2564</p>
            </Col>
          </Row>
          <Row style={{ marginLeft: "3rem", marginTop: "1rem" }}>
            <Col span={2}>เวลาเริ่มต้น </Col>
            <Col span={8}>
              <p className={style.datetime}>00.00</p>
            </Col>
            <Col span={2} style={{ marginLeft: "2rem" }}>
              เวลาสิ้นสุด
            </Col>
            <Col span={8}>
              <p className={style.datetime}>00.00</p>
            </Col>
            <Col span={21}>
                <TableList />
            </Col>
          </Row>
          <Row className={style.promotion}>
            <Col md={6}  lg={5}  xl={3}>
              <EditPromotion />
            </Col>
            <Col>
              <DeletePromotion />
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </Space>
  );
}
