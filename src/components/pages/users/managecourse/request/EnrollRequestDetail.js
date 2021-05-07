import { Col, Row,Grid, Divider} from "antd";
import React from "react";
import Request from "./Request"
import styles from "../styles.module.scss";
import {Enroll} from "../../../../card/Constants"
const { useBreakpoint } = Grid;

export default function ManageCourseDetail() {
  const screens = useBreakpoint();

  return (
    <div>
      {screens.md && (
        <Col lg={24} xl={24} md={24}>
          <span className={styles.titleH2}>คำขอเข้าเรียน</span>
        </Col>
      )}
        <Row>
          {screens.md && (
            <Col md={24} lg={24} xl={24} style={{ marginTop: "-1.5rem" }}>
              <Divider type="horizontal" style={{ height: "5%",width: "100%",backgroundColor: "#F26419",}}/>
            </Col>
          )}
          {Enroll &&
            Enroll.map((item, index) => (
              <Col xs={24} sm={24} md={24} lg={24} xl={24} key={index} >   
                <Request data={item}/>
              </Col>
           ))}
        </Row>
    </div>
  );
}