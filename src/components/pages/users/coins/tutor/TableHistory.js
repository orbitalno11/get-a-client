import React from "react";
import style from "../styles.module.scss";
import isMobile from "../../../../isMobile/isMobile";
import HistoryList from "./HistoryList"
import { useSelector } from "react-redux";
import {defaultValue} from "../../../../defaultValue"
import isEmpty from "../../../../defaultFunction/checkEmptyObject"
import EmptyImage from "../../../../loading/EmptyImage";
import moment from "moment";

export default function TableHistory() {
  
  const transaction = useSelector((state) => state.coin.transaction);

  return (
  <div style={{width:"100%" ,paddingBottom:"3.75rem"}}>
    { !isMobile() ? (
      <div>
      {transaction && transaction.length ? (
        <table className= "TableRedeem">
          <thead>
            <tr>
              <th span={8} className={style.textNormal}>
                ลำดับ
              </th>
              <th span={8} className={style.textNormal}>
                วันที่
              </th>
              <th span={8} className={style.textNormal}>
                การดำเนินการ
              </th>
              <th span={8} className={style.textNormal}>
                จำนวนเหรียญ
              </th>
            </tr>
          </thead>
          <tbody>
          {!isEmpty(transaction) &&transaction.map((data, index) => (
            <tr style={{ width: "1rem" }} key={index}>
              <td className={style.textNormal}>{index+1}</td>
              <td className={style.textNormal}>{moment(data.transactionDate).format("DD/MM/YYYY")}</td>
              <td className={style.textNormal}>{data&& defaultValue.transactionType[data.transactionType]}</td>
              <td className={style.textNormal}>{data&&data.numberOfCoin}</td>
              </tr>
              ))}
          </tbody>
        </table>
        ) : (
        <div align="center">
          <EmptyImage size="default" />
            <p className={style.textNormal}>
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
