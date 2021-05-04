import React from "react";
import { Col, Row, Divider } from "antd";
import styles from "./styles.module.scss";
import {
  faBookReader,
  faClock,
  faCoins,
  faUsers,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ListCorseTutor({data}) {
  return (
    <div>
      <div className={styles.paddingleftcourse} >
        <Row>
          <Col xs={24} sm={24}>
            <span className={styles.titleH5}>{data && data.subject}</span>
          </Col>
          <Col span={24} className={styles.paddingmanage}>
            <FontAwesomeIcon icon={faBookReader} className={styles.icon} />
            <span className={styles.textIcon}>{data && data.grade} , {data && data.title}</span>
          </Col>
          <Col span={24} className={styles.paddingmanage}>
            <FontAwesomeIcon icon={faCoins} className={styles.icon} />
            <span className={styles.textIcon}>{data && data.price} บาท/ชั่วโมง</span>
          </Col>
          <Col span={24} className={styles.paddingmanage}>
            <FontAwesomeIcon icon={faClock} className={styles.icon} />
            <span className={styles.textIcon}>
              {data && data.dateOfWeek}  {data && data.start} - {data && data.end} น.
            </span>
          </Col>
          <Col span={24} className={styles.paddingmanage}>
            <FontAwesomeIcon icon={faUsers} className={styles.icon} />
            <span className={styles.textIcon}>{data && data.type}</span>
          </Col>
        </Row>
      </div>
      <div>
        <Row>
          <Col className={styles.update}>
            <FontAwesomeIcon icon={faBell} style={{ color: "#f6ae2d",fontSize:"1.75rem" }} />
          </Col>
        </Row>
      </div>
      <Divider style={{ backgroundColor: "#F26419"}} />
    </div>
  );
}