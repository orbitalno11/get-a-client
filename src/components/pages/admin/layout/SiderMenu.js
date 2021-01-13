import React from 'react';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();

  const handleSiderMenuClick = action => {
    console.log('menu:', action);
    switch (action.key) {
      case 'dashboard':
        history.push('/admin');
        break;
      case 'request':
        history.push('/request');
        break;
      case 'exchangeRate':
        history.push('/exchangeRate');
        break;
      case 'timeExchange':
        history.push('/time/exchangeRate');
        break;
      case 'verifyTutor':
        history.push('/verify/tutor');
        break;
      case 'verifyEducation':
        history.push('/verify/educated');
        break;
      default:
        history.push('/');
    }
  };

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
        <Menu mode="inline" theme="dark" onClick={handleSiderMenuClick}>
          <Menu.Item key="dashboard">
            <DashboardOutlined />
            <span className="nav-text">หน้าแรก</span>
          </Menu.Item>
          <SubMenu
            key="manageTutor"
            title={
              <span>
                <TeamOutlined />
                <span>จัดการข้อมูลผู้สมัครสอน</span>
              </span>
            }
          >
            <Menu.Item key="verifyTutor">
              <span className="nav-text">เอกสารยืนยันตัว</span>
            </Menu.Item>
            <Menu.Item key="verifyEducation">
              <span className="nav-text">เอกสารยืนยันประวัติการศึกษา</span>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="manageCoin"
            title={
              <span>
                <PartitionOutlined />
                <span>จัดการเหรียญ</span>
              </span>
            }
          >
            <Menu.Item key="request">
              <span className="nav-text">จัดการคำขอเหรียญ</span>
            </Menu.Item>
            <Menu.Item key="exchangeRate">
              <span className="nav-text">จัดการอัตราการแลกเปลี่ยน</span>
            </Menu.Item>
            <Menu.Item key="timeExchange">
              <span className="nav-text">จัดการช่วงการแลกเปลี่ยน</span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </div>
  );
}

export default SiderMenu;
