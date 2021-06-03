import React from "react";
import style from "../styles.module.scss";

export default function TableRequest() {
  return (
    <div style={{width:"100%"}}>
      <table className= "TableRedeem">
        <thead>
          <tr>
            <th span={8} className={style.textNormal}>
              จำนวนเงิน (บาท)
            </th>
            <th span={8} className={style.textNormal}>
              จำนวนเหรียญ
            </th>
            <th span={8} className={style.textNormal}>
              การจัดการ
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ width: "1rem" }}>
            <td className={style.textNormal}>ปลา</td>
            <td className={style.textNormal}>อ้อม</td>
            <td className={style.textNormal}>วี</td>
          </tr>
          <tr style={{ width: "1rem" }}>
            <td className={style.textNormal}>ปลา</td>
            <td className={style.textNormal}>อ้อม</td>
            <td className={style.textNormal}>วี</td>
          </tr>
          <tr style={{ width: "1rem" }}>
            <td className={style.textNormal}>ปลา</td>
            <td className={style.textNormal}>อ้อม</td>
            <td className={style.textNormal}>วี</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
