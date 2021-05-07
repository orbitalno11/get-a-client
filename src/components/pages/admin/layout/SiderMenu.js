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

export default function SiderMenu({ handleOnCollapse, collapsed }) {

  return (
    <div>
      <Sider
        breakpoint="lg"
        onCollapse={handleOnCollapse}
        collapsed={collapsed}
        width="250"
        style={{ height: '100%', borderRight: 0 }}
      >
        <div className="menu-logo">
          <p className="logo-text">GETA</p>
        </div>
        <Menu mode="inline" theme="dark" defaultSelectedKeys={["/admin/home"]}>
          <Menu.Item key="/admin">
            <NavLink to="/admin"><DashboardOutlined /><span className="nav-text">หน้าแรก</span></NavLink>
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
            <Menu.Item key="/admin/verify/profile">
              <NavLink to="/admin/verify/profile"><span className="nav-text">เอกสารยืนยันตัว</span></NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/verify/education">
              <NavLink to="/admin/verify/education"><span className="nav-text">เอกสารยืนยันประวัติการศึกษา</span></NavLink>
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
          </SubMenu>
        </Menu>
      </Sider>
    </div>
  );
}

