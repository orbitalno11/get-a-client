import React from 'react';
import { Modal, Input, Space,Row, Col,Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import './Style.css';

const { confirm } = Modal;

function showDescription() {
  confirm({
    title: 'แก้ไขการซื้อเหรียญ',
    icon: <EditOutlined/>,
    content: (
      <div style={{marginTop: '50px',marginBottom: '20px',textAlign:'center',fontSize:'20px'}}>
        <Row>
            <Col><Input placeholder="bath" bordered={false} style={{textAlign:'center',fontSize:'20px'}}/></Col>
            <Col>บาท</Col>
            <Col><Input placeholder="coin" bordered={false} style={{textAlign:'center',fontSize:'20px'}}/></Col>
            <Col>coins</Col>
        </Row>

      </div>
    ),
    okText: 'ยืนยัน',
    // okType: 'success',
    cancelText: 'ยกเลิก',
    onOk() {
        // todo onOk
    },
    onCancel() {
        // todo onCancel
    },
    width: 750,
  });
}
function ModalEdit() {
  return (
    <Space>
      <Button onClick={showDescription} className="button-modalEdit" icon={<EditOutlined />}>
        แก้ไข
      </Button>
    </Space>
  );
}
export default ModalEdit;
