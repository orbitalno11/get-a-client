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
    <div style={{width:"100%",marginTop:"0.5rem",cursor:"pointer"}}  onClick={() => redirectToCoursePage()}>
        <Row>
          <Col span={8} align="center">
            <Image
              src={data ? data.pictureUrl : ProfileSample}
              className={styles.imageSmall}
              preview={false}
            />
          </Col>
          <Col span={11} align="start" style={{ paddingLeft: "0.2rem" }} className={styles.textOne25}>
            <span className={styles.textOneLine}>
              {data && data.fullNameText}
            </span>
            <div>
                <FontAwesomeIcon icon={faBook} className={`${styles.icon} ${styles.marginRightHalf}`} />
                <span className={styles.textOne}>{data && data.subject.title}</span>
            </div>
          </Col>
          <Col span={5} align="end">
            <span className={styles.textOneo25}>
              <FontAwesomeIcon
                icon={faStar}
                className={styles.icon}
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
