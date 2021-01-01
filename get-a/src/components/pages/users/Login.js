import React from 'react'
import { Button } from 'antd';
import { useForm } from "react-hook-form";
import { loginSchema } from '../../../validation/validation'
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';



export default function Login() {


    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(loginSchema),
    });
    const onSubmit = data => {
        alert(JSON.stringify(data));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                console.log(errors)
            }
            <div className="login-page">
                <span className="h1 white">GET-A</span>
                <div className="input-form">

                    <p className="title ">อีเมล</p>
                    <input className="input" type="email" name="email" ref={register} />
                    {
                        errors.email && <p className="error-input">{errors.email.message}</p>
                    }
                    <p className="title margintop10">รหัสผ่าน</p>
                    <input className="input" name="password" type="password" ref={register} />
                    {
                        errors.password && <p className="error-input">{errors.password.message}</p>
                    }

                </div>
                <Button className="buttonBlueColor margintop20" shape="round" size="large" htmlType="submit">เข้าสู่ระบบ</Button>
                <div className="margintop10" >
                    <Link to="/register">
                        <Button className="buttonText" type="link" >สมัครสมาชิก</Button>
                    </Link>

                </div>
            </div>

        </form>
    )


}
