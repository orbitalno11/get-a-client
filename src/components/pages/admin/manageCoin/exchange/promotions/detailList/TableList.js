import React, { Fragment } from "react";
import style from "../../../styles.module.scss";
import EditList from "./EditList";
import DeleteList from "./DeleteList";

export default function TableList({ data }) {
  return (
    <Fragment>
      <div>
        <table className={style.tablecoins}>
          <thead>
            <tr>
              <th span={8}>จำนวนเงิน (บาท)</th>
              <th span={8}>จำนวน coins</th>
              <th span={8}>การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ width: "1rem" }}>
              <td>{data && data.baht} </td>
              <td>{data && data.coin}</td>
              <td>
                <EditList />
                &emsp;
                <DeleteList />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
