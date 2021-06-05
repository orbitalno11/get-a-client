import { Row, Col, Button } from "antd";
import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { exchangeSchema } from "../../../../../../validation/admin/exchangeSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { faCoins, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { modalAction, coinAction } from "../../../../../../redux/actions";
import ModalComponent from "../../../../../modal/ModalComponent";
import { sizeModal } from "../../../../../modal/SizeModal";
import InputComponents from "../../../../../input/InputComponets";
import isEmpty from "../../../../../defaultFunction/checkEmptyObject";
import Edit from "./Edit";
import Delete from "./Delete";
import moment from "moment";

export default function CreatePrice({type}) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(exchangeSchema),
  });

  const dispatch = useDispatch();
  const today = moment().format("MM/DD/YYYY");

  console.log(errors)
  const onSubmit = (data) => {
    if (data) {
      if(type != "rate"){
        const cost = {
          title: "std",
          baht: data.baht,
          coin: data.coin,
          type: "std",
          startDate: today,
          endDate: today,
          updtaeDate: today,
        };
        dispatch(modalAction.closeModal());
        dispatch(coinAction.createCoinRate(cost));
      }else{
        const rate = {
          title: "transfer",
          baht: data.baht,
          coin: data.coin,
          type: "tranfer",
          startDate: today,
          endDate: today,
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
          <span className={style.headerOne35}>เพิ่มอัตราการแลกเหรียญ</span>):(

            <span className={style.headerOne35}>เพิ่มอัตราการซื้อเหรียญ</span>
          )}
          <Row style={{ marginBottom: "1rem" }}>
            <p>{errors.baht && errors.baht}</p>
            <Col span={6} className={style.columnRate}>
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
              span={3}
              className={`${style.textOneo25} ${style.paddingInput}`}
            >
              บาท
            </Col>
            <Col
              span={1}
              className={`${style.textOneo25} ${style.paddingInput}`}
            >
              =
            </Col>
            <Col span={6} className={style.columnRate}>
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
              span={3}
              className={`${style.textOneo25} ${style.paddingInput}`}
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
                <span className={style.textOneo25}>บันทึก</span>
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
                <span className={style.textOneo25}>ยกเลิก</span>
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
        <Col xs={3} sm={3} md={2} lg={2} xl={1}>
          <FontAwesomeIcon icon={faCoins} className={style.coins} />
        </Col>
        { type != "rate" ?(
        <Col xs={21} sm={21} md={20} lg={22} xl={23}>
          <span className={style.headerOne35}>ราคาขายปัจจุบัน</span>
        </Col>
        ):(
          <Col xs={21} sm={21} md={20} lg={22} xl={23}>
          <span className={style.headerOne35}>อัตราการแลกเหรียญปัจจุบัน</span>
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
              <span className={style.textOne35}> เพิ่มอัตราการซื้อเหรียญ</span>
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
              <span className={style.textOne35}> เพิ่มอัตราการแลกเหรียญ</span>
            </Button>
          </Col>
        </Row>
        )}
      </Row>
      <div style={{ paddingLeft: "4rem" }}>
        <table className={style.tablecoins}>
          <thead>
            <tr>
              <th span={8} className={style.textNormal}>
                จำนวนเงิน (บาท)
              </th>
              <th span={8} className={style.textNormal}>
                จำนวนเหรียญ
              </th>
              <th span={8} className={style.textNormal}>
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
                    <td className={style.textNormal}>{data && data.baht} </td>
                    <td className={style.textNormal}>{data && data.coin}</td>
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
          ):(
          <tbody>
            {!isEmpty(list) && list.length !== 0 &&
              list
                .filter((data) => data.type === "tranfer")
                .map((data, index) => (
                  <tr style={{ width: "1rem" }} key={index}>
                    <td className={style.textNormal}>{data && data.baht} </td>
                    <td className={style.textNormal}>{data && data.coin}</td>
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
