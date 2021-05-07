import { Row, Col, Typography } from "antd";
import React, { Fragment } from "react";
import style from "./styles.module.scss";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { verifyEducation } from "./Constants";
const { Link } = Typography;

export default function VerifyEducation() {
  return (
    <Fragment>
      <table className="verify">
        <thead>
          <tr>
            <th>เอกสารยืนยันประวัติการศึกษา</th>
          </tr>
        </thead>
        <tbody>
          {verifyEducation &&
            verifyEducation.map((item, index) => (
              <tr  key={index}>
                <td>
                  <Link href="/admin/verify/education/1">
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
                        ได้ส่งเอกสารยืนยันการเรียน {item && item.type}  {item && item.subject}
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
