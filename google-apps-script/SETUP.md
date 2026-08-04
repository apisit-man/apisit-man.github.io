# ตั้งค่าระบบบันทึกค่าใช้จ่าย

ระบบหน้าเว็บจะยังไม่รับส่งข้อมูลจนกว่าจะตั้งค่า Google Apps Script ตามขั้นตอนนี้

1. สร้าง Google Sheet สำหรับข้อมูลค่าใช้จ่าย หรือเปิดชีตที่ต้องการใช้
2. เปิด **ส่วนขยาย → Apps Script**
3. นำเนื้อหาใน `Code.gs` ไปแทนโค้ดเดิม
4. เปิด **Project Settings → Script Properties** และเพิ่ม:
   - `ADMIN_PIN` — รหัสผ่านที่ต้องการใช้ ควรยาวและเดายาก
   - `SPREADSHEET_ID` — ID ของ Google Sheet ที่ใช้เก็บข้อมูล ต้องตั้งเป็น Script Property เพื่อไม่เปิดเผย ID ใน GitHub
5. เรียกฟังก์ชัน `setupExpenseSheets` หนึ่งครั้ง และอนุญาตสิทธิ์ Google Sheets/Drive
6. เลือก **Deploy → New deployment → Web app**
7. ตั้ง **Execute as: Me** และ **Who has access: Anyone** เพื่อให้หน้า GitHub Pages เรียกใช้งานได้ การอ่านและเขียนข้อมูลทุกคำสั่งยังต้องผ่าน PIN/token ที่ตรวจใน Apps Script
8. Web App ปัจจุบันถูกเชื่อมไว้ใน `assets/js/admin-config.js` แล้ว หากมีการสร้าง deployment ใหม่แทนการอัปเดต deployment เดิม จึงค่อยเปลี่ยน URL ในไฟล์นี้

เมื่อมีการแก้ `Code.gs` ภายหลัง ให้สร้าง version ใหม่ใน deployment เดิม เพื่อให้ URL เดิมยังใช้งานต่อได้

ระบบจะยกเลิก session เมื่อไม่มีการใช้งาน 30 นาที หรือเมื่อครบ 6 ชั่วโมงนับจากการเข้าสู่ระบบ และปุ่มออกจากระบบจะเพิกถอน session ฝั่ง Apps Script ด้วย

ข้อมูลจะถูกสร้างในสองแท็บ:

- `CarExpenses`
- `PersonalExpenses`

ใบเสร็จจะถูกเก็บในโฟลเดอร์ `Expense Receipts` บน Google Drive และไม่ได้ตั้งค่าให้เป็นไฟล์สาธารณะ

## ข้อมูลค่ารถเดิม

ระบบใหม่นี้ไม่ลบหรือเขียนทับชีตเดิม แต่จะใช้แท็บ `CarExpenses` ใหม่ หากต้องการนำประวัติเดิมมาแสดงในหน้าเว็บ ให้คัดลอกข้อมูลเดิมมาเรียงตามหัวตารางใน `CarExpenses` หลังจากเรียก `setupExpenseSheets` แล้ว
