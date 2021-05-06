import React, { Fragment } from "react";
import { Col,Grid,Button,Row} from "antd";
import style from "../styles.module.scss";
import Header from "../../../../headerMobile/Header";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { useBreakpoint } = Grid;

export default function Complete() {
  const screens = useBreakpoint();

  return (
    <Fragment>
      {(screens.xs || (screens.sm && !screens.md)) && (
        <Header/>
      )}
      <Row className={style.complete}>
        <Col  span={24} className={style.center}>
         <Col xs={3} sm={2} md={2} lg={1} xl={1}>
            <FontAwesomeIcon icon={faCheckCircle} className={style.correct} />
         </Col>
         <Col>
            <span className={style.titleH4}>จ่ายเงินสำเร็จ</span>
         </Col>
        </Col>
        <Col span={24} className={style.alignCenter}>
          <Button
            className={style.buttonpayment}
            shape="round"
            size="large"
            style={{ width: "150px", marginRight: "2rem" }}
          >
            ไปโปรไฟล์
          </Button>
          <Button
            className="backgroundOrange buttonColor"
            shape="round"
            size="large"
            style={{ width: "150px" }}
          >
            ไปคอร์สเรียน
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
}
