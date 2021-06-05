import React, { Fragment, useState } from "react";
import { Grid, Col, Row, Button, Select, Image } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import style from "../styles.module.scss";
import InputComponents from "../../../../input/InputComponets";
import { modalAction } from "../../../../../redux/actions";
import { typeModal } from "../../../../modal/TypeModal";
import { sizeModal } from "../../../../modal/SizeModal";
import resizeImage from "../../../../defaultFunction/resizeImage";
import { redeemSchema } from "../../../../../validation/validation";
import { defaultValue } from "../../../../defaultValue";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ducumentA4Sample from "../../../../images/ducumentA4Sample.webp";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faTrash } from "@fortawesome/free-solid-svg-icons";
//import isEmpty from "../../../../defaultFunction/checkEmptyObject";
import { coinAction } from "../../../../../redux/actions";
const { useBreakpoint } = Grid;

export default function Request({ onHandleChange, showRequest }) {
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  const [image, setimage] = useState(ducumentA4Sample);

  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(redeemSchema),
  });

  const rateRedeem = useSelector((state) => state.coin.rateCoin);
  const balanceCoin = useSelector((state) => state.coin.coinUser);
  const money2 = balanceCoin&& balanceCoin.amount

  console.log(rateRedeem)
  console.log(money2)

  const onChange = async (data) => {
    const fileInput = data.target.files[0];
    if (fileInput) {
      try {
        const newImageFile = await resizeImage(fileInput, "file", 2480, 3508);
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
  console.log(errors)
  const rateId = Number(2)
  const money = Number(4)

  const onSubmit = (data) => {
    console.log(data)
    if (data) {
      let formdata = new FormData();
      formdata.append("rateId",rateId);
      formdata.append("numberOfCoin", data.coin);
      formdata.append("amount", money);
      formdata.append("bankId", data.bank);
      formdata.append("accountName", data.accountName);
      formdata.append("accountNo", data.accountNo);
      formdata.append("image", image.file);
      formdata.append("accountPic", image.file);
      console.log(formdata);
      dispatch(coinAction.createRequestRedeem(formdata));
    }
  };

  return (
    <Fragment>
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
                  value="20"
                />
              </div>
              <div className={style.marginTop04}>
                <span className={style.textOne5}>ธนาคาร</span>
                <Controller
                  as={
                    <Select name="bank">
                      {defaultValue.subject &&
                        Object.entries(defaultValue.bank).map(([value]) => (
                          <Select.Option key={value} value={value}>
                            {value}
                          </Select.Option>
                        ))}
                    </Select>
                  }
                  name="bank"
                  control={control}
                  defaultValue=""
                />
                {errors.bank && (
                  <p className="error-input">{errors.bank.message}</p>
                )}
              </div>
              <div className={style.margin20}>
                <span className={style.textOne5}>หมายเลขบัญชี</span>
                <InputComponents
                  type="number"
                  name="accountNo"
                  register={register}
                  error={errors.accountNo}
                  placeholder="หมายเลขบัญชี"
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
              <div className={ screens.lg ?style.bookBank : style.bookBankSm}>
                <div className={style.marginTop20} align="center">
                  <span className={ screens.lg?style.textOne5 : style.textOne}>
                    รูปสมุดบัญชีหน้าแรก
                    <br />
                    พร้อมรับรองสำเนาถูกต้อง
                    <br />
                    ระบุใช้สำหรับแลกเหรียญเท่านั้น
                  </span>
                  <div className="imageUpload">
                    <label htmlFor="file-input">
                      <Image
                        className={screens.lg ?style.a4Image:style.a4ImageSm}
                        src={image.imageURL ? image.imageURL : ducumentA4Sample}
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
              </div>
            </Col>
            <Col span={24} style={{ marginTop: "48px" }}>
              <span className={style.headerOne5}>
                เอกสารที่ใช้ในการแลกเหรียญ
              </span>
              <br />
              <span className={`${style.textOne25} ${style.marginleft18}`}>
                {" "}
                รูปสมุดบัญชีหน้าแรก พร้อมรับรองสำเนาถูกต้อง
                ระบุใช้สำหรับแลกเหรียญเท่านั้น
              </span>
            </Col>
          </Row>
          <Row className={`${style.horizontalCenter} ${style.marginBottom40}`}>
            <Col xs={9} sm={9} md={6} lg={3}> 
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
            <Col>
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
