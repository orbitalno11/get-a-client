import React from "react";
import { Collapse, Space, Row, Col} from "antd";
import "./Style.css";
import TableCoin from "./TableCoin";
import ModalBuyCoin from "./ModalBuyCoin";
import ModalDeletePro from "./ModalDeletePro";
import ModalEditPro from "./ModalEditPro";

const { Panel } = Collapse;

function ModalRate() {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Collapse collapsible="header" defaultActiveKey={["1"]}>
        <Panel header="โปรโมชั่น 12.12" key="1">
          <Row style={{ marginLeft: "2em" }}>
            <Col span={24} style={{marginBottom:"1em"}}><ModalBuyCoin/></Col>
            <Col span={2}>วันที่เริ่มต้น </Col>
            <Col span={8}>
                <p className="datetime">12/12/2564</p>
            </Col>
            <Col span={2} style={{ marginLeft: "2em" }}>
              วันที่สิ้นสุด
            </Col>
            <Col span={8}>
                <p className="datetime">12/13/2564</p>
            </Col>
          </Row>
          <Row style={{ marginLeft: "2em",marginTop:'1em' }}>
            <Col span={2}>เวลาเริ่มต้น </Col>
            <Col span={8}>
                <p className="datetime">00.00</p>
            </Col>
            <Col span={2} style={{ marginLeft: "2em" }}>
              เวลาสิ้นสุด
            </Col>
            <Col span={8}>
                <p className="datetime">00.00</p>
            </Col>
            <Col span={21}><TableCoin /></Col>
            <Col span={24} style={{marginTop:"2em",paddingLeft:"58em"}}>
              <ModalDeletePro/>
              <ModalEditPro/>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </Space>
  );
}
export default ModalRate;
