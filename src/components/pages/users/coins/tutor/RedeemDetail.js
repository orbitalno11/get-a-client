import React, { Fragment, useEffect } from "react";
import { Row, Col, Button } from "antd";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableHistory from "./TableHistory";
import style from "../styles.module.scss";
import isMobile from "../../../../isMobile/isMobile";
import { useDispatch, useSelector } from "react-redux";
import { coinAction } from "../../../../../redux/actions";
import Loading from "../../../../loading/Loading";
import EmptyImage from "../../../../loading/EmptyImage";

export default function RedeemDetail() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state);
  const list = useSelector((state) => state.coin.rateCoin);
  const item = useSelector((state) => state.coin.coinUser);

  useEffect(() => {
    dispatch(coinAction.getCoinRatesTutor());
    dispatch(coinAction.getCoinBalance());
  }, []);

  return (
    <Fragment>
      {list && list.length ? (
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
                  {item &&
                  <Col xs={19} sm={19} md={19} lg={19} xl={19}>
                    {item.amount}
                  </Col>
                  }
                </Row>
                <span
                  className={style.titleH5}
                  style={{ paddingTop: "1.8rem" }}
                >
                  สามารถแลกเป็นเงิน
                </span>
                <Row className={style.subredeem}>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                     {item.amount}
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
            <div className={style.flexredeem}>
              <div style={{ paddingTop: "1rem", paddingLeft: "20%" }}>
                <span className={style.titleH5}>คุณมี</span>
                <Row className={style.subredeem}>
                  <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                    <FontAwesomeIcon icon={faCoins} className={style.redeem} />
                  </Col>
                  {item &&
                  <Col xs={19} sm={19} md={19} lg={19} xl={19}>
                    {item.amount}
                  </Col>
                  }
                </Row>
                <Row style={{ paddingTop: "1.5rem" }}>
                  <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                    <span className={style.titleH5}>อัตราแลก</span>
                  </Col>
                  <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                    <FontAwesomeIcon icon={faCoins} className={style.Small} />
                  </Col>
                  {list &&
                    list.map((data, index) => (
                      <Col md={10} lg={10} xl={10} key={index}>
                        {data && data.coin} : {data && data.baht} THB
                      </Col>
                    ))}
                </Row>
              </div>
              <div style={{ paddingTop: "1rem", paddingLeft: "17%" }}>
                <span className={style.titleH5}>สามารถแลกเป็นเงิน</span>
                <Row className={style.subredeem}>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    THB 50,000
                  </Col>
                </Row>
                <Row style={{ paddingTop: "1rem", paddingLeft: "14%" }}>
                  <Button
                    className="backgroundGreen buttonColor"
                    shape="round"
                    size="middle"
                  >
                    แลกเหรียญ
                  </Button>
                </Row>
              </div>
              <TableHistory />
            </div>
          )}
        </Fragment>
      ) : (
        <div align="center">
          <EmptyImage size="default" />
          <p className={style.textNormal}>ยังไม่มีข้อมูลเหรียญ&nbsp;</p>
        </div>
      )}
    </Fragment>
  );
}
