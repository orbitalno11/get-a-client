import React from 'react'
import { Button } from 'antd';
import { useForm } from "react-hook-form";
import { loginSchema } from '../../../../validation/validation'
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from 'react-router-dom';
import style from './styles.module.scss'

export default function Login() {

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(loginSchema),
    });
    const onSubmit = data => {
        alert(JSON.stringify(data));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.loginPage}>
                <span className={style.h1}>GET-A</span>
                <div className="input-form">
                    <p className={style.title}>อีเมล</p>
                    <input className="input" type="email" name="email" ref={register} />
                    {
                        errors.email && <p className="error-input">{errors.email.message}</p>
                    }
                    <p className={style.title}>รหัสผ่าน</p>
                    <input className="input" name="password" type="password" ref={register} />
                    {
                        errors.password && <p className="error-input">{errors.password.message}</p>
                    }
                </div>
                <div className={style.margintop20}>
                    <Button className="buttonColor backgroundBlue" shape="round" size="large" htmlType="submit">เข้าสู่ระบบ</Button>
                </div>
                <div className={style.margintop10} >
                    <NavLink to="/register">
                        <Button className={style.buttonText} type="link" >สมัครสมาชิก</Button>
                    </NavLink>
                </div>
            </div>
        </form>
    )
}
