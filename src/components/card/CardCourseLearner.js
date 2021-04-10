import React from "react"
import { Card, Typography, Image } from "antd";
import styles from "./styles.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
const { Title } = Typography;

export default function CardCourseLearner({ data, profile }) {
    const history = useHistory();

    const redirectToCoursePage = () =>{
        history.push("/course/MTH-1-12-a693cc8b-c001-456d-9aed-cef5319ecea7")
    }

    return (
        <Card className={styles.cardRound} onClick={()=>{redirectToCoursePage()}}>
            <Card.Grid hoverable={false} className={styles.gridImage} >
                <Image
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    className={styles.image}
                    preview={false}
                />
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridText}>
                <Title level={4}>{data && data.name}<br/> {data && data.name}</Title>
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridhalfSmall}>
                <FontAwesomeIcon icon={faCoins} className={styles.iconSmall} />
                <span className={styles.textIconSmall}>{data && data.place} </span>
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridhalfSmall}>
                <FontAwesomeIcon icon={faCoins} className={styles.iconSmall} />
                <span className={styles.textIconSmall}>{data && data.subject} </span>
            </Card.Grid>
            {
                profile &&
                (
                    <Card.Grid hoverable={false} className={styles.gridfull}>
                        <span className={styles.textIconSmall}>เริ่มเรียน  วันที่ {data && data.date} </span>
                    </Card.Grid>
                )
            }

        </Card>
    )
}
