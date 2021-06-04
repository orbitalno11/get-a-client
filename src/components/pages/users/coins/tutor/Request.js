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
import { color, defaultValue } from "../../../../defaultValue";
import { useDispatch } from "react-redux";
import ducumentA4Sample from "../../../../images/ducumentA4Sample.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import isEmpty from "../../../../defaultFunction/checkEmptyObject";
import { coinAction } from "../../../../../redux/actions";
const { useBreakpoint } = Grid;

export default function Request({onHandleChange,showRequest}) {
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  const [imageName, setImageName] = useState([]);
  //   const { loading, home } = useSelector((state) => state);
  //   const list = useSelector((state) => state.favorite.favoritelist);

  //   useEffect(() => {
  //     dispatch(favoriteAction.getFavoriteList());
  //     dispatch(homeActions.getRank(10));
  //   }, []);


  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(redeemSchema),
  });

  const onSubmit = data => {

    if (data && imageName) {
      let formdata = new FormData()
      formdata.append("coin", data.coin)
      formdata.append("amount", data.amount)
      formdata.append("bank", data.bank)
      formdata.append("accountName", data.accountName)
      formdata.append("accountNo", data.accountNo)
      formdata.append("image", imageName.file)
      console.log(formdata)
      dispatch(coinAction.createRequestRedeem(formdata))
    }
  };

  
  const onHandleChangeImage = async (value) => {
    document.getElementById("image1").value = "image";
    const fileInput = value.target.files[0];
    if (fileInput) {
      try {
        const newImageFile = await resizeImage(fileInput, "file", 720, 1280);
        const imageURL = URL.createObjectURL(newImageFile);
        setImageName([
          ...imageName,
          {
            name: imageURL,
            file: newImageFile,
          },
        ]);
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

  const removeImage = (index) => {
    imageName.splice(index, 1);
    setImageName([...imageName]);
  };

  const removeButton = {
    position: "absolute",
    transform: "translateX(-50%)",
    marginTop: "-9.5rem",
    backgroundColor: color.red,
  };

  return (
    <Fragment>
      <div className={`${style.marginSection} ${style.contentRequest}`}>
        {screens.md && (
          <Row className={style.paddingTopHead}>
            <Col span={12}>
              <span className={style.headerTwo}>คำขอแลกเหรียญ</span>
            </Col>
            <Col span={12} style={{ paddingTop: "6px" }}>
              <span className={style.textOne75}>
                อัตราแลกเหรียญปัจจุบัน เหรียญ 100 มีมูลค่า 20 บาท
              </span>
            </Col>
          </Row>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className={style.paddingTop13}>
            <Col span={9}>
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
                  defaultValue="ไทยพานิชย์"
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
                  name="coin"
                  placeholder="ชื่อบัญชี"
                />
              </div>
            </Col>
            <Col className={style.centerPage}>
              <div className={style.bookBank}>
              {!isEmpty(imageName) &&
                imageName.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className={style.marginTop20} align="center">
                        <span className={style.textOne5}>
                          รูปสมุดบัญชีหน้าแรก
                          <br />
                          พร้อมรับรองสำเนาถูกต้อง
                          <br />
                          ระบุใช้สำหรับแลกเหรียญเท่านั้น
                        </span>
                        <Image
                          className={`${style.a4Image} ${style.marginTop01}`}
                          src={item.name ? item.name : ""}
                          preview={false}
                        />
                      </div>
                      <div align="center">
                        <button
                          type="button"
                          className={style.editButton}
                          style={removeButton}
                          onClick={() => removeImage(index)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              {imageName.length < 1 && (
                <div className={style.marginTop20} align="center">
                  <div className="imageUpload ">
                    <label htmlFor={`accountPic`}>
                      <span className={style.headerOne5}>
                        รูปสมุดบัญชีหน้าแรก
                        <br />
                        พร้อมรับรองสำเนาถูกต้อง
                        <br />
                        ระบุใช้สำหรับแลกเหรียญเท่านั้น
                      </span>
                      <Image
                        className={`${style.a4Image} ${style.marginTop01}`}
                        src={ducumentA4Sample}
                        preview={false}
                      />
                    </label>
                    <input
                      id={`accountPic`}
                      type="file"
                      name="image"
                      onChange={onHandleChangeImage}
                      ref={register}
                    />
                  </div>
                </div>
              )}
              <input
                text="text"
                id="image1"
                name="image1"
                ref={register}
                hidden
              />
              {errors["image1"] && (
                <p className="error-input">{errors["image1"].message}</p>
              )}
               </div>
            </Col>
            <Col span={24} style={{marginTop:"48px"}}>
              <span className={style.headerOne5}>เอกสารที่ใช้ในการแลกเหรียญ</span><br/>
              <span className={`${style.textOne25} ${style.marginleft18}`}> รูปสมุดบัญชีหน้าแรก พร้อมรับรองสำเนาถูกต้อง ระบุใช้สำหรับแลกเหรียญเท่านั้น</span>
            </Col>
          </Row>
          <Row className={`${style.horizontalCenter} ${style.marginBottom40}`}>
            <Col span={3}>
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
                onClick={()=>onHandleChange(false)}
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
