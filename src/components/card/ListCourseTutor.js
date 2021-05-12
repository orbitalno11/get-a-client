import React from "react";
import { Col, Row, Divider } from "antd";
import styles from "./styles.module.scss";
import {
  faBell,
  faBookReader,
  faClock,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import findKeyObject from "../defaultFunction/findKeyObject";
import { defaultValue } from "../defaultValue/defaultValue";
import { Fragment } from "react";
import { color } from "../defaultValue";

export default function ListCorseTutor({ data }) {

  const colorBlack = {
    color : color.black
  }

  return (
    <Fragment>
      <Row className={styles.paddingleftcourse} >
        <Col span={20} >
          <div >
            <h4 className={styles.titleH3}>{data && data.name}</h4>
          </div>
          <div className={styles.gridfull}>
            <FontAwesomeIcon icon={faBookReader} className={styles.icon} />
            <span style={colorBlack} className={`${styles.marginLeft}`}>{data && data.grade.title} , {data && data.subject.title}</span>
          </div>
          <div className={styles.gridfull}>
            <FontAwesomeIcon icon={faClock} className={styles.icon} />
            <span style={colorBlack} className={`${styles.marginLeft}`}>
              {data && data.timeText}
            </span>
          </div>
          <div className={styles.gridfull}>
            <FontAwesomeIcon icon={faUsers} className={styles.icon} />
            <span style={colorBlack} className={`${styles.marginLeft}`}>{data && findKeyObject(defaultValue.type, data.courseType)}</span>
          </div>
        </Col>
        <Col className={styles.paddingmanage}>
          <FontAwesomeIcon icon={faBell} style={{color : data.requestNumber > 0 ? color.yellow : color.gray}} className={styles.floatBell} />
        </Col>
      </Row>
      <Divider style={{ backgroundColor: color.orange }} />
    </Fragment>
  );
}