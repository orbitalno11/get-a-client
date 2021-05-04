import { Col, Row, Grid, Typography, Button } from "antd";
import React from "react";
import CardCourse from "../../../../card/CardCourse";
import ListCourseTutor from "../../../../card/ListCourseTutor";
import { courseOffline } from "../../../../card/Constants";
import style from "../styles.module.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import isMobile from "../../../../isMobile/isMobile"
const { useBreakpoint } = Grid;
const { Link } = Typography;

export default function ManageCourseDetail() {
  const screens = useBreakpoint();

  return (
    <div>
      {isMobile() ? (
        <div>
          {courseOffline &&
            courseOffline.map((item, index) => (
              <div key={index}>
                <ListCourseTutor data={item} />
              </div>
            ))}
          <div className={style.marginRigth}>
            <Link href="/tutor/course/create">
              <Button
                className="backgroundBlue buttonColor"
                shape="circle"
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
                }
              />
            </Link>
          </div>
        </div>
      ) : (
        <Row className={!screens.lg ? style.alignCenter : style.pagecard}>
          {courseOffline &&
            courseOffline.map((item, index) => (
              <Col
                className={!screens.lg ? style.paddindMd : style.paddingmange}
                key={index}
              >
                <CardCourse data={item} />
              </Col>
            ))}
        </Row>
      )}
    </div>
  );
}
