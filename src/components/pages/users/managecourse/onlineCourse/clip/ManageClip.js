import React, { Fragment } from "react";
import { Row, Grid, Col, Button, Divider,Typography } from "antd";
import style from "../../styles.module.scss";
import Header from "../../../../../headerMobile/Header";
import ManageClipDetail from "./ManageClipDetail";
import isMobile from "../../../../../isMobile/isMobile"
const { useBreakpoint } = Grid;
const { Link } = Typography;

export default function ManageClip() {
  const screens = useBreakpoint();

  const floatRight = {
    marginLeft: "auto",
    display: "flex",
    marginTop:"0.3rem"
  };
  
  return (
    <Fragment>
      {isMobile() && <Header  title="จัดการคลิป"/>}
      <Row className={`${style.body} ${style.alignCenter}`}>
        <Col md={24} lg={24} xl={24}>
          {screens.md && (
            <Row>
              <Col md={19} lg={19} xl={19}>
                <span className={style.titleH2}>จัดการคอร์สเรียน</span>
              </Col>
              <Col md={5} lg={5} xl={5}>
                <Link href="/tutor/online/create">
                  <Button
                    className="buttonColor backgroundBlue"
                    shape="round"
                    size="middle"
                    style={floatRight}
                  >
                    เพิ่มบทเรียน
                  </Button>
                </Link>
              </Col>
              <Divider type="horizontal" className={style.dividerCourse} />
            </Row>
          )}
        </Col>
        <Col span={24}>
          <ManageClipDetail />
        </Col>
      </Row>
    </Fragment>
  );
}
