import React from "react";
import style from "../styles.module.scss";
import isMobile from "../../../../isMobile/isMobile";
import RedeemList from "./RedeemList";
import { useSelector } from "react-redux";
import isEmpty from "../../../../defaultFunction/checkEmptyObject";
import { color, defaultValue } from "../../../../defaultValue";
import EmptyImage from "../../../../loading/EmptyImage";
import { styleComponent } from "../../../../defaultFunction/style";
import moment from "moment";

export default function TableRequest({ onHandleChange}) {
  const detailRequest = useSelector((state) => state.coin.redeem);

  const statusRedeem = {
    0: {
      color: color.black
    },
    1: {
      color: color.green
    },
    3: {
      color: color.red
    },
    4: {
      color: color.red
    }
  }

  return (
    <div style={{ width: "100%", paddingBottom: "3.75rem" }}>
      {!isMobile() ? (
        <div>
          {detailRequest && detailRequest.length ? (
            <table className={style.TableRedeem}>
              <thead>
                <tr>
                  <th span={8} className={style.textOne35}>
                    ลำดับ
                  </th>
                  <th span={8} className={style.textOne35}>
                    วันที่ขอ
                  </th>
                  <th span={8} className={style.textOne35}>
                    วันที่พิจารณา
                  </th>
                  <th span={8} className={style.textOne35}>
                    จำนวนเหรียญ
                  </th>
                  <th span={8} className={style.textOne35}>
                    ยอดเงิน(THB)
                  </th>
                  <th span={8} className={style.textOne35}>
                    ผลการพิจารณา
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isEmpty(detailRequest) &&
                  detailRequest.sort((a, b) => (b.requestDate > a.requestDate) ? 1 : -1).map((data, index) => (
                    <tr
                      style={{ width: "1rem" }}
                      key={index}
                      onClick={() => onHandleChange(true,data.id,data.status)}
                    >
                      <td className={style.textOne35}>{index + 1}</td>
                      <td className={style.textOne35}>
                        {moment(data.requestDate).format("DD/MM/YYYY")}
                      </td>
                      {data.approveDate ? (
                        <td className={style.textOne35}>
                          {moment(data.approveDate).format("DD/MM/YYYY")}
                        </td>
                      ) : (
                        <td className={style.textOne35}>
                          <span> - </span>
                        </td>
                      )}
                      <td className={style.textOne35}>
                        {data && data.amountCoin}
                      </td>
                      <td className={style.textOne35}>
                        {data && data.amount}
                      </td>
                      <td className={style.textOne35}>
                          <span style={styleComponent.text((!isEmpty(data.status) ) ? statusRedeem[data.status].color : color.black)}>
                             {data&& defaultValue.redeemType[data.status]}
                          </span>                                                                
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className={style.section}>
              <span className={style.headerTwo5} style={{paddingLeft:"2rem"}}>รายการแลกเหรียญ</span>
              <div align="center">
                <EmptyImage size="default" />
                <p className={style.textOne5}>
                  ยังไม่มีข้อมูลการแลกเหรียญ&nbsp;
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={style.paddingbody}>
          <RedeemList onHandleChange={onHandleChange} />
        </div>
      )}
    </div>
  );
}