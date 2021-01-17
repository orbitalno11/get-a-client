import React from 'react'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

// const { SubMenu } = Menu;
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
                    <Link to='/admin/home'>หน้าหลัก</Link>
                </Menu.Item>
                <Menu.SubMenu key="manage" title="จัดการข้อมูลผู้สมัครสอน">
                    <Menu.Item key="/admin/manageprofile">
                        <Link>เอกสารยืนยันตัวตน</Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/manageeducation">
                        <Link >เอกสารยืนยัน<br />ประวัติการศึกษา</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="coin" title="จัดการเหรียญ">
                    <Menu.Item key="/admin/reqcoin">
                        <Link>จัดการคำขอเหรียญ</Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/exchagecoin">
                        <Link to='/admin/exchagecoin'>จัดการอัตราการ<br />แลกเปลี่ยน</Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/managecoin">
                        <Link>จัดการซื้อเหรียญ</Link>
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </Sider>

    )
}
