import { Radio, Tabs } from 'antd'
import React, { Fragment, useState } from 'react'
import style from './styles.module.scss'

const { TabPane } = Tabs;

export default function TabHorizontal({ tabStart, tabDetail }) {
    const [tab, setTab] = useState(tabStart.key)
    const onHandleChangeTab = value => {
        setTab(value.target.value)
    }
    return (
        <Fragment>
            <Radio.Group onChange={onHandleChangeTab} value={tab} >
                {
                    tabDetail !== null && tabDetail.map((item) =>
                    (
                        <Radio.Button className={style.tab} value={item.key}>{item.name}</Radio.Button>
                    ))
                }
            </Radio.Group>
        </Fragment>
    )
}
