// import { Col, Grid, Row, Typography,Button } from "antd";
// import React from "react";
// import CardClip from "../../../../../card/CardClip";
// import ListClip from "../../../../../card/ListClip";
// import styles from "../../styles.module.scss";
// import { courseOnline } from "../../../../../card/Constants";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import isMobile from "../../../../../isMobile/isMobile"
// const { useBreakpoint } = Grid;
// const { Link } = Typography;

// export default function ManageCourseDetail() {
//   const screens = useBreakpoint();

//   return (
//     <div>
//       {isMobile() ? (
//         <div>
//           {courseOnline &&
//             courseOnline.map((item, index) => (
//               <div key={index}>
//                 <Link href="/tutor/online/{courseId}">
//                   <ListClip data={item} />
//                 </Link>
//               </div>
//             ))}
//           <div className={styles.marginRigth}>
//             <Link href="/tutor/online/create">
//               <Button
//                 className="backgroundBlue buttonColor"
//                 shape="circle"
//                 icon={
//                   <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
//                 }
//               />
//             </Link>
//           </div>
//         </div>
//       ) : (
//         <Row className={!screens.lg ? styles.alignCenter : styles.pagecard}>
//           {courseOnline &&
//             courseOnline.map((item, index) => (
//               <Col
//                 className={!screens.lg ? styles.paddindMd : styles.paddingmange}
//                 key={index}
//               >
//                 <Link href="/tutor/online/{courseId}">
//                   <CardClip data={item} />
//                 </Link>
//               </Col>
//             ))}
//         </Row>
//       )}
//     </div>
//   );
// }
