import { Row, Col } from 'antd';
import React from 'react';
import './Style.css';
import ModalBuyCoin from '../component/ModalBuyCoin';
import TableCoin from '../component/TableCoin';
import Header from '../component/Header';
import PromotionList from '../component/PromotionList';

function TimeExchange() {
  const ResponsiveProps = {
    xs: 24,
    sm: 8,
    md: 8,
    lg: 8,
    xl: 8,
  };
  return (
    <div {...ResponsiveProps}>
      <Row style={{ marginLeft: "30px" }}>
        <Col span={24}>
          <ModalBuyCoin />
        </Col>
        <Col span={24}><TableCoin /></Col>
      </Row><br></br>
      <Row style={{ marginLeft: "30px" ,marginTop:"25px",fontSize:"20px",color:"#F5732E",fontWeight:"bolder" }}>
        <Header/>
        <PromotionList/>
      </Row>
 
     
    </div>
  );
}

export default TimeExchange;
