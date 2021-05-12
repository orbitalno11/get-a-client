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
import isMobile from "../../../isMobile/isMobile"
export default function Login() {
    const dispatch = useDispatch()
    const heightMobile = {height: "92.5vh"}
    const heightDesktop = { height: "100vh" }
    const auth = useSelector(state => state.auth)
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = (data) => {
        dispatch(userActions.loginUser(data))
    };

    const titleStyle = {
        marginTop : '1rem'
    }


    return (
        <Fragment>
            <ModalComponent />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={isMobile() ? `${style.loginPage}` : `${style.loginPage} ${style.alignCenterPageDestop} `} style={!isMobile() ? heightDesktop : heightMobile}>
                    {
                        !auth.loading ? (
                           <Fragment>
                                <span className={style.h1}>GET-A</span>
                            <div className="input-form">
                                <span className={style.title} style={titleStyle}>อีเมล</span>
                                <input className="input" type="email" name="email" ref={register} />
                                {
                                    errors.email && <p className="error-input">{errors.email.message}</p>
                                }
                                <p className={style.title}  style={titleStyle}>รหัสผ่าน</p>
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
                        ) : (
                            <Loading />
                        )
                    }
                </div>
            </form>
        </Fragment>
    )
}