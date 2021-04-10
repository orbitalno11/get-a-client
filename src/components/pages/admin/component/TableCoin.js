import React from "react";
import "./Style.css";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";

function TableCoin() {
  return (
    <div>
      <table id="customers">
        <thead>
          <tr>
            <th span={8}>จำนวนเงิน (บาท)</th>
            <th span={8}>จำนวน coins</th>
            <th span={8}>การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>100 </td>
            <td>500</td>
            <td>
              <ModalDelete />
              <ModalEdit />
            </td>
          </tr>
          <tr>
            <td>200 </td>
            <td>1200</td>
            <td>
              <ModalDelete />
              <ModalEdit />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default TableCoin;
