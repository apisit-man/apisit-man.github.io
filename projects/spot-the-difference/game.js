/**
 * Spot The Difference Game - Main Game Engine
 * Built for GitHub Pages (100% Client-Side, Zero Dependencies)
 */

// ==========================================================================
// Level Database (Master Pool: 94 Puzzles)
// ==========================================================================
const LEVELS = [
  {
    "id": 1,
    "title": "ลิ้นชักโต๊ะทำงาน",
    "image": "assets/images/pool/card_1.jpg",
    "pct_x": 51.8,
    "pct_y_top": 30.9,
    "pct_y_bot": 72.4,
    "hint": "สังเกตที่มือจับของลิ้นชักแถวบนดูนะ"
  },
  {
    "id": 2,
    "title": "เก้าอี้เรียนสีเหลือง",
    "image": "assets/images/pool/card_2.jpg",
    "pct_x": 70.8,
    "pct_y_top": 45.6,
    "pct_y_bot": 88.9,
    "hint": "สังเกตความสูงของปลอกปลายขาเก้าอี้ด้านขวา"
  },
  {
    "id": 3,
    "title": "ตู้จดหมายสีแดง",
    "image": "assets/images/pool/card_3.jpg",
    "pct_x": 64.9,
    "pct_y_top": 27.0,
    "pct_y_bot": 70.6,
    "hint": "สังเกตบริเวณฝาเปิดรับซองจดหมาย"
  },
  {
    "id": 4,
    "title": "กระเป๋าเดินทางล้อลาก",
    "image": "assets/images/pool/card_4.jpg",
    "pct_x": 57.6,
    "pct_y_top": 18.2,
    "pct_y_bot": 62.7,
    "hint": "สังเกตความหนาของก้านหูหิ้วด้านขวา"
  },
  {
    "id": 5,
    "title": "เครื่องปิ้งขนมปัง",
    "image": "assets/images/pool/card_5.jpg",
    "pct_x": 26.9,
    "pct_y_top": 16.3,
    "pct_y_bot": 59.6,
    "hint": "สังเกตปลายด้านซ้ายของช่องใส่ขนมปังช่องบน"
  },
  {
    "id": 6,
    "title": "กล้องถ่ายรูป & ช่องมองภาพ",
    "image": "assets/images/pool/card_6.jpg",
    "pct_x": 26.9,
    "pct_y_top": 25.1,
    "pct_y_bot": 69.1,
    "hint": "สังเกตบริเวณช่องมองภาพของกล้อง"
  },
  {
    "id": 7,
    "title": "กุญแจทองคำโบราณ",
    "image": "assets/images/pool/card_7.jpg",
    "pct_x": 49.8,
    "pct_y_top": 21.2,
    "pct_y_bot": 64.5,
    "hint": "สังเกตขนาดรูวงกลมที่หัวกุญแจ",
    "radius": 14.0
  },
  {
    "id": 8,
    "title": "หุ่นยนต์ลาเวนเดอร์",
    "image": "assets/images/pool/card_8.jpg",
    "pct_x": 19.5,
    "pct_y_top": 35.8,
    "pct_y_bot": 79.8,
    "hint": "สังเกตก้ามมือด้านซ้ายของหุ่นยนต์"
  },
  {
    "id": 9,
    "title": "นาฬิกาวินเทจ",
    "image": "assets/images/pool/card_9.jpg",
    "pct_x": 41.5,
    "pct_y_top": 45.6,
    "pct_y_bot": 90.0,
    "hint": "ลองสังเกตขีดบอกเวลาแถว 7 นาฬิกาดูสิ"
  },
  {
    "id": 10,
    "title": "หม้อหุงข้าวไฟฟ้า",
    "image": "assets/images/pool/card_10.jpg",
    "pct_x": 50.0,
    "pct_y_top": 16.5,
    "pct_y_bot": 60.5,
    "hint": "สังเกตความหนาของหูหิ้วหม้อหุงข้าว",
    "radius": 22.0
  },
  {
    "id": 11,
    "title": "แขนกลหุ่นยนต์",
    "image": "assets/images/pool/card_11.jpg",
    "pct_x": 19.5,
    "pct_y_top": 39.7,
    "pct_y_bot": 83.7,
    "hint": "ลองดูที่ก้ามหนีบของแขนกลฝั่งซ้าย"
  },
  {
    "id": 12,
    "title": "นาฬิกาปลุก — ขีดบอกเวลา",
    "image": "assets/images/pool/card_12.jpg",
    "pct_x": 41.5,
    "pct_y_top": 45.6,
    "pct_y_bot": 90.0,
    "hint": "สังเกตขีดบอกเวลาตำแหน่ง 7 นาฬิกา"
  },
  {
    "id": 13,
    "title": "กรรไกรสีส้มคอรัล",
    "image": "assets/images/pool/card_13.jpg",
    "pct_x": 60.5,
    "pct_y_top": 41.6,
    "pct_y_bot": 84.9,
    "hint": "สังเกตขนาดและความยาวของรูสอดนิ้วด้านขวา",
    "radius": 16.5
  },
  {
    "id": 14,
    "title": "ขวดหัวปั๊ม",
    "image": "assets/images/pool/card_14.jpg",
    "pct_x": 72.3,
    "pct_y_top": 16.3,
    "pct_y_bot": 60.4,
    "hint": "สังเกตความโค้งของปลายปากหัวปั๊มด้านขวา"
  },
  {
    "id": 15,
    "title": "รองเท้ากีฬาผูกเชือก",
    "image": "assets/images/pool/card_15.jpg",
    "pct_x": 45.9,
    "pct_y_top": 26.0,
    "pct_y_bot": 66.0,
    "hint": "สังเกตความยาวของแถบเชือกรองเท้าเส้นบนสุด"
  },
  {
    "id": 16,
    "title": "เชือกรองเท้าผ้าใบ",
    "image": "assets/images/pool/card_16.jpg",
    "pct_x": 43.0,
    "pct_y_top": 26.0,
    "pct_y_bot": 65.9,
    "hint": "สังเกตความยาวของแถบเชือกเส้นที่สองนับจากด้านบน"
  },
  {
    "id": 17,
    "title": "แก้วกาแฟหูจับ",
    "image": "assets/images/pool/card_17.jpg",
    "pct_x": 81.1,
    "pct_y_top": 31.9,
    "pct_y_bot": 74.9,
    "hint": "ลองมองดูที่หูจับของแก้วกาแฟฝั่งขวา"
  },
  {
    "id": 18,
    "title": "กล่องดินสอแสนกล",
    "image": "assets/images/pool/card_18.jpg",
    "pct_x": 91.3,
    "pct_y_top": 31.9,
    "pct_y_bot": 70.5,
    "hint": "สังเกตรูบนหัวซิปด้านขวา"
  },
  {
    "id": 19,
    "title": "เสากระโดงเรือใบ",
    "image": "assets/images/pool/card_19.jpg",
    "pct_x": 44.4,
    "pct_y_top": 15.3,
    "pct_y_bot": 57.0,
    "hint": "ลองสังเกตบริเวณปลายเสากระโดงเรือ"
  },
  {
    "id": 20,
    "title": "ใบไม้กับเส้นใบธรรมชาติ",
    "image": "assets/images/pool/card_20.jpg",
    "pct_x": 23.9,
    "pct_y_top": 21.2,
    "pct_y_bot": 66.6,
    "hint": "สังเกตปลายเส้นกลางใบของใบด้านซ้าย"
  },
  {
    "id": 21,
    "title": "ร่มกันฝนสีเหลืองสดใส",
    "image": "assets/images/pool/card_21.jpg",
    "pct_x": 66.4,
    "pct_y_top": 32.9,
    "pct_y_bot": 76.6,
    "hint": "ลองสังเกตแนวซี่โครงร่มฝั่งขวามือ"
  },
  {
    "id": 22,
    "title": "กล่องข้าวปิ่นโต",
    "image": "assets/images/pool/card_22.jpg",
    "pct_x": 60.5,
    "pct_y_top": 32.9,
    "pct_y_bot": 73.9,
    "hint": "สังเกตความโค้งของมุมขวาบนของตัวล็อกสีส้ม"
  },
  {
    "id": 23,
    "title": "แว่นตาสีเขียวมรกต",
    "image": "assets/images/pool/card_23.jpg",
    "pct_x": 6.1,
    "pct_y_top": 33.5,
    "pct_y_bot": 72.8,
    "hint": "สังเกตบริเวณขาแว่นตาฝั่งซ้ายมือ",
    "radius": 7.5
  },
  {
    "id": 24,
    "title": "จอภาพ",
    "image": "assets/images/pool/card_24.jpg",
    "pct_x": 19.0,
    "pct_y_top": 45.9,
    "pct_y_bot": 88.9,
    "hint": "สังเกตปุ่มเปิดเครื่องที่มุมซ้ายล่างของกรอบจอภาพ",
    "radius": 8.5
  },
  {
    "id": 25,
    "title": "แป้นเครื่องคิดเลข",
    "image": "assets/images/pool/card_25.jpg",
    "pct_x": 50.0,
    "pct_y_top": 34.1,
    "pct_y_bot": 78.1,
    "hint": "สังเกตรูปร่างมุมของปุ่มแถวที่สองตรงกลาง",
    "radius": 8.0
  },
  {
    "id": 26,
    "title": "กาน้ำร้อนชงชา",
    "image": "assets/images/pool/card_26.jpg",
    "pct_x": 41.5,
    "pct_y_top": 13.3,
    "pct_y_bot": 57.3,
    "hint": "สังเกตความกว้างของปุ่มจับบนฝา"
  },
  {
    "id": 27,
    "title": "จรวดท่องอวกาศ",
    "image": "assets/images/pool/card_27.jpg",
    "pct_x": 49.8,
    "pct_y_top": 31.6,
    "pct_y_bot": 75.1,
    "hint": "สังเกตขนาดและขอบของหน้าต่างวงกลมบนตัวจรวด",
    "radius": 10.0
  },
  {
    "id": 28,
    "title": "สมุดบันทึกเล่มโปรด",
    "image": "assets/images/pool/card_28.jpg",
    "pct_x": 24.0,
    "pct_y_top": 50.0,
    "pct_y_bot": 92.9,
    "hint": "ลองสังเกตความโค้งมนที่มุมซ้ายล่างของเล่มสมุดบันทึก"
  },
  {
    "id": 29,
    "title": "สเกลปรับคลื่นวิทยุ",
    "image": "assets/images/pool/card_29.jpg",
    "pct_x": 72.3,
    "pct_y_top": 33.9,
    "pct_y_bot": 78.6,
    "hint": "สังเกตขีดสเกลช่องปรับคลื่นวิทยุด้านขวา"
  },
  {
    "id": 30,
    "title": "โคมไฟแขวนเพดาน",
    "image": "assets/images/pool/card_30.jpg",
    "pct_x": 50.3,
    "pct_y_top": 45.6,
    "pct_y_bot": 90.4,
    "hint": "สังเกตที่ขอบล่างของตัวโคมไฟ"
  },
  {
    "id": 31,
    "title": "กาน้ำชาทรงคลาสสิก",
    "image": "assets/images/pool/card_31.jpg",
    "pct_x": 13.7,
    "pct_y_top": 26.0,
    "pct_y_bot": 70.4,
    "hint": "สังเกตรูปร่างและขนาดช่องเปิดปลายพวยกา"
  },
  {
    "id": 32,
    "title": "ฝาครอบล้อรถของเล่น",
    "image": "assets/images/pool/card_32.jpg",
    "pct_x": 72.2,
    "pct_y_top": 46.5,
    "pct_y_bot": 89.5,
    "hint": "สังเกตขนาดวงกลมสีเทาตรงกลางล้อหลัง",
    "radius": 16.5
  },
  {
    "id": 33,
    "title": "นาฬิกาปลุกคู่หู",
    "image": "assets/images/pool/card_33.jpg",
    "pct_x": 41.5,
    "pct_y_top": 45.6,
    "pct_y_bot": 90.0,
    "hint": "สังเกตความยาวของขีดบอกเวลาตำแหน่ง 7 นาฬิกา"
  },
  {
    "id": 34,
    "title": "กระเป๋าสตางค์ใบเก่ง",
    "image": "assets/images/pool/card_34.jpg",
    "pct_x": 76.7,
    "pct_y_top": 29.9,
    "pct_y_bot": 71.8,
    "hint": "สังเกตรูปร่างกระดุมบนสายปิดกระเป๋าด้านขวา"
  },
  {
    "id": 35,
    "title": "แมว",
    "image": "assets/images/pool/card_35.jpg",
    "pct_x": 54.7,
    "pct_y_top": 18.1,
    "pct_y_bot": 60.8,
    "hint": "สังเกตแถบลายบนหน้าผากแมวด้านขวาดูนะ"
  },
  {
    "id": 36,
    "title": "สุนัข",
    "image": "assets/images/pool/card_36.jpg",
    "pct_x": 49.6,
    "pct_y_top": 27.2,
    "pct_y_bot": 69.0,
    "hint": "สังเกตรูปร่างจมูกของสุนัขดูนะ"
  },
  {
    "id": 37,
    "title": "กระต่าย",
    "image": "assets/images/pool/card_37.jpg",
    "pct_x": 41.0,
    "pct_y_top": 19.2,
    "pct_y_bot": 61.2,
    "hint": "สังเกตพื้นที่สีชมพูด้านในหูกระต่ายดูนะ",
    "radius": 8.5
  },
  {
    "id": 38,
    "title": "สุนัขจิ้งจอก",
    "image": "assets/images/pool/card_38.jpg",
    "pct_x": 66.0,
    "pct_y_top": 31.0,
    "pct_y_bot": 72.0,
    "hint": "สังเกตพื้นที่สีขาวบริเวณปลายหางสุนัขจิ้งจอกดูนะ",
    "radius": 14.0
  },
  {
    "id": 39,
    "title": "แพนด้า",
    "image": "assets/images/pool/card_39.jpg",
    "pct_x": 56.0,
    "pct_y_top": 38.7,
    "pct_y_bot": 81.7,
    "hint": "สังเกตรอยเว้าบนใบไผ่ใบเล็กดูนะ",
    "radius": 8.0
  },
  {
    "id": 40,
    "title": "โคอาลา",
    "image": "assets/images/pool/card_40.jpg",
    "pct_x": 71.3,
    "pct_y_top": 24.0,
    "pct_y_bot": 66.0,
    "hint": "สังเกตพื้นที่สีชมพูในหูด้านขวาของโคอาลาดูนะ",
    "radius": 10.5
  },
  {
    "id": 41,
    "title": "ช้าง",
    "image": "assets/images/pool/card_41.jpg",
    "pct_x": 59.4,
    "pct_y_top": 33.5,
    "pct_y_bot": 73.3,
    "hint": "สังเกตเส้นโค้งด้านในใบหูช้างดูนะ"
  },
  {
    "id": 42,
    "title": "ยีราฟ",
    "image": "assets/images/pool/card_42.jpg",
    "pct_x": 47.7,
    "pct_y_top": 33.9,
    "pct_y_bot": 75.9,
    "hint": "สังเกตปื้นลายสีน้ำตาลขนาดใหญ่บริเวณไหล่ยีราฟดูนะ"
  },
  {
    "id": 43,
    "title": "ม้าลาย",
    "image": "assets/images/pool/card_43.jpg",
    "pct_x": 41.7,
    "pct_y_top": 46.2,
    "pct_y_bot": 86.2,
    "hint": "สังเกตลายแถบสีดำบริเวณขาหน้าของม้าลายดูนะ"
  },
  {
    "id": 44,
    "title": "สิงโต",
    "image": "assets/images/pool/card_44.jpg",
    "pct_x": 77.2,
    "pct_y_top": 34.5,
    "pct_y_bot": 76.5,
    "hint": "สังเกตพู่ที่ปลายหางสิงโตดูนะ"
  },
  {
    "id": 45,
    "title": "เสือ",
    "image": "assets/images/pool/card_45.jpg",
    "pct_x": 78.4,
    "pct_y_top": 20.4,
    "pct_y_bot": 62.4,
    "hint": "สังเกตแถบสีดำใกล้ปลายหางเสือดูนะ"
  },
  {
    "id": 46,
    "title": "กวาง",
    "image": "assets/images/pool/card_46.jpg",
    "pct_x": 55.0,
    "pct_y_top": 15.0,
    "pct_y_bot": 57.9,
    "hint": "สังเกตปลายกิ่งเขากวางด้านขวาบนดูนะ"
  },
  {
    "id": 47,
    "title": "กระรอก",
    "image": "assets/images/pool/card_47.jpg",
    "pct_x": 75.7,
    "pct_y_top": 26.6,
    "pct_y_bot": 68.6,
    "hint": "สังเกตเส้นโค้งด้านในหางกระรอกดูนะ"
  },
  {
    "id": 48,
    "title": "เม่น",
    "image": "assets/images/pool/card_48.jpg",
    "pct_x": 62.4,
    "pct_y_top": 19.0,
    "pct_y_bot": 58.6,
    "hint": "สังเกตรูปร่างหนามบนหลังเม่นค่อนไปทางขวาดูนะ"
  },
  {
    "id": 49,
    "title": "หมี",
    "image": "assets/images/pool/card_49.jpg",
    "pct_x": 67.7,
    "pct_y_top": 47.7,
    "pct_y_bot": 90.2,
    "hint": "สังเกตแผ่นอุ้งเท้าตรงกลางฝ่าเท้าด้านขวาของหมีดูนะ",
    "radius": 8.5
  },
  {
    "id": 50,
    "title": "เพนกวิน",
    "image": "assets/images/pool/card_50.jpg",
    "pct_x": 50.0,
    "pct_y_top": 26.7,
    "pct_y_bot": 69.3,
    "hint": "สังเกตเส้นแบ่งปากของเพนกวินดูนะ",
    "radius": 8.5
  },
  {
    "id": 51,
    "title": "นกฮูก",
    "image": "assets/images/pool/card_51.jpg",
    "pct_x": 59.0,
    "pct_y_top": 26.6,
    "pct_y_bot": 68.4,
    "hint": "สังเกตความหนาของขอบตาสีดำด้านขวาของนกฮูกดูนะ",
    "radius": 10.5
  },
  {
    "id": 52,
    "title": "นกแก้ว",
    "image": "assets/images/pool/card_52.jpg",
    "pct_x": 51.1,
    "pct_y_top": 33.3,
    "pct_y_bot": 74.2,
    "hint": "สังเกตเส้นโค้งพาดบนปีกนกแก้วดูนะ"
  },
  {
    "id": 53,
    "title": "นกยูง",
    "image": "assets/images/pool/card_53.jpg",
    "pct_x": 65.3,
    "pct_y_top": 20.2,
    "pct_y_bot": 62.1,
    "hint": "สังเกตวงสีน้ำเงินบนขนหางนกยูงด้านขวาบนดูนะ"
  },
  {
    "id": 54,
    "title": "เป็ด",
    "image": "assets/images/pool/card_54.jpg",
    "pct_x": 61.6,
    "pct_y_top": 38.7,
    "pct_y_bot": 79.7,
    "hint": "สังเกตขอบปลายปีกเป็ดดูนะ",
    "radius": 9.0
  },
  {
    "id": 55,
    "title": "เต่า",
    "image": "assets/images/pool/card_55.jpg",
    "pct_x": 64.9,
    "pct_y_top": 25.6,
    "pct_y_bot": 66.0,
    "hint": "สังเกตเส้นแบ่งแผ่นกระดองเต่าแนวเฉียงขวาบนดูนะ"
  },
  {
    "id": 56,
    "title": "กบ",
    "image": "assets/images/pool/card_56.jpg",
    "pct_x": 73.0,
    "pct_y_top": 49.7,
    "pct_y_bot": 91.0,
    "hint": "สังเกตความยาวนิ้วเท้าหลังด้านขวาของกบดูนะ"
  },
  {
    "id": 57,
    "title": "กิ้งก่า",
    "image": "assets/images/pool/card_57.jpg",
    "pct_x": 75.8,
    "pct_y_top": 40.9,
    "pct_y_bot": 78.7,
    "hint": "สังเกตปลายเส้นขดด้านในหางกิ้งก่าดูนะ",
    "radius": 8.0
  },
  {
    "id": 58,
    "title": "ปลาทอง",
    "image": "assets/images/pool/card_58.jpg",
    "pct_x": 79.2,
    "pct_y_top": 25.3,
    "pct_y_bot": 63.6,
    "hint": "สังเกตปลายเส้นในครีบหางปลาทองส่วนบนดูนะ"
  },
  {
    "id": 59,
    "title": "ม้าน้ำ",
    "image": "assets/images/pool/card_59.jpg",
    "pct_x": 60.0,
    "pct_y_top": 31.1,
    "pct_y_bot": 71.4,
    "hint": "สังเกตเส้นสีดำในครีบหลังของม้าน้ำดูนะ",
    "radius": 9.0
  },
  {
    "id": 60,
    "title": "ปลาหมึกยักษ์",
    "image": "assets/images/pool/card_60.jpg",
    "pct_x": 77.5,
    "pct_y_top": 24.1,
    "pct_y_bot": 66.3,
    "hint": "สังเกตรูปร่างปุ่มดูดใกล้ปลายหนวดขวาบนดูนะ"
  },
  {
    "id": 61,
    "title": "ผีเสื้อ",
    "image": "assets/images/pool/card_61.jpg",
    "pct_x": 76.2,
    "pct_y_top": 20.9,
    "pct_y_bot": 61.6,
    "hint": "สังเกตจุดสีฟ้าใกล้ปลายปีกขวาบนของผีเสื้อดูนะ"
  },
  {
    "id": 62,
    "title": "แมลงเต่าทอง",
    "image": "assets/images/pool/card_62.jpg",
    "pct_x": 62.3,
    "pct_y_top": 16.1,
    "pct_y_bot": 56.8,
    "hint": "สังเกตขนาดปุ่มสีเหลืองปลายหนวดด้านขวาดูนะ"
  },
  {
    "id": 63,
    "title": "หอยทาก",
    "image": "assets/images/pool/card_63.jpg",
    "pct_x": 57.7,
    "pct_y_top": 36.0,
    "pct_y_bot": 73.6,
    "hint": "สังเกตเส้นขดด้านในเปลือกหอยทากดูนะ"
  },
  {
    "id": 64,
    "title": "ต้นทานตะวัน",
    "image": "assets/images/pool/card_64.jpg",
    "pct_x": 65.0,
    "pct_y_top": 33.8,
    "pct_y_bot": 76.5,
    "hint": "สังเกตเส้นกลางใบด้านขวาของต้นทานตะวันดูนะ",
    "radius": 8.0
  },
  {
    "id": 65,
    "title": "หมวกจักรยาน",
    "image": "assets/images/pool/card_65.jpg",
    "pct_x": 69.0,
    "pct_y_top": 29.4,
    "pct_y_bot": 66.9,
    "hint": "สังเกตความยาวของช่องระบายอากาศด้านท้ายหมวกดูนะ",
    "radius": 14.0
  },
  {
    "id": 66,
    "title": "บัวรดน้ำ",
    "image": "assets/images/pool/card_66.jpg",
    "pct_x": 79.0,
    "pct_y_top": 35.0,
    "pct_y_bot": 73.0,
    "hint": "สังเกตช่องว่างด้านในหูจับบัวรดน้ำดูนะ",
    "radius": 12.5
  },
  {
    "id": 67,
    "title": "ไฟจราจร",
    "image": "assets/images/pool/card_67.jpg",
    "pct_x": 50.0,
    "pct_y_top": 34.0,
    "pct_y_bot": 74.0,
    "hint": "สังเกตขอบรอบดวงไฟสีเหลืองตรงกลางดูนะ",
    "radius": 10.0
  },
  {
    "id": 68,
    "title": "พัดลมตั้งโต๊ะ",
    "image": "assets/images/pool/card_68.jpg",
    "pct_x": 67.0,
    "pct_y_top": 24.0,
    "pct_y_bot": 65.0,
    "hint": "สังเกตซี่ตะแกรงพัดลมบริเวณด้านขวาบนดูนะ",
    "radius": 9.0
  },
  {
    "id": 69,
    "title": "ไฟฉาย",
    "image": "assets/images/pool/card_69.jpg",
    "pct_x": 51.0,
    "pct_y_top": 38.0,
    "pct_y_bot": 73.0,
    "hint": "สังเกตรูปร่างของปุ่มเปิดไฟฉายดูนะ",
    "radius": 10.0
  },
  {
    "id": 70,
    "title": "แม่กุญแจ",
    "image": "assets/images/pool/card_70.jpg",
    "pct_x": 50.0,
    "pct_y_top": 44.0,
    "pct_y_bot": 84.0,
    "hint": "สังเกตความยาวส่วนหางแนวตั้งของรูกุญแจดูนะ"
  },
  {
    "id": 71,
    "title": "เครื่องเย็บกระดาษ",
    "image": "assets/images/pool/card_71.jpg",
    "pct_x": 23.0,
    "pct_y_top": 35.5,
    "pct_y_bot": 73.3,
    "hint": "สังเกตช่องสี่เหลี่ยมบริเวณปลายด้านหน้าเครื่องเย็บดูนะ",
    "radius": 9.0
  },
  {
    "id": 72,
    "title": "แท่นตัดเทป",
    "image": "assets/images/pool/card_72.jpg",
    "pct_x": 41.6,
    "pct_y_top": 31.3,
    "pct_y_bot": 69.0,
    "hint": "สังเกตขนาดรูตรงกลางม้วนเทปดูนะ",
    "radius": 11.5
  },
  {
    "id": 73,
    "title": "นกหวีด",
    "image": "assets/images/pool/card_73.jpg",
    "pct_x": 46.0,
    "pct_y_top": 30.0,
    "pct_y_bot": 67.0,
    "hint": "สังเกตมุมช่องเป่าเสียงด้านบนนกหวีดดูนะ",
    "radius": 14.5
  },
  {
    "id": 74,
    "title": "แฟลชไดรฟ์",
    "image": "assets/images/pool/card_74.jpg",
    "pct_x": 19.4,
    "pct_y_top": 35.0,
    "pct_y_bot": 69.5,
    "hint": "สังเกตรูด้านบนของหัวโลหะ USB ดูนะ",
    "radius": 8.5
  },
  {
    "id": 75,
    "title": "หูฟัง",
    "image": "assets/images/pool/card_75.jpg",
    "pct_x": 64.0,
    "pct_y_top": 41.0,
    "pct_y_bot": 81.0,
    "hint": "สังเกตช่องว่างด้านในที่ครอบหูขวาดูนะ",
    "radius": 9.5
  },
  {
    "id": 76,
    "title": "เมาส์คอมพิวเตอร์",
    "image": "assets/images/pool/card_76.jpg",
    "pct_x": 50.0,
    "pct_y_top": 25.0,
    "pct_y_bot": 65.0,
    "hint": "สังเกตจำนวนขีดบนล้อเลื่อนเมาส์ดูนะ",
    "radius": 8.0
  },
  {
    "id": 77,
    "title": "จอยเกม",
    "image": "assets/images/pool/card_77.jpg",
    "pct_x": 24.5,
    "pct_y_top": 31.5,
    "pct_y_bot": 70.0,
    "hint": "สังเกตแขนซ้ายของปุ่มทิศทางรูปกากบาทดูนะ"
  },
  {
    "id": 78,
    "title": "กล้องส่องทางไกล",
    "image": "assets/images/pool/card_78.jpg",
    "pct_x": 61.0,
    "pct_y_top": 44.0,
    "pct_y_bot": 84.0,
    "hint": "สังเกตความหนาของขอบเลนส์ด้านขวาดูนะ",
    "radius": 17.0
  },
  {
    "id": 79,
    "title": "กล้องจุลทรรศน์",
    "image": "assets/images/pool/card_79.jpg",
    "pct_x": 62.0,
    "pct_y_top": 38.0,
    "pct_y_bot": 79.0,
    "hint": "สังเกตขนาดรูตรงกลางปุ่มปรับโฟกัสดูนะ"
  },
  {
    "id": 80,
    "title": "กล้องโทรทรรศน์",
    "image": "assets/images/pool/card_80.jpg",
    "pct_x": 63.0,
    "pct_y_top": 48.0,
    "pct_y_bot": 86.6,
    "hint": "สังเกตปลอกเท้าขาตั้งด้านขวาสุดของกล้องดูนะ"
  },
  {
    "id": 81,
    "title": "เครื่องชั่ง",
    "image": "assets/images/pool/card_81.jpg",
    "pct_x": 57.4,
    "pct_y_top": 28.5,
    "pct_y_bot": 70.2,
    "hint": "สังเกตขีดหน้าปัดเฉียงขวาบนใกล้ตำแหน่ง 1 นาฬิกาดูนะ"
  },
  {
    "id": 82,
    "title": "กระดิ่ง",
    "image": "assets/images/pool/card_82.jpg",
    "pct_x": 50.0,
    "pct_y_top": 47.5,
    "pct_y_bot": 87.3,
    "hint": "สังเกตรูปร่างลูกกระดิ่งใต้ปากระฆังดูนะ"
  },
  {
    "id": 83,
    "title": "กีตาร์",
    "image": "assets/images/pool/card_83.jpg",
    "pct_x": 50.0,
    "pct_y_top": 37.5,
    "pct_y_bot": 80.4,
    "hint": "สังเกตขนาดของช่องเสียงกลางลำตัวกีตาร์ดูนะ",
    "radius": 10.5
  },
  {
    "id": 84,
    "title": "กลองสแนร์",
    "image": "assets/images/pool/card_84.jpg",
    "pct_x": 40.4,
    "pct_y_top": 42.3,
    "pct_y_bot": 80.4,
    "hint": "สังเกตร่องสีดำในตัวล็อกกลองตัวที่สองจากซ้ายดูนะ"
  },
  {
    "id": 85,
    "title": "ไวโอลิน",
    "image": "assets/images/pool/card_85.jpg",
    "pct_x": 56.6,
    "pct_y_top": 17.5,
    "pct_y_bot": 60.5,
    "hint": "สังเกตรูปร่างของลูกบิดสายด้านขวาบนดูนะ"
  },
  {
    "id": 86,
    "title": "ไม้นวดแป้ง",
    "image": "assets/images/pool/card_86.jpg",
    "pct_x": 80.0,
    "pct_y_top": 38.5,
    "pct_y_bot": 71.7,
    "hint": "สังเกตจำนวนวงแหวนบริเวณด้ามขวาของไม้นวดแป้งดูนะ"
  },
  {
    "id": 87,
    "title": "หมวกเชฟ",
    "image": "assets/images/pool/card_87.jpg",
    "pct_x": 69.0,
    "pct_y_top": 40.0,
    "pct_y_bot": 80.3,
    "hint": "สังเกตเส้นตะเข็บขวาสุดของหมวกเชฟดูนะ",
    "radius": 8.0
  },
  {
    "id": 88,
    "title": "หีบสมบัติ",
    "image": "assets/images/pool/card_88.jpg",
    "pct_x": 43.6,
    "pct_y_top": 37.3,
    "pct_y_bot": 77.4,
    "hint": "สังเกตช่องสีดำกลางแผ่นล็อกหีบสมบัติดูนะ"
  },
  {
    "id": 89,
    "title": "รถไฟของเล่น",
    "image": "assets/images/pool/card_89.jpg",
    "pct_x": 78.0,
    "pct_y_top": 31.8,
    "pct_y_bot": 72.4,
    "hint": "สังเกตมุมขวาล่างของหน้าต่างห้องขับรถไฟดูนะ"
  },
  {
    "id": 90,
    "title": "บอลลูน",
    "image": "assets/images/pool/card_90.jpg",
    "pct_x": 56.1,
    "pct_y_top": 45.6,
    "pct_y_bot": 87.0,
    "hint": "สังเกตเส้นตั้งในลายสานของตะกร้าบอลลูนดูนะ"
  },
  {
    "id": 91,
    "title": "นาฬิกาทราย",
    "image": "assets/images/pool/card_91.jpg",
    "pct_x": 50.0,
    "pct_y_top": 33.3,
    "pct_y_bot": 74.0,
    "hint": "สังเกตความกว้างของคอแก้วตรงกลางนาฬิกาทรายดูนะ",
    "radius": 9.0
  },
  {
    "id": 92,
    "title": "ตะเกียง",
    "image": "assets/images/pool/card_92.jpg",
    "pct_x": 50.0,
    "pct_y_top": 18.0,
    "pct_y_bot": 61.0,
    "hint": "สังเกตช่องว่างด้านในหูหิ้วตะเกียงดูนะ",
    "radius": 19.0
  },
  {
    "id": 93,
    "title": "ขวดสเปรย์",
    "image": "assets/images/pool/card_93.jpg",
    "pct_x": 42.3,
    "pct_y_top": 25.5,
    "pct_y_bot": 67.0,
    "hint": "สังเกตช่องว่างระหว่างไกฉีดกับคอขวดดูนะ"
  },
  {
    "id": 94,
    "title": "กบเหลาดินสอ",
    "image": "assets/images/pool/card_94.jpg",
    "pct_x": 33.3,
    "pct_y_top": 42.3,
    "pct_y_bot": 81.0,
    "hint": "สังเกตขอบสีเหลืองรอบรูเสียบดินสอดูนะ",
    "radius": 12.0
  }
];

