import { Radio, Tabs } from 'antd'
import React, { Fragment, useState } from 'react'
import style from './styles.module.scss'

const { TabPane } = Tabs;

export default function TabHorizontal({ tabStart, tabDetail }) {
    const [tab, setTab] = useState(tabStart.key)
    const colorSelect = {
        backgroundColor: '#F26419'
    }

    const colorNotSelect = {
        backgroundColor: '#33658A'
    }

    const onHandleChangeTab = value => {
        setTab(value.target.value)
    }

    return (
        <Fragment>
            <Radio.Group onChange={onHandleChangeTab} value={tab} defaultValue={tabStart.key}>
                {
                    tabDetail !== null && tabDetail.map((item, index) =>
                    (
                        <Radio.Button
                            className={index === 0 ? style.tabFirst : style.tabLast}
                            style={tab === item.key ? colorSelect : colorNotSelect}
                            value={item.key}
                            key={item.key}
                        >{item.name}</Radio.Button>
                    ))
                }
            </Radio.Group>
            {
                tabDetail !== null && tab !== null &&
                (
                    tabDetail.filter(item => item.key === tab).map((item, index) =>
                        <Fragment key={index}>{item.tab}</Fragment>
                    )
                )
            }
        </Fragment>
    )
}
