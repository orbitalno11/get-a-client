import React from 'react'
import { Card, Typography, Image, Grid, Button } from 'antd';
import styles from './styles.module.scss'
const { useBreakpoint } = Grid;
const { Title } = Typography;

export default function CardCorse() {
    const screens = useBreakpoint();

    return (
        <Card className={styles.cardRound}>
            <div className={styles.flexRow}>
                <Image
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    className={styles.image}
                    preview={false}
                />
                <div className={styles.flexColumn}>
                    <Title level={5}>ชื่sssอ</Title>
                    <span>dd</span>
                    <span>dd</span>
                </div>
                <div className={styles.floatRight}>
                <Button >dd</Button>
                </div>
            </div>
            <span>dd</span>
        </Card>
    )
}
