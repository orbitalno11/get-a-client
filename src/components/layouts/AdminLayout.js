import React, { useState } from "react";
import { Route, Switch } from 'react-router-dom'
import { Layout } from "antd";
import "../pages/admin/layout/Style.css";
import SiderMenu from "../pages/admin/layout/SiderMenu";
import LayoutBanner from "../pages/admin/layout/LayoutBanner";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import Request from "../pages/admin/manageCoin/request/Request"
import Exchange from "../pages/admin/manageCoin/exchange/Exchange"
import HistoryExchange from "../pages/admin/manageCoin/exchange/ratecoin/HistoryExchange"
import VerifyEducation from "../pages/admin/manageTutor/VerifyEducation"
import VerifyTutor from "../pages/admin/manageTutor/VerifyTutor"
import Educate from "../pages/admin/manageTutor/Educate"
import Profile from "../pages/admin/manageTutor/Profile"

const { Content } = Layout;

function AdminLayout() {
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
              <Route exact path="/admin/exchagecoin" component={Exchange} />
              <Route exact path="/admin/exchagecoin/history" component={HistoryExchange} />
              <Route exact path="/admin/verify/profile" component={VerifyTutor} />
              <Route exact path="/admin/verify/profile/:id" component={Profile} />
              <Route exact path="/admin/verify/education" component={VerifyEducation} />
              <Route exact path="/admin/verify/education/:id" component={Educate} />
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
export default AdminLayout;