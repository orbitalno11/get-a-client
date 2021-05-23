import { Row, Col, Button, Image } from "antd";
import React, { Fragment, useCallback, useEffect } from "react";
import style from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import ModalComponent from "../../../modal/ModalComponent";
import moment from "moment";
import { verifyAction } from "../../../../redux/actions";
import { useParams } from "react-router";
import Loading from "../../../loading/Loading";

export default function Profile() {
  const dispatch = useDispatch();
  const params = useParams();
  const idProfile = params.id;
  const list = useSelector((state) => state.verify.identitydDetail);
  const { loading } = useSelector((state) => state);
  const fetchProfile = useCallback(() => {
    dispatch(verifyAction.geteProfileDetail(idProfile));
  }, [dispatch]);

  useEffect(() => {
    fetchProfile();
    return () => {
      dispatch(verifyAction.clearListVerify())
    }
  }, [fetchProfile]);

  const takeAction = (action) => {
    dispatch(verifyAction.geteManageIdentity(idProfile, action));
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
                  <Col>
                    <Button
                      className="buttonColor backgroundGreen"
                      style={{ width: "6rem" }}
                      shape="round"
                      size="middle"
                      onClick={() => takeAction(true)}
                    >
                      <span className={style.textNormal}>ยอมรับ</span>
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
                      <span className={style.textNormal}>ปฏิเสธ</span>
                    </Button>
                  </Col>
                </Row>
                <Row
                  style={{
                    paddingTop: "1.25rem",
                    paddingBottom: "0.25rem",
                  }}
                >
                  <Col span={24} className={style.textNormal}>
                    {moment(list.created).format("DD/MM/YY")} &ensp;{" "}
                    {moment(list.created).format("HH:mm")} น.
                  </Col>
                </Row>
                <Row className={style.detailProfile}>
                  <Col span={7} className={style.textNormal}>
                    <b className={style.textNormal}>ชื่อ : </b> {list.firstname}
                  </Col>
                  <Col span={16} className={style.textNormal}>
                    <b className={style.textNormal}>นามสกุล :</b>{" "}
                    {list.lastname}
                  </Col>
                </Row>
                <Row className={style.detailProfile}>
                  <Col span={24} className={style.textNormal}>
                    <b className={style.textNormal}>อีเมล :</b> {list.email}
                  </Col>
                </Row>
                <Row className={style.detailProfile}>
                  <Col span={7}>
                    <b className={style.textNormal}>รูปบัตรประชาชน</b>
                  </Col>
                  <Col span={7}>
                    <b className={style.textNormal}>รูปถ่ายหน้าตรง</b>
                  </Col>
                  <Col span={7}>
                    <b className={style.textNormal}>รูปถ่ายคู่กับบัตรประชาชน</b>
                  </Col>
                </Row>
                <Row>
                  <Col span={7} style={{ paddingTop: "0.7rem" }}>
                    <Image
                      width={200}
                      src={list.verifiedData && list.verifiedData.documentUrl1}
                    />
                  </Col>
                  <Col span={7} style={{ paddingTop: "0.7rem" }}>
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
