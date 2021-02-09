import React from 'react';
import { Card, Col, Row} from 'antd';
import ProductBarChart from '../component/chart/ProductBarChart';

function Dashboard() {
  return (
    <>
      <Row gutter={24} type="flex">
        <Col span={24}>
          <Card title="ยอดเหรียญในระบบภายใน 1 ปี">
            <ProductBarChart />
          </Card>
        </Col>
      </Row><br></br>
      <Row gutter={24} type="flex">
        <Col span={12}>
          <Card title="ติวเตอร์หน้าใหม่">
            <ProductBarChart />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="คอร์สเรียนใหม่">
            <ProductBarChart />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
