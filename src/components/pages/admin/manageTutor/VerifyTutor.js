import { Row, Col } from "antd";
import React, { Fragment, useEffect } from "react";
import style from "./styles.module.scss";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { verifyAction } from "../../../../redux/actions";
import { Link } from "react-router-dom";
import Loading from "../../../loading/Loading";
import EmptyImage from "../../../loading/EmptyImage";

export default function VerifyTutor() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state);
  const list = useSelector((state) => state.verify.identity);

  useEffect(() => {
    dispatch(verifyAction.getIdentityVerifyList());
  }, []);

  return (
    <Fragment>
      {loading.loading && <Loading />}
      <table className="verify">
        <thead>
          <tr>
            <th className={style.textNormal}>เอกสารยืนยันตัวตน</th>
          </tr>
        </thead>
        {list && list.length ? (
          <tbody>
            {list &&
              list.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/admin/verify/profile/${item.id}`}>
                      <Row style={{ color: "black" }}>
                        <Col md={2} lg={1} xl={1}>
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className={style.iconCloseemail}
                          />
                        </Col>
                        <Col md={10} lg={9} xl={7} className={style.textNormal}>
                          {item && item.fullNameRequest}
                        </Col>
                        <Col
                          md={10}
                          lg={10}
                          xl={10}
                          className={style.textVerify}
                        >
                          ได้ส่งเอกสารยืนยันตัวตนแล้ว
                        </Col>
                        <Col md={2} lg={4} xl={6} className={style.timeVerify}>
                          {moment(item && item.created).format("HH:mm")}
                        </Col>
                      </Row>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        ) : (
          <div align="center">
            <EmptyImage size="default" />
            <p className={style.textNormal}>ยังไม่มีเอกสารยืนยันตัวตน&nbsp;</p>
          </div>
        )}
      </table>
    </Fragment>
  );
}
