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

export default function RedeemDetail() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state);
  const list = useSelector((state) => state.coin.rateCoin);
  // const item = useSelector((state) => state.coin.coinUser);

  useEffect(() => {
    dispatch(coinAction.getCoinRatesTutor());
    dispatch(coinAction.getCoinBalance());
  }, []);

  return (
    <Fragment>
          {loading.loading && <Loading />}
          {isMobile() ? (
            <div className={style.pageredeemsm}>
              <div style={{ paddingTop: "1.5rem" }}>
                <span className={style.titleH5}>คุณมี</span>
                <Row className={style.subredeem2}>
                  <Col xs={4} sm={3}>
                    <FontAwesomeIcon icon={faCoins} className={style.redeem} />
                  </Col>
                  
                  <Col xs={19} sm={19} md={19} lg={19} xl={19}>
                   
                  </Col>
                
                </Row>
                <span
                  className={style.titleH5}
                  style={{ paddingTop: "1.8rem" }}
                >
                  สามารถแลกเป็นเงิน
                </span>
                <Row className={style.subredeem}>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                     
                  </Col>
                </Row>
                <Row style={{ paddingTop: "1.8rem" }}>
                  <Col xs={8} sm={6}>
                    <span className={style.titleH5}>อัตราแลก</span>
                  </Col>
                  <Col xs={4} sm={3}>
                    <FontAwesomeIcon icon={faCoins} className={style.Xs} />
                  </Col>
                  {list &&
                    list.map((data, index) => (
                      <Col xs={10} sm={9} key={index}>
                        {data && data.coin} : {data && data.baht} THB
                      </Col>
                    ))}
                </Row>
                <Row className={style.alignCenterBtn}>
                  <Button
                    className="backgroundGreen buttonColor"
                    shape="round"
                    size="middle"
                  >
                    แลกเหรียญ
                  </Button>
                </Row>
              </div>
            </div>
          ) : (
            <div className={`${style.marginSection} ${style.contentRedemm}`}>
              <Row className={style.paddingTopHead2}>
                 <Col span={11}>
                    <span className={style.textTwo25}>คุณมี</span>
                 </Col>
                 <Col span={6}>
                    <span className={style.textTwo25}>สามารถแลกเป็นเงิน</span>
                 </Col>
                 <Col span={3} className={`${style.centerPage} ${style.marginRight01}`}>
                    <Button
                        className="backgroundGreen buttonColor"
                        shape="round"
                        size="middle"
                      >
                         <span className={style.headerOne5}>แลกเหรียญ</span>
                      </Button>
                 </Col>
              </Row>
              <Row className={style.paddingTopHead2}>
                  <Col span={3} className={style.paddingCoin}>
                    <FontAwesomeIcon icon={faCoins} className={style.redeem} />
                  </Col>
                  <Col span={9}>
                      <span className={style.headerFour}>100,000</span>
                  </Col>
                  <Col span={9}>
                      <span className={style.headerFour}>THB 50,000</span>
                  </Col>
              </Row>
              <Row className={style.paddingTopHead2} style={{paddingBottom:"3rem"}}>
                  <Col span={4}>
                      <span className={style.textTwo25}>อัตราแลกปัจุบัน</span>
                  </Col>
                  <Col span={2} className={style.centerPage} >
                    <FontAwesomeIcon icon={faCoins} className={style.small} />
                  </Col>
                  <Col span={12}>
                      <span className={style.textTwo25}>100 : 5 THB</span>
                  </Col>
              </Row>
            </div>
          )}
    </Fragment>
  );
}
