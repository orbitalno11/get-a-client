import { Row, Col, Button, Input } from "antd";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { exchangeSchema } from "../../../../../../validation/admin/exchangeSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles.module.scss";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { modalAction,coinAction } from "../../../../../../redux/actions";
import ModalComponent from "../../../../../modal/ModalComponent";
import { sizeModal } from "../../../../../modal/SizeModal";
import moment from "moment";

export default function Edit() {
  const params = useParams()
  const idCoin = params.id
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(exchangeSchema),
  });

  const dispatch = useDispatch();
  const today = moment().format("MM/DD/YYYY")

  const onSubmit = (data) => {
    if(idCoin){
      const rate ={
        "title": "std",
        "baht": data.baht,
        "coin": data.coin,
        "type": "std",
        "startDate": today,
        "endDate": today,
        "updtaeDate":today,
      }
      dispatch(modalAction.closeModal())
      dispatch(coinAction.updateCoinRate(idCoin,rate))
    }
  }

  function ComponentSample() {
    return (
      <div style={{ paddingLeft: "1rem" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className={style.titleH4}>แก้ไขอัตราการซื้อเหรียญ</p>
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
      <ModalComponent />
      <Button
        onClick={() => component()}
        className="backgroundOrange buttonColor"
        shape="round"
        size="middle"
        style={{ width: "100px" }}
        icon={<FontAwesomeIcon icon={faPen} style={{ color: "white" }} />}
      >
        <span style={{ paddingLeft: "0.5rem" }} className={style.textNormal}>แก้ไข</span>
      </Button>
    </Fragment>
  );
}
