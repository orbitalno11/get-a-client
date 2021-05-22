import React, { Fragment } from "react"
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../../../validation/validation"
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import style from "./styles.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../../redux/actions";
import ModalComponent from "../../../modal/ModalComponent";
import Loading from "../../../loading/Loading";
import { useEffect } from "react";
import { color } from "../../../defaultValue";

export default function Login() {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state)
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(loginSchema),
    });

    useEffect(() => {
        document.body.style.backgroundColor = color.orange
        return () => {
            document.body.style.backgroundColor = ""
        }
    }, [])

    const onSubmit = (data) => {
        dispatch(userActions.loginUser(data))
    };

    const titleStyle = {
        marginTop: '1rem'
    }


    return (
        <Fragment>
            <ModalComponent />
            <div className={style.loginPage}>
                <form onSubmit={handleSubmit(onSubmit)} className={style.loginform} >
                    {
                        loading.loading && (
                            <Loading />
                        )
                    }
                    <Fragment>
                        <span className={style.h1}>GET-A</span>
                        <div className="input-form">
                            <span className={style.title} style={titleStyle}>อีเมล</span>
                            <input className="input" type="email" name="email" ref={register} />
                            {
                                errors.email && <p className="error-input">{errors.email.message}</p>
                            }
                            <p className={style.title} style={titleStyle}>รหัสผ่าน</p>
                            <input className="input" name="password" type="password" ref={register} />
                            {
                                errors.password && <p className="error-input">{errors.password.message}</p>
                            }
                        </div>
                        <div className={style.margintop20}>
                            <Button className="buttonColor backgroundBlue" shape="round" size="large" htmlType="submit">เข้าสู่ระบบ</Button>
                        </div>
                        <div className={style.margintop10} >
                            <Link to="/register">
                                <Button className={style.buttonText} type="link" >สมัครสมาชิก</Button>
                            </Link>
                        </div>
                    </Fragment>
                  </form>
            </div>
        </Fragment>
    )
}