import { Row, Col, Button, Input, DatePicker, TimePicker, Form } from "antd";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { promotionSchema } from "../../../../../../validation/admin/promotionSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles.module.scss";
import { useDispatch } from "react-redux";
import { modalAction } from "../../../../../../redux/actions";
import ModalComponent from "../../../../../modal/ModalComponent";
import { sizeModal } from "../../../../../modal/SizeModal";
import { typeModal } from "../../../../../modal/TypeModal";
import moment from "moment";

export default function EditPromotion() {

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(promotionSchema),
  });

  const dispatch = useDispatch();

  const onSubmit = () => {
    // todo onSubmit
    // value
  }

  const format = "HH:mm";

  function ComponentSample() {
    return (
      <div style={{ paddingLeft: "1rem", justifyContent: "center" }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <p className={style.titleH4}>เพิ่มโปรโมชั่น</p>
        <Row>
          <Col span={3} className={style.textNormal}>ชื่อโปรโมชั่น</Col>
          <Col span={20}>
            <Input
              type="name"
              name="name"
              ref={register}
              placeholder="กรุณาใส่ชื่อโปรโมชั่น"
              className={`${style.inputRate} ${style.textNormal}`}
            />
            {errors.name && (
              <p className="error-input">{errors.name.message}</p>
            )}
          </Col>
        </Row>
        <Row style={{ marginTop: "1rem" }}>
          <Col span={3} className={style.textNormal}>วันที่เริ่มต้น </Col>
          <Col span={8}>
            <DatePicker />
          </Col>
          <Col span={4} style={{ textAlign: "center" }} className={style.textNormal}>
            วันที่สิ้นสุด{" "}
          </Col>
          <Col span={8}>
            <DatePicker />
          </Col>
        </Row>
        <Row style={{ marginTop: "1rem", marginBottom: "1.8rem" }}>
          <Col span={3} className={style.textNormal}>เวลาเริ่มต้น </Col>
          <Col span={8}>
            <TimePicker
              defaultOpenValue={moment("00:00", format)}
              format={format}
            />
          </Col>
          <Col span={4} style={{ textAlign: "center" }} className={style.textNormal}>
            เวลาสิ้นสุด{" "}
          </Col>
          <Col span={8}>
            <TimePicker
              defaultOpenValue={moment("00:00", format)}
              format={format}
            />
          </Col>
        </Row>
        <Row className={style.btnRequest}>
          <Col span={4}>
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
      </Form>
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
        size: sizeModal.large,
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
