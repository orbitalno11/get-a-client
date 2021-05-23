import { Row, Col, Button, Input } from "antd";
import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { exchangeSchema } from "../../../../../../validation/admin/exchangeSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { modalAction, coinAction } from "../../../../../../redux/actions";
import ModalComponent from "../../../../../modal/ModalComponent";
import { sizeModal } from "../../../../../modal/SizeModal";
import Edit from "./Edit";
import Delete from "./Delete";
import moment from "moment";

export default function Price() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(exchangeSchema),
  });

  const dispatch = useDispatch();
  const today = moment().format("MM/DD/YYYY")
  const onSubmit = (data) => {
    if(data){
      const data ={
        "title": "std",
        "baht": data.baht,
        "coin": data.coin,
        "type": "std",
        "startDate": Date(today),
        "endDate": Date(today),
        "updtaeDate":Date(today),
      }
    }
    dispatch(coinAction.CreateCost(data))
  }

  const list = useSelector((state) => state.coin.rateCoin);

  useEffect(() => {
    dispatch(coinAction.getCoinRatesAdmin());
  }, []);

  function ComponentSample() {
    return (
      <div style={{ paddingLeft: "1rem" }}>
        <form onSubmit={handleSubmit()}>
          <p className={style.titleH4}>เพิ่มอัตราการซื้อเหรียญ</p>
          <Row style={{ paddingTop: "1rem", marginBottom: "1.8rem" }}>
            <Col span={6} className={style.columnRate}>
              <Input
                type="baht"
                name="baht"
                ref={register}
                placeholder="บาท"
                className={`${style.inputRate} ${style.textNormal}`}
              />
              {errors.baht && (
                <p className="error-input">{errors.baht.message}</p>
              )}
            </Col>
            <Col span={3} className={style.textNormal}>บาท</Col>
            <Col span={1} className={style.textNormal}>=</Col>
            <Col span={6} className={style.columnRate}>
              <Input
                type="coin"
                name="coin"
                ref={register}
                placeholder="เหรียญ"
                className={`${style.inputRate} ${style.textNormal}`}
              />
              {errors.baht && (
                <p className="error-input">{errors.coin.message}</p>
              )}
            </Col>
            <Col span={3} className={style.textNormal}>เหรียญ</Col>
          </Row>
        </form>
        <Row className={style.btnRequest}>
          <Col span={6}>
            <Button
              className="backgroundGreen buttonColor"
              shape="round"
              size="middle"
              style={{ width: "100px" }}
              htmlType="submit"
              onClick={() => onSubmit()}
            >
              <span className={style.textNormal}>ยอมรับ</span>
            </Button>
          </Col>
          <Col span={6}>
            <Button
              className="backgroundRed buttonColor"
              shape="round"
              size="middle"
              style={{ width: "100px" }}
              onClick={() => dispatch(modalAction.closeModal())}
            >
             <span className={style.textNormal}>ปฏิเสธ</span>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  const component = () => {
    dispatch(
      modalAction.openModal({
        body: <ComponentSample />,
        size: sizeModal.default,
      })
    );
  };

  return (
    <Fragment>
      <Row style={{ marginLeft: "1rem" }}>
        <Col xs={3} sm={3} md={2} lg={2} xl={1}>
          <FontAwesomeIcon icon={faCoins} className={style.coins} />
        </Col>
        <Col xs={21} sm={21} md={20} lg={22} xl={23}>
          <span className={style.titleH4}>ราคาขายปัจจุบัน</span>
        </Col>
        <ModalComponent />
        <Row className={style.pagepaddingleft}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Button
              type="link"
              style={{ color: "#F5732E" }}
              onClick={() => component()}
            >
              <span className={style.textNormal}> เพิ่มอัตราการซื้อเหรียญ</span>            
            </Button>
          </Col>
        </Row>
      </Row>
      <div style={{ paddingLeft: "4rem" }}>
        <table className={style.tablecoins}>
          <thead>
            <tr>
              <th span={8} className={style.textNormal}>จำนวนเงิน (บาท)</th>
              <th span={8} className={style.textNormal}>จำนวนเหรียญ</th>
              <th span={8} className={style.textNormal}>การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list
              .filter((data) => data.type === "std")
              .map((data, index) => (
                <tr style={{ width: "1rem" }} key={index}>
                  <td className={style.textNormal}>{data && data.baht} </td>
                  <td className={style.textNormal}>{data && data.coin}</td>
                  <td>
                    <Edit />
                    &emsp;
                    <Delete />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
