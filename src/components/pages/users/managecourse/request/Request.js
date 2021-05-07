import { Col, Row,Divider, Image, Button } from "antd";
import React from "react";
import styles from "../styles.module.scss";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import isMobile from "../../../../isMobile/isMobile"

export default function Request({data}) {

  return (
    <div>
      {isMobile() ? (
        <Row className={styles.paddingpage}>
          <Col xs={9} sm={8}>
            <Image
              className={styles.imageProfile}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              preview={false}
            ></Image>
          </Col>
          <Col xs={15} sm={16}style={{ paddingTop: "1rem" }}>
            <Col>
              <span className={styles.titleH5}>{data && data.fullNameText}</span>
            </Col>
            <Col>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
              <span style={{ marginLeft: "0.7rem" }}>{data && data.address}</span>
            </Col>
          </Col>
          <Row className={styles.request}>
            <Col xs={16} sm={16}>
                    <Button
                    className="buttonColor backgroundOrange"
                    size="medium"
                    shape="round"
                    style={{ width: "120px" }}
                    >
                    อนุมัติ
                    </Button>
                </Col>
                <Col xs={8} sm={8}>
                    <Button
                    className="buttonColor backgroundGray"
                    size="medium"
                    shape="round"
                    style={{ width: "120px" }}
                    >
                    ลบคำขอ
                    </Button>
                </Col>
          </Row>
          <Divider type="horizontal" style={{ height: "100%" }} />
        </Row>
      ) : (
        <Row className={styles.paddingpage}>
          <Col xs={8} sm={9} md={6} lg={5} xl={3}>
            <Image
              className={styles.imageProfile}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              preview={false}
            ></Image>
          </Col>
          <Col xs={8} sm={9} md={7} lg={10} xl={15} style={{ paddingTop: "1rem" }}>
            <Col>
              <span className={styles.titleH5}>{data && data.fullNameText}</span>
            </Col>
            <Col>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
              <span style={{ marginLeft: "0.7rem" }}>{data && data.address}</span>
            </Col>
          </Col>
          <Col xs={8} sm={9} md={5} lg={5} xl={3} style={{ paddingTop: "2rem" }}>
            <Button
              className="buttonColor backgroundOrange"
              size="medium"
              shape="round"
              style={{ width: "120px" }}
            >
              อนุมัติ
            </Button>
          </Col>
          <Col xs={8} sm={9} md={4} lg={4} xl={3} style={{ paddingTop: "2rem" }}>
            <Button
              className="buttonColor backgroundGray"
              size="medium"
              shape="round"
              style={{ width: "120px" }}
            >
              ลบคำขอ
            </Button>
          </Col>
          <Divider type="horizontal" style={{ height: "100%" }} />
        </Row>
      )}
    </div>
  );
}
