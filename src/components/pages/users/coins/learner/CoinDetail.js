import React, { Fragment, useEffect, useState } from "react";
import { Typography, Grid, Col, Divider, Row, Button } from "antd";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../styles.module.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function CoinDetail() {
  const screens = useBreakpoint();
  const profile = useSelector((state) => state.profile);
  const [profileDetail, setProfileDetail] = useState(null);

  useEffect(() => {
    if (profile.profile) {
      setProfileDetail(profile.profile);
    }
  }, [profile]);

  return (
    <Fragment>
      <div>
        {screens.md && (
          <Col lg={24} xl={24} md={24}>
            <Title level={1}>ร้านค้า</Title>
          </Col>
        )}
      </div>
      <div className={style.coinshop}>
        <div style={{ fontSize: "40px" }}>
          <FontAwesomeIcon icon={faCoins} className={style.iconBig} />
          <span>{profileDetail && profileDetail.coin}</span>
        </div>
        <div className={style.coinlist}>
          <Row>
            <Col xs={7} sm={8} md={6} lg={8} xl={8}>
              <FontAwesomeIcon icon={faCoins} className={style.iconcoin} />
            </Col>
            <Col xs={8} sm={9} md={9} lg={10} xl={10}>
              196 เหรียญ
            </Col>
            <Col xs={7} sm={7} md={9} lg={6} xl={6}>
              <NavLink to="/coinshop/payment">
                <Button
                  className="backgroundGreen buttonColor"
                  shape="round"
                  size="middle"
                  style={{ width: "100px" }}
                >
                  THB 59.00
                </Button>
              </NavLink>
            </Col>
            <Divider type="horizontal" style={{ height: "100%" }} />
          </Row>
          <Row>
            <Col xs={7} sm={8} md={6} lg={8} xl={8}>
              <FontAwesomeIcon icon={faCoins} className={style.iconcoin} />
            </Col>
            <Col xs={8} sm={9} md={9} lg={10} xl={10}>
              340 เหรียญ
            </Col>
            <Col xs={7} sm={7} md={9} lg={6} xl={6}>
              <NavLink to="/Payment">
                <Button
                  className="backgroundGreen buttonColor"
                  shape="round"
                  size="middle"
                  style={{ width: "100px" }}
                >
                  THB 119.00
                </Button>
              </NavLink>
            </Col>
            <Divider type="horizontal" style={{ height: "100%" }} />
          </Row>
          <Row>
            <Col xs={7} sm={8} md={6} lg={8} xl={8}>
              <FontAwesomeIcon icon={faCoins} className={style.iconcoin} />
            </Col>
            <Col xs={8} sm={9} md={9} lg={10} xl={10}>
              426 เหรียญ
            </Col>
            <Col xs={7} sm={7} md={9} lg={6} xl={6}>
              <NavLink to="/Payment">
                <Button
                  className="backgroundGreen buttonColor"
                  shape="round"
                  size="middle"
                  style={{ width: "100px" }}
                >
                  THB 149.00
                </Button>
              </NavLink>
            </Col>
            <Divider type="horizontal" style={{ height: "100%" }} />
          </Row>
          <Row>
            <Col xs={7} sm={8} md={6} lg={8} xl={8}>
              <FontAwesomeIcon icon={faCoins} className={style.iconcoin} />
            </Col>
            <Col xs={8} sm={9} md={9} lg={10} xl={10}>
              727 เหรียญ
            </Col>
            <Col xs={7} sm={7} md={9} lg={6} xl={6}>
              <NavLink to="/Payment">
                <Button
                  className="backgroundGreen buttonColor"
                  shape="round"
                  size="middle"
                  style={{ width: "100px" }}
                >
                  THB 299.00
                </Button>
              </NavLink>
            </Col>
            <Divider type="horizontal" style={{ height: "100%" }} />
          </Row>
        </div>
      </div>
    </Fragment>
  );
}
