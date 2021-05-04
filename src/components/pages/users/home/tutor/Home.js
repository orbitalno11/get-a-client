import { Grid, Typography } from "antd";
import React, { Fragment } from "react"
import MultiLineChartComponent from "../../../../dashborad/MultiLineChartComponent";
import PieChartComponent from "../../../../dashborad/PieChartComponent";
import style from "../styles.module.scss"
import Header from "../../../../headerMobile/Header"
import isMobile from "../../../../isMobile/isMobile";
const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function Home() {
    const screens = useBreakpoint();

    const styleWidth = {
        width: screens.md ? "80%" : "100%"
    }

    const data = [
        {
            type: "分类一",
            value: 27,
        },
        {
            type: "分类二",
            value: 25,
        },
        {
            type: "分类三",
            value: 18,
        },
        {
            type: "分类四",
            value: 15,
        },
        {
            type: "分类五",
            value: 10,
        },
        {
            type: "其它",
            value: 5,
        },
    ];

    const dataLine = [
        {
            month: "Jan",
            city: "Tokyo",
            temperature: 7,
        },
        {
            month: "Jan",
            city: "London",
            temperature: 3.9,
        },
        {
            month: "Feb",
            city: "Tokyo",
            temperature: 6.9,
        },
        {
            month: "Feb",
            city: "London",
            temperature: 4.2,
        },
        {
            month: "Mar",
            city: "Tokyo",
            temperature: 9.5,
        },
        {
            month: "Mar",
            city: "London",
            temperature: 5.7,
        },
        {
            month: "Apr",
            city: "Tokyo",
            temperature: 14.5,
        },
        {
            month: "Apr",
            city: "London",
            temperature: 8.5,
        },
        {
            month: "May",
            city: "Tokyo",
            temperature: 18.4,
        },
        {
            month: "May",
            city: "London",
            temperature: 11.9,
        },
        {
            month: "Jun",
            city: "Tokyo",
            temperature: 21.5,
        },
        {
            month: "Jun",
            city: "London",
            temperature: 15.2,
        },
        {
            month: "Jul",
            city: "Tokyo",
            temperature: 25.2,
        },
        {
            month: "Jul",
            city: "London",
            temperature: 17,
        },
        {
            month: "Aug",
            city: "Tokyo",
            temperature: 26.5,
        },
        {
            month: "Aug",
            city: "London",
            temperature: 16.6,
        },
        {
            month: "Sep",
            city: "Tokyo",
            temperature: 23.3,
        },
        {
            month: "Sep",
            city: "London",
            temperature: 14.2,
        },
        {
            month: "Oct",
            city: "Tokyo",
            temperature: 18.3,
        },
        {
            month: "Oct",
            city: "London",
            temperature: 10.3,
        },
        {
            month: "Nov",
            city: "Tokyo",
            temperature: 13.9,
        },
        {
            month: "Nov",
            city: "London",
            temperature: 6.6,
        },
        {
            month: "Dec",
            city: "Tokyo",
            temperature: 9.6,
        },
        {
            month: "Dec",
            city: "London",
            temperature: 4.8,
        },
    ];


    return (
        <Fragment>
            {isMobile() && <Header title="โปรไฟล์" /> }
            <div className={style.paddingCenter}>
                <Title level={2} >ยินดีต้อนรับ XXX</Title>
                <Title level={4}>คุณมีผู้เรียน 20,000 คนในเดือนนี้ </Title>
                <PieChartComponent data={data} radius={0.8} main="value" value="type" />
                <Title level={4} className={style.paddingTop60}>เหรียญของคุณ 50000 เหรียญ </Title>
                <div style={styleWidth}>
                    <MultiLineChartComponent data={dataLine} position="month*temperature" value="city" />
                </div>
            </div>
        </Fragment>

    )
}
