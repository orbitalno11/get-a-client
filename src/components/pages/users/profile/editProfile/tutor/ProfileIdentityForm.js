import React, { Fragment } from "react"
import Header from "../../../../../headerMobile/Header"
import isMobile from "../../../../../isMobile/isMobile"
import style from "../../styles.module.scss"
import imageUpload from "../../../../../images/imageUpload.webp"
import { Alert, Button, Col, Image, Row } from "antd"
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
        height: "11rem",
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
                    <Alert
                        message="กรุณาถ่ายรูปเป็นแนวนอน"
                        type="warning"
                    />
                </Row>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row >
                        {
                            listInput && listInput.map((item) => (
                                <Col lg={8} md={24} sm={24} xs={24} className={style.marginTop20} key={item.name} >
                                    <div className={style.alignPageIdentity}>
                                        <div className="imageUpload" >
                                            <p>{item.title}</p>
                                            <label htmlFor={`file-input-${item.name}`} className="icon-addimage">
                                                <Image
                                                    style={imageStyle}
                                                    src={image[item.name].imageURL ? image[item.name].imageURL : imageUpload}
                                                    preview={false}

                                                />
                                            </label>
                                            <input id={`file-input-${item.name}`} name={item.name} type="file" onChange={onChange} ref={register} />
                                            {
                                                errors[item.name] && <p className="error-input">*{errors[item.name].message}</p>
                                            }
                                        </div>
                                    </div>

                                </Col>
                            ))
                        }

                    </Row>
                    <Row justify="center" className={style.marginTop}>
                        <Button className="buttonColor backgroundOrange" shape="round" size="large" htmlType="submit">ส่งข้อมูล</Button>
                    </Row>
                </form>


            </div>
        </Fragment>
    )
}