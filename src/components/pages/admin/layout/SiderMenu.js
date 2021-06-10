import React from "react";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import {
  PartitionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import style from "./styles.module.scss";


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
        style={{ height: "100%" }}
      >
        <div className={style.menuLogo}>
          <p className={`${style.centerPage} ${style.headerTwo25}`}>GETA</p>
        </div>
        <Menu mode="inline" theme="dark" defaultSelectedKeys={["/admin/requestcoin"]}>
          <SubMenu
            key="coin"
            title={
              <span>
                <PartitionOutlined />
                <span className={style.textOne25}>จัดการเหรียญ</span>
              </span>
            }
          >
            <Menu.Item key="/admin/requestcoin">
              <NavLink to="/admin/requstcoin"><span className={style.textOne25}>จัดการคำขอเหรียญ</span></NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/exchagecoin">
              <NavLink to="/admin/exchagecoin"><span className={style.textOne25}>จัดการอัตราการแลกเปลี่ยน</span></NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="manage"
            title={
              <span>
                <TeamOutlined />
                <span className={style.textOne25}>จัดการข้อมูลผู้สมัครสอน</span>
              </span>
            }
          >
            <Menu.Item key="/admin/verify/profile">
              <NavLink to="/admin/verify/profile"><span className={style.textOne25}>เอกสารยืนยันตัว</span></NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/verify/test">
              <NavLink to="/admin/verify/test"><span className={style.textOne25}>เอกสารยืนยันการสอบ</span></NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/verify/education">
              <NavLink to="/admin/verify/education"><span className={style.textOne25} >เอกสารยืนยันประวัติการศึกษา</span></NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </div>
  );
}

