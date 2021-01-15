import { Row, Typography } from 'antd';
import React from 'react'
import style from '../../styles.module.scss'
const { Title } = Typography;

export default function AddEducation() {
    return (
        <div className={style.body}>
           <Row justify="center" >
               <Title level={3}>ประวัติการศึกษา</Title>
           </Row>
        </div>
    )
}
