import React from 'react';
import { Modal, Input, Space,Row, Col,Button,DatePicker,TimePicker } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import './Style.css';
import moment from 'moment';

const { confirm } = Modal;

function onChangeData(date, dateString) {
    console.log(date, dateString);
  }
  
  function onChangeTime(time, timeString) {
    console.log(time, timeString);
  }

  function showDescription() {
    confirm({
      title: 'แก้ไขโปรโมชั่น',
      icon: <EditOutlined style={{ color:"orange" }}/>,
      content: (
        <div style={{ justifyContent: 'center', marginTop: '20px',fontSize: "15px" }}>
          <Row >
            <Col span={4}>ชื่อโปรโมชั่น :</Col>
            <Col span={20}>
              <Input
                placeholder="กรุณาใส่ชื่อโปรโมชั่น"
                bordered={false}
                style={{ textAlign:"left", fontSize: "15px",marginTop:"-5px" }}
              />
            </Col>
          </Row>
          <Row style={{marginTop:'13px'}}>
              <Col span={4}>วันที่เริ่มต้น  </Col>
              <Col span={8}>
                <DatePicker onChangeData={onChangeData} />
              </Col>
              <Col span={4}>วันที่สิ้นสุด  </Col>
              <Col span={8}>
                <DatePicker onChangeData={onChangeData} />
              </Col>
            </Row>
            <Row style={{marginTop:'13px'}}>
              <Col span={4}>เวลาเริ่มต้น  </Col>
              <Col span={8}>
                <TimePicker onChangeTime={onChangeTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}/>
              </Col>
              <Col span={4}>เวลาสิ้นสุด  </Col>
              <Col span={8}>
                <TimePicker onChangeTime={onChangeTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
              </Col>
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
function ModalEditPro() {
  return (
    <Space>
      <Button onClick={showDescription} className="button-modalEdit" icon={<EditOutlined />}>
        แก้ไข
      </Button>
    </Space>
  );
}
export default ModalEditPro;
