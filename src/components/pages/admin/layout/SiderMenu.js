import React from 'react';
import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import {
  DashboardOutlined,
  PartitionOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import './Style.css';


const { SubMenu } = Menu;

const { Sider } = Layout;

function SiderMenu({ handleOnCollapse, collapsed }) {

  return (
    <div>
      <Sider
        breakpoint="lg"
        onCollapse={handleOnCollapse}
        collapsed={collapsed}
        width="256"
        style={{ minHeight: '100vh' }}
      >
        <div className="menu-logo">
          <p className="logo-text">GETA</p>
        </div>
        <Menu mode="inline" theme="dark" defaultSelectedKeys={["/admin/home"]}>
          <Menu.Item key="/admin">
            <NavLink Link to="/admin"><DashboardOutlined /><span className="nav-text">หน้าแรก</span></NavLink>
          </Menu.Item>
          <SubMenu
            key="manage"
            title={
              <span>
                <TeamOutlined />
                <span>จัดการข้อมูลผู้สมัครสอน</span>
              </span>
            }
          >
            <Menu.Item key="/admin/verifytutor">
              <NavLink to="/admin/verifytutor"><span className="nav-text">เอกสารยืนยันตัว</span></NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/verifyeducation">
              <NavLink to="/admin/verifyducation"><span className="nav-text">เอกสารยืนยันประวัติการศึกษา</span></NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="coin"
            title={
              <span>
                <PartitionOutlined />
                <span>จัดการเหรียญ</span>
              </span>
            }
          >
            <Menu.Item key="/admin/requestcoin">
              <NavLink to="/admin/requstcoin"><span className="nav-text">จัดการคำขอเหรียญ</span></NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/exchagecoin">
              <NavLink to="/admin/exchagecoin"><span className="nav-text">จัดการอัตราการแลกเปลี่ยน</span></NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/managecoin">
              <NavLink to="/admin/managecoin"><span className="nav-text">จัดการช่วงการแลกเปลี่ยน</span></NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </div>
  );
}

export default SiderMenu;
