const CATEGORIES = {
  bedroom: { name: "ห้องนอน", icon: "🛏️", speak: "ห้องนอน" },
  kitchen: { name: "ห้องครัว", icon: "🍳", speak: "ห้องครัว" },
  bathroom: { name: "ห้องน้ำ", icon: "🛁", speak: "ห้องน้ำ" },
  classroom: { name: "ห้องเรียน", icon: "📚", speak: "ห้องเรียน" },
  livingroom: { name: "ห้องนั่งเล่น", icon: "🛋️", speak: "ห้องนั่งเล่น" }
};

const GAME_ITEMS = [
  { id: "bed", word: "เตียง", emoji: "🛏️", category: "bedroom", hint: "ใช้สำหรับนอนพักผ่อน" },
  { id: "pillow", word: "หมอน", emoji: "🛌", category: "bedroom", hint: "ใช้หนุนศีรษะเวลานอน" },
  { id: "blanket", word: "ผ้าห่ม", emoji: "🧣", category: "bedroom", hint: "ใช้ห่มให้ร่างกายอบอุ่น" },
  { id: "teddy", word: "ตุ๊กตา", emoji: "🧸", category: "bedroom", hint: "ของเล่นที่มักวางไว้ใกล้ที่นอน" },
  { id: "wardrobe", word: "ตู้เสื้อผ้า", emoji: "👚", category: "bedroom", hint: "ใช้เก็บเสื้อผ้า" },
  { id: "lamp", word: "โคมไฟ", emoji: "🛋️", category: "bedroom", hint: "ให้แสงสว่างข้างเตียง" },

  { id: "spoon", word: "ช้อน", emoji: "🥄", category: "kitchen", hint: "ใช้ตักอาหาร" },
  { id: "plate", word: "จาน", emoji: "🍽️", category: "kitchen", hint: "ใช้ใส่อาหาร" },
  { id: "pot", word: "หม้อ", emoji: "🍲", category: "kitchen", hint: "ใช้ปรุงอาหาร" },
  { id: "pan", word: "กระทะ", emoji: "🍳", category: "kitchen", hint: "ใช้ทอดหรือผัดอาหาร" },
  { id: "fridge", word: "ตู้เย็น", emoji: "🧊", category: "kitchen", hint: "ใช้เก็บอาหารให้เย็น" },
  { id: "cup", word: "แก้วน้ำ", emoji: "🥛", category: "kitchen", hint: "ใช้ใส่น้ำดื่ม" },

  { id: "soap", word: "สบู่", emoji: "🧼", category: "bathroom", hint: "ใช้ล้างมือและทำความสะอาดร่างกาย" },
  { id: "toothbrush", word: "แปรงสีฟัน", emoji: "🪥", category: "bathroom", hint: "ใช้แปรงฟัน" },
  { id: "toothpaste", word: "ยาสีฟัน", emoji: "🦷", category: "bathroom", hint: "ใช้กับแปรงสีฟัน" },
  { id: "towel", word: "ผ้าเช็ดตัว", emoji: "🧖", category: "bathroom", hint: "ใช้เช็ดตัวหลังอาบน้ำ" },
  { id: "shower", word: "ฝักบัว", emoji: "🚿", category: "bathroom", hint: "ใช้เปิดน้ำสำหรับอาบน้ำ" },
  { id: "sink", word: "อ่างล้างหน้า", emoji: "🚰", category: "bathroom", hint: "ใช้ล้างมือและล้างหน้า" },

  { id: "pencil", word: "ดินสอ", emoji: "✏️", category: "classroom", hint: "ใช้เขียนหรือวาดรูป" },
  { id: "notebook", word: "สมุด", emoji: "📒", category: "classroom", hint: "ใช้เขียนงานและทำกิจกรรม" },
  { id: "book", word: "หนังสือ", emoji: "📖", category: "classroom", hint: "ใช้สำหรับอ่านและเรียนรู้" },
  { id: "crayon", word: "สีเทียน", emoji: "🖍️", category: "classroom", hint: "ใช้ระบายสี" },
  { id: "board", word: "กระดาน", emoji: "🧑‍🏫", category: "classroom", hint: "ครูใช้เขียนหน้าห้อง" },
  { id: "schoolbag", word: "กระเป๋านักเรียน", emoji: "🎒", category: "classroom", hint: "ใช้ใส่หนังสือและอุปกรณ์เรียน" },

  { id: "tv", word: "ทีวี", emoji: "📺", category: "livingroom", hint: "ใช้ดูการ์ตูนหรือรายการต่างๆ" },
  { id: "sofa", word: "โซฟา", emoji: "🛋️", category: "livingroom", hint: "เก้าอี้นุ่มๆ สำหรับนั่งพักผ่อน" },
  { id: "clock", word: "นาฬิกา", emoji: "🕰️", category: "livingroom", hint: "ใช้สำหรับดูเวลา" },
  { id: "plant", word: "ต้นไม้ประดับ", emoji: "🪴", category: "livingroom", hint: "ปลูกไว้ในบ้านให้สวยงาม" },
  { id: "radio", word: "วิทยุ", emoji: "📻", category: "livingroom", hint: "ใช้เปิดฟังเพลงหรือข่าว" },
  { id: "remote", word: "รีโมท", emoji: "📱", category: "livingroom", hint: "ใช้เปลี่ยนช่องทีวี" }
];
