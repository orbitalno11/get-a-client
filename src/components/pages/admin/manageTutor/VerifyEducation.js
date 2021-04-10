import { Row, Col, Table, Tag, Space } from 'antd';
import React from 'react';
import './Style.less';

const columns = [
  {
    title: 'วันที่แก้ไข',
    dataIndex: 'date',
    key: 'date',
    render: text => <p style={{textAlign:'center'}}>{text}</p>,
  },
  {
    title: 'อัตราการแลกเปลี่ยนต่อ 1 coin',
    dataIndex: 'ratecoin',
    key: 'ratecoin',
    render: text => <p style={{textAlign:'center'}}>{text}</p>,
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

function VerifyEducation() {
  return (
    <div>
      <Row style={{ marginLeft: '30px' }}>
        <Col span={24}>
          <p style={{ color: '#F5732E' }}>แก้ไข</p>
        </Col>
        <Col span={24} style={{ fontSize: '17px', marginTop: '15px' }}>
          อัตราการแลกเปลี่ยนปัจจุบัน
        </Col>
        <div className="rate-coin">1 coin = 2 บาท</div>
        <Col span={24} style={{ fontSize: '17px', marginTop: '3%' }}>
          ประวัติอัตราการแลกเปลี่ยน
        </Col>
      </Row>
      <Table
          columns={columns}
          dataSource={data}
          style={{ marginLeft: '30px', marginTop: '2%',width:'50%'}}
        />
    </div>
  );
}

export default VerifyEducation;
