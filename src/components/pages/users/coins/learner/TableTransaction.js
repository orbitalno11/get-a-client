import React, { useEffect } from "react";
import style from "../styles.module.scss";
import { coinAction } from "../../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {defaultValue} from "../../../../defaultValue"
import isEmpty from "../../../../defaultFunction/checkEmptyObject"

export default function TableTransaction() {

    const dispatch = useDispatch();

    const transaction = useSelector((state) => state.coin.transaction);
     
    useEffect(() => {
      dispatch(coinAction.getCoinTransaction());
    }, []);
  
  return (
    <div style={{width:"100%" ,paddingBottom:"3.75rem"}}>
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
    </div>
  );
}
