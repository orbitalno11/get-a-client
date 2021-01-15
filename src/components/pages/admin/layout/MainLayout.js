import React, { useState } from "react";
import { Route, Switch } from 'react-router-dom'
import { Layout } from "antd";
import "./Style.css";
import SiderMenu from "./SiderMenu";
import LayoutBanner from "./LayoutBanner";
// import Dashboard from "../dashboard/Dashboard";
import Request from "../manageCoin/Request"
import ExchangeRate from "../manageCoin/ExchangeRate"
import TimeExchange from "../manageCoin/TimeExchange"

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
              {/* <Route path="/" component={Dashboard} /> */}
              <Route path="/" component={Request} />
              {/* <Route path="/" component={ExchangeRate} /> */}
              {/* <Route path="/" component={TimeExchange} /> */}
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
