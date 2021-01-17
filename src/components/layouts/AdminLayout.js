import React, { useState } from "react";
import { Route, Switch } from 'react-router-dom'
import { Layout } from "antd";
import "../pages/admin/layout/Style.css";
import SiderMenu from "../pages/admin/layout/SiderMenu";
import LayoutBanner from "../pages/admin/layout/LayoutBanner";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import Request from "../pages/admin/manageCoin/Request"
import ExchangeRate from "../pages/admin/manageCoin/ExchangeRate"
import TimeExchange from "../pages/admin/manageCoin/TimeExchange"

const { Content } = Layout;

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const handleOnCollapse = () => {
    setCollapsed((prevState) => !prevState);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderMenu collapsed={collapsed} handleOnCollapse={handleOnCollapse} />
      <Layout>
        <LayoutBanner
          collapsed={collapsed}
          handleOnCollapse={handleOnCollapse}
        />
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 20 }}>
            <Switch>
              <Route exact path="/admin" component={Dashboard} />
              <Route exact path="/admin/requstcoin" component={Request} />
              <Route exact path="/admin/exchagecoin" component={ExchangeRate} />
              <Route exact path="/admin/managecoin" component={TimeExchange} />
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;