import React, { Fragment, useEffect, useState } from "react";
import { Grid, Col, Divider, Row, Button,Typography } from "antd";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../styles.module.scss";
import { useSelector } from "react-redux";
const { useBreakpoint } = Grid;
const { Link } = Typography;

export default function CoinDetail({data}) {
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
            <span className={style.titleH2}>ร้านค้า</span>
          </Col>
        )}
      </div>
      <div>
        <div className={style.coinshop}> 
          <FontAwesomeIcon icon={faCoins} className={style.Big} />
          <span>{profileDetail && profileDetail.coin}</span>
        </div>
        <div className={style.coinlist}>
          <Row>
            <Col xs={7} sm={8} md={6} lg={7} xl={7}>
              <FontAwesomeIcon icon={faCoins} className={style.coins} />
            </Col>
            <Col xs={8} sm={9} md={9} lg={10} xl={10}>
              {data && data.coin} เหรียญ
            </Col>
            <Col xs={7} sm={7} md={9} lg={6} xl={6}>
              <Link href="/coinshop/payment">
                <Button
                  className="backgroundGreen buttonColor"
                  shape="round"
                  size="middle"
                  style={{ width: "100px" }}
                >
                  THB {data && data.baht}
                </Button>
              </Link>
            </Col>
            <Divider type="horizontal" style={{ height: "100%" }} />
          </Row>
        </div>
      </div>
    </Fragment>
  );
}
