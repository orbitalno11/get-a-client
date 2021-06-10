import { Image, Divider, Row, Col, Button } from "antd";
import React from "react";
import styles from "../styles.module.scss";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { color, defaultValue } from "../../../../defaultValue";
import { useDispatch } from "react-redux";
import { offlineCourseAction } from "../../../../../redux/actions";
import { Fragment } from "react";
import { styleComponent } from "../../../../defaultFunction/style";
import isMobile from "../../../../isMobile/isMobile";
import SampleProfile from "../../../../images/profile.webp"

export default function Request({ id, data, line, request }) {
  const dispatch = useDispatch()

  const enrollCourse = (status) => {
    dispatch(offlineCourseAction.acceptEnrollOfflineCourse(id, data.userId, status))
  }

  const ButtonEnrool = () => {
    return (
      <Fragment>
        <Button className={`${styles.buttonColor} ${isMobile() ? styles.textOne : styles.textOne25}`} size="small" style={styleComponent.buttonFull(color.orange, "5rem")} onClick={() => enrollCourse(defaultValue.enrollStatus["APPROVE"])}>อนุมัติ</Button>
        <Button className={`${styles.buttonColor} ${isMobile() ? styles.textOne : styles.textOne25} ${styles.marginLeftOneHalf}`} size="small" style={styleComponent.buttonFull(color.gray, "5rem")} onClick={() => enrollCourse(defaultValue.enrollStatus["DENIED"])}>ปฏิเสธ</Button>
      </Fragment>
    )
  }

  return (
    <Row align="middle" justify={"space-around"}>
      <Col xl={5} lg={4} md={5} sm={6} xs={9}>
        <Image
          className={styles.imageRequest}
          src={data?.photoUrl ? data.photoUrl : SampleProfile}
          preview={false}
        />
      </Col>
      <Col xl={17} lg={17} md={17} sm={17} xs={15}>
        <Row>
          <Col span={!isMobile() ? 13 : 24}>
            <Row >
              <Col span={24}>
                <span className={`${styles.headerOne75} ${styles.textOneLine}`}>{data && data.fullNameText}</span>
              </Col>
              <Col span={24}>
                {data.address &&
                  <Fragment>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className={`${styles.textOne25}`} style={{ color: color.gray }} />
                    <span className={`${styles.textOne25} ${styles.marginLeftOneHalf}`}>
                      {data?.address?.district?.title}
                    </span>
                  </Fragment>
                }
              </Col>
            </Row>
          </Col>
          {
            request && (
              <Col className={!isMobile() && styles.paddingTopHalf} span={!isMobile() ? 11 : 24} align={isMobile() ? "start" : "end"}>
                <ButtonEnrool />
              </Col>
            )
          }
        </Row>
      </Col>
      {
        line && (<Divider type="horizontal" style={{ height: "100%" }} />)
      }
    </Row>
  );
}