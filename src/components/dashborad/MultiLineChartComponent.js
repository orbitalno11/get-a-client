import { LineAdvance, Chart } from "bizcharts"
import React, { Fragment } from "react"

export default function MultiLineChartComponent({data ,position ,value }) {
    return (
        <Fragment>
            <Chart
                scale={{ temperature: { min: 0 } }}
                padding={[70, 20, 50, 40]}
                autoFit
                height={320}
                data={data}
            >
                <LineAdvance
                    point={{ size: 3 }}
                    shape="smooth"
                    position={position}
                    color={value}
                    legend={{
                        visible: false,
                        position : "bottom"
                    }}
                />
            </Chart>
        </Fragment>
    )
}
