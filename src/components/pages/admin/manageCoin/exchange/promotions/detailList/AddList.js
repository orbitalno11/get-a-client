import { Row, Col, Button, Input } from "antd";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { exchangeSchema } from "../../../../../../../validation/admin/exchangeSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import style from "../../../styles.module.scss";
import { useDispatch } from "react-redux";
import { modalAction } from "../../../../../../../redux/actions";
import ModalComponent from "../../../../../../modal/ModalComponent";
import { sizeModal } from "../../../../../../modal/SizeModal";
import { typeModal } from "../../../../../../modal/TypeModal";

export default function Add() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(exchangeSchema),
  });

  const dispatch = useDispatch();

  const onSubmit = () => {
    // todo onSubmit
    // value
  };

  function ComponentSample() {
    return (
      <div style={{ paddingLeft: "1rem" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className={style.titleH4}>เพิ่มอัตราการซื้อเหรียญ</p>
        <Row style={{ paddingTop: "1rem", marginBottom: "1.8rem" }}>
          <Col span={6} className={style.columRate}>
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
          <Col span={6} className={style.columRate}>
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
            onClick={() => alert()}
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

  const alert = () => {
    dispatch(
      modalAction.openModal({
        text: "ดำเนินการสำเร็จ",
        size: sizeModal.small,
        alert: typeModal.corrent,
      })
    );
  };

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
      <Row>
        <ModalComponent />
        <Row className={style.pagepaddingleft}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Button
              type="link"
              style={{ color: "#F5732E" }}
              onClick={() => component()}
            >
              <span className={style.textNormal}>เพิ่มการซื้อเหรียญ</span>
            </Button>
          </Col>
        </Row>
      </Row>
    </Fragment>
  );
}
