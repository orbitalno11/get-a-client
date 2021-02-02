import React, { Fragment } from "react"
import { PieChart } from "bizcharts";
import style from "./styles.module.scss"

export default function PieChartComponent({ data, radius, main, value }) {
    return (
        <Fragment>
            <PieChart
                className={style.chart}
                data={data}
                radius={radius}
                angleField={main}
                colorField={value}
                label={{
                    visible: true,
                    type: "inner",
                    offset: 20,
                }}
                legend={{
                    visible: true,
                    position : "bottom"
                }}
            />
        </Fragment>
    )
}
