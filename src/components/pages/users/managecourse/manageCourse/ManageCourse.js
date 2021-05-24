import React, { Fragment } from "react";
import { Row, Col, Button, Divider } from "antd";
import style from "../styles.module.scss";
import Header from "../../../../headerMobile/Header";
import ManageCourseDetail from "./ManageCourseDetail";
import isMobile from "../../../../isMobile/isMobile"
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ManageCourse() {
  const location = useLocation()
  const floatRight = {
    marginLeft: "auto",
    display: "flex",
    marginTop: "0.3rem"
  };

  return (
    <Fragment>
      {isMobile() && (
        <Header title="จัดการคอร์ส" />
      )}
      <div className={style.container}>
        <div >
          {!isMobile() ? (
            <Row>
              <Col md={18} lg={19} xl={19}>
                <span className={style.titleH2}>จัดการคอร์สเรียน</span>
              </Col>
              <Col md={6} lg={5} xl={5}>
                <Link to={`${location.pathname}/create`}>
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
          ) : (
            <Link to={`${location.pathname}/create`}>
              <button className={style.buttonfixbottom} >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </Link>
          )}
        </div>
        <ManageCourseDetail />
      </div>
    </Fragment>
  );
}