import { Row , Col , Button, Grid} from "antd";
import React, { Fragment } from "react";
import style from "../styles.module.scss";
import check from "../../../../images/check.svg"
import isMobile from "../../../../isMobile/isMobile";
import Header from "../../../../headerMobile/Header";
import { useSelector } from "react-redux";
import Loading from "../../../../loading/Loading";
import Recommend from "./Recommend";
import { Link } from "react-router-dom";

const { useBreakpoint } = Grid;

export default function PaymentSuccess() {
  const screens = useBreakpoint();
  const loading = useSelector((state) => state.loading);
  const params = new URLSearchParams(window.location.search);
  const tid = params.get("tid")
  const amount = params.get("amount")
  const status =params.get("status")

  return (
    <Fragment>
      {loading.loading && <Loading />}
      {isMobile() && <Header pageBack="/coin" />}
      <div className="container" >
        <div className={!isMobile()?style.paddingBottomRecommend:style.paddingTopTwo6}>
            <div className={style.section}>
              <span className={style.headerTwo75}>ชำระเงินสำเร็จ</span>
              <Row>
                <Col xl={7} lg={7} md={24} sm={24} xs={24} className={style.centerPage}>
                  <img src={check} width="150" height="150" className={isMobile()?style.paddingTopOne:null} />                
                </Col>
                <Col xl={12} lg={12} md={24} sm={24} xs={24} className={!screens.lg?style.orderOne:null}>
                { status != "success" &&
                  <Row className={!screens.lg? !screens.md ?style.left:style.horizontalCenter:style.left}>
                    <span className={style.headerOne75}>รายละเอียดคำสั่งซื้อของคุณ</span><br/>
                      <span className={style.textOne75}>หมายเลขคำสั่งซื้อ: {tid}</span>
                    
                  </Row>
                }
                  { status != "success" &&
                    <Row style={{ width:"100%" }} className={!screens.lg?style.horizontalCenter:null}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                          <span className={style.textOne5}>ยอดชำระ : {amount} บาท</span>
                        </Col>
                    </Row>
                  }
                  </Col>
                  { screens.lg?(
                    <Col xl={5} lg={4}>
                      <Link to = "/me">
                        <Button
                          className={style.buttonProfile}
                          shape="round"
                          size="middle"
                          style={{ width: "10rem" }}
                        >
                          <span className={style.textOne5}>
                              โปรไฟล์
                          </span>
                        </Button>
                      </Link>
                    </Col>
                  ):(
                    <Row style={{ paddingTop: "2.7rem",width:"100%"}} className={!screens.lg? !screens.md ?style.left:style.horizontalCenter:style.left}>
                    <Col xl={14} lg={13} md={6} sm={10} xs={11} align="end">
                      <Link to = "/popular">
                        <Button
                          className="backgroundOrange buttonColor"
                          shape="round"
                          size="middle"
                          style={{ width: "8rem" }}
                          htmlType="submit"
                        >
                          <span className={screens.md ? style.textOne5 : style.textOne35}>
                            ดูคอร์ส
                          </span>
                        </Button>
                      </Link>
                    </Col>
                    <Col xl={14} lg={13} md={7} sm={13} xs={13} align="center">
                      <Link to = "/me">
                        <Button
                          className={style.buttonProfile}
                          shape="round"
                          size="middle"
                          style={{ width: "8rem" }}
                        >
                          <span className={screens.md ? style.textOne5 : style.textOne35}>
                            โปรไฟล์
                          </span>
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                    )}                  
              </Row>
            </div>
        </div>
        { screens.md &&
          <Recommend/>
        }
      </div>
    </Fragment>
  );
}