import React, { Fragment} from "react";
import { Col, Row, Grid, Divider } from "antd";
import style from "../styles.module.scss";
import Header from "../../../../headerMobile/Header";
import FavoriteDetail from "./FavoriteDetail";
import Recommend from "./Recommend";
import ResponseMobile from "../../../../response/ResponseMobile";
const { useBreakpoint } = Grid;

export default function Favorite() {
  const screens = useBreakpoint();
 
  return (
    <Fragment>
      {ResponseMobile() ? (
        <div>
          <Header title="ที่คุณถูกใจ" />
          <Row className={style.body}>
            <Col xs={24} sm={24}>
              <Recommend />
            </Col>
            <Col xs={24} sm={24}>
              <FavoriteDetail />
            </Col>
          </Row>
        </div>
      ) : (
        <Row className={style.body}>
          <Col xs={24} sm={24} md={24} lg={11} xl={14} style={{ marginRight: "1rem" }}>
            <FavoriteDetail />
          </Col>
          {screens.md && (
            <Col md={1} lg={1} xl={1}>
              <Divider type="vertical" style={{ height: "100%" }} />
            </Col>
          )}
          <Col xs={24} sm={24} md={24} lg={11} xl={7}>
            <Recommend />
          </Col>
        </Row>
      )}
    </Fragment>
  );
}
