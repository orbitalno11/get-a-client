import React from 'react';
import { Button, Col,Modal, Row,Input,DatePicker,TimePicker } from 'antd';
import {
  PlusCircleOutlined ,
  PlusOutlined,
} from '@ant-design/icons';
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
    title: 'เพิ่มโปรโมชั่น',
    icon: <PlusCircleOutlined style={{ color:'DodgerBlue' }}/>,
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

function Header() {
  return (
    <>
      <Row>
        <Col span={15}>
          <p>จัดการโปรโมชั่น</p>
        </Col>
        <Col span={9}>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={showDescription}
          >
            Add New
          </Button>

          {/* <Button
            icon={<DeleteOutlined />}
            disabled={!hasSelected}
            style={{ float: 'right', marginRight: 12 }}
          >
            <Popconfirm
              title="Sure to delete?"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={() => {}}
            >
              Delete
            </Popconfirm>
          </Button> */}
        </Col>
      </Row>
      {/* <Divider /> */}
    </>
  );
}

export default Header;
