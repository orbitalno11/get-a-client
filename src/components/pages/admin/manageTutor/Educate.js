import { Row, Col, Image, Button } from "antd";
import React from "react";
import "./Tutor.css";
import ONET from "../../../images/ONET.jpg";


function Educate() {
  return (
    <div>
      <table id="profile">
        <tr>
          <th>จันจิรา ดินแดนมหัศจรรย์ดาวพระศุกร์</th>
        </tr>
        <tr>
          <td style={{ paddingLeft: "2em" }}>
            <Row style={{ paddingTop: "20px", paddingBottom: "4px" }}>
              <Col span={24}>18 ม.ค. 2564 19.00 น.</Col>
            </Row>
            <Row style={{ paddingTop: "15px", paddingBottom: "3px" }}>
              <Col span={2}>ชื่อ</Col>
              <Col span={1}>:</Col>
              <Col span={21}>จันจิรา </Col>
            </Row>
            <Row style={{ paddingTop: "15px", paddingBottom: "3px" }}>
              <Col span={2}>นามสกุล</Col>
              <Col span={1}>:</Col>
              <Col span={21}>ดินแดนมหัศจรรย์ดาวพระศุกร์</Col>
            </Row>
            <Row style={{ paddingTop: "15px", paddingBottom: "3px" }}>
              <Col span={2}>ประะภท</Col>
              <Col span={1}>:</Col>
              <Col span={21}>คะแนนสอบ</Col>
            </Row>
            <Row style={{ paddingTop: "15px", paddingBottom: "3px" }}>
              <Col span={2}>วิชา</Col>
              <Col span={1}>:</Col>
              <Col span={21}>คณิตศาสตร์</Col>
            </Row>
            <Row style={{ paddingTop: "15px", paddingBottom: "3px" }}>
              <Col span={2}>คะแนน</Col>
              <Col span={1}>:</Col>
              <Col span={21}>98</Col>
            </Row>
            <Row style={{ paddingTop: "15px", paddingBottom: "3px" }}>
              <Col span={2}>ปีการศึกษา</Col>
              <Col span={1}>:</Col>
              <Col span={21}>98</Col>
            </Row>
            <Row style={{ paddingTop: "15px", paddingBottom: "3px" }}>
              <Col span={24}>รูปเอกสารยืนยัน</Col>
              <Col span={24} style={{paddingTop:"10px",paddingBottom:"3em"}}>
                <Image width={200} src={ONET} />
              </Col>
            </Row>
            <Row>
              <Col span={5}>
                <Button type="button" className="button-cancle">ปฏิเสธ</Button>
              </Col>
              <Col>
                <Button type="button" className="button-confirm">ยอมรับ</Button>
              </Col>
            </Row>
          </td>
        </tr>
      </table>
    </div>
  );
}
export default Educate;
