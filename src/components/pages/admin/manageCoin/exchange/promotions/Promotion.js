import { Row, Col, Button, DatePicker } from "antd";
import React, { Fragment } from "react";
import { useForm,Controller } from "react-hook-form";
import { promotionSchema } from "../../../../../../validation/admin/promotionSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles.module.scss";
import { useDispatch } from "react-redux";
import { modalAction, coinAction } from "../../../../../../redux/actions";
import ModalComponent from "../../../../../modal/ModalComponent";
import { sizeModal } from "../../../../../modal/SizeModal";
import PromotionList from "./PromotionList";
import InputComponents from "../../../../../input/InputComponets";
import moment from "moment";

export default function Promotion() {
  const { register, handleSubmit, errors,control } = useForm({
    resolver: yupResolver(promotionSchema),
  });

  const dispatch = useDispatch();
  const today = moment().format("MM/DD/YYYY");
  const onSubmit = (data) => {
    if (data) {
      const promotionRate = {
        title: data.name,
        baht: data.baht,
        coin: data.coin,
        type: "promo",
        startDate: data.startDate,
        endDate: data.endDate,
        updtaeDate: today,
      };
      dispatch(coinAction.createCoinRate(promotionRate));
    }
  };

  function ModalPromotion() {
    return (
      <div style={{ paddingLeft: "1rem", justifyContent: "center" }}>
        <form id="addpromotion" onSubmit={handleSubmit(onSubmit)}>
          <span className={style.headerOne5}>เพิ่มโปรโมชั่น</span>
          <Row>
            <Col
              span={5}
              className={`${style.textOne25} ${style.paddingInput}`}
            >
              ชื่อโปรโมชั่น :
            </Col>
            <Col span={18}>
              <InputComponents
                type="text"
                name="name"
                register={register}
                error={errors.name}
                placeholder="กรุณาใส่ชื่อโปรโมชั่น"
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Col
              span={5}
              className={`${style.textOne25} ${style.paddingInputDate}`}
            >
              วันที่เริ่มต้น :
            </Col>
            <Col span={18}>
                <Controller
                  as={<DatePicker placeholder="" />}
                  name="startDate"
                  control={control}
                  defaultValue={null}
                  placeholder=""
                />
                {errors.startDate && (
                  <p className="error-input">{errors.startDate.message}</p>
                )}
            </Col>
          </Row>
          <Row style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Col
              span={5}
              className={`${style.textOne25} ${style.paddingInputDate}`}
            >
              วันที่สิ้นสุด :
            </Col>
            <Col span={18}>
              <Controller
                as={<DatePicker placeholder="" />}
                name="endDate"
                control={control}
                defaultValue={null}
                placeholder=""
              />
              {errors.endDate && (
                <p className="error-input">{errors.endDate.message}</p>
              )}
            </Col>
          </Row>
          <span className={style.headerOne35}>อัตราการซื้อเหรียญ</span>
          <Row style={{ marginBottom: "1rem" }}>
            <Col span={7} align="start">
              <InputComponents
                type="number"
                name="baht"
                register={register}
                error={errors.baht}
                placeholder="บาท"
                min="0"
              />
            </Col>
            <Col
              span={4}
              align="center"
              className={`${style.textOne25} ${style.paddingInput}`}
            >
              บาท
            </Col>
            <Col
              span={2}
              className={`${style.textOne25} ${style.paddingInput}`}
              align="center"
            >
              =
            </Col>
            <Col span={7} style={{paddingLeft:"0.8rem"}}>
              <InputComponents
                type="number"
                name="coin"
                register={register}
                error={errors.coin}
                placeholder="เหรียญ"
                min="0"
              />
            </Col>
            <Col
              span={4}
              align="center"
              className={`${style.textOne25} ${style.paddingInput}`}
            >
              เหรียญ
            </Col>
          </Row>
          <Row className={style.btnRequest}>
            <Col style={{paddingRight:"2rem"}}>
              <Button
                className="backgroundGreen buttonColor"
                shape="round"
                size="middle"
                style={{ width: "100px" }}
                htmlType="submit"
              >
                <span className={style.textOne25}>บันทึก</span>
              </Button>
            </Col>
            <Col>
              <Button
                className="backgroundRed buttonColor"
                shape="round"
                size="middle"
                style={{ width: "100px" }}
                onClick={() => dispatch(modalAction.closeModal())}
              >
                <span className={style.textOne25}>ยกเลิก</span>
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }

  const createPromotion = () => {
    dispatch(
      modalAction.openModal({
        body: <ModalPromotion />,
        size: sizeModal.large,
      })
    );
  };

  return (
    <Fragment>
      <ModalComponent />
      <Row style={{ marginLeft: "1rem" }}>
        <Col md={2} lg={2} xl={1} style={{paddingTop:"0.4rem"}}>
          <FontAwesomeIcon icon={faBullhorn} className={style.coins} />
        </Col>
        <Col md={5} lg={5} xl={3}>
          <span className={style.headerOne75}>จัดการโปรโมชั่น</span>
        </Col>
      </Row>
      <Row className={style.pagepaddingleft} style={{ marginLeft: "1rem" }}>
        <Col md={24} lg={24} xl={24}>
          <Button
            type="link"
            style={{ color: "#F5732E", textDecorationLine: "underline" }}
            onClick={() => createPromotion()}
          >
            <span className={style.textOne5}>เพิ่มโปรโมชั่น</span>
          </Button>
        </Col>
      </Row>
      <Row style={{ marginLeft: "4rem", marginTop: "1rem" }}>
        <PromotionList />
      </Row>
    </Fragment>
  );
}
