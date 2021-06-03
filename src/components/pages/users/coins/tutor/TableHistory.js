import React, { Fragment } from "react";
import { Table} from "antd";
import style from "../styles.module.scss";

const { Column } = Table;

const data = [
  {
    key: "1",
    date: "31/12/2563",
    coin: "5,000",
    bath: "2,500",
  },
  {
    key: "2",
    date: "31/12/2563",
    coin: "6,000",
    bath: "3,000",
  },
  {
    key: "3",
    date: "31/12/2563",
    coin: "4,000",
    bath: "2,000",
  },
  
];

export default function TableHistory() {
  
  return (
    <Fragment>
      <div className={style.coinbody}>
        <Table dataSource={data} className={style.tablecoin}>
          <Column title="ลำดับ" dataIndex="key" key="key" align="center"/>
          <Column title="วันที่" dataIndex="date" key="date" align="center"/>
          <Column title="จำนวนเหรียญ" dataIndex="coin" key="coin" align="center" />
          <Column title="ยอดเงิน(THB)" dataIndex="bath" key="bath" align="center" />
        </Table>
      </div>
    </Fragment>
  );
}