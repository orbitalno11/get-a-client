import React, { Fragment } from "react";
import { Grid, Table} from "antd";
import style from "./styles.module.scss";
const { useBreakpoint } = Grid;
const { Column } = Table;

const data = [
  {
    key: "1",
    daterequest: "31 ธันวาคม 2563",
    dateconsider: "4 มกราคม 2564",
    amountcoin: "5,000",
    amountbath: "2,500",
    status: "อนุมัติ",
  },
  {
    key: "2",
    daterequest: "21 กุมภาพันธ์ 2564",
    dateconsider: "24 กุมภาพันธ์ 2564",
    amountcoin: "6,000",
    amountbath: "3,000",
    status: "ไม่อนุมัติ",
  },
  {
    key: "3",
    daterequest: "28 มีนาคม 2564",
    dateconsider: "30 มีนาคม 2564",
    amountcoin: "4,000",
    amountbath: "2,000",
    status: "อนุมัติ",
  }, 
];

export default function TableHistory() {
  const screens = useBreakpoint();
  return (
    <Fragment>
      <div className={style.coinbody}>
        <Table dataSource={data} className={style.tablecoin} >
          <Column title="ลำดับ" dataIndex="key" key="key" align="center"/>
          <Column title="วันที่ขอ" dataIndex="daterequest" key="daterequest" align="center"/>
          <Column title="วันที่พิจารณา" dataIndex="dateconsider" key="dateconsider" align="center"/>
          <Column title="จำนวนเหรียญ" dataIndex="amountcoin" key="amountcoin" align="center" />
          <Column title="ยอดเงิน(THB)" dataIndex="amountbath" key="amountbath" align="center" />
          <Column title="ผลการพิจารณา" dataIndex="status" key="status" align="center" />
        </Table>
      </div>
    </Fragment>
  );
}