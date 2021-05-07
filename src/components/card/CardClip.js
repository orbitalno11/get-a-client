import React from "react";
import { Card } from "antd";
import styles from "./styles.module.scss";
import {
  faBookReader,
  faPlayCircle,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CardClip({data}) {
  return (
    <Card className={styles.cardCourse}>
              <Card.Grid hoverable={false} className={styles.gridhalf}>
                <span className={styles.titleH3}>{data && data.subject}</span>
              </Card.Grid>
              <Card.Grid hoverable={false} className={styles.gridhalf}>
                <FontAwesomeIcon icon={faBell} className={styles.floatBell} />
              </Card.Grid>
              <Card.Grid hoverable={false} className={styles.gridfull}>
                <FontAwesomeIcon icon={faBookReader} className={styles.icon} />
                <span className={styles.textIcon}>{data && data.grade},{data && data.title}</span>
              </Card.Grid>
              <Card.Grid hoverable={false} className={styles.gridfull}>
                <FontAwesomeIcon icon={faPlayCircle} className={styles.icon} />
                <span className={styles.textIcon}>{data && data.episode}</span>
              </Card.Grid>
    </Card>
  );
}
