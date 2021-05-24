import React from 'react';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Layout, Menu} from 'antd';
import './Style.css';
import { getUsernameAvatar } from '../component/UserAvatar';
import { useDispatch } from "react-redux";
import { userActions } from "../../../../redux/actions";

const { Header } = Layout;
const { SubMenu } = Menu;

export default function LayoutBanner({ collapsed, handleOnCollapse }) {
  const getCollapseIcon = () => {
    if (collapsed) {
      return (
        <MenuUnfoldOutlined onClick={handleOnCollapse} className="trigger" />
      );
    }
    return <MenuFoldOutlined onClick={handleOnCollapse} className="trigger" />;
  };

  const dispatch = useDispatch();

  const handleSettingMenuClick = () => {};
  
  return (
    <Header className="header" style={{ background: '#fff', padding: 0 }}>
      <div
        style={{
          float: "left",
          width: "100%",
          alignSelf: "center",
          display: "flex",
        }}
      >
        {window.innerWidth > 992 && getCollapseIcon()}
      </div>
      <Menu onClick={handleSettingMenuClick} mode="horizontal" className="menu">
        <SubMenu title={getUsernameAvatar("Cemal")}>
          <Menu.Item key="setting:2">
            <span onClick={() => dispatch(userActions.logout())}>
              <LogoutOutlined/>
              Logout
            </span>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  );
}

