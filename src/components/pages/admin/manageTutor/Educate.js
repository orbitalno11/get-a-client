import { Row, Col, Image, Button } from 'antd';
import React,{ useState } from 'react';
import './Tutor.css';
import ONET from '../../../images/ONET.jpg';
import Success from '../../../images/Success.png';
import Modal from '../component/Modal';
import { useHistory } from 'react-router';

function Educate() {
  const [ModalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  const handleCancel = () => {
    history.goBack();
  };
  return (
    <div>
      <table className="profile">
        <tr>
          <th>จันจิรา ดินแดนมหัศจรรย์ดาวพระศุกร์</th>
        </tr>
        <tr>
          <td style={{ paddingLeft: "2em" }}>
            <Row style={{ paddingTop: "20px", paddingBottom: "4px" }}>
              <Col span={24}>18 ม.ค. 2564 19.00 น.</Col>
            </Row>
            <Row style={{ paddingTop: "15px", paddingBottom: "3px" }}>
              <Col span={2}>ชื่อ</Col>
              <Col span={1}>:</Col>
              <Col span={21}>จันจิรา </Col>
            </Row>
            <Row style={{ paddingTop: "15px", paddingBottom: "3px" }}>
              <Col span={2}>นามสกุล</Col>
              <Col span={1}>:</Col>
              <Col span={21}>ดินแดนมหัศจรรย์ดาวพระศุกร์</Col>
            </Row>
            <Row style={{ paddingTop: "15px", paddingBottom: "3px" }}>
              <Col span={2}>ประะภท</Col>
              <Col span={1}>:</Col>
              <Col span={21}>คะแนนสอบ</Col>
            </Row>
            <Row style={{ paddingTop: "15px", paddingBottom: "3px" }}>
              <Col span={2}>วิชา</Col>
              <Col span={1}>:</Col>
              <Col span={21}>คณิตศาสตร์</Col>
            </Row>
            <Row style={{ paddingTop: "15px", paddingBottom: "3px" }}>
              <Col span={2}>คะแนน</Col>
              <Col span={1}>:</Col>
              <Col span={21}>98</Col>
            </Row>
            <Row style={{ paddingTop: "15px", paddingBottom: "3px" }}>
              <Col span={2}>ปีการศึกษา</Col>
              <Col span={1}>:</Col>
              <Col span={21}>98</Col>
            </Row>
            <Row style={{ paddingTop: "15px", paddingBottom: "3px" }}>
              <Col span={24}>รูปเอกสารยืนยัน</Col>
              <Col
                span={24}
                style={{ paddingTop: "10px", paddingBottom: "3em" }}
              >
                <Image width={200} src={ONET} />
              </Col>
            </Row>
            <Row>
              <Col span={5}>
                <Button
                  type="button"
                  className="button-cancle"
                  onClick={handleCancel}
                >
                  ปฏิเสธ
                </Button>
              </Col>
              <Col>
                <Button
                  type="button"
                  className="button-confirm"
                  onClick={() => setModalOpen(!ModalOpen)}
                >
                  ยอมรับ
                </Button>
                <Modal isOpen={ModalOpen} toggle={setModalOpen}>
                  <h1 style={{marginTop:"1em"}}>ดำเนินการสำเร็จ</h1>
                  <Image width={150} src={Success} alt="success-image"/><br/>
                  <Button onClick={handleCancel} className="vetify-modal" style={{marginTop:"1em"}}>ปิด</Button>
                </Modal>
              </Col>
            </Row>
          </td>
        </tr>
      </table>
    </div>
  );
}
export default Educate;
