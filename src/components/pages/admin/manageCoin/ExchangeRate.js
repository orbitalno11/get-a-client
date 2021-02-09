import { Row, Col, Table} from 'antd';
import React from 'react';
import './Style.css';
import ModalRate from '../component/ModalRate';

const columns = [
  {
    title: "วันที่แก้ไข",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "อัตราการแลกเปลี่ยนต่อ 1 coin",
    dataIndex: "ratecoin",
    key: "ratecoin",
  },
];

const data = [
  {
    key: '1',
    date: '12/12/63',
    ratecoin: '2 บาท',
  },
  {
    key: '2',
    date: '26/12/63',
    ratecoin: '3 บาท',
  },
  {
    key: '3',
    date: '01/01/64',
    ratecoin: '4 บาท',
  },
  {
    key: '4',
    date: '08/01/64',
    ratecoin: '2 บาท',
  },
];

function ExchangeRate() {

  const ResponsiveProps = {
    xs: 24,
    sm: 8,
    md: 8,
    lg: 8,
    xl: 8,
  };
  return (
    <div {...ResponsiveProps}>
      <Row style={{ marginLeft: "30px" }}>
        <Col span={24}>
          <ModalRate/>
        </Col>
        <Col span={24} style={{ fontSize: "17px", marginTop: "15px" }}>
          อัตราการแลกเปลี่ยนปัจจุบัน
        </Col>
        <div className="rate-coin">1 coin = 2 บาท</div>
        <Col span={24} style={{ fontSize: "17px", marginTop: "3%" }}>
          ประวัติอัตราการแลกเปลี่ยน
        </Col>
      </Row>
      <Table
          columns={columns}
          dataSource={data}
          style={{ marginLeft: "30px", marginTop: "2%"}}
        />
    </div>
  );
}

export default ExchangeRate;
