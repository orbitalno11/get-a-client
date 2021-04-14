import React, { Fragment } from "react";
import { Grid, Row, Col,Divider} from "antd";
import style from "../styles.module.scss";
import TableHistory from "./TableHistory"

const { useBreakpoint } = Grid;

export default function History() {
  const screens = useBreakpoint();
  return (
    <Fragment>
      {screens.xs || (screens.sm && !screens.md) ? (
        <div className={style.pageredeemsm}>
          <div style={{ paddingTop: "1rem" }}>
            <Row>
              <Col xs={17} sm={18}>
                <span>5,000 Coin</span>
              </Col>
              <Col xs={7} sm={6} className={style.marginright}> 
                <span style={{color:"green"}}>2,500 THB</span>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} className={style.marginright}> 
                <span className={style.textSmall}>31 ต.ค. 63</span>
              </Col>
            </Row>
          </div>
          <Divider />
          <div style={{ paddingTop: "1rem" }}>
            <Row>
              <Col xs={17} sm={18}>
                <span>6,000 Coin</span>
              </Col>
              <Col xs={7} sm={6} className={style.marginright}> 
                <span style={{color:"green"}}>3,000 THB</span>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} className={style.marginright}> 
                <span className={style.textSmall}>31 ต.ค. 63</span>
              </Col>
            </Row>
          </div>
          <Divider />
        </div>
      ) : (
        <TableHistory/>
      )}
    </Fragment>
  );
}
