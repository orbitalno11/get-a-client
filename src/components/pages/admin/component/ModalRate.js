import React from 'react';
import { Modal, Input, Space,Row, Col} from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import './Style.css';

const { confirm } = Modal;
function showDescription() {

  // confirm({
  //   title: 'แก้ไขอัตราการแลกเปลี่ยนเหรียญ',
  //   icon: <DollarCircleOutlined />,
  //   content: (
  //     <div style={{marginTop: '50px',marginBottom: '20px',textAlign:'center',fontSize:'20px'}}>
  //       <Row>
  //           <Col span={8}>1 coins </Col>
  //           <Col span={4} style={{ paddingLeft:'7%'}}> =</Col>
  //           <Col span={9}><Input placeholder="ใส่ค่าเงิน" bordered={false} style={{textAlign:'center',fontSize:'20px'}}/></Col>
  //           <Col span={2}>บาท</Col>
  //       </Row>
  //     </div>
  //   ),
  //   okText: 'ยกเลิก',
  //   okType: 'danger',
  //   cancelText: 'แก้ไขอัตรา',
  //   onClick:{info},
  //   onOk() {
  //     console.log('Ok');
  //   },
  //   onCancel() {
  //     console.log('Cancel');
  //   },
  //   width: 750,
  // });
 
  confirm({
    title: 'แก้ไขอัตราการแลกเปลี่ยนเหรียญ',
    icon: <DollarCircleOutlined />,
    content: (
      <div style={{marginTop: '50px',marginBottom: '20px',textAlign:'center',fontSize:'20px'}}>
        <Row>
            <Col span={8}>1 coins </Col>
            <Col span={4} style={{ paddingLeft:'10%'}}> =</Col>
            <Col span={9}><Input placeholder="ใส่ค่าเงิน" bordered={false} style={{textAlign:'center',fontSize:'20px'}}/></Col>
            <Col span={2}>บาท</Col>
        </Row>
      </div>
    ),
    okText: 'ยืนยัน',
    // okType: 'danger',
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
      <a onClick={showDescription} style={{ color: '#F5732E'}}>
        แก้ไข
      </a>
    </Space>
  );
}
export default ModalRate;
