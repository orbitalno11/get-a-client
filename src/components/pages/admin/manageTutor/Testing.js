import { Row, Col, Image, Button } from "antd";
import React, { Fragment, useCallback, useEffect } from "react";
import style from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import ModalComponent from "../../../modal/ModalComponent";
import moment from "moment";
import { verifyAction } from "../../../../redux/actions";
import { useParams } from "react-router";
import Loading from "../../../loading/Loading";

export default function Testing() {
  const dispatch = useDispatch();
  const params = useParams();
  const idTest = params.id;
  const list = useSelector((state) => state.verify.testDetail);
  const { loading } = useSelector((state) => state);
  const fetchTest = useCallback(() => {
    dispatch(verifyAction.geteTestingDetail(idTest));
  }, [dispatch]);

  useEffect(() => {
    fetchTest();
    return () => {
      dispatch(verifyAction.clearListVerify())
    }
  }, [fetchTest]);

  const takeAction = (action) => {
    dispatch(verifyAction.geteManageTesting(idTest, action));
  };

  return (
    <Fragment>
      {loading.loading && <Loading />}
      {list && (
        <table className="profile">
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
                    <b className={style.textOne5}>การสอบ :</b>{" "}
                    {list.exam.examText}
                  </Col>
                  <Col span={16} className={style.textOne5}>
                    <b className={style.textOne5}>วิชา :</b>{" "}
                    {list.exam.subjectText}
                  </Col>
                </Row>
                <Row className={style.detailProfile}>
                  <Col span={24} className={style.textOne5}>
                    <b className={style.textOne5}>คะแนน :</b>{" "}
                    {list.exam.score}
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
