import { Row, Col, Image, Button} from "antd";
import React, { Fragment } from "react";
import style from "./styles.module.scss";
import ONET from "../../../images/ONET.webp";
import { useDispatch } from "react-redux";
import { modalAction } from "../../../../redux/actions";
import ModalComponent from "../../../modal/ModalComponent";
import { sizeModal } from "../../../modal/SizeModal";
import { typeModal } from "../../../modal/TypeModal";
import { verifyEducation } from "./Constants";

export default function Educate() {
  const dispatch = useDispatch();

  const alert = () => {
    dispatch(
      modalAction.openModal({
        text: "ดำเนินการสำเร็จ",
        size: sizeModal.small,
        alert: typeModal.corrent,
      })
    );
  };

  return (
    <Fragment>
      {verifyEducation &&
        verifyEducation
          .filter((verifyEducation) => verifyEducation.id === "1")
          .map((item, index) => (
            <table className="profile" key={index}>
              <thead>
                <tr>
                  <th>{item && item.fullNameTaxt}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ paddingLeft: "2.3rem" }}>
                    <Row
                      style={{
                        paddingTop: "1.25rem",
                        paddingBottom: "0.25rem",
                      }}
                    >
                      <Col span={24}>{item && item.date} &ensp;  {item && item.time} น.</Col>
                    </Row>
                    <Row className={style.detailProfile}>
                      <Col md={3} lg={3} xl={2}>
                        ชื่อ
                      </Col>
                      <Col md={1} lg={1} xl={1}>
                        :
                      </Col>
                      <Col md={20} lg={20} xl={20}>
                        {item && item.firstname}
                      </Col>
                    </Row>
                    <Row className={style.detailProfile}>
                      <Col md={3} lg={3} xl={2}>
                        นามสกุล
                      </Col>
                      <Col md={1} lg={1} xl={1}>
                        :
                      </Col>
                      <Col md={20} lg={20} xl={20}>
                      {item && item.lastname}
                      </Col>
                    </Row>
                    <Row className={style.detailProfile}>
                      <Col md={3} lg={3} xl={2}>
                        ประเภท
                      </Col>
                      <Col md={1} lg={1} xl={1}>
                        :
                      </Col>
                      <Col md={20} lg={20} xl={20}>
                      {item && item.type}
                      </Col>
                    </Row>
                    <Row className={style.detailProfile}>
                      <Col md={3} lg={3} xl={2}>
                        วิชา
                      </Col>
                      <Col md={1} lg={1} xl={1}>
                        :
                      </Col>
                      <Col md={20} lg={20} xl={20}>
                      {item && item.subject}
                      </Col>
                    </Row>
                    <Row className={style.detailProfile}>
                      <Col md={3} lg={3} xl={2}>
                        คะแนน
                      </Col>
                      <Col md={1} lg={1} xl={1}>
                        :
                      </Col>
                      <Col md={20} lg={20} xl={20}>
                      {item && item.score}
                      </Col>
                    </Row>
                    <Row className={style.detailProfile}>
                      <Col md={3} lg={3} xl={2}>
                        ปีการศึกษา
                      </Col>
                      <Col md={1} lg={1} xl={1}>
                        :
                      </Col>
                      <Col md={20} lg={20} xl={20}>
                      {item && item.year}
                      </Col>
                    </Row>
                    <Row className={style.detailProfile}>
                      <Col span={24}>รูปเอกสารยืนยัน</Col>
                      <Col span={24} style={{ paddingTop: "0.7rem" }}>
                        <Image width={200} src={ONET} />
                      </Col>
                    </Row>
                    <ModalComponent />
                    <Row className={style.approve}>
                      <Col md={9} lg={8} xl={5}>
                        <Button
                          className="buttonColor backgroundRed"
                          style={{ width: "10rem" }}
                          shape="round"
                          size="middle"
                        >
                          ปฎิเสธ
                        </Button>
                      </Col>
                      <Col md={5} lg={10} xl={10}>
                        <Button
                          className="buttonColor backgroundGreen"
                          style={{ width: "10rem" }}
                          shape="round"
                          size="middle"
                          onClick={() => alert()}
                        >
                          ยอมรับ
                        </Button>
                      </Col>
                    </Row>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
    </Fragment>
  );
}
