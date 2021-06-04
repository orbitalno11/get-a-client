import React, { Fragment, useEffect } from "react";
import { Row, Col, Button } from "antd";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import TableHistory from "./TableHistory";
import style from "../styles.module.scss";
import isMobile from "../../../../isMobile/isMobile";
import { useDispatch, useSelector } from "react-redux";
import { coinAction } from "../../../../../redux/actions";
import Loading from "../../../../loading/Loading";
// import EmptyImage from "../../../../loading/EmptyImage";

export default function RedeemDetail({onHandleChange}) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state);
  const rateRedeem = useSelector((state) => state.coin.rateCoin);
  const balanceCoin = useSelector((state) => state.coin.coinUser);
  const money = balanceCoin&& balanceCoin.amount
 

  useEffect(() => {
    dispatch(coinAction.getCoinRatesTutor());
    dispatch(coinAction.getCoinBalance());
  }, []);

  return (
    <Fragment>
          {loading.loading && <Loading />}
          {isMobile() ? (
            <div className={style.bodymobileprofile} style={{width:"100%"}}>
                <Row className={style.marginTop01}>
                  <Col span={24}>
                    <span className={style.headerOne5}>คุณมี</span>
                  </Col>
                </Row>
                <Row className={style.subredeem2}>
                  <Col xs={7} sm={7} className={style.centerPage}>
                    <FontAwesomeIcon icon={faCoins} className={style.redeem2} />
                  </Col>                 
                  <Col xs={12} sm={12}>
                    <span className={style.headerTwo}>1000000000</span>
                  </Col>
                </Row>
                <Row className={style.marginTop01}>
                  <Col span={24}>
                    <span className={style.headerOne5}>สามารถแลกเป็นเงิน</span>
                  </Col>                 
                </Row>
                <Row className={style.marginTop01}>
                  <Col span={24} align="center" >
                    <span className={style.headerTwo}>THB 50,0000</span>
                  </Col>
                </Row>
                <Row style={{ marginTop:"1rem" }}>
                  <Col xs={8} sm={6}>
                    <span className={style.headerOne5}>อัตราแลก</span>
                  </Col>
                  <Col xs={4} sm={3} className={style.centerPage}>
                    <FontAwesomeIcon icon={faCoins} className={style.Xs} />
                  </Col>
                    {rateRedeem &&
                      rateRedeem.map((data, index) => (
                        <Col xs={10} sm={9} key={index}>
                          <span className={style.textOne5}>{data && data.coin} : {data && data.baht} THB</span>
                        </Col>
                      ))}
                </Row>
                <Row className={style.centerPage} style={{marginTop:"3rem"}}>
                  <Button
                    className="backgroundOrange buttonColor"
                    shape="round"
                    size="middle"
                  >
                    แลกเหรียญ
                  </Button>
                </Row>
            </div>
          ) : (
            <div className={`${style.marginSection} ${style.contentRequest}`}>
              <Row className={style.paddingTopHead2}>
                 <Col span={11}>
                    <span className={style.textTwo25}>คุณมี</span>
                 </Col>
                 <Col span={6}>
                    <span className={style.textTwo25}>สามารถแลกเป็นเงิน</span>
                 </Col>
                 <Col span={3} className={`${style.centerPage} ${style.marginRight01}`}>
                    <Button
                        className="backgroundOrange buttonColor"
                        shape="round"
                        size="middle"
                        onClick={()=>onHandleChange(false)}
                      >
                         <span className={style.headerOne5}>แลกเหรียญ</span>
                      </Button>
                 </Col>
              </Row>
              <Row className={style.paddingTopHead2}>
                  <Col span={3} className={style.paddingCoin}>
                    <FontAwesomeIcon icon={faCoins} className={style.redeem} />
                  </Col>
                  { balanceCoin && (
                    <Col span={9}>
                        <span className={style.headerFour}>{balanceCoin.amount}</span>
                    </Col>
                  )}
                  {rateRedeem&&rateRedeem.map((data, index) => (
                  <Col span={9} key={index}>
                      <span className={style.headerFour}> THB {data&& (Number(money) * Number(data.baht))/Number(data.coin) }</span>
                  </Col>
                   ))}
              </Row>
              <Row className={style.paddingTopHead2} style={{paddingBottom:"3rem"}}>
                  <Col span={4}>
                      <span className={style.textTwo25}>อัตราแลกปัจุบัน</span>
                  </Col>
                  <Col span={2} className={style.centerPage} >
                    <FontAwesomeIcon icon={faCoins} className={style.small} />
                  </Col>
                  {rateRedeem&&rateRedeem.map((data, index) => (
                  <Col span={12} key={index}>
                      <span className={style.textTwo25}>{data&&data.coin} : {data&&data.baht} &nbsp;THB</span>  
                  </Col>
                  ))}
              </Row>
            </div>
          )}
    </Fragment>
  );
}
