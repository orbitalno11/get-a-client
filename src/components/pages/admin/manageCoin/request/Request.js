import React, { Fragment,useEffect } from "react";
import { Row, Col } from "antd";
import RequesDetail from "./RequesDetail";
import { styleComponent } from "../../../../defaultFunction/style";
import style from "../styles.module.scss";
import Loading from "../../../../loading/Loading";
import { useDispatch,useSelector } from "react-redux";
import { coinAction } from "../../../../../redux/actions";
import EmptyImage from "../../../../loading/EmptyImage";

export default function Request() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state);
  const list = useSelector((state) => state.coin.redeemList);

  useEffect(() => {
    dispatch(coinAction.getRequestsRedeem());
  }, []);

  return (
    <Fragment>
      {loading.loading && <Loading />}
        <Row style={{ marginLeft: "1rem" }}>
          <Col xs={3} sm={3} md={2} lg={2} xl={1} style={{paddingTop:"0.2rem"}}>
              <styleComponent.iconCoin size="medium"/>
          </Col>
          <Col xs={21} sm={21} md={17} lg={18} xl={20}>
            <span className={style.headerOne5}>
              คำขอการถอนเหรียญที่ยังไม่ได้รับการอนุมัติ
            </span>
          </Col>
        </Row>
        {list && list.length ? (
        <Row style={{ paddingTop: "1rem", paddingLeft: "2rem" }}>
            {list &&
              list.map((item, index) => (
                <Col key={index}>
                  <RequesDetail data={item} />
                </Col>
              ))}
          </Row>
          ) : (
          <div align="center">
            <EmptyImage size="default" />
            <p className={style.textOne35}>ยังไม่มีคำขอแลกเหรียญ&nbsp;</p>
          </div>
        )}
    </Fragment>
  );
}

