import React from 'react';
import { Modal,Space,Button } from 'antd';
import { DeleteOutlined} from '@ant-design/icons';
import './Style.css';

const { confirm } = Modal;

function showDescription() {
  confirm({
    title: '',
    icon:'',
    content: (
      <div style={{marginTop: '50px',marginBottom: '20px',textAlign:'center',fontSize:'20px'}}>
        <p style={{textAlign:'center'}}>ยืนยันการลบโปรโมชั่น xxxxxxxx5555555555555</p>
      </div>
    ),
    okText: 'ยืนยัน',
    // okType: 'success',
    cancelText: 'ยกเลิก',
    onOk() {
      // todo onOk action
    },
    onCancel() {
      // todo onCancel action
    },
    width: 750,
  });
}
function ModalDeletePro() {
  return (
    <Space>
      <Button onClick={showDescription} className="button-modalDelete"icon={<DeleteOutlined/>}>
        ลบ
      </Button>
    </Space>
  );
}
export default ModalDeletePro;
