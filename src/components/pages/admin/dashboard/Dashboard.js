import React from 'react';
import { Card, Col, Row, Layout, Tooltip } from 'antd';
import { InfoCircleFilled, CaretUpFilled } from '@ant-design/icons';
import ChartCard from '../../component/chart/ChartCard';
import MiniArea from '../../component/chart/MiniArea';
import MiniBar from '../../component/chart/MiniBar';
import MiniProgress from '../../component/chart/MiniProgress';
import { movementSummary, visitSummary } from './Constants';
import ProductBarChart from '../../component/chart/ProductBarChart';
import ProductPieChart from '../../component/chart/ProductPieChart';

function Dashboard() {
  const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: { marginBottom: 24 },
  };

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
