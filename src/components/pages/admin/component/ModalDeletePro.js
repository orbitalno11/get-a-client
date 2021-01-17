import React from 'react';
import { Modal, Input, Space,Row, Col,Button } from 'antd';
import { DeleteOutlined,ExclamationCircleOutlined,SendOutlined  } from '@ant-design/icons';
import './Style.css';

const { confirm } = Modal;

function showDescription() {
  confirm({
    title: '',
    icon:'',
    content: (
      <div style={{marginTop: '50px',marginBottom: '20px',textAlign:'center',fontSize:'20px'}}>
        <p style={{textAlign:'center'}}>ยืนยันการลบโปรโมชั่น xxxxxxxx5555555555555</p>
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
function ModalDeletePro() {
  return (
    <Space>
      <Button onClick={showDescription} className="button-modalDelete"icon={<DeleteOutlined/>}>
        ลบ
      </Button>
    </Space>
  );
}
export default ModalDeletePro;