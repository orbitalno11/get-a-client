import { Row, Col, Button,DatePicker} from "antd";
import React, { Fragment,useEffect } from "react";
import { useForm,Controller } from "react-hook-form";
import { promotionSchema } from "../../../../../../validation/admin/promotionSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles.module.scss";
import { useDispatch } from "react-redux";
import { modalAction,coinAction } from "../../../../../../redux/actions";
import { sizeModal } from "../../../../../modal/SizeModal";
import InputComponents from "../../../../../input/InputComponets"
import isEmpty from "../../../../../defaultFunction/checkEmptyObject";
import { defaultValue } from "../../../../../defaultValue";
import moment from "moment";

export default function EditPromotion({dataPromo}) {
  const { register, handleSubmit, errors,reset,control} = useForm({
    resolver: yupResolver(promotionSchema),
  });

  useEffect(() => {
    reset({
        "name": (!isEmpty(dataPromo)) ? dataPromo.title : "",
        "baht": (!isEmpty(dataPromo)) ? dataPromo.baht : "",
        "coin": (!isEmpty(dataPromo)) ? dataPromo.coin : "",
        "startDate": (!isEmpty(dataPromo)) ? moment((dataPromo.startDate),defaultValue.dateFormat) : "",
        "endDate": (!isEmpty(dataPromo)) ? moment((dataPromo.endDate),defaultValue.dateFormat): "",
    })
  }, [dataPromo])

  const today = moment().format("MM/DD/YYYY")

  const onSubmit = (data) => {
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
      dispatch(modalAction.closeModal())
      dispatch(coinAction.updateCoinRate(dataPromo.id,promotionRate))
    }
  }

  function ModalUpdatePromotion() {
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
              </Col>
            </Row>
            <Row style={{ marginTop: "1rem",marginBottom:"1rem"}}>
              <Col span={6} className={style.textOneo25}>
                วันที่เริ่มต้น :
              </Col>
              <Col span={18}>
                <Controller
                    as={<DatePicker placeholder="" />}
                    name="startDate"
                    control={control}
                    defaultValue={moment()}
                    placeholder=""
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
                  <Controller
                    as={<DatePicker placeholder="" />}
                    name="endDate"
                    control={control}
                    defaultValue={moment()}
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
              <Col span={4} align="center" className={`${style.textOneo25} ${style.paddingInput}`}>บาท</Col>
              <Col span={2}  className={`${style.textOneo25} ${style.paddingInput}`}>=</Col>
              <Col span={7}>
                <InputComponents
                      type="number"
                      name="coin"
                      register={register}
                      error={errors.coin}
                      placeholder="เหรียญ"
                      min="0"
                    />
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

  const dispatch = useDispatch();
  const updatePromotion = () => {
    dispatch(
      modalAction.openModal({
        body: <ModalUpdatePromotion/>,
        size: sizeModal.large,
      })
    );
  };

  return (
    <Fragment>
      <Button
        onClick={() => updatePromotion()}
        className="backgroundOrange buttonColor"
        shape="round"
        size="middle"
        style={{ width: "60px" }}
        icon={<FontAwesomeIcon icon={faPen} style={{ color: "white" }} />}
      >
      </Button>
    </Fragment>
  );
}
