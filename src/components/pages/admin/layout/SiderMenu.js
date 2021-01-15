import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  DashboardOutlined,
  FundProjectionScreenOutlined,
  PartitionOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import './Style.css';


const { SubMenu } = Menu;

const { Sider } = Layout;

function SiderMenu({ handleOnCollapse, collapsed }) {
  // const history = useHistory();

  // const handleSiderMenuClick = action => {
  //   console.log('menu:', action);
  //   switch (action.key) {
  //     case 'dashboard':
  //       history.push('/admin');
  //       break;
  //     case 'request':
  //       history.push('/request');
  //       break;
  //     case 'exchangeRate':
  //       history.push('/exchangeRate');
  //       break;
  //     case 'timeExchange':
  //       history.push('/time/exchangeRate');
  //       break;
  //     case 'verifyTutor':
  //       history.push('/verify/tutor');
  //       break;
  //     case 'verifyEducation':
  //       history.push('/verify/educated');
  //       break;
  //     default:
  //       history.push('/');
  //   }
  // };

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
          <Menu.Item key="/admin/home">
            <DashboardOutlined />
            <span className="nav-text">หน้าแรก</span>
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
            <Menu.Item key="/admin/manageprofile">
              <Link to="/admin/manageprofile"><span className="nav-text">เอกสารยืนยันตัว</span></Link>
            </Menu.Item>
            <Menu.Item key="/admin/manageducation">
              <Link to="/admin/manageducation"><span className="nav-text">เอกสารยืนยันประวัติการศึกษา</span></Link>
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
              <Link to="/admin/requstcoin"><span className="nav-text">จัดการคำขอเหรียญ</span></Link>
            </Menu.Item>
            <Menu.Item key="/admin/exchagecoin">
              <Link to="/admin/exchagecoin"><span className="nav-text">จัดการอัตราการแลกเปลี่ยน</span></Link>
            </Menu.Item>
            <Menu.Item key="/admin/managecoin">
              <Link to="/admin/managecoin"><span className="nav-text">จัดการช่วงการแลกเปลี่ยน</span></Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </div>
  );
}

export default SiderMenu;
