import React from "react";
import style from "../styles.module.scss";
import isMobile from "../../../../isMobile/isMobile";
import HistoryList from "./HistoryList"
import { useSelector } from "react-redux";
import {color , defaultValue} from "../../../../defaultValue"
import isEmpty from "../../../../defaultFunction/checkEmptyObject"
import EmptyImage from "../../../../loading/EmptyImage";
import { styleComponent } from "../../../../defaultFunction/style";
import moment from "moment";

export default function TableHistory() {
  
  const transaction = useSelector((state) => state.coin.transaction);

  const status = {
    0:  color.green,
    1:  color.red,
    3:  color.red,
    4:  color.green
  }

  return (
  <div style={{width:"100%" ,paddingBottom:"3.75rem"}}>
    { !isMobile() ? (
      <div>
      {transaction && transaction.length ? (
        <table className= "TableRedeem">
          <thead>
            <tr>
              <th span={8} className={style.textOne35}>
                ลำดับ
              </th>
              <th span={8} className={style.textOne35}>
                วันที่
              </th>
              <th span={8} className={style.textOne35}>
                การดำเนินการ
              </th>
              <th span={8} className={style.textOne35}>
                จำนวนเหรียญ
              </th>
            </tr>
          </thead>
          <tbody>
          {!isEmpty(transaction) &&transaction.map((data, index) => (
            <tr style={{ width: "1rem" }} key={index}>
              <td className={style.textOne35}>{index+1}</td>
              <td className={style.textOne35}>{moment(data.transactionDate).format("DD/MM/YYYY")}</td>
              <td className={style.textOne35} style={styleComponent.text(!isEmpty(data.transactionType) ? status[data.transactionType]: color.black)}>
                {data&& defaultValue.transactionType[data.transactionType]}
              </td>
              <td className={style.textOne35}>{data&&data.numberOfCoin}</td>
              </tr>
              ))}
          </tbody>
        </table>
        ) : (
        <div align="center"className={style.section}>
            <EmptyImage size="default" />
            <p className={style.textOne5}>
              ยังไม่มีข้อมูลประวัติเหรียญ&nbsp;
            </p>
        </div>
        )}
      </div>
      ):(    
      <div className={style.paddingbody}  >
        <HistoryList/>
      </div>
      )}
    </div>
  );
}
