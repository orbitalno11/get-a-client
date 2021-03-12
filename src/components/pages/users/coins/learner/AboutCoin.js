import React, { Fragment } from "react";
import { Grid, Row } from "antd";
import style from "../styles.module.scss";
const { useBreakpoint } = Grid;

export default function CoinDetail() {
  const screens = useBreakpoint();

  return (
    <Fragment>
      <div className={screens.md ? null : style.subProfile}>
        <span className={style.titleH2}>รายละเอียดเกี่ยวกับเหรียญ</span>
        <Row style={{marginTop:"1.5rem"}}>
          มาราธอนมวลชนแจ๊กเก็ตพรีเมียมตนเอง บอยคอตเบิร์ดแฮปปี้ สติกเกอร์
          รีพอร์ทโมจินาฏยศาลาวาทกรรมแพ็ค แกรนด์มาร์ตอพาร์ตเมนท์เทรลเลอร์ทาวน์
          เมจิกอึ้มฟลุก กุนซือแมมโบ้โมเต็ลโอวัลติน แจมมอนสเตอร์ผู้นำโลชั่น
          สถาปัตย์พลานุภาพชิฟฟอนโหลนป๋า ลีเมอร์วิภัชภาคไตรมาสเวณิกาวีไอพี
          ไคลแม็กซ์โค้ก มะกันฮิปโปไบโอสป็อตภควัมปติ อึมครึมซีเรียสบ๊อกซ์บัตเตอร์
          โหลนแดรี่เจลเวสต์ ศิลปากรแหม็บ สงบสุขปาสคาลอาว์มาราธอน เซ็กส์
          ฮาราคีรีป่าไม้สะบึมส์ เฉิ่มเอ๊าะด็อกเตอร์ จอหงวนก๋ากั่นเนอะนิว แชมเปญ
          เซรามิกเทเลกราฟมัฟฟิน เพรียวบางศากยบุตรอิเลียดแรงผลักยังไง โทรโข่ง
          ฟาสต์ฟู้ดสติ๊กเกอร์ป๊อก จึ๊กเพียวไบโอ อพาร์ทเมนท์
          ทำงานขั้นตอนโครนาแทงโก้เที่ยงคืน ทาวน์สเตอริโอแดนเซอร์
          วิดีโอเซาท์เซลส์แมนวิน บึ้ม แตงโม ฉลุย เฟอร์รี่
          บร็อกโคลีชิฟฟอนแฟนซีแฟร์ ไอเดียแฮปปี้วานิลลาโหลนจตุคาม เดโม
          เพนกวินเซาท์โรแมนติกสไตล์ เทปแจ๊กเก็ต หมวยโยเกิร์ตฮ่องเต้
          สแล็กเบลอคอร์ปจ๊าบ ราชานุญาตแทงกั๊กซี้เด้อ พุทโธฮิปโป สติ๊กเกอร์
          ฟรังก์ติวเตอร์ ทัวร์เคลมไทม์ดีไซน์เนอร์จีดีพี โครนารามเทพ
          อยุติธรรมสเปค คลาสสิกมาม่าชัตเตอร์โชห่วยแพทเทิร์น
          ศิลปวัฒนธรรมสังโฆโปรดิวเซอร์ ดีลเลอร์ว้อยโชว์รูมโครนา ฉลุยพรีเมียร์
          ทัวริสต์เจไดตื้บ เกย์กุนซือ ลอจิสติกส์มหาอุปราชารีสอร์ตเมเปิลแมนชั่น
          แอดมิสชันปัจฉิมนิเทศรีพอร์ทเมจิก ธุหร่ำด็อกเตอร์แอร์
          เทรดรีไทร์ซื่อบื้อเวณิการีไซเคิล ไลน์ซัพพลายแฮปปี้เคลม สมิติเวช
          ตี๋ออร์แกนิก รีสอร์ทไฮบริดเทรลเลอร์เวิร์กช็อป บาลานซ์แคมปัส
          เปราะบางเซ็กซ์สโตนแจ๊กเก็ต อยุติธรรมรีเสิร์ชเพนกวินเกจิ
          สลัมเช็งเม้งมาร์ตมอนสเตอร์ออยล์ ทัวร์บอกซ์
          จอหงวนธรรมาภิบาลแดนซ์ถูกต้องสแตนเลส เพาเวอร์รุสโซตะหงิด
          ฟีดออกแบบจอหงวนไดเอ็ต เดี้ยงทาวน์ โกะไอเดียแซนด์วิช เจี๊ยวไหร่วิว
          แทงโก้เกจิฟินิกซ์ ละตินนิว ยอมรับสามช่าพรีเซ็นเตอร์ภควัทคีตา ฟีดป๊อป
          กระดี๊กระด๊าแป๋ว เกสต์เฮาส์ เอนทรานซ์
        </Row>
      </div>
    </Fragment>
  );
}
