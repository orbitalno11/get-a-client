import { Row, Col, Button} from "antd";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { promotionSchema } from "../../../../../../validation/admin/promotionSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { faBullhorn} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles.module.scss";
import { useDispatch } from "react-redux";
import { modalAction,coinAction} from "../../../../../../redux/actions";
import ModalComponent from "../../../../../modal/ModalComponent";
import { sizeModal } from "../../../../../modal/SizeModal";
import PromotionList from "./PromotionList";
import InputComponents from "../../../../../input/InputComponets"
import moment from "moment";

export default function Promotion() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(promotionSchema),
  });

  const dispatch = useDispatch();
  const today = moment().format("MM/DD/YYYY")

  const onSubmit = (data) => {
    console.log(data)
    if(data){
      const promotionRate ={
        "title":data.name,
        "baht": data.baht,
        "coin": data.coin,
        "type": "promo",
        "startDate":data.startDate,
        "endDate": data.endDate,
        "updtaeDate":today,
      }
      dispatch(coinAction.CreateCoinRate(promotionRate))
    }
  }

  function ComponentSample() {
    return (
      <div style={{ paddingLeft: "1rem", justifyContent: "center" }}>
        <form id="addpromotion"onSubmit={handleSubmit(onSubmit)}>
          <span className={style.headerOne35}>เพิ่มโปรโมชั่น</span>
          <Row>
            <Col span={6} className={`${style.textOneo25} ${style.paddingInput}`}>
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
              {errors.name && (
                <p className="error-input">{errors.name.message}</p>
              )}
            </Col>
          </Row>
          <Row style={{ marginTop: "1rem",marginBottom:"1rem"}}>
            <Col span={6} className={style.textOneo25}>
              วันที่เริ่มต้น :
            </Col>
            <Col span={18}>
              {/* <Controller
                  as={
                    <DatePicker className="input" style={{ width: "100%" }} />
                  }
                  name="startDate"
                  control={control}
                  defaultValue={""}
                /> */}
              <InputComponents
                    type="date"
                    name="startDate"
                    register={register}
                    error={errors.name}
                    placeholder="กรุณาใส่ชื่อโปรโมชั่น"
        
                  />
              {errors.startDate && (
                <p className="error-input">{errors.startDate.message}</p>
              )}
            </Col>
          </Row>
          <Row  style={{ marginTop: "1rem",marginBottom:"1rem"}}>
            <Col span={6} className={style.textOneo25}>
              วันที่สิ้นสุด :
            </Col>
            <Col span={18}>
              {/* <Controller
                    as={
                      <DatePicker className="input" style={{ width: "100%" }} />
                    }
                    name="endDate"
                    control={control}
                    defaultValue={""}
                  /> */}
                 <InputComponents
                    type="date"
                    name="endDate"
                    register={register}
                    error={errors.name}
                    placeholder="กรุณาใส่ชื่อโปรโมชั่น"
        
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
                    error={errors.name}
                    placeholder="บาท"
                    min="0"
                  />
                 {errors.baht && (
                <p className="error-input">{errors.baht.message}</p>
              )}
            </Col>
            <Col span={4} align="center" className={`${style.textOneo25} ${style.paddingInput}`}>บาท</Col>
            <Col span={2}  className={`${style.textOneo25} ${style.paddingInput}`}>=</Col>
            <Col span={7}>
              <InputComponents
                    type="number"
                    name="coin"
                    register={register}
                    error={errors.name}
                    placeholder="เหรียญ"
                    min="0"
                  />
                 {errors.baht && (
                <p className="error-input">{errors.coin.message}</p>
              )}
            </Col>
            <Col span={4} align="center" className={`${style.textOneo25} ${style.paddingInput}`}>เหรียญ</Col>
          </Row>
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
        </form>
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
      <Row style={{ marginLeft: "1rem" }}>
        <Col md={2} lg={2} xl={1}>
          <FontAwesomeIcon icon={faBullhorn} className={style.coins} />
        </Col>
        <Col md={5} lg={5} xl={3}>
          <span className={style.titleH4}>จัดการโปรโมชั่น</span>
        </Col>
      </Row>
      <Row className={style.pagepaddingleft} style={{ marginLeft: "1rem" }}>
        <Col md={24} lg={24} xl={24}>
          <Button
            type="link"
            style={{ color: "#F5732E", textDecorationLine: "underline" }}
            onClick={() => component()}
          >
            <span className={style.textNormal}>เพิ่มโปรโมชั่น</span>
          </Button>
        </Col>
      </Row>
      <Row style={{ marginLeft: "4rem", marginTop: "1rem" }}>
        <PromotionList />
      </Row>
    </Fragment>
  );
}
