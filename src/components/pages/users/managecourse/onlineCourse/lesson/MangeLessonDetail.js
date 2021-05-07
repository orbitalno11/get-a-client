import { Col, Row,Typography,Button, Grid} from "antd";
import React from "react";
import CardLesson from "../../../../../card/CardLesson";
import styles from "../../styles.module.scss";
import { lesson } from "../../../../../card/Constants";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import isMobile from "../../../../../isMobile/isMobile"
const { useBreakpoint } = Grid;
const { Link } = Typography;

export default function ManageCourseDetail() {
  const screens = useBreakpoint();
  return (
    <div>
        <Row className={styles.pagecard}>
          {lesson &&
            lesson.map((item, index) => (
              <Col  md={24} lg={12} xl={8} className={!screens.xl?(styles.paddindMd) : (styles.paddingmange)} key={index}>
                <Link href="/tutor/online/{courseId}/video/{videoId}">
                  <CardLesson data={item}/>
                </Link>
              </Col>
          ))}
        </Row>
        {isMobile() && (
          <div className={styles.marginRigth}>
              <Link href="/tutor/online/{courseId}/video/create">
                <Button
                  className="backgroundBlue buttonColor"
                  shape="circle"
                  icon={
                    <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
                  }
                />
              </Link>
            </div>
        )}
    </div>
  );
}