// ==========================================================================
// Web Audio Sound Synthesizer (Zero External Dependencies)
// ==========================================================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type, duration, startTime = 0, gainLevel = 0.15) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);
      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime + startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + startTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + startTime);
      osc.stop(this.ctx.currentTime + startTime + duration);
    } catch (e) {
      // Audio fallback fail silently
    }
  }

  correct() {
    this.init();
    // Cheerful 3-tone arpeggio (C5 -> E5 -> G5)
    this.playTone(523.25, 'sine', 0.18, 0.0, 0.2);
    this.playTone(659.25, 'sine', 0.22, 0.1, 0.2);
    this.playTone(783.99, 'sine', 0.35, 0.2, 0.25);
  }

  wrong() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;

      // Layer 1: Punchy Impact Kick (Fast percussive transient)
      const kickOsc = this.ctx.createOscillator();
      const kickGain = this.ctx.createGain();
      kickOsc.type = 'sine';
      kickOsc.frequency.setValueAtTime(260, now);
      kickOsc.frequency.exponentialRampToValueAtTime(45, now + 0.08);
      kickGain.gain.setValueAtTime(0.35, now);
      kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      kickOsc.connect(kickGain);
      kickGain.connect(this.ctx.destination);
      kickOsc.start(now);
      kickOsc.stop(now + 0.09);

      // Layer 2: Dramatic Descending Arcade Bwoomp (Warm filtered sawtooth)
      const buzz1 = this.ctx.createOscillator();
      const buzzGain1 = this.ctx.createGain();
      buzz1.type = 'sawtooth';
      buzz1.frequency.setValueAtTime(196, now + 0.02);
      buzz1.frequency.exponentialRampToValueAtTime(98, now + 0.22);
      buzzGain1.gain.setValueAtTime(0.22, now + 0.02);
      buzzGain1.gain.exponentialRampToValueAtTime(0.001, now + 0.23);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, now);
      filter.frequency.exponentialRampToValueAtTime(320, now + 0.24);

      buzz1.connect(filter);
      filter.connect(buzzGain1);
      buzzGain1.connect(this.ctx.destination);
      buzz1.start(now + 0.02);
      buzz1.stop(now + 0.24);

      // Layer 3: Sub-bass Tension Wobble (Bouncy game error tone)
      const buzz2 = this.ctx.createOscillator();
      const buzzGain2 = this.ctx.createGain();
      buzz2.type = 'triangle';
      buzz2.frequency.setValueAtTime(155, now + 0.08);
      buzz2.frequency.exponentialRampToValueAtTime(70, now + 0.27);
      buzzGain2.gain.setValueAtTime(0.25, now + 0.08);
      buzzGain2.gain.exponentialRampToValueAtTime(0.001, now + 0.27);
      buzz2.connect(buzzGain2);
      buzzGain2.connect(this.ctx.destination);
      buzz2.start(now + 0.08);
      buzz2.stop(now + 0.28);
    } catch(e) {}
  }

  hint() {
    this.init();
    this.playTone(440, 'sine', 0.1, 0.0, 0.15);
    this.playTone(880, 'sine', 0.25, 0.08, 0.15);
  }

  fanfare() {
    this.init();
    const melody = [523, 659, 784, 1046];
    melody.forEach((f, i) => {
      this.playTone(f, 'triangle', 0.3, i * 0.12, 0.2);
    });
  }
}

