import React, { Fragment, useEffect } from "react";
import { Row, Col, Divider } from "antd";
import style from "../styles.module.scss";
import TableHistory from "./TableHistory";
import isMobile from "../../../../isMobile/isMobile";
import { useDispatch, useSelector } from "react-redux";
import { coinAction } from "../../../../../redux/actions";
import moment from "moment";

export default function HistoryDetails() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.coin.coinUser);

  useEffect(() => {
    dispatch(coinAction.getCoinTransaction());
  }, []);

  return (
    <Fragment>
      {isMobile() ? (
        <div className={style.list}>
          {list &&
            list
              .map((data, index) => (
                <div style={{ paddingTop: "1rem" }} key={index}>
                  <Row>
                    <Col xs={20} sm={20}>
                      <span>เติมเหรียญ</span>
                    </Col>
                    <Col xs={4} sm={4} className={style.marginright}>
                      <span style={{ color: "green" }}>+{data && data.numberOfCoin}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={24} sm={24} className={style.marginright}>
                      <span className={style.textSmall}>{moment(data.endDate).format("ll")}</span>
                    </Col>
                  </Row>
                  <Divider />
                </div>
              ))}
        </div>
      ) : (
        <TableHistory />
      )}
    </Fragment>
  );
}
