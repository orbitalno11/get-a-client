import React from 'react';
import { Modal,Space,Row, Col,Button } from 'antd';
import { DeleteOutlined,ExclamationCircleOutlined,SendOutlined  } from '@ant-design/icons';
import './Style.css';

const { confirm } = Modal;

function showDescription() {
  confirm({
    title: 'ยืนยันการลบการซื้อเหรียญ',
    icon: <ExclamationCircleOutlined style={{ color: 'red' }}/>,
    content: (
      <div style={{marginTop: '50px',marginBottom: '20px',textAlign:'center',fontSize:'20px'}}>
        <Row>
            <Col span={10}>ซื้อ 100 บาท </Col>
            <Col span={3}> <SendOutlined /></Col>
            <Col span={10}>500 coin</Col>
        </Row>
      </div>
    ),
    okText: 'ยืนยัน',
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
function ModalDelete() {
  return (
    <Space>
      <Button onClick={showDescription} className="button-modalDelete"icon={<DeleteOutlined/>}>
        ลบ
      </Button>
    </Space>
  );
}
export default ModalDelete;
