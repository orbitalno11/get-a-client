import React, { Fragment } from "react";
import { Row, Grid, Tabs } from "antd";
import style from "../styles.module.scss";
import RedeemDetail from "./RedeemDetail";
import RedeemList from "./RedeemList";
import History from "./History";
import Header from "../../../../headerMobile/Header";
const { useBreakpoint } = Grid;
const { TabPane } = Tabs;

export default function Redeem() {
  const screens = useBreakpoint();
  return (
    <Fragment>
      {(screens.xs || (screens.sm && !screens.md)) && (
        <Header title="จัดการเหรียญ" pageBack="/tutor/1" />
      )}
      <Tabs defaultActiveKey="1" centered className={style.pageredeem}>
        <TabPane tab="แลกเหรียญ" key="1">
          {screens.xs || (screens.sm && !screens.md) ? (
            <RedeemDetail />
          ) : (
            <Row className={style.alignCenter}>
              <RedeemDetail />
            </Row>
          )}
        </TabPane>
        <TabPane tab="รายการเหรียญ" key="2">
          <RedeemList/>
        </TabPane>
        <TabPane tab="ประวัติแลกเหรียญ" key="3">
          <History />
        </TabPane>
      </Tabs>
    </Fragment>
  );
}