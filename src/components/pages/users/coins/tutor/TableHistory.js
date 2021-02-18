import React, { Fragment } from "react";
import { Grid, Table} from "antd";
import style from "./styles.module.scss";
const { useBreakpoint } = Grid;
const { Column } = Table;

const data = [
  {
    key: "1",
    date: "31 ธันวาคม 2563",
    status: "เติมเหรียญ",
    coin: "169",
  },
  {
    key: "2",
    date: "1 มกราคม 2564",
    status: "จ่ายเหรียญ",
    coin: "30",
  },
  {
    key: "3",
    date: "30 มกราคม 2564",
    status: "จ่ายเหรียญ",
    coin: "40",
  },
];

export default function TableHistory() {
  const screens = useBreakpoint();
  return (
    <Fragment>
      <div className={style.coinbody}>
        <Table dataSource={data} className={style.tablecoin} >
          <Column title="ลำดับ" dataIndex="key" key="key" align="center"/>
          <Column title="วันที่" dataIndex="date" key="date" align="center"/>
          <Column title="การดำเนินการ" dataIndex="status" key="status" align="center" />
          <Column title="จำนวนเหรียญ" dataIndex="coin" key="coin" align="center" />
        </Table>
      </div>
    </Fragment>
  );
}