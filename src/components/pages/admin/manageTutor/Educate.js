import { Row, Col, Image, Button } from "antd";
import React, { Fragment, useCallback, useEffect } from "react";
import style from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import ModalComponent from "../../../modal/ModalComponent";
import moment from "moment";
import { verifyAction } from "../../../../redux/actions";
import { useParams } from "react-router";

export default function Educate() {
  const dispatch = useDispatch();
  const params = useParams();
  const idEducation = params.id;
  const list = useSelector((state) => state.verify.educateDetail);
  const fetchEducation = useCallback(() => {
    dispatch(verifyAction.geteEducationDetail(idEducation));
  }, [dispatch]);

  useEffect(() => {
    fetchEducation();
  }, [fetchEducation]);

  const handleCancel = () => {
    dispatch(verifyAction.geteManageEducation(idEducation, false))
  };

  const handleSubmit = () => {
    dispatch(verifyAction.geteManageEducation(idEducation, true))
  }

  return (
    <Fragment>
          {list && (
            <table className="profile">
              <tbody>
                <tr>
                  <td style={{ paddingLeft: "2.3rem" }}>
                    <Row
                      style={{
                        paddingTop: "1.25rem",
                        paddingBottom: "0.25rem",
                      }}
                    >
                      <Col span={24}>
                        {" "}
                        {moment(list.created).format("DD/MM/YY")} &ensp;{" "}
                        {moment(list.created).format("HH:mm")} น.
                      </Col>
                    </Row>
                    <Row className={style.detailProfile}>
                      <Col span={24}>
                        <b>ชื่อ :</b> {list.firstname}
                      </Col>
                    </Row>
                    <Row className={style.detailProfile}>
                      <Col span={24}>
                        <b>นามสกุล :</b> {list.lastname}
                      </Col>
                    </Row>
                    <Row className={style.detailProfile}>
                      <Col span={24}>
                        <b>สาขาวิชา :</b> {list.educationData.branchText}
                      </Col>
                    </Row>
                    <Row className={style.detailProfile}>
                      <Col span={24}>
                        <b>GPAX :</b> {list.educationData.gpax}
                      </Col>
                    </Row>
                    <Row className={style.detailProfile}>
                      <Col span={24}>
                        <b>สถานะการศึกษาปัจจุบัน :</b> {list.educationData.status}
                      </Col>
                    </Row>
                    <Row className={style.detailProfile}>
                      <Col span={24}>
                        <b>สถาบันการศึกษา :</b> {list.educationData.instituteText}
                      </Col>
                    </Row>
                    <Row className={style.detailProfile}>
                      <Col span={24}><b>รูปเอกสารยืนยัน</b></Col>
                      <Col span={7} style={{ paddingTop: "0.7rem" }}>
                        <Image
                          width={200}
                          src={
                            list.verifiedData && list.verifiedData.documentUrl1
                          }
                        />
                      </Col>
                      <Col span={7} style={{ paddingTop: "0.7rem" }}>
                        <Image
                          width={200}
                          src={
                            list.verifiedData && list.verifiedData.documentUrl2
                          }
                        />
                      </Col>
                      <Col span={7} style={{ paddingTop: "0.7rem" }}>
                        <Image
                          width={200}
                          src={
                            list.verifiedData && list.verifiedData.documentUrl3
                          }
                        />
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
                          onClick={() => handleCancel()}
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
                          onClick={() => handleSubmit()}
                        >
                          ยอมรับ
                        </Button>
                      </Col>
                    </Row>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
    </Fragment>
  );
}
