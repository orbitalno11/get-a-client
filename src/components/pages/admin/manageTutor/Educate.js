import { Row, Col, Image, Button } from "antd";
import React, { Fragment, useCallback, useEffect } from "react";
import style from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import ModalComponent from "../../../modal/ModalComponent";
import moment from "moment";
import { verifyAction } from "../../../../redux/actions";
import { useParams } from "react-router";
import Loading from "../../../loading/Loading";

export default function Educate() {
  const dispatch = useDispatch();
  const params = useParams();
  const idEducation = params.id;
  const list = useSelector((state) => state.verify.educateDetail);
  const { loading } = useSelector((state) => state);
  const fetchEducation = useCallback(() => {
    dispatch(verifyAction.geteEducationDetail(idEducation));
  }, [dispatch]);

  useEffect(() => {
    fetchEducation();
    return () => {
      dispatch(verifyAction.clearListVerify())
    }
  }, [fetchEducation]);

  const takeAction = (action) => {
    dispatch(verifyAction.geteManageEducation(idEducation, action));
  };

  return (
    <Fragment>
      {loading.loading && <Loading />}
      {list && (
        <table className={style.profile}>
          <tbody>
            <tr>
              <td style={{ paddingLeft: "2.3rem" }}>
              <Row className={style.approve}>
                  <Col md={5} lg={4} xl={3}>
                    <Button
                      className="buttonColor backgroundGreen"
                      style={{ width: "6rem" }}
                      shape="round"
                      size="middle"
                      onClick={() => takeAction(true)}
                    >
                      <span className={style.textOne35}>ยอมรับ</span>
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      className="buttonColor backgroundRed"
                      style={{ width: "6rem" }}
                      shape="round"
                      size="middle"
                      onClick={() => takeAction(false)}
                    >
                      <span className={style.textOne35}>ปฏิเสธ</span>
                    </Button>
                  </Col>
                </Row>
                <Row
                  style={{
                    paddingTop: "1.25rem",
                    paddingBottom: "0.25rem",
                  }}
                >
                  <Col span={24} className={style.textOne5}>
                    {" "}
                    {moment(list.created).format("DD/MM/YY")} &ensp;{" "}
                    {moment(list.created).format("HH:mm")} น.
                  </Col>
                </Row>
                <Row className={style.detailProfile}>
                  <Col span={7} className={style.textOne5}>
                    <b className={style.textOne5}>ชื่อ :</b> {list.firstname}
                  </Col>
                  <Col span={16} className={style.textOne5}>
                    <b className={style.textOne5}>นามสกุล :</b>{" "}
                    {list.lastname}
                  </Col>
                </Row>
                <Row className={style.detailProfile}>
                  <Col span={7} className={style.textOne5}>
                    <b className={style.textOne5}>สาขาวิชา :</b>{" "}
                    {list.educationData.branchText}
                  </Col>
                  <Col span={16} className={style.textOne5}>
                    <b className={style.textOne5}>GPAX :</b>{" "}
                    {list.educationData.gpax}
                  </Col>
                </Row>
                <Row className={style.detailProfile}>
                  <Col span={7} className={style.textOne5}>
                    <b className={style.textOne5}>สถานะการศึกษาปัจจุบัน :</b>{" "}
                    {list.educationData.status}
                  </Col>
                  <Col span={16} className={style.textOne5}>
                    <b className={style.textOne5}>สถาบันการศึกษา :</b>{" "}
                    {list.educationData.instituteText}
                  </Col>
                </Row>
                <Row className={style.detailProfile}>
                  <Col span={24}>
                    <b className={style.textOne5}>รูปเอกสารยืนยัน</b>
                  </Col>
                  <Col span={5} style={{ paddingTop: "0.7rem" }}>
                    <Image
                      width={200}
                      src={list.verifiedData && list.verifiedData.documentUrl1}
                    />
                  </Col>
                  <Col span={5} style={{ paddingTop: "0.7rem" }}>
                    <Image
                      width={200}
                      src={list.verifiedData && list.verifiedData.documentUrl2}
                    />
                  </Col>
                  <Col span={7} style={{ paddingTop: "0.7rem" }}>
                    <Image
                      width={200}
                      src={list.verifiedData && list.verifiedData.documentUrl3}
                    />
                  </Col>
                </Row>
                <ModalComponent />
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </Fragment>
  );
}
