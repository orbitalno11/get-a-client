import React from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { Layout, Menu} from "antd";
import style from "./styles.module.scss";
import { getUsernameAvatar } from "../component/UserAvatar";
import { useDispatch } from "react-redux";
import { userActions } from "../../../../redux/actions";

const { Header } = Layout;
const { SubMenu } = Menu;

export default function LayoutBanner({ collapsed, handleOnCollapse }) {
  const getCollapseIcon = () => {
    if (collapsed) {
      return (
        <MenuUnfoldOutlined onClick={handleOnCollapse} className = {style.trigger} />
      );
    }
    return <MenuFoldOutlined onClick={handleOnCollapse} className= {style.trigger} />;
  };

  const dispatch = useDispatch();

  const handleSettingMenuClick = () => {};
  
  return (
    <Header className={style.header}>
      <div className={style.collapseIcon}>
        {window.innerWidth > 992 && getCollapseIcon()}
      </div>
      <Menu onClick={handleSettingMenuClick} mode="horizontal" className={style.menu}>
        <SubMenu title={getUsernameAvatar("Cemal")}>
          <Menu.Item key="setting:2">
            <span onClick={() => dispatch(userActions.logout())}>
              <LogoutOutlined/>
              <span className={style.textOne}>Logout</span>
            </span>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  );
}

