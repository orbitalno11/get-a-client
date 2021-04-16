import React, { Fragment } from "react";
import { Table, Col } from "antd";
import style from "../../styles.module.scss";

const { Column } = Table;

const data = [
  {
    key: "1",
    date: "30 มกราคม 2564",
    ratecoin: "40",
  },
  {
    key: "2",
    date: "30 มกราคม 2564",
    ratecoin: "40",
  },
  {
    key: "3",
    date: "30 กุมภาพันธ์ุ 2564",
    ratecoin: "40",
  },
];

export default function Historyex() {
  return (
    <Fragment>
      <div className={style.coinbody}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <span className={style.titleH3}>ประวัติอัตราการแลกเปลี่ยน</span>
        </Col>
      </div>
      <div className={style.coinbody}>
        <Table dataSource={data} className={style.tablecoin}>
          <Column title="ลำดับ" dataIndex="key" key="key" align="center" />
          <Column title="วันที่" dataIndex="date" key="date" align="center" />
          <Column
            title="อัตราแลกเปลี่ยนต่อ 1 coins"
            dataIndex="ratecoin"
            key="ratecoin"
            align="center"
          />
        </Table>
      </div>
    </Fragment>
  );
}