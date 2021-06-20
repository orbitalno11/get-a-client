import { Row, Col, Button, Grid } from "antd";
import React, { Fragment, useEffect } from "react";
import { styleComponent } from "../../../../defaultFunction/style";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../styles.module.scss";
import { Link, useHistory } from "react-router-dom";
import Header from "../../../../headerMobile/Header";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../../../loading/Loading";
import { coinAction } from "../../../../../redux/actions";
import isMobile from "../../../../isMobile/isMobile";
import isEmpty from "../../../../defaultFunction/checkEmptyObject";
import { SkeletonComponent } from "../../../../loading/SkeletonComponent"
import { serverSocket } from "../../../../../utils/socket";
import { useState } from "react";
const { useBreakpoint } = Grid;

export default function CoinDetail() {
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const idCode = useSelector((state) => state.coin.payment);
  const newIdCode = useSelector((state) => state.coin.newQr);
  const transactionId = !isEmpty(idCode) && idCode.transactionId
  const history = useHistory()
  let params = new URLSearchParams(window.location.search);
  const coin = params.get("rateCoin")
  const baht = params.get("rateBaht")
  
  const [paymentRes, setPaymentRes] = useState(null)
  console.log(paymentRes)

  useEffect(() => {
    const type = params.get("type")
    const rateId = params.get("rateId")
    if (type?.isSafeNotBlank() && rateId?.isSafeNotBlank()) {
      dispatch(coinAction.createPayment(type, rateId));
    }
  }, []);


  useEffect(() => {
    if (transactionId?.isSafeNotBlank && isEmpty(paymentRes)) {
      serverSocket.emit("observe-payment", transactionId)

      serverSocket.on("payment-result", (data) => {
        setPaymentRes(data)
      })
    }
  }, [transactionId])

  useEffect(() => {
    if (!isEmpty(paymentRes)) {
      serverSocket.off("payment-result")
      history.push("/payment/complete?status="+paymentRes.status+"&tid="+paymentRes.transactionId+"&amount="+paymentRes.amount)
    }
  }, [paymentRes])

  const onhandRequestNewQr = () => {
    dispatch(coinAction.createNewQR(transactionId));
  }

  return (
    <Fragment>
      {loading.loading && <Loading />}
      {isMobile() && <Header pageBack="/coin" />}
      <div className="container" >
        <div className={!isMobile() ? style.bodyPaddingTopBottom : style.paddingTopTwo6}>
          <div className={style.section}>
            <Row>
              <Col xl={20} lg={20} md={19}><span className={style.headerTwo75}>ชำระผ่าน QR Code</span></Col>
              {!isMobile() &&
                <Col xl={4} lg={4} md={5} align="end">
                  <Link to="/coin">
                    <span className={`${style.textOne35} ${style.backToCoin}`}>ย้อนกลับ</span>
                  </Link>
                </Col>
              }
            </Row>
            <Row className={!isMobile() && style.paddingTopTwo6} >
              <Col xl={12} lg={11} md={24}>
                <div className={style.horizontalCenter}>
                  {!isEmpty(newIdCode) && newIdCode ?
                    <img src={`data:image/jpeg;base64,${newIdCode}`} width="200" height="200" />
                    :
                    <img src={`data:image/jpeg;base64,${idCode && idCode.qrCode}`} width="200" height="200" />
                  }

                </div>
                <Col xl={23} lg={23} md={23} sm={23} xs={22} align="center" style={{ paddingTop: "1.5rem", paddingLeft: "1rem" }} onClick={() => onhandRequestNewQr()}>
                  <FontAwesomeIcon icon={faSyncAlt} className={style.reQR} />
                  <span className={style.textOne35} style={{ cursor: "pointer", textDecoration: "underline" }}>ขอ QR code ใหม่</span>
                </Col>
                <Col xl={24} lg={24} align="center" style={{ paddingTop: "1rem"}}>
                  <span className={style.textOne25}>
                    แสกน QR Code ด้านบนผ่าน Internet banking แอปพลิเคชัน เพื่อชำระค่าบริการ
                  </span>
                </Col>
              </Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <div className={!screens.lg ? !screens.md ? style.orderOne : style.order : style.orderOne}>
                  <Col>
                      <span className={style.headerOne5}>รายละเอียดคำสั่งซื้อของคุณ</span>
                  </Col>
                  { transactionId ?(
                  <Col>
                      <span className={style.textOne5}>หมายเลขคำสั่งซื้อ:{transactionId}</span>
                  </Col>
                  ):(
                    <SkeletonComponent.SkeletonText size="default"/>
                  )}
                  <Row style={{ paddingTop: "1rem" }}>
                    <Col xs={4} sm={4} md={3} lg={4} xl={4} >
                      <styleComponent.iconCoin size="large" />
                    </Col>
                    <Col xs={11} sm={10} md={9} lg={10} xl={9}>
                      <span className={style.textOne5}>
                        {coin&&coin} เหรียญ
                      </span>
                    </Col>
                    <Col xs={9} sm={10} md={7} lg={9} xl={10} >
                      <Button
                        className="backgroundOrange buttonColor"
                        shape="round"
                        size="middle"
                        style={{ width: "7rem" }}
                      >
                        <span className={style.textOne5}>
                          THB {baht&&baht}
                        </span>
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
