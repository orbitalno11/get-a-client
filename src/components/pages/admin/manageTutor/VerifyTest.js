import { Row, Col} from "antd";
import React, { Fragment, useEffect } from "react";
import style from "./styles.module.scss";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { verifyAction } from "../../../../redux/actions";
import { Link } from "react-router-dom";

export default function VerifyTest() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);
  const list = useSelector((state) => state.verify.test);

  useEffect(() => {
    dispatch(verifyAction.geteTestVerifyList());
  }, []);
  
  return (
    <Fragment>
      {loading ? (
        <div className={style.loader}></div>
      ) : (
        <table className="verify">
          <thead>
            <tr>
              <th>เอกสารยืนยันการสอบ</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/admin/verify/test/${item.id}`}>
                      <Row style={{ color: "black" }}>
                        <Col md={2} lg={1} xl={1}>
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className={style.iconCloseemail}
                          />
                        </Col>
                        <Col md={10} lg={9} xl={7} className={style.textSmall}>
                          {item && item.fullRequestName}
                        </Col>
                        <Col
                          md={10}
                          lg={10}
                          xl={10}
                          className={style.textVerify}
                        >
                          ได้ส่งเอกสารยืนยันการสอบ {item && item.fullExamTitle}
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
        </table>
      )}
    </Fragment>
  );
}
