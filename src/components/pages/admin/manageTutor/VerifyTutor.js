import { Row, Col, Typography } from "antd";
import React, { Fragment } from "react";
import style from "./styles.module.scss";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { verifyTutor } from "./Constants";
const { Link } = Typography;

export default function VerifyTutor() {
  return (
    <Fragment>
      <table className="verify">
        <thead>
          <tr>
            <th>เอกสารยืนยันตัวตน</th>
          </tr>
        </thead>
        <tbody>
          {verifyTutor &&
            verifyTutor.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link href="/admin/verify/profile/1">
                    <Row style={{ color: "#000000" }}>
                      <Col md={2} lg={1} xl={1}>
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className={style.iconCloseemail}
                        />
                      </Col>
                      <Col md={10} lg={9} xl={7} className={style.textSmall}>
                        {item && item.fullNameTaxt}
                      </Col>
                      <Col md={10} lg={10} xl={10} className={style.textVerify}>
                        ได้ส่งเอกสารยืนยันตัวตนแล้ว
                      </Col>
                      <Col md={2} lg={4} xl={6} className={style.timeVerify}>
                        {item && item.time}
                      </Col>
                    </Row>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
}
