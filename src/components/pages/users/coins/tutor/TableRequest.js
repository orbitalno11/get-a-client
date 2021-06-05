import React  from "react";
import style from "../styles.module.scss";
import isMobile from "../../../../isMobile/isMobile";
import RedeemList from "./RedeemList"
// import { coinAction } from "../../../../../redux/actions";
// import { useDispatch, useSelector } from "react-redux";
// import moment from "moment";

export default function TableRequest({onHandleChange}) {

    //   const dispatch = useDispatch();

    // const list = useSelector((state) => state.coin.coinUser);
    // console.log(list)
  
    // useEffect(() => {
    //   dispatch(coinAction.getCoinTransaction());
    // }, []);
  
  return (
  <div style={{width:"100%" ,paddingBottom:"3.75rem"}}>
    { !isMobile() ? (
    <div>
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
            <tr style={{ width: "1rem" }} onClick={()=>onHandleChange(true)}>
            <td className={style.textNormal}>1</td>
            <td className={style.textNormal}>4/06/64</td>
            <td className={style.textNormal}>รายได้</td>
            <td className={style.textNormal}>50</td>
          </tr>
        </tbody>
      </table>
    </div>
    ):(
    
    <div className={style.paddingbody}  >
      <RedeemList/>
      </div>
    )}
    </div>
  );
}
