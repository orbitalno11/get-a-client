import React from 'react'
import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';

const { Sider } = Layout;

export default function MenuAdmin() {


    return (

        <Sider
            className="side"
        >
            <div >
                <span className="logo logoSide">GET-A</span>
            </div>
            <Menu className="side-menu" mode="inline" defaultSelectedKeys={["/admin/home"]}>
                <Menu.Item key="/admin/home" >
                    <NavLink >หน้าหลัก</NavLink>
                </Menu.Item>
                <Menu.SubMenu key="manage" title="จัดการข้อมูลผู้สมัครสอน">
                    <Menu.Item key="/admin/manageprofile">
                        <NavLink >เอกสารยืนยันตัวตน</NavLink>
                    </Menu.Item>
                    <Menu.Item key="/admin/manageeducation">
                        <NavLink >เอกสารยืนยัน<br />ประวัติการศึกษา</NavLink>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="coin" title="จัดการเหรียญ">
                    <Menu.Item key="/admin/reqcoin">
                        <NavLink>จัดการคำขอเหรียญ</NavLink>
                    </Menu.Item>
                    <Menu.Item key="/admin/exchagecoinn">
                        <NavLink>จัดการอัตราการ<br />แลกเปลี่ยน</NavLink>
                    </Menu.Item>
                    <Menu.Item key="/admin/managecoin">
                        <NavLink>จัดการซื้อเหรียญ</NavLink>
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </Sider>

    )
}
