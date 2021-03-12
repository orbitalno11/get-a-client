import React, { Fragment } from "react";
import { Grid, Row, Col, Typography, Button } from "antd";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableHistory from "./TableHistory";
import style from "../styles.module.scss";


const { useBreakpoint } = Grid;
const { Title } = Typography;

export default function RedeemDetail() {
  const screens = useBreakpoint();
  return (
    <Fragment>
      {screens.xs || (screens.sm && !screens.md) ? (
        <div className={style.pageredeemsm}> 
          <div style={{ paddingTop: "1.5rem"}}>
            <Title level={4}>คุณมี</Title>
            <Row className={style.subredeem2}>
              <Col xs={5} sm={5}>
                <FontAwesomeIcon icon={faCoins} className={style.iconredeem} />
              </Col>
              <Col xs={19} sm={19}>
                100,000 เหรียญ
              </Col>
            </Row>
            <Title level={4} style={{ paddingTop: "1.8rem" }}>
              สามารถแลกเป็นเงิน
            </Title>
            <Row className={style.subredeem}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                THB 50,000
              </Col>
            </Row>
            <Row style={{ paddingTop: "1.8rem" }}>
              <Col xs={10} sm={11}>
                <Title level={4}>อัตราแลก</Title>
              </Col>
              <Col xs={4} sm={4}>
                <FontAwesomeIcon icon={faCoins} className={style.iconSmall2} />
              </Col>
              <Col xs={10} sm={9}>
                1 : 0.5 THB
              </Col>
            </Row>
            <Row className={style.alignCenterBtn}>
                <Button
                  className="backgroundGreen buttonColor"
                  shape="round"
                  size="small"
                  style={{ width: "100px" }}
                >
                  แลกเหรียญ
                </Button>
              </Row>
          </div>
        </div>
      ) : (
          <div className={style.flexredeem}>
            <div style={{ paddingTop: "1rem", paddingLeft: "20%" }}>
              <Title level={5}>คุณมี</Title>
              <Row className={style.subredeem}>
                <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                  <FontAwesomeIcon
                    icon={faCoins}
                    className={style.iconredeem}
                  />
                </Col>
                <Col xs={19} sm={19} md={19} lg={19} xl={19}>
                  100,000 เหรียญ
                </Col>
              </Row>
              <Row style={{ paddingTop: "1.5rem" }}>
                <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                  <Title level={5}>อัตราแลก</Title>
                </Col>
                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                  <FontAwesomeIcon icon={faCoins} className={style.iconSmall} />
                </Col>
                <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                  1 : 0.5 THB
                </Col>
              </Row>
            </div>
            <div style={{ paddingTop: "1rem", paddingLeft: "17%" }}>
              <Title level={5}>สามารถแลกเป็นเงิน</Title>
              <Row className={style.subredeem}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  THB 50,000
                </Col>
              </Row>
              <Row style={{ paddingTop: "1rem", paddingLeft: "14%" }}>
                <Button
                  className="backgroundGreen buttonColor"
                  shape="round"
                  size="small"
                  style={{ width: "100px" }}
                >
                  แลกเหรียญ
                </Button>
              </Row>
            </div>
            <TableHistory />
          </div>
      )}
    </Fragment>
  );
}
