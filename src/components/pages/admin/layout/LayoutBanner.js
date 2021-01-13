import React from 'react';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  QuestionCircleOutlined,
  GlobalOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Badge, Breadcrumb } from 'antd';
import './Style.css';
import { getUsernameAvatar } from '../component/UserAvatar';

const { Header } = Layout;
const { SubMenu } = Menu;

function LayoutBanner({ collapsed, handleOnCollapse }) {
  const getCollapseIcon = () => {
    if (collapsed) {
      return (
        <MenuUnfoldOutlined onClick={handleOnCollapse} className="trigger" />
      );
    }
    return <MenuFoldOutlined onClick={handleOnCollapse} className="trigger" />;
  };

  const handleLanguageMenuClick = () => {};
  const handleSettingMenuClick = () => {};
  const handleLogout = () => {};

  return (
    <Header className="header" style={{ background: '#fff', padding: 0 }}>
      <div
        style={{
          float: 'left',
          width: '100%',
          alignSelf: 'center',
          display: 'flex',
        }}
      >
        {window.innerWidth > 992 && getCollapseIcon()}
      </div>
      {/* <Breadcrumb style={{ float: 'left' }}>
        <Breadcrumb.Item>
          <span>Home</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span>LOGO</span>
        </Breadcrumb.Item>
      </Breadcrumb> */}
      {/* <Menu
        onClick={handleLanguageMenuClick}
        mode="horizontal"
        className="menu"
      >
        <SubMenu title={<BellOutlined />}>
          <Menu.Item key="en">
            <span role="img" aria-label="English">
              จิราภรณ์ขอแลกเหรียญ
            </span>
          </Menu.Item>
          <Menu.Item key="it">
            <span role="img" aria-label="Italian">
              พัชราภาส่งคำขอยืนยันตัวตน
            </span>
          </Menu.Item>
        </SubMenu>
      </Menu> */}
      <Menu onClick={handleSettingMenuClick} mode="horizontal" className="menu">
        <SubMenu title={getUsernameAvatar('Cemal')}>
          <Menu.Item key="setting:2">
            <span>
              <LogoutOutlined onClick={handleLogout} />
              Logout
            </span>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  );
}

export default LayoutBanner;
