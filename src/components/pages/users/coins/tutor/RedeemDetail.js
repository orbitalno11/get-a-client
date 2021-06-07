import React, { Fragment} from "react";
import { Row, Col, Button } from "antd";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../styles.module.scss";
import isMobile from "../../../../isMobile/isMobile";
import { useSelector } from "react-redux";
import Loading from "../../../../loading/Loading";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"

export default function RedeemDetail({onHandleChange}) {
  const screens = useBreakpoint();
  const { loading } = useSelector((state) => state);
  const rateRedeem = useSelector((state) => state.coin.rateCoin);
  console.log(rateRedeem)
  const balanceCoin = useSelector((state) => state.coin.balance);
  const amount = balanceCoin&& balanceCoin.amount

  return (
    <Fragment>
          {loading.loading && <Loading />}
          {isMobile() ? (
            <div className={style.paddingbody} style={{width:"100%"}}>
                <Row className={style.marginTop01}>
                  <Col span={24}>
                    <span className={style.headerOne5}>คุณมี</span>
                  </Col>
                </Row>
                <Row className={style.centerPage}>
                  <Col xs={4} sm={4}>
                    <FontAwesomeIcon icon={faCoins} className={style.redeem2} />
                  </Col> 
                  { balanceCoin && (                
                  <Col>
                    <span className={style.headerTwo}>{balanceCoin.amount}</span>
                  </Col>
                  )}                
                </Row>
                <Row className={style.marginTop01}>
                  <Col span={24}>
                    <span className={style.headerOne5}>สามารถแลกเป็นเงิน</span>
                  </Col>                 
                </Row>
                <Row className={style.marginTop01}>
                {rateRedeem&&rateRedeem.map((data, index) => (
                  <Col span={24} align="center" key={index} >
                    <span className={style.headerTwo}>THB {data&& (Number(amount) * Number(data.baht))/Number(data.coin) }</span>
                  </Col>
                  ))}
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
                    onClick={()=>onHandleChange(false)}
                  >
                    <span className={style.textOne5}>แลกเหรียญ</span>
                  </Button>
                </Row>
            </div>
          ) : (
            <div className={`${style.marginSection} ${style.contentRequest}`}>
              <Row className={style.paddingTopHead2}>
                 <Col md={8} lg={11} xl={11}>
                    <span className={style.textTwo25}>คุณมี</span>
                 </Col>
                 <Col md={9} lg={6} xl={6}>
                    <span className={style.textTwo25}>สามารถแลกเป็นเงิน</span>
                 </Col>
                 <Col md={5} lg={4} xl={3} className={`${style.centerPage} ${style.marginRight01}`}>
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
                  <Col md={4} lg={4} xl={3} className={screen.lg? style.paddingCoin : style.paddingCoinMd}>
                    <FontAwesomeIcon icon={faCoins} className={ screens.lg? style.redeem : style.redeemSm } />
                  </Col>
                  { balanceCoin && (
                    <Col md={5} lg={10} xl={9}>
                        <span className={style.headerFour}>{balanceCoin.amount}</span>
                    </Col>
                  )}
                  {rateRedeem&&rateRedeem.map((data, index) => (
                  <Col md={10} lg={10} xl={9} key={index}>
                      <span className={style.headerFour}> THB {data&& (Number(amount) * Number(data.baht))/Number(data.coin) }</span>
                  </Col>
                   ))}
              </Row>
              <Row className={style.paddingTopHead2} style={{paddingBottom:"3rem"}}>
                  <Col md={7} lg={5} xl={4}>
                      <span className={style.textTwo25}>อัตราแลกปัจุบัน</span>
                  </Col>
                  <Col md={2} lg={2} xl={2} className={style.centerPage} >
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
