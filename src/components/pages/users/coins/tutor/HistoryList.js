import React, { Fragment } from "react";
import { Row, Col,Divider} from "antd";
import { useSelector } from "react-redux";
import style from "../styles.module.scss";
import isEmpty from "../../../../defaultFunction/checkEmptyObject";
import EmptyImage from "../../../../loading/EmptyImage";
import moment from "moment";
import {color, defaultValue} from "../../../../defaultValue"
import { styleComponent } from "../../../../defaultFunction/style";

export default function HistoryList() {

  const transaction = useSelector((state) => state.coin.transaction);

  const status = {
    0: {
      color: color.green
    },
    1: {
      color: color.red
    },
    3: {
      color: color.red
    },
    4: {
      color: color.green
    }
  }

  return (
    <Fragment>
        <div className={style.pageredeemsm}>
        {transaction && transaction.length ? (
          <div>
            {!isEmpty(transaction) &&transaction.map((data, index) => (
              <div style={{ paddingTop: "1rem" }} key={index}>
                <Row>
                  <Col xs={17} sm={18}>
                    <span className={style.textOne5} style={styleComponent.text(!isEmpty(data.transactionType) ? status[data.transactionType].color : color.black)}>
                      {data&& defaultValue.transactionType[data.transactionType]}
                    </span>
                  </Col>
                  <Col xs={7} sm={6} className={style.marginright}> 
                    <span className={style.textOne5}>
                      {data&&data.numberOfCoin} Coin
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
                       ยังไม่มีข้อมูลการแลกเหรียญ&nbsp;
                  </p>
              </div>
            )}   
        </div>
    </Fragment>
  );
}
