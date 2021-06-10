import { Row, Col, Button , DatePicker} from "antd";
import React, { Fragment, useEffect } from "react";
import { useForm , Controller } from "react-hook-form";
import { exchangeSchema } from "../../../../../../validation/admin/exchangeSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { modalAction, coinAction } from "../../../../../../redux/actions";
import { styleComponent } from "../../../../../defaultFunction/style";
import ModalComponent from "../../../../../modal/ModalComponent";
import { sizeModal } from "../../../../../modal/SizeModal";
import InputComponents from "../../../../../input/InputComponets";
import isEmpty from "../../../../../defaultFunction/checkEmptyObject";
import Edit from "./Edit";
import Delete from "./Delete";
import moment from "moment";


export default function CreatePrice({type}) {

  const { register, handleSubmit, errors ,control} = useForm({
    resolver: yupResolver(exchangeSchema),
  });

  const dispatch = useDispatch();
  const today = moment().format("MM/DD/YYYY");

  const onSubmit = (data) => {
    if (data) {
      if(type != "rate"){
        const cost = {
          title: "std",
          baht: data.baht,
          coin: data.coin,
          type: "std",
          startDate: data.startDate,
          endDate: data.endDate,
          updtaeDate: today,
        };
        dispatch(modalAction.closeModal());
        dispatch(coinAction.createCoinRate(cost));
      }else{
        const rate = {
          title: "transfer",
          baht: data.baht,
          coin: data.coin,
          type: "transfer",
          startDate: data.startDate,
          endDate: data.endDate,
          updtaeDate: today,
        };
        dispatch(modalAction.closeModal());
        dispatch(coinAction.createCoinRate(rate));
      }
    }
  };

  const list = useSelector((state) => state.coin.rateCoin);

  const handOnActivate = (rateId) => {
      dispatch(coinAction.activateRate(rateId));
  }
  
  useEffect(() => {
    dispatch(coinAction.getCoinRatesAdmin());
  }, []);

  const ModalPrice = () => {
    return (
      <div style={{ paddingLeft: "1rem" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          { type === "rate" ? (
          <span className={style.headerOne5}>เพิ่มอัตราการแลกเหรียญ</span>):(

            <span className={style.headerOne5}>เพิ่มอัตราการซื้อเหรียญ</span>
          )}
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
          { type === "rate" ? (
          <span className={style.headerOne35}>อัตราการแลกเหรียญ</span>):(

            <span className={style.headerOne35}>อัตราการซื้อเหรียญ</span>
          )}

          <Row style={{ marginBottom: "1rem" }}>
            <p>{errors.baht && errors.baht}</p>
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
              className={`${style.textOne35} ${style.paddingInput}`}
            >
              บาท
            </Col>
            <Col
              span={2}
              className={`${style.textOne35} ${style.paddingInput}`}
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
            <Col span={6}>
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
            <Col span={6}>
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
  };

  const createPrice = () => {
    dispatch(
      modalAction.openModal({
        body: <ModalPrice />,
        size: sizeModal.default,
      })
    );
  };

  return (
    <Fragment>
      <Row style={{ marginLeft: "1rem" }}>
        <Col xs={3} sm={3} md={2} lg={2} xl={1} style={{paddingTop:"0.55rem"}}>
            <styleComponent.iconCoin size="medium"/>
        </Col>
        { type != "rate" ?(
        <Col xs={21} sm={21} md={20} lg={22} xl={23}>
          <span className={style.headerOne75}>ราคาขายปัจจุบัน</span>
        </Col>
        ):(
          <Col xs={21} sm={21} md={20} lg={22} xl={23}>
          <span className={style.headerOne75}>อัตราการแลกเหรียญปัจจุบัน</span>
        </Col>
        )}
        <ModalComponent />
        { type != "rate"? (
        <Row className={style.pagepaddingleft}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Button
              type="link"
              style={{ color: "#F5732E" }}
              onClick={() => createPrice()}
            >
              <span className={style.textOne5}> เพิ่มอัตราการซื้อเหรียญ</span>
            </Button>
          </Col>
        </Row>
        ):(
          <Row className={style.pagepaddingleft}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Button
              type="link"
              style={{ color: "#F5732E" }}
              onClick={() => createPrice()}
            >
              <span className={style.textOne5}> เพิ่มอัตราการแลกเหรียญ</span>
            </Button>
          </Col>
        </Row>
        )}
      </Row>
      <div style={{ paddingLeft: "4rem" }}>
        <table className={style.tablecoins}>
          <thead>
            <tr>
              <th span={4} className={style.textOne5}>
                วันที่สิ้นสุด
              </th>
              <th span={5} className={style.textOne5}>
                จำนวนเงิน (บาท)
              </th>
              <th span={5} className={style.textOne5}>
                จำนวนเหรียญ
              </th>
              <th span={10} className={style.textOne5}>
                การจัดการ
              </th>
            </tr>
          </thead>
          { type != "rate" ? (
          <tbody>
            {!isEmpty(list) && list.length !== 0 &&
              list
                .filter((data) => data.type === "std")
                .map((data, index) => (
                  <tr style={{ width: "1rem" }} key={index}>
                    <td className={style.textOne5}>{moment(data.endDate).format("DD/MM/YYYY")}</td>
                    <td className={style.textOne5}>{data && data.baht} </td>
                    <td className={style.textOne5}>{data && data.coin}</td>
                    <td>
                      <Edit dataRate={data}/>
                      &emsp;
                      <Delete data={data} />
                      &emsp;
                      {data.active ? (
                        <Button
                          className="backgroundGreen buttonColor"
                          shape="round"
                          size="middle"
                          style={{ width: "50px" }}
                          icon={
                            <FontAwesomeIcon
                              icon={faPowerOff}
                              style={{ color: "white" }}
                            />
                          }
                          onClick={() => handOnActivate(data.id)}
                        ></Button>
                      ) : (
                        <Button
                          className="backgroundGray buttonColor"
                          shape="round"
                          size="middle"
                          style={{ width: "50px" }}
                          icon={
                            <FontAwesomeIcon
                              icon={faPowerOff}
                              style={{ color: "white" }}
                            />
                          }
                          onClick={() => handOnActivate(data.id)}
                        ></Button>
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
          ):(
          <tbody>
            {!isEmpty(list) && list.length !== 0 &&
              list
                .filter((data) => data.type === "transfer")
                .map((data, index) => (
                  <tr key={index}>
                    <td className={style.textOne5}>{moment(data.endDate).format("DD/MM/YYYY")}</td>
                    <td className={style.textOne5}>{data && data.baht} </td>
                    <td className={style.textOne5}>{data && data.coin}</td>
                    <td>
                      <Edit dataRate={data}/>
                      &emsp;
                      <Delete data={data}/>
                      &emsp;
                      {data.active ? (
                        <Button
                          className="backgroundGreen buttonColor"
                          shape="round"
                          size="middle"
                          style={{ width: "60px" }}
                          icon={
                            <FontAwesomeIcon
                              icon={faPowerOff}
                              style={{ color: "white" }}
                            />
                          }
                          onClick={() => handOnActivate(data.id)}
                        ></Button>
                      ) : (
                        <Button
                          className="backgroundGray buttonColor"
                          shape="round"
                          size="middle"
                          style={{ width: "60px" }}
                          icon={
                            <FontAwesomeIcon
                              icon={faPowerOff}
                              style={{ color: "white" }}
                            />
                          }
                          onClick={() => handOnActivate(data.id)}
                        ></Button>
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
          )}
        </table>
      </div>
    </Fragment>
  );
}
