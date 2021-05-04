import React from "react";
import { Col, Row, Divider } from "antd";
import styles from "./styles.module.scss";
import {
    faBookReader,
    faPlayCircle,
    faBell
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ListClip({data}) {
  return (
    <div style={{color:"black"}}> 
      <div className={styles.paddingleftcourse} >
        <Row>
          <Col xs={20} sm={20}>
            <span className={styles.titleH3}>{data && data.subject}</span>
          </Col>
          <Col xs={4} sm={4}>
            <FontAwesomeIcon icon={faBell} className={styles.floatBell} />
          </Col>
          <Col span={24} className={styles.paddingmanage}>
            <FontAwesomeIcon icon={faBookReader} className={styles.icon} />
            <span className={styles.textIcon}>{data && data.grade},{data && data.title}</span>
          </Col>
          <Col span={24} className={styles.paddingmanage}>
            <FontAwesomeIcon icon={faPlayCircle} className={styles.icon} />
            <span className={styles.textIcon}>{data && data.episode}</span>
          </Col>
        </Row>
      </div>
      <Divider className={styles.dividerLine} />
    </div>
  );
}