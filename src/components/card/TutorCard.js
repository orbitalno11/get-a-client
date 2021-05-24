import React from "react";
import { Col, Row, Divider,Image} from "antd";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook,faStar } from "@fortawesome/free-solid-svg-icons";
import ProfileSample from "../images/profile.webp"
import { color } from "../defaultValue";
import { useHistory } from "react-router";

export default function TutorCard({data}) {
  const history = useHistory();

  const redirectToCoursePage = () => {
      history.push(`/profile/${data.id}/course`)
  }
  return (
    <div style={{width:"100%",marginTop:"0.5rem"}}  onClick={() => redirectToCoursePage()}>
        <Row>
          <Col span={8} align="center">
            <Image
              src={data ? data.pictureUrl : ProfileSample}
              className={styles.imageSmall}
              preview={false}
            />
          </Col>
          <Col span={12} align="start" style={{ paddingLeft: "0.2rem" }}>
            <span className={`${styles.textOneo25} ${styles.textOneLine}`}>
              {data && data.fullNameText}
            </span>
            <div className={styles.marginTop1}>
                <FontAwesomeIcon icon={faBook} className={`${styles.star} ${styles.marginRight1}`} />
                <span className={styles.textOne}>{data && data.subject.title}</span>
            </div>
          </Col>
          <Col span={4} align="end">
            <span className={styles.textOneo25}>
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
