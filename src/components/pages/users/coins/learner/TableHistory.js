import React, { Fragment, useEffect } from "react";
import { Grid, Table, Col } from "antd";
import style from "../styles.module.scss";
import { coinAction } from "../../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
const { useBreakpoint } = Grid;

export default function TableHistory() {
  const screens = useBreakpoint();
  const dispatch = useDispatch();

  const list = useSelector((state) => state.coin.coinUser);

  useEffect(() => {
    dispatch(coinAction.getCoinTransaction());
  }, []);

  useEffect(() => {
    console.log(list);
  }, [list]);

  const data =
    list && list
    .map((data, index) => ({
      Id: index + 1,
      date: moment(data.startDate).format("MM/DD/YYYY"),
      coin: data.numberOfCoin,
    }));

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "Id",
      key: "Id",
      align: "center",
    },
    {
      title: "วันที่และเวลา",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "การดำเนินการ",
      dataIndex: "",
      key: "status",
      align: "center",
    },
    {
      title: "จำนวนเหรียญ",
      dataIndex: "coin",
      key: "coin",
      align: "center",
    },
  ];

  return (
    <Fragment>
      <div className={style.paddingbody} >
        {screens.md && (
          <Col lg={24} xl={24} md={24}>
            <span className={style.titleH2}>ประวัติการซื้อเหรียญ</span>
          </Col>
        )}
      </div>
      <div className={style.coinbody}>
        <Table
          columns={columns}
          dataSource={data}
          className={style.tablecoin}
        />
      </div>
    </Fragment>
  );
}