const sfx = new SoundFX();

// ==========================================================================
// Confetti Animation Engine
// ==========================================================================
class ConfettiEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.running = false;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  fire(count = 80) {
    const colors = ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6', '#EF4444'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: this.canvas.height / 2 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 12 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        life: 1.0,
        decay: Math.random() * 0.015 + 0.01
      });
    }
    if (!this.running) {
      this.running = true;
      this.loop();
    }
  }

  loop() {
    if (!this.running) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.28; // gravity
      p.rotation += p.vRot;
      p.life -= p.decay;

      if (p.life <= 0 || p.y > this.canvas.height) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = Math.max(0, p.life);
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.loop());
    } else {
      this.running = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// ==========================================================================
// Game Controller State
// ==========================================================================
class GameApp {
  constructor() {
    this.currentLevelIdx = 0;
    this.mode = 'casual'; // 'casual' | 'challenge'
    this.hintsLeft = 3;
    this.timerSeconds = 60;
    this.timerInterval = null;
    this.lives = 3;
    this.levelStartTime = Date.now();
    this.isLevelFinished = false;

    // Load saved progress from LocalStorage
    this.savedData = this.loadStorage();

    this.confetti = new ConfettiEngine('confetti-canvas');
    this.initDOM();
    this.bindEvents();
    this.loadLevel(this.currentLevelIdx);
    this.updateStatsUI();
  }

  loadStorage() {
    try {
      const raw = localStorage.getItem('spot_diff_save');
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      unlockedLevel: 0, // 0-indexed (Level 1)
      stars: Array(LEVELS.length).fill(0),
      totalScore: 0
    };
  }

  saveStorage() {
    try {
      localStorage.setItem('spot_diff_save', JSON.stringify(this.savedData));
    } catch (e) {}
  }

  initDOM() {
    this.dom = {
      cardImage: document.getElementById('card-image'),
      imageWrapper: document.getElementById('image-wrapper'),
      cardStage: document.getElementById('card-stage'),
      levelNumTag: document.getElementById('level-number-tag'),
      levelTitle: document.getElementById('level-title-display'),
      markerTop: document.getElementById('marker-top'),
      markerBot: document.getElementById('marker-bot'),
      hintTop: document.getElementById('hint-indicator-top'),
      hintBot: document.getElementById('hint-indicator-bot'),
      hintBox: document.getElementById('hint-box'),
      hintText: document.getElementById('hint-text'),
      hintCount: document.getElementById('hint-count'),
      btnCloseHint: document.getElementById('btn-close-hint'),
      btnHint: document.getElementById('btn-hint'),
      modeBadge: document.getElementById('mode-badge'),
      btnSwitchMode: document.getElementById('btn-switch-mode'),
      totalStars: document.getElementById('total-stars'),
      timerContainer: document.getElementById('timer-container'),
      timerDisplay: document.getElementById('timer-display'),
      livesContainer: document.getElementById('lives-container'),
      livesDisplay: document.getElementById('lives-display'),
      btnSound: document.getElementById('btn-sound'),
      btnLevels: document.getElementById('btn-levels'),
      btnHelp: document.getElementById('btn-help'),
      btnHome: document.getElementById('btn-home'),
      btnPrevLevel: document.getElementById('btn-prev-level'),
      btnNextLevel: document.getElementById('btn-next-level'),
      clickLayer: document.getElementById('click-feedback-layer'),
      // Modals
      modalSuccess: document.getElementById('modal-success'),
      modalGameOver: document.getElementById('modal-gameover'),
      modalLevels: document.getElementById('modal-levels'),
      modalHelp: document.getElementById('modal-help'),
      modalCert: document.getElementById('modal-certificate'),
      levelsGrid: document.getElementById('levels-grid'),
      summaryTime: document.getElementById('summary-time'),
      summaryScore: document.getElementById('summary-score'),
      modalStars: document.getElementById('modal-stars'),
      btnReplay: document.getElementById('btn-replay'),
      btnNext: document.getElementById('btn-next'),
      btnRetry: document.getElementById('btn-retry'),
      btnCloseLevels: document.getElementById('btn-close-levels'),
      btnCloseHelp: document.getElementById('btn-close-help'),
      btnGotIt: document.getElementById('btn-got-it'),
      certCanvas: document.getElementById('cert-canvas'),
      playerNameInput: document.getElementById('player-name-input'),
      btnRenderCert: document.getElementById('btn-render-cert'),
      btnDownloadCert: document.getElementById('btn-download-cert'),
      btnCloseCert: document.getElementById('btn-close-cert')
    };
  }

  bindEvents() {
    // Click on Card Image
    this.dom.imageWrapper.addEventListener('click', (e) => this.handleCardClick(e));

    // Nav buttons
    this.dom.btnPrevLevel.addEventListener('click', () => {
      if (this.currentLevelIdx > 0) this.loadLevel(this.currentLevelIdx - 1);
    });
    this.dom.btnNextLevel.addEventListener('click', () => {
      if (this.currentLevelIdx < LEVELS.length - 1) this.loadLevel(this.currentLevelIdx + 1);
    });

    // Hint
    this.dom.btnHint.addEventListener('click', () => this.useHint());
    this.dom.btnCloseHint.addEventListener('click', () => {
      this.dom.hintBox.style.display = 'none';
    });

    // Mode Toggle
    this.dom.btnSwitchMode.addEventListener('click', () => this.toggleMode());

    // Sound Toggle
    this.dom.btnSound.addEventListener('click', () => {
      sfx.enabled = !sfx.enabled;
      this.dom.btnSound.textContent = sfx.enabled ? '🔊' : '🔇';
    });

    // Modal Triggers
    this.dom.btnLevels.addEventListener('click', () => this.openLevelsModal());
    this.dom.btnCloseLevels.addEventListener('click', () => this.dom.modalLevels.style.display = 'none');
    this.dom.btnHelp.addEventListener('click', () => this.dom.modalHelp.style.display = 'flex');
    this.dom.btnCloseHelp.addEventListener('click', () => this.dom.modalHelp.style.display = 'none');
    this.dom.btnGotIt.addEventListener('click', () => this.dom.modalHelp.style.display = 'none');
    if (this.dom.btnHome) {
      this.dom.btnHome.addEventListener('click', () => this.openLevelsModal());
    }

    // Modal Actions
    this.dom.btnReplay.addEventListener('click', () => {
      this.dom.modalSuccess.style.display = 'none';
      this.loadLevel(this.currentLevelIdx);
    });
    this.dom.btnNext.addEventListener('click', () => {
      this.dom.modalSuccess.style.display = 'none';
      if (this.currentLevelIdx < LEVELS.length - 1) {
        this.loadLevel(this.currentLevelIdx + 1);
      } else {
        this.openCertificateModal();
      }
    });
    this.dom.btnRetry.addEventListener('click', () => {
      this.dom.modalGameOver.style.display = 'none';
      this.loadLevel(this.currentLevelIdx);
    });

    // Certificate
    this.dom.btnRenderCert.addEventListener('click', () => this.renderCertificate());
    this.dom.btnDownloadCert.addEventListener('click', () => this.downloadCertificate());
    this.dom.btnCloseCert.addEventListener('click', () => this.dom.modalCert.style.display = 'none');
  }

  loadLevel(idx) {
    clearInterval(this.timerInterval);
    this.currentLevelIdx = idx;
    this.isLevelFinished = false;
    const lvl = LEVELS[idx];

    // Reset Markers & Hint Box
    this.dom.markerTop.style.display = 'none';
    this.dom.markerBot.style.display = 'none';
    this.dom.hintTop.style.display = 'none';
    this.dom.hintBot.style.display = 'none';
    this.dom.hintBox.style.display = 'none';

    // Position Markers
    this.dom.markerTop.style.left = `${lvl.pct_x}%`;
    this.dom.markerTop.style.top = `${lvl.pct_y_top}%`;
    this.dom.markerBot.style.left = `${lvl.pct_x}%`;
    this.dom.markerBot.style.top = `${lvl.pct_y_bot}%`;

    this.dom.hintTop.style.left = `${lvl.pct_x}%`;
    this.dom.hintTop.style.top = `${lvl.pct_y_top}%`;
    this.dom.hintBot.style.left = `${lvl.pct_x}%`;
    this.dom.hintBot.style.top = `${lvl.pct_y_bot}%`;

    // Set Text & Image
    this.dom.levelNumTag.textContent = `ด่านที่ ${idx + 1} จาก ${LEVELS.length}`;
    this.dom.levelTitle.textContent = lvl.title;
    this.dom.cardImage.src = lvl.image;

    // Nav Arrows state
    this.dom.btnPrevLevel.disabled = (idx === 0);
    this.dom.btnNextLevel.disabled = (idx >= LEVELS.length - 1);

    // Reset Hints
    this.hintsLeft = (this.mode === 'casual') ? 5 : 2;
    this.dom.hintCount.textContent = this.hintsLeft;
    this.dom.btnHint.disabled = false;

    // Reset Timers & Lives
    this.levelStartTime = Date.now();
    if (this.mode === 'challenge') {
      this.timerSeconds = 60;
      this.lives = 3;
      this.updateLivesUI();
      this.startTimer();
    }
  }

  startTimer() {
    this.updateTimerDisplay();
    this.timerInterval = setInterval(() => {
      this.timerSeconds--;
      this.updateTimerDisplay();

      if (this.timerSeconds <= 0) {
        clearInterval(this.timerInterval);
        this.triggerGameOver();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    this.dom.timerDisplay.textContent = `${this.timerSeconds}s`;
    if (this.timerSeconds <= 10) {
      this.dom.timerContainer.classList.add('urgent');
    } else {
      this.dom.timerContainer.classList.remove('urgent');
    }
  }

  updateLivesUI() {
    let hearts = '';
    for (let i = 0; i < 3; i++) {
      hearts += (i < this.lives) ? '❤️' : '🖤';
    }
    this.dom.livesDisplay.textContent = hearts;
  }

  toggleMode() {
    if (this.mode === 'casual') {
      this.mode = 'challenge';
      this.dom.modeBadge.textContent = 'โหมดท้าทาย (Challenge)';
      this.dom.modeBadge.style.background = '#FEE2E2';
      this.dom.modeBadge.style.color = '#DC2626';
      this.dom.btnSwitchMode.innerHTML = '<span class="btn-emoji">🌱</span><span class="btn-text">โหมดฝึกหัด</span>';
      this.dom.timerContainer.style.display = 'flex';
      this.dom.livesContainer.style.display = 'flex';
    } else {
      this.mode = 'casual';
      this.dom.modeBadge.textContent = 'โหมดฝึกหัด (Casual)';
      this.dom.modeBadge.style.background = '#E0E7FF';
      this.dom.modeBadge.style.color = '#4F46E5';
      this.dom.btnSwitchMode.innerHTML = '<span class="btn-emoji">⚡</span><span class="btn-text">โหมดท้าทาย</span>';
      this.dom.timerContainer.style.display = 'none';
      this.dom.livesContainer.style.display = 'none';
    }
    this.loadLevel(this.currentLevelIdx);
  }

  handleCardClick(e) {
    if (this.isLevelFinished) return;

    const rect = this.dom.cardImage.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    const lvl = LEVELS[this.currentLevelIdx];
    const aspect = rect.height / rect.width; // account for vertical elongation

    // Calculate distance to Top Target and Bottom Target
    const distTop = Math.hypot(clickX - lvl.pct_x, (clickY - lvl.pct_y_top) / aspect);
    const distBot = Math.hypot(clickX - lvl.pct_x, (clickY - lvl.pct_y_bot) / aspect);

    // Generous touch tolerance (adaptive per level)
    const tolerance = lvl.radius || 6.5;

    if (distTop <= tolerance || distBot <= tolerance) {
      // SUCCESS!
      this.onDifferenceFound();
    } else {
      // MISS!
      this.onWrongClick(clickX, clickY);
    }
  }

  onDifferenceFound() {
    this.isLevelFinished = true;
    clearInterval(this.timerInterval);

    // Sound
    sfx.correct();

    // Show Markers on Both Halves
    this.dom.markerTop.style.display = 'block';
    this.dom.markerBot.style.display = 'block';

    // Confetti
    this.confetti.fire(70);

    // Calculate Stars & Score
    const elapsedSec = Math.round((Date.now() - this.levelStartTime) / 1000);
    let starsEarned = 3;
    if (this.mode === 'challenge') {
      if (elapsedSec > 35) starsEarned = 1;
      else if (elapsedSec > 20) starsEarned = 2;
    }
    const scoreEarned = starsEarned * 100 + Math.max(0, 60 - elapsedSec) * 5;

    // Update Storage
    if (starsEarned > this.savedData.stars[this.currentLevelIdx]) {
      this.savedData.stars[this.currentLevelIdx] = starsEarned;
    }
    if (this.currentLevelIdx + 1 > this.savedData.unlockedLevel) {
      this.savedData.unlockedLevel = Math.min(LEVELS.length - 1, this.currentLevelIdx + 1);
    }
    this.savedData.totalScore += scoreEarned;
    this.saveStorage();
    this.updateStatsUI();

    // Show Success Modal after short animation delay
    setTimeout(() => {
      this.dom.summaryTime.textContent = `${elapsedSec} วินาที`;
      this.dom.summaryScore.textContent = `+${scoreEarned} แต้ม`;

      let starsHtml = '';
      for (let s = 0; s < 3; s++) {
        starsHtml += `<span class="star-icon ${s < starsEarned ? 'glow' : ''}">${s < starsEarned ? '⭐' : '☆'}</span>`;
      }
      this.dom.modalStars.innerHTML = starsHtml;

      if (this.currentLevelIdx === LEVELS.length - 1) {
        this.dom.btnNext.textContent = '🏆 รับเกียรติบัตร!';
      } else {
        this.dom.btnNext.textContent = 'ด่านต่อไป ➡️';
      }

      this.dom.modalSuccess.style.display = 'flex';
    }, 700);
  }

  onWrongClick(pctX, pctY) {
    sfx.wrong();

    // Visual Feedback (floating cross)
    const feedback = document.createElement('div');
    feedback.className = 'wrong-feedback';
    feedback.textContent = '❌';
    feedback.style.left = `${pctX}%`;
    feedback.style.top = `${pctY}%`;
    this.dom.clickLayer.appendChild(feedback);
    setTimeout(() => feedback.remove(), 600);

    // Shake Stage
    this.dom.cardStage.classList.add('shake-stage');
    setTimeout(() => this.dom.cardStage.classList.remove('shake-stage'), 400);

    // Penalty in Challenge Mode
    if (this.mode === 'challenge') {
      this.lives--;
      this.updateLivesUI();
      if (this.lives <= 0) {
        clearInterval(this.timerInterval);
        this.triggerGameOver();
      }
    }
  }

  useHint() {
    if (this.hintsLeft <= 0 || this.isLevelFinished) return;
    this.hintsLeft--;
    this.dom.hintCount.textContent = this.hintsLeft;
    if (this.hintsLeft === 0) this.dom.btnHint.disabled = true;

    sfx.hint();

    const lvl = LEVELS[this.currentLevelIdx];
    this.dom.hintText.textContent = lvl.hint;
    this.dom.hintBox.style.display = 'flex';

    // Show pulsing hint indicator for 3 seconds
    this.dom.hintTop.style.display = 'block';
    this.dom.hintBot.style.display = 'block';
    setTimeout(() => {
      this.dom.hintTop.style.display = 'none';
      this.dom.hintBot.style.display = 'none';
    }, 3500);
  }

  triggerGameOver() {
    sfx.wrong();
    this.dom.modalGameOver.style.display = 'flex';
  }

  updateStatsUI() {
    const totalStars = this.savedData.stars.reduce((a, b) => a + b, 0);
    this.dom.totalStars.textContent = `${totalStars} / ${LEVELS.length * 3}`;
  }

  openLevelsModal() {
    this.dom.levelsGrid.innerHTML = '';
    LEVELS.forEach((lvl, idx) => {
      const item = document.createElement('div');
      const isLocked = idx > this.savedData.unlockedLevel;
      const isActive = idx === this.currentLevelIdx;
      const starsCount = this.savedData.stars[idx];

      item.className = `level-select-item ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}`;
      item.innerHTML = `
        <span class="item-num">${isLocked ? '🔒' : idx + 1}</span>
        <span class="item-stars">${'⭐'.repeat(starsCount)}${'☆'.repeat(3 - starsCount)}</span>
      `;

      if (!isLocked) {
        item.addEventListener('click', () => {
          this.dom.modalLevels.style.display = 'none';
          this.loadLevel(idx);
        });
      }
      this.dom.levelsGrid.appendChild(item);
    });
    this.dom.modalLevels.style.display = 'flex';
  }

  openCertificateModal() {
    sfx.fanfare();
    this.confetti.fire(120);
    this.dom.modalCert.style.display = 'flex';
    this.renderCertificate();
  }

  renderCertificate() {
    const canvas = this.dom.certCanvas;
    const ctx = canvas.getContext('2d');
    const name = this.dom.playerNameInput.value.trim() || 'ยอดนักสืบสายตาเหยี่ยว';

    // Background Parchment
    ctx.fillStyle = '#FCFBF7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative Borders
    ctx.strokeStyle = '#D4AF37'; // Gold
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.strokeStyle = '#312E81'; // Navy Accent
    ctx.lineWidth = 2;
    ctx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);

    // Header Badge
    ctx.textAlign = 'center';
    ctx.fillStyle = '#312E81';
    ctx.font = 'bold 36px "Mali", cursive, sans-serif';
    ctx.fillText('เกียรติบัตรเชิดชูเกียรติ', canvas.width / 2, 110);

    ctx.fillStyle = '#D97706';
    ctx.font = 'bold 20px "Sarabun", sans-serif';
    ctx.fillText('★ ผู้พิชิตภารกิจเกมจับผิดภาพออนไลน์ ★', canvas.width / 2, 148);

    // Recipient Line
    ctx.fillStyle = '#64748B';
    ctx.font = '16px "Sarabun", sans-serif';
    ctx.fillText('ขอมอบเกียรติบัตรฉบับนี้ให้แก่', canvas.width / 2, 210);

    // Player Name
    ctx.fillStyle = '#1E1B4B';
    ctx.font = 'bold 38px "Sarabun", sans-serif';
    ctx.fillText(name, canvas.width / 2, 270);

    // Underline
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 200, 285);
    ctx.lineTo(canvas.width / 2 + 200, 285);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Achievement Description
    ctx.fillStyle = '#334155';
    ctx.font = '18px "Sarabun", sans-serif';
    ctx.fillText('ที่สามารถใช้ไหวพริบ ความละเอียดรอบคอบ และสายตาอันเฉียบคม', canvas.width / 2, 340);
    ctx.fillText('ค้นหาจุดแตกต่างครบทั้ง 10 ด่าน ได้อย่างยอดเยี่ยมสมบูรณ์แบบ', canvas.width / 2, 372);

    // Author Photo Logo Badge (Crisp & Balanced)
    const badgeX = canvas.width / 2;
    const badgeY = 448;
    const badgeR = 36;

    ctx.save();
    // Outer Gold Halo
    ctx.beginPath();
    ctx.arc(badgeX, badgeY, badgeR + 3, 0, Math.PI * 2);
    ctx.fillStyle = '#F59E0B';
    ctx.fill();

    // Badge Border
    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Inner Circle Mask
    ctx.beginPath();
    ctx.arc(badgeX, badgeY, badgeR, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.clip();

    if (!this.certLogoImg) {
      this.certLogoImg = new Image();
      this.certLogoImg.src = 'assets/images/author-logo.png';
      this.certLogoImg.onload = () => this.renderCertificate();
    }

    if (this.certLogoImg && this.certLogoImg.complete && this.certLogoImg.naturalWidth > 0) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(this.certLogoImg, badgeX - badgeR, badgeY - badgeR, badgeR * 2, badgeR * 2);
    } else {
      ctx.fillStyle = '#F59E0B';
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '24px sans-serif';
      ctx.fillText('🦅', badgeX, badgeY + 8);
    }
    ctx.restore();

    // Date
    const today = new Date().toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    ctx.fillStyle = '#64748B';
    ctx.font = '14px "Sarabun", sans-serif';
    ctx.fillText(`วันที่ ${today}`, canvas.width / 2, 525);
  }

  downloadCertificate() {
    const link = document.createElement('a');
    link.download = 'ใบประกาศนียบัตรยอดนักสืบ.png';
    link.href = this.dom.certCanvas.toDataURL('image/png');
    link.click();
  }
}

// Start the game when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  new GameApp();
});
