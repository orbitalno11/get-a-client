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
              <th span={8} className={style.textNormal}>จำนวนเงิน (บาท)</th>
              <th span={8} className={style.textNormal}>จำนวนเหรียญ</th>
              <th span={8} className={style.textNormal}>การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ width: "1rem" }}>
              <td className={style.textNormal}>{data && data.baht} </td>
              <td className={style.textNormal}>{data && data.coin}</td>
              <td className={style.textNormal}>
                <EditList ratePromotion={data}/>
                &emsp;
                <DeleteList data={data}/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
