import React, { Fragment} from "react";
import { Row, Col, Button } from "antd";
import style from "../styles.module.scss";
import isMobile from "../../../../isMobile/isMobile";
import { useSelector } from "react-redux";
import Loading from "../../../../loading/Loading";
import { styleComponent } from "../../../../defaultFunction/style";
import { SkeletonComponent } from "../../../../loading/SkeletonComponent"
//import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"
import isEmpty from "../../../../defaultFunction/checkEmptyObject";

export default function RedeemDetail({onHandleChange}) {
  ////const screens = useBreakpoint();
  const { loading } = useSelector((state) => state);

  const rateRedeem = useSelector((state) => state.coin.rateCoin);
  const balanceCoin = useSelector((state) => state.coin.balance);

  const bahtStd = !isEmpty(rateRedeem) && rateRedeem[0].baht
  const coinStd = !isEmpty(rateRedeem) && rateRedeem[0].coin


  const amount = balanceCoin&& balanceCoin.amount

  const bahtTranfer = ((Number(amount) * Number(bahtStd))/Number(coinStd)).toFixed(2)

  const bahtShow = bahtTranfer && bahtTranfer.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  const amountShow = Number(amount).toLocaleString()

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
                  <Col xs={3} sm={3}>
                      <styleComponent.iconCoin size="medium" />
                  </Col> 
                  { balanceCoin ? (                
                  <Col>
                    <span className={style.headerTwo}>{balanceCoin.amount}</span>
                  </Col>
                  ):(
                    <SkeletonComponent.SkeletonText size="default"/>
                  )}                
                </Row>
                <Row className={style.marginTop01}>
                  <Col span={24}>
                    <span className={style.headerOne5}>สามารถแลกเป็นเงิน</span>
                  </Col>                 
                </Row>
                <Row className={style.marginTop01}>
                { (balanceCoin&&rateRedeem) ? (
                  <Col span={24} align="center">
                    <span className={style.headerTwo}>THB {bahtShow}</span>
                  </Col>
                  ):(
                    <Col xs={6} sm={6} align="center">
                        <SkeletonComponent.SkeletonText/>
                    </Col>
                  )}  
                </Row>
                <Row style={{ marginTop:"1rem" }}>
                  <Col xs={6} sm={4}>
                    <span className={style.headerOne5}>อัตราแลก</span>
                  </Col>
                  <Col xs={4} sm={3} className={style.centerPage}>
                      <styleComponent.iconCoin/>
                  </Col>
                  { rateRedeem? (
                    <Col xs={10} sm={9}>
                      <span className={style.textOne5}>{coinStd} : {bahtStd} THB</span>
                    </Col>
                  ):(
                    <Col xs={6} sm={6}>
                      <SkeletonComponent.SkeletonText/>
                    </Col>
                  )}
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
                  <Col md={3} lg={2} xl={2} className={style.paddingCoin}>
                      <styleComponent.iconCoin size="large" />
                  </Col>
                  { balanceCoin ? ( 
                    <Col md={6} lg={10} xl={10}>
                        <span className={style.headerThree}>{amountShow}</span>
                    </Col>
                  ):(
                    <Col md={6} lg={10} xl={9} style={{paddingTop:"2.5rem"}}>
                        <SkeletonComponent.SkeletonText/>
                    </Col>
                  )}

                  { (balanceCoin&&rateRedeem) ? (
                    <Col md={10} lg={10} xl={9}>
                        <span className={style.headerThree}> THB {bahtShow}</span>
                    </Col>
                    ):(
                    <Col md={10} lg={10} xl={9} style={{paddingTop:"2.5rem"}}>
                        <SkeletonComponent.SkeletonText/>
                    </Col>
                  )}
              </Row>
              <Row className={style.paddingTopHead2} style={{paddingBottom:"3rem"}}>
                  <Col md={7} lg={5} xl={4}>
                      <span className={style.textTwo25}>อัตราแลกปัจุบัน</span>
                  </Col>
                  <Col md={2} lg={2} xl={2} className={style.centerPage} >
                      <styleComponent.iconCoin size="medium" />
                  </Col>
                  { rateRedeem ? (
                  <Col span={12}>
                      <span className={style.textTwo25}>{coinStd} : {bahtStd} &nbsp;THB</span>  
                  </Col>
                  ):(
                    <Col span={12} style={{paddingTop:"0.5rem"}}>
                      <SkeletonComponent.SkeletonText/>
                    </Col>
                  )}
              </Row>
            </div>
          )}
    </Fragment>
  );
}

