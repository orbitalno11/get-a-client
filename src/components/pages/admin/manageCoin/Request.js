import { Card, Row, Col } from 'antd';
import React from 'react';
import './Style.css';
import { DollarCircleOutlined } from '@ant-design/icons';
import ModalCoin from '../component/ModalCoin';

function Request() {
  const ResponsiveProps = {
    xs: 24,
    sm: 8,
    md: 8,
    lg: 8,
    xl: 8,
  };
  return (
    <div>
      <Row style={{ marginLeft: '30px' }} {...ResponsiveProps}>
        <Col span={1} style={{ marginRight: '-10px' }}>
          <DollarCircleOutlined
            style={{ fontSize: '16px', color: '#F6AE2D' }}
          />
        </Col>
        <Col span={23} style={{ marginLeft: '-15px' }}>
          <p>คำขอการถอนเหรียญที่ยังไม่ได้อนุมัติ</p>
        </Col>
      </Row>
      <Row className="container" {...ResponsiveProps}>
        <Card className="card-container">
          <Row>
            <Col
              span={16}
              style={{
                marginTop: '-10px',
                fontWeight: 'bold',
                paddingLeft: '10px',
              }}
            >
              <p>จิราภรณ์ ธิงกะเบล</p>
            </Col>
            <Col
              span={8}
              style={{
                fontSize: '10px',
                color: 'gray',
                marginTop: '-5px',
                paddingLeft: '20px',
              }}
            >
              <p>16 ก.ค. 2563</p>
            </Col>
          </Row>
          <Row
            span={24}
            style={{
              justifyContent: 'center',
              fontSize: '40px',
              marginTop: '10px',
            }}
          >
            <p>156 บาท</p>
          </Row>
          <Row
            span={24}
            style={{ justifyContent: 'center', marginTop: '-15px' }}
          >
            <ModalCoin />
          </Row>
        </Card>
        <Card className="card-container">
          <Row>
            <Col
              span={16}
              style={{
                marginTop: '-10px',
                fontWeight: 'bold',
                paddingLeft: '10px',
              }}
            >
              <p>จิราภรณ์ ธิงกะเบล</p>
            </Col>
            <Col
              span={8}
              style={{
                fontSize: '10px',
                color: 'gray',
                marginTop: '-5px',
                paddingLeft: '20px',
              }}
            >
              <p>16 ก.ค. 2563</p>
            </Col>
          </Row>
          <Row
            span={24}
            style={{
              justifyContent: 'center',
              fontSize: '40px',
              marginTop: '10px',
            }}
          >
            <p>156 บาท</p>
          </Row>
          <Row
            span={24}
            style={{ justifyContent: 'center', marginTop: '-15px' }}
          >
            <ModalCoin />
          </Row>
        </Card>
        <Card className="card-container">
          <Row>
            <Col
              span={16}
              style={{
                marginTop: '-10px',
                fontWeight: 'bold',
                paddingLeft: '10px',
              }}
            >
              <p>จิราภรณ์ ธิงกะเบล</p>
            </Col>
            <Col
              span={8}
              style={{
                fontSize: '10px',
                color: 'gray',
                marginTop: '-5px',
                paddingLeft: '20px',
              }}
            >
              <p>16 ก.ค. 2563</p>
            </Col>
          </Row>
          <Row
            span={24}
            style={{
              justifyContent: 'center',
              fontSize: '40px',
              marginTop: '10px',
            }}
          >
            <p>156 บาท</p>
          </Row>
          <Row
            span={24}
            style={{ justifyContent: 'center', marginTop: '-15px' }}
          >
            <ModalCoin />
          </Row>
        </Card>
      </Row>
    </div>
  );
}
export default Request;
