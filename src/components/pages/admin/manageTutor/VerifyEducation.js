import { Row, Col } from "antd";
import React from "react";
import "./Tutor.css";
import { NavLink } from "react-router-dom";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function VerifyEducation() {
  return (
    <div>
      <table className="verify">
        <thead>
          <tr>
            <th>เอกสารยืนยันประวัติการศึกษา</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <NavLink to="/admin/educate">
                <Row style={{ color: "#000000" }}>
                  <Col span={1}>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="icon-closeemail"
                    />
                  </Col>
                  <Col span={7}>จันจิรา ดินแดนมหัศจรรย์ดาวพระศุกร์</Col>
                  <Col span={10} className="text-verify">
                    ได้ส่งเอกสารยืนยันการเรียน o-net คณิตศาสตร์
                  </Col>
                  <Col span={6} className="time-verify">
                    18 ม.ค. 2564 19.00 น.
                  </Col>
                </Row>
              </NavLink>
            </td>
          </tr>
          <tr>
            <td>
              <a>
                <Row style={{ color: "#000000" }}>
                  <Col span={1}>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="icon-openemail"
                    />
                  </Col>
                  <Col span={7}>สายน้ำผึ้ง อัครเรืองมนตรีศรีสวาทมหาไทย</Col>
                  <Col span={10} className="text-verify">
                    ได้ส่งเอกสารยืนยันการเรียน o-net เคมี
                  </Col>
                  <Col span={6} className="time-verify">
                    18 ม.ค. 2564 19.00 น.
                  </Col>
                </Row>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default VerifyEducation;
