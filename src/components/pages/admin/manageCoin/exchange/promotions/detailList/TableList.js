import React, { Fragment} from "react";
import style from "../../../styles.module.scss";
import EditList from "./EditList";
import DeleteList from "./DeleteList";

export default function TableList() {
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
            <tr style={{width:"1rem"}}>
              <td>100 </td>
              <td>500</td>
              <td><EditList/>&emsp;<DeleteList /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
