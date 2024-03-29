import { Radio, Row, Tabs } from "antd"
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React, { Fragment, useState } from "react"
import { color } from "../defaultValue";
import styles from "./styles.module.scss"
const { TabPane } = Tabs;

export default function TabHorizontal({ type, tabStart, tabDetail, name, style, handleSetSelectTab }) {
    const screens = useBreakpoint();
    const [ tab, setTab ] = useState(tabStart.key)
    const colorSelect = {
        backgroundColor: color.orange,
        borderColor: color.orange,
        color: color.white

    }
    const colorNotSelectWhite = {
        backgroundColor: color.white,
        color: color.black
    }

    const colorNotSelect = {
        backgroundColor: color.blue,
        borderColor: color.blue,
        color: color.white
    }

    const onHandleChangeTab = (value) => {
        if(handleSetSelectTab){
            setTab(value)
            handleSetSelectTab(value)
        }
    }

    return (
        <Fragment>
            {
                style === "TabPane" ? (
                    <Tabs defaultActiveKey={tabStart.key} className="tabStyle" centered={screens.md ? false : true} onChange={(value)=>onHandleChangeTab(value)}>
                        {
                            tabDetail !== null && tabDetail.map((item) =>
                                <TabPane
                                className={style.tabPane}
                                key={item.key} 
                                tab={item.name && item.name}>{item.tab}</TabPane>
                            )
                        }
                    </Tabs>

                ) : (
                    <Fragment>
                        <Row justify="center">
                            <Radio.Group  onChange={(value)=>onHandleChangeTab(value.target.value)} value={tab} name={name && name} >
      
                                {
                                    tabDetail !== null && tabDetail.map((item, index) =>
                                    (
                                        <Radio.Button
                                            className={type !== "tab" ? styles.radio : (index === 0 ? styles.tabFirst : styles.tabLast )}
                                            style={tab === item.key ? colorSelect : (type !== "tab" ? colorNotSelectWhite : colorNotSelect)}
                                            value={item.key}
                                            key={item.key}
                                        >{item.name}</Radio.Button>
                                    ))
                                }
                            </Radio.Group>
                        </Row>
                        {
                            type == "tab" && tabDetail !== null && tab !== null &&
                            (
                                tabDetail.filter(item => item.key === tab).map((item, index) =>
                                    <Fragment key={index}>{item.tab}</Fragment>
                                )
                            )
                        }
                    </Fragment>
                )
            }
        </Fragment>
    )
}