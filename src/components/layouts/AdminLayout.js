import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';
import MenuAdmin from '../pages/admin/MenuAdmin'
import Home from '../pages/users/Home'

export default function AdminLayout() {
    return (
        <div>
            <Layout>
                <MenuAdmin />
                <Layout style={{ marginLeft: 200,backgroundColor:'#FFFFFF' }}>
                    <Switch>
                        <Route path="/" component={Home} />
                    </Switch>
                </Layout>
            </Layout>

        </div>
    )
}
