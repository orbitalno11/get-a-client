import React from "react";
import { Col, Row, Divider,Image} from "antd";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook,faStar } from "@fortawesome/free-solid-svg-icons";
import ProfileSample from "../images/profile.webp"
import { color } from "../defaultValue";

export default function ListCourseLearner({data}) {
  return (
    <div style={{width:"100%",marginTop:"0.5rem"}}>
        <Row>
          <Col span={8} align="center">
            <Image
              src={data ? data.pictureUrl : ProfileSample}
              className={styles.imageSmall}
              preview={false}
            />
          </Col>
          <Col span={11} align="start" style={{ paddingLeft: "0.2rem" }}>
            <span className={`${styles.titleH5} ${styles.textOneLine}`}>
              {data && data.fullNameText}
            </span>
            <span className={styles.textSmall}>
              <FontAwesomeIcon icon={faBook} className={styles.star} />{" "}
              {data && data.subject.title}
            </span>
          </Col>
          <Col span={5} align="end">
            <span className={styles.text125}>
              <FontAwesomeIcon
                icon={faStar}
                className={styles.star}
                style={{ color: color.yellow }}
              />
              {data && data.rating}
            </span>
          </Col>
        </Row>
      <Divider/>
    </div>
  );
}
