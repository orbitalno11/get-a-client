import React from 'react'
import { Input, Row } from 'antd';

export default function Login() {
    // const {} = useForm
    return (
        <div className="login-page">
            <Row className="input-center">
                <span className="h1 white">GET-A</span>
           
                <Input className="input-login" />
                <Input className="input-login"  />
                </Row>
        </div>
    )
}
