import { Row , Col , Button , Grid} from "antd";
import React, { Fragment } from "react";
import warningSign from "../../../../images/warningSign.svg"
import style from "../styles.module.scss";
import isMobile from "../../../../isMobile/isMobile";
import Header from "../../../../headerMobile/Header";
import Loading from "../../../../loading/Loading";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const { useBreakpoint } = Grid;

export default function PaymentFailure() {
 const screens = useBreakpoint();
 const loading = useSelector((state) => state.loading);
 const params = new URLSearchParams(window.location.search);
 const tid = params.get("tid")
 const amount = params.get("amount")

  return (
    <Fragment>
      {loading.loading && <Loading />}
      {isMobile() && <Header pageBack="/coin" />}
      <div className="container" >
        <div className={!isMobile()?style.bodyPaddingTopBottom:style.paddingTopTwo6}>
            <div className={style.section}>
              <span className={style.headerTwo75}>ชำระเงินไม่สำเร็จ</span>
              <Row  className={!isMobile()?style.orderOne:null}>
                <Col xl={12} lg={10} md={24} sm={24} xs={24}className={style.horizontalCenter}>
                  <img src={warningSign} width="250" height="250"  className={isMobile()?style.paddingTopOne:null} />                
                </Col>
                <Col xl={12} lg={14} md={24} sm={24} xs={24} className={!screens.lg?style.orderOne:null}>
                  <Row className={!screens.lg? !screens.md ?style.left:style.horizontalCenter:style.left}>
                    <span className={style.headerOne75}>รายละเอียดคำสั่งซื้อของคุณ</span><br/>
                    <span className={style.textOne75}>หมายเลขคำสั่งซื้อ: {tid&&tid}</span><br/>
                  </Row>
                  <Row style={{ paddingTop: "1rem" }} className={!screens.lg?style.horizontalCenter:null}>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <span className={style.textOne5}>
                          ยอดชำระ: {amount&&amount} บาท
                        </span>
                      </Col>
                  </Row>
                </Col>
              </Row>
              <Row style={{ paddingTop: "4rem" }} className={style.horizontalCenter}>
                    <Col style={{ marginRight: "2rem" }}>
                      <Link to = "/coin">
                        <Button
                            className="backgroundOrange buttonColor"
                            shape="round"
                            size="middle"
                            style={{ width: "8rem" }}
                        >
                            <span className={style.textOne5}>
                                ชำระใหม่
                            </span>
                        </Button>
                      </Link>
                    </Col>
                    <Col>
                      <Link to = "/me">
                        <Button
                            className={style.buttonProfile}
                            shape="round"
                            size="middle"
                            style={{ width: "8rem" }}
                        >
                            <span className={style.textOne5}>
                                โปรไฟล์
                            </span>
                        </Button>
                      </Link>
                    </Col>
              </Row>
            </div>
        </div>
      </div>
    </Fragment>
  );
}