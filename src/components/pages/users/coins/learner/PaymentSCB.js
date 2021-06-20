import React, { Fragment, useEffect } from "react";
import { Image } from "antd";
import style from "../styles.module.scss";
import Loading from "../../../../loading/Loading";
import Header from "../../../../headerMobile/Header";
import isMobile from "../../../../isMobile/isMobile";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { coinAction } from "../../../../../redux/actions";
import logoSCB from "../../../../images/scblogo.webp"

export default function Coin() {

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const linkSCB = useSelector((state) => state.coin.payment);

    let params = new URLSearchParams(window.location.search);

    useEffect(() => {
      const type = params.get("type")
      const rateId = params.get("rateId")
      if(type?.isSafeNotBlank()&& rateId?.isSafeNotBlank()){
        dispatch(coinAction.createPayment(type,rateId));
      }
      }, []);

    useEffect(() => {
        if(linkSCB?.isSafeNotBlank()){
          window.location.href=linkSCB
        }
    }, [linkSCB]);
  
  return (
    <Fragment>
      {loading.loading && <Loading />}
      {isMobile() && <Header  pageBack="/coin" />}
      <div className="container">
          <div className={style.flexContainerScb}>
            <Image src={logoSCB} preview={false}/>
          </div>
      </div>
    </Fragment>
  );
}