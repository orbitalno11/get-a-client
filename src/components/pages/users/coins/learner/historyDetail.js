import React, { Fragment } from "react";
import { Grid, Row, Col,Divider} from "antd";
import style from "../styles.module.scss";
import TableHistory from "./TableHistory"

const { useBreakpoint } = Grid;

export default function HistoryDetail() {
  const screens = useBreakpoint();
  return (
    <Fragment>
      {screens.xs || (screens.sm && !screens.md) ? (
        <div className={style.list}>
          <div style={{ paddingTop: "1rem" }}>
            <Row>
              <Col xs={20} sm={20}>
                <span>เติมเหรียญ</span>
              </Col>
              <Col xs={4} sm={4} className={style.marginright}> 
                <span style={{color:"green"}}>+ 123</span>
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
              <Col xs={20} sm={20}>
                <span>จ่ายเหรียญ</span>
              </Col>
              <Col xs={4} sm={4} className={style.marginright}> 
                <span style={{color:"red"}}>- 20</span>
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