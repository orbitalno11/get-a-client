import React from "react"
import { Pie } from 'react-chartjs-2';
import style from "./styles.module.scss"

export default function PieChartComponent({ data }) {

    const chartOptions = {
        plugins: {
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            }
        }
    }

    return (
        <Pie
            className={style.maxHeight}
            data={data}
            options={chartOptions}
        />
    )
}