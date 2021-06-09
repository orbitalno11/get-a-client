import React, { Fragment, useState, useEffect } from "react";
import { Grid, Col, Row, Button, Select, Image } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import style from "../styles.module.scss";
import InputComponents from "../../../../input/InputComponets";
import { coinAction, modalAction } from "../../../../../redux/actions";
import { typeModal } from "../../../../modal/TypeModal";
import { sizeModal } from "../../../../modal/SizeModal";
import resizeImage from "../../../../defaultFunction/resizeImage";
import { redeemSchema } from "../../../../../validation/validation";
import { defaultValue } from "../../../../defaultValue";
import { useDispatch, useSelector } from "react-redux";
import bookBank from "../../../../images/bookBank.webp";
import ModalComponent from "../../../../modal/ModalComponent";
import isEmpty from "../../../../defaultFunction/checkEmptyObject";
const { useBreakpoint } = Grid;

export default function Request({
  onHandleChange,
  showRequest,
  idRequest,
  statusRequest,
}) {
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  const [image, setimage] = useState(bookBank);

  const { register, handleSubmit, errors, control, watch } = useForm({
    resolver: yupResolver(redeemSchema),
  });

  const rateRedeem = useSelector((state) => state.coin.rateCoin);
  const bahtStd = !isEmpty(rateRedeem) && rateRedeem[0].baht;
  const coinStd = !isEmpty(rateRedeem) && rateRedeem[0].coin;
  const rateId = !isEmpty(rateRedeem) && rateRedeem[0].id;

  const requestDetail = useSelector((state) => state.coin.requestRedeem);

  const watchInput = watch();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setAmount(
      ((watchInput.coin * Number(bahtStd)) / Number(coinStd)).toFixed(2)
    );
  }, [watchInput.coin]);

  const onCancel = (id) => {
    dispatch(coinAction.CancelRequestsRedeem(id));
  };

  useEffect(() => {
    dispatch(coinAction.getRequestsDetail(idRequest));
  }, []);

  const onChange = async (data) => {
    const fileInput = data.target.files[0];
    if (fileInput) {
      try {
        const newImageFile = await resizeImage(fileInput, "file", 720, 1280);
        const imageURL = URL.createObjectURL(newImageFile);
        setimage({ file: newImageFile, imageURL: imageURL });
      } catch {
        dispatch(
          modalAction.openModal({
            text: "เพื่มรูปไม่สำเร็จ",
            size: sizeModal.small,
            alert: typeModal.wrong,
          })
        );
      }
    }
  };

  const onSubmit = (data) => {
    if (data) {
      if (amount != 0 && !isEmpty(rateId)) {
        let formdata = new FormData();
        formdata.append("accountPic", image.file);
        formdata.append("rateId", rateId);
        formdata.append("bankId", data.bank);
        formdata.append("accountNo", data.accountNo);
        formdata.append("accountName", data.accountName);
        formdata.append("numberOfCoin", data.coin);
        formdata.append("amount", amount);
        dispatch(coinAction.createRequestRedeem(formdata));
      }
    }
  };

  return (
    <Fragment>
      <ModalComponent />
      <div className={`${style.marginSection} ${style.contentRequest}`}>
        <Row
          className={screens.md ? style.paddingTopHead : style.buttonback}
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => onHandleChange(false)}
        >
          <span className={screens.md ? style.textOne35 : style.textOne25}>
            ย้อนกลับ
          </span>
        </Row>
        {screens.md && (
          <Row className={style.paddingTopHead}>
            <Col md={10} lg={9} xl={12}>
              <span className={style.headerTwo}>คำขอแลกเหรียญ</span>
            </Col>
            <Col md={13} lg={13} xl={12} style={{ paddingTop: "6px" }}>
              <span className={screens.lg ? style.textOne75 : style.textOne25}>
                อัตราแลกเหรียญปัจจุบัน {coinStd} เหรียญ มีมูลค่า {bahtStd} บาท
              </span>
            </Col>
          </Row>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row
            className={screens.lg ? style.paddingTop13 : style.paddingRequest}
          >
            <Col xs={24} sm={24} md={22} lg={9} xl={9}>
              <div>
                <span className={style.textOne5}>จำนวนเหรียญ (ที่แลก)</span>
                {!isEmpty(requestDetail) ? (
                  <InputComponents
                    type="number"
                    name="coin"
                    register={register}
                    error={errors.coin}
                    placeholder="จำนวนเหรียญที่จะแลก"
                    disabled={showRequest}
                    value={requestDetail.numberOfCoin}
                  />
                ) : (
                  <InputComponents
                    type="number"
                    name="coin"
                    register={register}
                    error={errors.coin}
                    placeholder="จำนวนเหรียญที่จะแลก"
                    defaultValue={""}
                  />
                )}
              </div>
              <div className={style.margin20}>
                <span className={style.textOne5}>มูลค่า (บาท)</span>
                <InputComponents
                  type="number"
                  name="amount"
                  placeholder
                  disabled
                  value={amount}
                />
              </div>
              {!isEmpty(requestDetail) ? (
                <div className={style.marginTop04}>
                  <span className={style.textOne5}>ธนาคาร</span>
                  <InputComponents
                    name="bank"
                    register={register}
                    error={errors.bank}
                    disabled={showRequest}
                    value={requestDetail.bank.title}
                  />
                </div>
              ) : (
                <div className={style.marginTop04}>
                  <span className={style.textOne5}>ธนาคาร</span>
                  <Controller
                    as={
                      <Select name="bank" disabled={showRequest}>
                        {defaultValue.bank &&
                          Object.entries(defaultValue.bank).map(
                            ([key, value]) => (
                              <Select.Option key={value} value={value}>
                                {key}
                              </Select.Option>
                            )
                          )}
                      </Select>
                    }
                    name="bank"
                    control={control}
                    placeholder="เลือกธนาคาร"
                    defaultValue={null}
                  />
                  {errors.bank && (
                    <p className="error-input">{errors.bank.message}</p>
                  )}
                </div>
              )}
              <div className={style.margin20}>
                <span className={style.textOne5}>หมายเลขบัญชี</span>
                {!isEmpty(requestDetail) ? (
                  <InputComponents
                    type="number"
                    name="accountNo"
                    register={register}
                    error={errors.accountNo}
                    disabled={showRequest}
                    value={requestDetail.accountNo}
                  />
                ) : (
                  <InputComponents
                    type="number"
                    name="accountNo"
                    register={register}
                    placeholder="หมายเลขบัญชี"
                    error={errors.accountNo}
                    disabled={showRequest}
                  />
                )}
              </div>
              <div className={style.margin20}>
                <span className={style.textOne5}>ชื่อบัญชี</span>
                {!isEmpty(requestDetail) ? (
                  <InputComponents
                    type="text"
                    name="accountName"
                    register={register}
                    error={errors.accountName}
                    disabled={showRequest}
                    value={requestDetail.accountName}
                  />
                ) : (
                  <InputComponents
                    type="text"
                    name="accountName"
                    register={register}
                    error={errors.accountName}
                    placeholder="ชื่อบัญชี"
                    disabled={showRequest}
                  />
                )}
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={15} className={style.centerPage}>
              {!isEmpty(requestDetail) ? (
                <div className={style.marginTop20} align="center">
                  <div className="imageUpload">
                    <Image
                      className={screens.lg ? style.bookBank : style.bookBankSm}
                      src={requestDetail.accountPic}
                      preview={false}
                    />
                  </div>
                </div>
              ) : (
                <div className={style.marginTop20} align="center">
                  <div className="imageUpload">
                    <label htmlFor="file-input">
                      <Image
                        className={
                          screens.lg ? style.bookBank : style.bookBankSm
                        }
                        src={image.imageURL ? image.imageURL : bookBank}
                        preview={false}
                      />
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      name="image"
                      ref={register}
                      onChange={onChange}
                      disabled={showRequest}
                    />
                  </div>
                  {errors.image && (
                    <p className="error-input">{errors.image.message}</p>
                  )}
                </div>
              )}
            </Col>
            <Col span={24} style={{ marginTop: "1.5rem" }}>
              <span className={style.headerOne5}>
                เอกสารที่ใช้ในการแลกเหรียญ
              </span>
              <br />
              <span className={`${style.textOne25} ${style.marginleft18}`}>
                รูปสมุดบัญชีหน้าแรก พร้อมรับรองสำเนาถูกต้อง
                ระบุใช้สำหรับแลกเหรียญเท่านั้น
              </span>
            </Col>
          </Row>
          {statusRequest === 4 ? (
            <Row className={!screens.md ? style.marginBottomSm : style.marginBottom40}>
              <Col style={{ marginBottom: "4rem" }}>
                <Button
                  className="buttonColor backgroundBlue"
                  size="large"
                  shape="round"
                  style={{ width: "120px", marginTop20: "40px" }}
                  onClick={() => onHandleChange(false)}
                >
                  <span className={style.textOne25}>ปิด</span>
                </Button>
              </Col>
            </Row>
          ) : (
            <Row className={!screens.md ? style.marginBottomSm : style.marginBottom40}>
              <Col xs={9} sm={9} md={6} lg={4}>
                <Button
                  className="buttonColor backgroundOrange"
                  size="large"
                  shape="round"
                  style={{ width: "120px", marginTop20: "40px" }}
                  htmlType="submit"
                >
                  {showRequest ? (
                    <span
                      className={style.textOne25}
                      onClick={() => onCancel(requestDetail.id)}
                    >
                      ยกเลิกคำขอ
                    </span>
                  ) : (
                    <span className={style.textOne25}>ส่งคำขอ</span>
                  )}
                </Button>
              </Col>
              <Col style={{ marginBottom: "4rem" }}>
                <Button
                  className="buttonColor backgroundBlue"
                  size="large"
                  shape="round"
                  style={{ width: "120px", marginTop20: "40px" }}
                  onClick={() => onHandleChange(false)}
                >
                  <span className={style.textOne25}>ยกเลิก</span>
                </Button>
              </Col>
            </Row>
          )}
        </form>
      </div>
    </Fragment>
  );
}
