import React, { Fragment, useEffect } from "react";
import { Row, Col, Divider } from "antd";
import style from "../styles.module.scss";
import isEmpty from "../../../../defaultFunction/checkEmptyObject";
import { useDispatch, useSelector } from "react-redux";
import { coinAction } from "../../../../../redux/actions";
import moment from "moment";
import Loading from "../../../../loading/Loading";
import EmptyImage from "../../../../loading/EmptyImage";
import {color , defaultValue} from "../../../../defaultValue"
import { styleComponent } from "../../../../defaultFunction/style";

export default function HistoryList() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state);
  const transaction = useSelector((state) => state.coin.transaction);

  const status = {
    0:  color.green,
    1:  color.red,
    3:  color.red,
    4:  color.green
  }

  useEffect(() => {
    dispatch(coinAction.getCoinTransaction());
  }, []);

  return (
        <Fragment>
          {loading.loading && <Loading />}
            <div className={style.hisList}>
            {transaction && transaction.length ? (
              <div>
              {!isEmpty(transaction) &&transaction.map((data, index) => (
                  <div style={{ paddingTop: "1rem" }} key={index}>
                    <Row>
                      <Col xs={20} sm={20}>
                      <span className={style.textOne5} style={styleComponent.text(!isEmpty(data.transactionType) ? status[data.transactionType]: color.black)}>
                        {data&& defaultValue.transactionType[data.transactionType]}
                      </span>
                      </Col>
                      <Col xs={4} sm={4} className={style.marginright}>
                        <span className={style.textOne5}>
                          {data && data.numberOfCoin}
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={24} sm={24} className={style.marginright}>
                        <span className={style.textOne35}>{moment(data.transactionDate).format("ll")}</span>
                      </Col>
                    </Row>
                    <Divider />
                  </div>
                ))}
              </div>
              ) : (
                <div align="center">
                  <EmptyImage size="default" />
                    <p className={style.textNormal}>
                        ยังไม่มีข้อมูลประวัติเหรียญ&nbsp;
                    </p>
                </div>
              )} 
            </div>
        </Fragment>
  );
}
