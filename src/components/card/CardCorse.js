import React from 'react'
import { Card, Typography, Image, Button, Row , Col } from 'antd';
import styles from './styles.module.scss'
const { Title } = Typography;

export default function CardCorse() {

    return (
        <Card className={styles.cardRound}>
            {/* <div className={styles.flexRow}>
                <Image
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    className={styles.image}
                    preview={false}
                />
                <div className={styles.flexColumn}>
                    <Title level={5}>ชื่sssdsdsfsdfsdfsdsอ</Title>
                    <span>dd</span>
                    <span>dd</span>
                </div>
                <div className={styles.floatRight}>
                <Button >dd</Button>
                </div>
            </div>
            <span>dd</span> */}
            <Row>
                <Col xl={9} sm={9}>
                <Image
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    className={styles.image}
                    preview={false}
                />
                </Col>
                <Col  xl={12} sm={12}>
                <Title level={5}>ชื่sssdsdsfsdfsdfsdsอ</Title>
                    <span>dd</span>
                    <span>dd</span>
                </Col>
                {/* <Col  xl={3} xl={3} className={styles.floatRight}>
                <Button >dd</Button>
                </Col> */}

            </Row>
        </Card>
    )
}
