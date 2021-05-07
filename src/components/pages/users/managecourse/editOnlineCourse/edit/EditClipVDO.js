import React, { Fragment} from "react"
import style from "../../styles.module.scss"
import { useForm } from "react-hook-form";
import { Col, Row} from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import {courseSchema} from "../../../../../../validation/course/courseSchema"
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EditClipVDO() {

    const { register, handleSubmit, errors} = useForm({
        resolver: yupResolver(courseSchema),
    });

    const onSubmit = () => {
        // todo onSubmit
        // value
    } 

    return (
        <Fragment>
            <div>
                <form id="editClip" onSubmit={handleSubmit(onSubmit)}>
                    <Row >
                        <Col xl={24} md={24} sm={24} xs={24} className={style.marginTop}>
                            <p>ภาพหน้าปกคลิป</p>
                                <div className={style.VDO}>
                                    <div className="imageUpload ">
                                        <label htmlFor="file-input">
                                            <FontAwesomeIcon icon={faCloudUploadAlt} className={style.iconLargeRegister}/>
                                        </label>
                                        <input id="file-input" type="file" name="image" ref={register} />
                                    </div>
                                </div>
                                {errors.image && <p className="error-input">{errors.image.message}
                            </p>}
                        </Col>
                        <Col xl={24} md={24} sm={24} xs={24} className={style.marginTop}>
                            <p>คลิป</p>
                                <div className={style.VDO}>
                                    <div className="imageUpload ">
                                        <label htmlFor="file-input">
                                            <FontAwesomeIcon icon={faCloudUploadAlt} className={style.iconLargeRegister}/>
                                        </label>
                                        <input id="file-input" type="file" name="image" ref={register} />
                                    </div>
                                </div>
                                {errors.image && <p className="error-input">{errors.image.message}
                            </p>}
                        </Col>                    
                    </Row>
                </form>
            </div>
        </Fragment>
    )
}
