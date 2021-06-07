import React, { Fragment, useState ,useEffect } from "react";
import { Grid, Col, Row, Button, Select, Image } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import style from "../styles.module.scss";
import { coinAction } from "../../../../../redux/actions";
import InputComponents from "../../../../input/InputComponets";
import { modalAction } from "../../../../../redux/actions";
import { typeModal } from "../../../../modal/TypeModal";
import { sizeModal } from "../../../../modal/SizeModal";
import resizeImage from "../../../../defaultFunction/resizeImage";
import { redeemSchema } from "../../../../../validation/validation";
import { defaultValue } from "../../../../defaultValue";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import bookBank from "../../../../images/bookBank.webp";
import ModalComponent from "../../../../modal/ModalComponent";
import isEmpty from "../../../../defaultFunction/checkEmptyObject";
const { useBreakpoint } = Grid;

export default function Request({ onHandleChange, showRequest }) {
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  const [image, setimage] = useState(bookBank);

  const { register, handleSubmit, errors, control, watch} = useForm({
    resolver: yupResolver(redeemSchema),
  });

  const rateRedeem = useSelector((state) => state.coin.rateCoin);
  const bahtStd = !isEmpty(rateRedeem) && rateRedeem[0].baht
  const coinStd = !isEmpty(rateRedeem) && rateRedeem[0].coin
  const rateId = !isEmpty(rateRedeem) && rateRedeem[0].id

  const watchInput = watch()
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    const bahtTranfer = ((watchInput.coin * Number(bahtStd))/Number(coinStd)).toFixed(2)
    setAmount(bahtTranfer)    
  }, [watchInput.coin])

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
      if(amount != 0 && !isEmpty(rateId)){
        let formdata = new FormData();
        formdata.append("accountPic", image.file);
        formdata.append("rateId",rateId);
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
      <ModalComponent/>
      <div className={`${style.marginSection} ${style.contentRequest}`}>
        {screens.md && (
          <Row className={style.paddingTopHead}>
            <Col md={10} lg={9} xl={12}>
              <span className={style.headerTwo}>คำขอแลกเหรียญ</span>
            </Col>
            <Col md={13} lg={13} xl={12} style={{ paddingTop: "6px" }}>
              <span className={  screens.lg ?style.textOne75:style.textOne25}>
                อัตราแลกเหรียญปัจจุบัน เหรียญ 100 มีมูลค่า 20 บาท
              </span>
            </Col>
          </Row>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className={ screens.lg ?style.paddingTop13 :style.paddingRequest}>
            <Col xs={24} sm={24} md={22} lg={9} xl={9}>
              <div>
                <span className={style.textOne5}>จำนวนเหรียญ (ที่แลก)</span>
                <InputComponents
                  type="number"
                  name="coin"
                  register={register}
                  error={errors.coin}
                  placeholder="จำนวนเหรียญที่จะแลก"
                  disabled={showRequest}
                />
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
              <div className={style.marginTop04}>
                <span className={style.textOne5}>ธนาคาร</span>
                <Controller
                  as={
                    <Select name="bank">
                      {defaultValue.bank &&
                        Object.entries(defaultValue.bank).map(([key,value]) => (
                          <Select.Option key={value} value={value}>
                            {key}
                          </Select.Option>
                        ))}
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
              <div className={style.margin20}>
                <span className={style.textOne5}>หมายเลขบัญชี</span>
                <InputComponents
                  type="text"
                  name="accountNo"
                  register={register}
                  placeholder="หมายเลขบัญชี"
                  error={errors.accountNo}
                />
              </div>
              <div className={style.margin20}>
                <span className={style.textOne5}>ชื่อบัญชี</span>
                <InputComponents
                  type="text"
                  name="accountName"
                  register={register}
                  error={errors.accountName}
                  placeholder="ชื่อบัญชี"
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={15}className={style.centerPage}>
                <div className={style.marginTop20} align="center">
                  <div className="imageUpload">
                    <label htmlFor="file-input">
                      <Image
                        // className={screens.lg ?style.bookBank:style.a4ImageSm}
                        className={screens.lg ?style.bookBank:style.bookBankSm}
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
                    />
                  </div>
                  {errors.image && (
                    <p className="error-input">{errors.image.message}</p>
                  )}
                </div>
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
          <Row className={!screens.md?style.marginBottomSm : style.marginBottom40}>
            <Col xs={9} sm={9} md={6} lg={4}> 
              <Button
                className="buttonColor backgroundOrange"
                size="large"
                shape="round"
                style={{ width: "120px", marginTop20: "40px" }}
                htmlType="submit"
              >
                <span className={style.textOne}>ส่งคำขอ</span>
              </Button>
            </Col>
            <Col style={{marginBottom:"4rem"}}>
              <Button
                className="buttonColor backgroundBlue"
                size="large"
                shape="round"
                style={{ width: "120px", marginTop20: "40px" }}
                onClick={() => onHandleChange(false)}
              >
                <span className={style.textOne}>ยกเลิก</span>
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    </Fragment>
  );
}
