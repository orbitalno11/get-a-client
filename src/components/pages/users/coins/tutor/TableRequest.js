import React from "react";
import style from "../styles.module.scss";
import isMobile from "../../../../isMobile/isMobile";
import RedeemList from "./RedeemList";
import { useSelector } from "react-redux";
import isEmpty from "../../../../defaultFunction/checkEmptyObject";
import { color, defaultValue } from "../../../../defaultValue";
import EmptyImage from "../../../../loading/EmptyImage";
import moment from "moment";

export default function TableRequest({ onHandleChange }) {
  const detailRequest = useSelector((state) => state.coin.redeem);

  return (
    <div style={{ width: "100%", paddingBottom: "3.75rem" }}>
      {!isMobile() ? (
        <div>
          {detailRequest && detailRequest.length ? (
            <table className="TableRedeem">
              <thead>
                <tr>
                  <th span={8} className={style.textNormal}>
                    ลำดับ
                  </th>
                  <th span={8} className={style.textNormal}>
                    วันที่ขอ
                  </th>
                  <th span={8} className={style.textNormal}>
                    วันที่พิจารณา
                  </th>
                  <th span={8} className={style.textNormal}>
                    จำนวนเหรียญ
                  </th>
                  <th span={8} className={style.textNormal}>
                    ยอดเงิน(THB)
                  </th>
                  <th span={8} className={style.textNormal}>
                    ผลการพิจารณา
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isEmpty(detailRequest) &&
                  detailRequest.map((data, index) => (
                    <tr
                      style={{ width: "1rem" }}
                      key={index}
                      onClick={() => onHandleChange(false)}
                    >
                      <td className={style.textNormal}>{index + 1}</td>
                      <td className={style.textNormal}>
                        {moment(data.requestDate).format("DD/MM/YYYY")}
                      </td>
                      {data.approveDate ? (
                        <td className={style.textNormal}>
                          {moment(data.approveDate).format("DD/MM/YYYY")}
                        </td>
                      ) : (
                        <td className={style.textNormal}>
                          <span> - </span>
                        </td>
                      )}
                      <td className={style.textNormal}>
                        {data && data.amountCoin}
                      </td>
                      <td className={style.textNormal}>
                        {data && data.amount}
                      </td>
                      <td className={style.textNormal}>
                        {data.status === 0 && (
                           <span style={{color:color.orange}}>{data&& defaultValue.redeemType[data.status]}</span>
                        )}
                        {data.status === 1 && (
                           <span style={{color:color.green}}>{data&& defaultValue.redeemType[data.status]}</span>
                        )} 
                        {data.status === 3 && (
                           <span style={{color:color.red}}>{data&& defaultValue.redeemType[data.status]}</span>
                        )}   
                        {data.status === 4 && (
                           <span style={{color:color.blue}}>{data&& defaultValue.redeemType[data.status]}</span>
                        )}                                                                  
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div align="center">
              <EmptyImage size="default" />
              <p className={style.textNormal}>
                ยังไม่มีข้อมูลการแลกเหรียญ&nbsp;
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className={style.paddingbody}>
          <RedeemList />
        </div>
      )}
    </div>
  );
}
