import { Col, Row, Typography, Grid } from "antd";
import React, { useEffect, useState } from "react";
import CardCorseLearner from "../../../../card/CardCourseLearner";
import style from "../styles.module.scss";
import { useSelector } from "react-redux";

const { useBreakpoint } = Grid;
const { Title } = Typography;

export default function FavoriteDetail() {
  const screens = useBreakpoint();
  const profile = useSelector((state) => state.profile);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (profile.profile) {
      setCourse(profile.profile);
    }
  }, [profile]);

  return (
    <div>
      {screens.md && (
        <Col lg={24} xl={24} md={24}>
          <Title level={screens.md ? 3 : 5}>รายการที่คุณถูกใจ</Title>
        </Col>
      )}

      <Row justify="space-around" align="middle" className={style.marginTop20}>
        {course !== null &&
          course.course.tutor.length !== 0 &&
          course.course.tutor.map((item, index) => (
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={24}
              xl={12}
              className={style.padding}
              key={index}
            >
              <CardCorseLearner data={item} />
            </Col>
          ))}
      </Row>
    </div>
  );
}