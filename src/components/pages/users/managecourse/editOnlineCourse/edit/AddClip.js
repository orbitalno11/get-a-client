import React, { Fragment } from "react";
import { Row, Grid, Col, Button,Divider} from "antd";
import style from "../../styles.module.scss";
import Header from "../../../../../headerMobile/Header";
import AddClipDeail from "./AddClipDeail";
import AddClipVDO from "./AddClipVDO";
import isMobile from "../../../../../isMobile/isMobile"

const { useBreakpoint } = Grid;

export default function AddClip() {
  const screens = useBreakpoint();
  return (
    <Fragment>
      {isMobile() && (
        <Header title="เพิ่มบทเรียน" pageBack="/tutor/online" />
      )}
       <Row className={style.body}>
        <Col xs={24} sm={24} md={12} lg={13} xl={11}>
          <AddClipDeail />
        </Col>
        {screens.md && (
          <Col md={3} lg={2} xl={2}>
            <Divider
              type="vertical"
              style={{ height: "100%", marginLeft: "3rem" }}
            />
          </Col>
        )}
        <Col xs={24} sm={24} md={9} lg={8} xl={10}>
            <AddClipVDO/>
        </Col>
        <Col xl={24} md={24} sm={20} xs={24} className={style.alignCenter}>
          <Button
            className="buttonColor backgroundOrange"
            size="large"
            shape="round"
            style={{ width: "7.5rem", marginTop: "3.7rem" }}
            htmlType="submit"
          >
            บันทึก
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
}
