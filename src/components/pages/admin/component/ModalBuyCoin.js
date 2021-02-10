import React from "react";
import { Modal, Input, Space, Row, Col } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import "./Style.css";

const { confirm } = Modal;

function showDescription() {
  confirm({
    title: "เพิ่มอัตราการแลกเปลี่ยนเหรียญ",
    icon: <PlusCircleOutlined style={{ color:'DodgerBlue' }}/>,
    content: (
      <div
        style={{
          marginTop: "50px",
          marginBottom: "20px",
          textAlign: "center",
          fontSize: "20px",
        }}
      >
        <Row>
          <Col>
            <Input
              placeholder="bath"
              bordered={false}
              style={{ textAlign: "center", fontSize: "20px" }}
            />
          </Col>
          <Col>บาท</Col>
          <Col>
            <Input
              placeholder="coin"
              bordered={false}
              style={{ textAlign: "center", fontSize: "20px" }}
            />
          </Col>
          <Col>coins</Col>
        </Row>
      </div>
    ),
    okText: "ยืนยัน",
    // okType: 'success',
    cancelText: "ยกเลิก",
    onOk() {
      console.log("Ok");
    },
    onCancel() {
      console.log("Cancel");
    },
    width: 750,
  });
}
function ModalBuyCoin() {
  return (
    <Space>
      <p
        onClick={showDescription}
        style={{ color: "#F5732E", textDecorationLine: "underline",fontSize:'14px' }}
      >
        เพิ่มการซื้อเหรียญ
      </p>
    </Space>
  );
}
export default ModalBuyCoin;
