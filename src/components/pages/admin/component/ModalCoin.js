import React from 'react';
import { Modal, Button, Space } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import './Style.css';

const { confirm } = Modal;

function showDescription() {
  confirm({
    title: 'คำขอการถอนเหรียญ',
    icon: <DollarCircleOutlined />,
    content: (
      <div style={{ justifyContent: 'center', marginTop: '20px' }}>
        <p>ชื่อ : พิคาจู</p>
        <p>นามสกุล : หนูเทพซาโตชิ</p>
        <p>วันที่ส่งคำขอ : 16 กุมภาพันธ์ 2560 </p>
        <p>จำนวนยอด : 156 บาท</p>
        <p>ธนาคาร : ธนาคารทหารไทย</p>
        <p>เลขบัญชี : 123-1-12212-1</p>
      </div>
    ),
    okText: 'ยอมรับ',
    // okType: 'success',
    cancelText: 'ปฏิเสธ',
    onOk() {
        // todo onOk action
    },
    onCancel() {
        // todo onCancel action
    },
    width: 750,
  });
}
function ModalCoin() {
  return (
    <Space>
      <Button onClick={showDescription} className="button-modalcoin">
        รายละเอียด
      </Button>
    </Space>
  );
}
export default ModalCoin;
