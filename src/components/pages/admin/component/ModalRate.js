import React from 'react';
import { Modal, Input, Space,Row, Col } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import './Style.css';

const { confirm } = Modal;

function showDescription() {
  confirm({
    title: 'แก้ไขอัตราการแลกเปลี่ยนเหรียญ',
    icon: <DollarCircleOutlined />,
    content: (
      <div style={{marginTop: '50px',marginBottom: '20px',textAlign:'center',fontSize:'20px'}}>
        <Row>
            <Col span={8}>1 coins </Col>
            <Col span={3}> =</Col>
            <Col span={9}><Input placeholder="ใส่ค่าเงิน" bordered={false} style={{textAlign:'center',fontSize:'20px'}}/></Col>
            <Col span={2}>บาท</Col>
        </Row>
      </div>
    ),
    okText: 'แก้ไขอัตรา',
    // okType: 'success',
    cancelText: 'ยกเลิก',
    onOk() {
      console.log('Ok');
    },
    onCancel() {
      console.log('Cancel');
    },
    width: 750,
  });
}
function ModalRate() {
  return (
    <Space>
      <a onClick={showDescription} style={{ color: '#F5732E' }}>
        แก้ไข
      </a>
    </Space>
  );
}
export default ModalRate;
