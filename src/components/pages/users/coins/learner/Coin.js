import React,{Fragment} from "react";
import { Col , Row } from "antd";
import style from "../styles.module.scss";
import Header from "../../../../headerMobile/Header";
import isMobile from "../../../../isMobile/isMobile";
import { useSelector } from "react-redux";

export default function Coin() {

  const loading = useSelector((state) => state.loading.loading);
  return (
    <Fragment>
      {isMobile() && <Header title="ร้านค้า" />}
        <Row className={style.container}>
          {screens.md && (
            <Col md={3} lg={3} xl={2}>
              <Divider
                type="vertical"
                style={{ height: "100%", marginLeft: "3rem" }}
              />
            </Col>
          )}
        </Row>
    </Fragment>
  );
}