import React, { Fragment, useState } from "react"
import Header from "../../../../../headerMobile/Header"
import isMobile from "../../../../../isMobile/isMobile"
import style from "../../styles.module.scss"
import idCardSample from "../../../../../images/idCardSample.webp"
import faceSample from "../../../../../images/faceSample.webp"
import idCardWithFaceSample from "../../../../../images/idCardWithFaceSample.webp"
import { Col, Image, Row } from "antd"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { profileIdentitySchema } from "../../../../../../validation/profile/profileIdentitySchema"
import { modalAction, profileAction } from "../../../../../../redux/actions"
import { useDispatch } from "react-redux"
import ModalComponent from "../../../../../modal/ModalComponent"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { profileUpdateIdentitySchema } from "../../../../../../validation/profile/profileUpdateIdentitySchema"
import resizeImage from "../../../../../defaultFunction/resizeImage"
import { sizeModal } from "../../../../../modal/SizeModal"
import { typeModal } from "../../../../../modal/TypeModal"
import Loading from "../../../../../loading/Loading"
import { styleComponent } from "../../../../../defaultFunction/style"
import { color } from "../../../../../defaultValue"

export default function ProfileIdentityForm() {
    const dispatch = useDispatch()
    const { profile, loading } = useSelector(state => state)
    const [image, setImage] = useState({
        "idCard": {},
        "face": {},
        "idCardWithFace": {}
    })
    const [create, setCreate] = useState(true)

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(create ? profileIdentitySchema : profileUpdateIdentitySchema),
    });


    useEffect(() => {
        dispatch(profileAction.getIdentifyTutor())
    }, [])

    useEffect(() => {
        if (profile.identity) {
            setImage({
                "idCard": {
                    imageURL: profile.identity.documentUrl1
                },
                "face": {
                    imageURL: profile.identity.documentUrl2
                },
                "idCardWithFace": {
                    imageURL: profile.identity.documentUrl3
                }
            })
            setCreate(false)
        }
    }, [profile.identity])

    const listInput = [
        {
            name: "idCard",
            title: "รูปบัตรประชาชน (ด้านหน้า)",
            image: idCardSample
        }, {
            name: "face",
            title: "รูปหน้าตรง",
            image: faceSample
        }, {
            name: "idCardWithFace",
            title: "รูปหน้าตรงคู่กับบัตรประชาชน (ด้านหน้า)",
            image: idCardWithFaceSample
        }
    ]

    const onChange = async (event) => {
        const name = event.target.name
        const fileInput = event.target.files[0]
        if (fileInput) {
            try {
                const newImageFile = await resizeImage(fileInput, "file", 1280, 720)
                const imageURL = URL.createObjectURL(newImageFile)
                setImage({
                    ...image,
                    [name]: { file: newImageFile, imageURL: imageURL }
                })

            } catch {
                dispatch(modalAction.openModal({
                    text: "เพื่มรูปไม่สำเร็จ",
                    size: sizeModal.small,
                    alert: typeModal.wrong,
                }))
            }
        }
    }

    const onSubmit = (data) => {
        if (data) {
            let formdata = new FormData()
            if (create) {
                formdata.append("idCard", image.idCard.file)
                formdata.append("face", image.face.file)
                formdata.append("idCardWithFace", image.idCardWithFace.file)
                dispatch(profileAction.createIdentifyTutor(formdata))
            } else {
                if (data.idCard.lenght !== 0) {
                    formdata.append("idCard", image.idCard.file)
                }
                if (data.face.lenght !== 0) {
                    formdata.append("face", image.face.file)
                }
                if (data.idCardWithFace.lenght !== 0) {
                    formdata.append("idCardWithFace", image.idCardWithFace.file)
                }
                dispatch(profileAction.updateIdentifyTutor(formdata))
            }
        }
    }

    return (
        <Fragment>
            {isMobile() && <Header title="ยืนยันตัวตน" pageBack="goback" />}
            {
                loading.loading && (
                    <Loading />
                )
            }
            <ModalComponent />
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.bodyPaddingTopBottom} >
                        {
                            !isMobile() && (
                                <div className={style.section} span={24} align="center" >
                                    <span className={style.headerThree} >ยืนยันตัวตน</span>
                                </div>
                            )
                        }
                        <Row className={`${!isMobile() && style.marginTop20} ${style.section} ${!isMobile() && style.marginSection}`} justify={isMobile() ? "center" : "space-around"}>
                            {
                                listInput && listInput.map((item) => (
                                    <Col lg={6} md={24} sm={22} xs={22} key={item.name} >
                                        <div className={style.alignPageIdentity}>
                                            <div className="imageUpload" >
                                                <p className={style.textOne5}>{item.title}</p>
                                                <label htmlFor={`file-input-${item.name}`} className="icon-addimage">
                                                    <Image
                                                        className={`${style.borderImage} ${style.HDImage}`}
                                                        src={image[item.name].imageURL ? image[item.name].imageURL : item.image}
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
                            <Col span={24} align="center" className={style.marginTop}>
                                <button className={style.buttonColor} style={styleComponent.buttonFull(color.orange, "7rem")} type="submit">บันทึกข้อมูล</button>
                            </Col>
                        </Row>

                    </div>
                </form>


            </div>
        </Fragment>
    )
}