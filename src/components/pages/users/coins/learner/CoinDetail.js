import React, { Fragment, useEffect } from "react";
import { Grid, Col, Divider, Row, Button, Typography } from "antd";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { coinAction } from "../../../../../redux/actions";
import Loading from "../../../../loading/Loading";
const { useBreakpoint } = Grid;
const { Link } = Typography;

export default function CoinDetail() {
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);
  const list = useSelector((state) => state.coin.rateCoin);

  useEffect(() => {
    dispatch(coinAction.getCoinRatesLearner());
  }, []);

  return (
    <Fragment>
      {loading.loading && <Loading />}
      <div>
        {screens.md && (
          <Col lg={24} xl={24} md={24}>
            <span className={style.titleH2}>ร้านค้า</span>
          </Col>
        )}
      </div>
      <div>
        <div className={style.coinshop}>
          <FontAwesomeIcon icon={faCoins} className={style.Big} />
          <span className={style.textLarge}>1000,0000</span>
        </div>
        <div className={style.coinlist}>
          {list &&
            list.map((item, index) => (
              <Row key={index}>
                <Col xs={7} sm={8} md={5} lg={6} xl={6}>
                  <FontAwesomeIcon icon={faCoins} className={style.coins} />
                </Col>
                <Col xs={8} sm={9} md={10} lg={10} xl={10} className={style.textNormal}>
                  {item && item.coin} เหรียญ
                </Col>
                <Col xs={7} sm={7} md={9} lg={6} xl={6}>
                  <Link href="/coinshop/payment">
                    <Button
                      className="backgroundGreen buttonColor"
                      shape="round"
                      size="middle"
                      style={{ width: "100px" }}
                    >
                      <span className={style.textNormal}>THB {item && item.baht}</span>
                    </Button>
                  </Link>
                </Col>
                <Divider type="horizontal" style={{ height: "100%" }} />
              </Row>
            ))}
        </div>
      </div>
    </Fragment>
  );
}