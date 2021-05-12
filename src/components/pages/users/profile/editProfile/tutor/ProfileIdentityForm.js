import React, { Fragment } from "react"
import Header from "../../../../../headerMobile/Header"
import isMobile from "../../../../../isMobile/isMobile"
import style from "../../styles.module.scss"
import uploadBackground from "../../../../../images/upload.webp"
import { Button, Col, Image, Row } from "antd"
import { useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { profileIdentitySchema } from "../../../../../../validation/profile/profileIdentitySchema"

export default function ProfileIdentityForm() {
    const [image, setImage] = useState({
        "idCard": {},
        "face": {},
        "idCardWithFace": {}
    })

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(profileIdentitySchema),
    });


    const imageStyle = {
        height: '11rem'
    }

    const listInput = [
        {
            name: "idCard",
            title: "รูปบัตรประชาชน (ด้านหน้า)"
        }, {
            name: "face",
            title: "รูปหน้าตรง"
        }, {
            name: "idCardWithFace",
            title: "รูปหน้าตรงคู่กับบัตรประชาชน (ด้านหน้า)"
        }
    ]

    const onChange = (event) => {
        const name = event.target.name
        const fileInput = event.target.files[0]
        if (fileInput) {
            const imageURL = URL.createObjectURL(fileInput)
            setImage({
                ...image,
                [name]: { file: fileInput, imageURL: imageURL }
            })
        }
    }

    const onSubmit = () => {
    // for submit form 
    }

    return (
        <Fragment>
            {isMobile() && <Header title="ยืนยันตัวตน" pageBack="goback" />}
            <div className={style.body}>
                {
                    !isMobile() && (
                        <Row justify="center" >
                            <h2 className={style.titleH2} >ยืนยันตัวตน</h2>
                        </Row>
                    )
                }

                <Row justify="center">
                    <span className={style.textNormal} >กรุณาถ่ายรูปเป็นแนวนอน</span>
                </Row>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row justify="space-around" >
                        {
                            listInput && listInput.map((item) => (
                                <Col lg={7} md={6} sm={18} xs={22} className={style.marginTop20} key={item.name}>
                                    <p>{item.title}</p>
                                  
                                    <div className="imageUpload" >
                                        <label htmlFor={`file-input-${item.name}`} className="icon-addimage">
                                            <Image
                                                style={imageStyle}
                                                src={image[item.name].imageURL ? image[item.name].imageURL : uploadBackground}
                                                preview={false}
                                            />
                                        </label>
                                        <input id={`file-input-${item.name}`} name={item.name} type="file" onChange={onChange} ref={register} />
                                        {
                                        errors[item.name] && <p className="error-input">*{errors[item.name].message}</p>
                                    }
                                    </div>
                                </Col>
                            ))
                        }

                    </Row>
                    <Row justify="center" className={style.marginTop}>
                        <Button className="buttonColor backgroundOrange" shape="round" size="large" htmlType="submit">ลงทะเบียน</Button>
                    </Row>
                </form>

            </div>
        </Fragment>
    )
}