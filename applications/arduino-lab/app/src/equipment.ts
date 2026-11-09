import type { Locale } from './types';

export interface EquipmentPinSpec {
  name: string;
  badgeColor: string;
  desc: { th: string; en: string };
}

export interface EquipmentSpec {
  id: string;
  icon: string;
  name: { th: string; en: string };
  category: { th: string; en: string };
  packageType: { th: string; en: string };
  ratings: { th: string; en: string };
  pins: EquipmentPinSpec[];
  principle: { th: string; en: string };
  labTip: { th: string; en: string };
  focusPoint: [number, number, number];
}

export const EQUIPMENT_CATALOG: Record<string, EquipmentSpec> = {
  uno: {
    id: 'uno',
    icon: '🎛️',
    name: {
      th: 'บอร์ดไมโครคอนโทรลเลอร์ Arduino Uno R3',
      en: 'Arduino Uno R3 Microcontroller Board',
    },
    category: { th: 'หน่วยประมวลผลและควบคุมหลัก', en: 'Core Microcontroller Unit (MCU)' },
    packageType: { th: 'ATmega328P-PU (DIP-28 Socket) บน PCB มาตรฐาน Uno', en: 'ATmega328P-PU (DIP-28 Socket) on Uno Form-Factor PCB' },
    ratings: {
      th: 'แรงดันลอจิก 5V | กระแสต่อพิน ≤ 20 mA (สูงสุด 40 mA) | ADC 10-bit (0–1023) | PWM 8-bit (0–255) | Clock 16 MHz',
      en: '5V Logic | ≤ 20 mA per I/O pin (40 mA abs max) | 10-bit ADC (0–1023) | 8-bit PWM (0–255) | 16 MHz Clock',
    },
    pins: [
      {
        name: 'D0–D13 (DIGITAL)',
        badgeColor: '#0284c7',
        desc: {
          th: 'พินดิจิทัลรับ/ส่งลอจิก HIGH (5V) หรือ LOW (0V) โดยพินที่มีเครื่องหมาย ~ (D3, D5, D6, D9, D10, D11) รองรับสัญญาณ PWM 8-bit',
          en: 'Digital I/O pins (HIGH=5V, LOW=0V). Pins marked with ~ (D3, D5, D6, D9, D10, D11) support 8-bit hardware PWM.',
        },
      },
      {
        name: 'A0–A5 (ANALOG IN)',
        badgeColor: '#7c3aed',
        desc: {
          th: 'พินอ่านแรงดันแอนะล็อก 0–5V เข้าสู่วงจร ADC 10 บิต แปลงเป็นค่าตัวเลข 0–1023 (A4=SDA, A5=SCL สำหรับบัส I2C)',
          en: 'Analog inputs connected to a 10-bit Successive Approximation ADC (0–5V → 0–1023). A4=SDA and A5=SCL also serve I2C.',
        },
      },
      {
        name: '5V / 3.3V / VIN',
        badgeColor: '#dc2626',
        desc: {
          th: 'ขั้วจ่ายไฟเลี้ยงวงจรเซนเซอร์ขนาดเล็ก (5V จากพอร์ต USB หรือเรกูเลเตอร์บนบอร์ด)',
          en: 'Regulated power rails for low-power sensors and logic IC modules.',
        },
      },
      {
        name: 'GND (3 จุดบนบอร์ด)',
        badgeColor: '#475569',
        desc: {
          th: 'กราวด์อ้างอิง 0V ร่วมของระบบ ทุกวงจรและแหล่งจ่ายภายนอกต้องต่อถึงกัน',
          en: '0V Common Reference Ground. All external supplies and sub-circuits must share GND.',
        },
      },
    ],
    principle: {
      th: 'ชิป ATmega328P ทำงานตามรอบคำสั่ง (fetch-execute) ที่ความถี่ 16 ล้านรอบต่อวินาที อ่านสถานะแรงดันที่พินอินพุต ประมวลผลด้วยโค้ดในฟังก์ชัน setup() และ loop() แล้วสั่งเปลี่ยนสถานะพินเอาต์พุตหรือส่งข้อมูลออกทางพอร์ต USB Serial',
      en: 'The ATmega328P executes compiled C++ instructions at 16 MHz, sampling input voltages via GPIO/ADC registers and driving output latches or hardware timers for PWM and Serial UART.',
    },
    labTip: {
      th: 'ห้ามนำพินดิจิทัลไปขับโหลดกระแสสูง (เช่น มอเตอร์) โดยตรง และห้ามต่อขา 5V เข้ากับ GND โดยไม่มีภาระโหลดเด็ดขาดเพราะจะเกิดการลัดวงจร',
      en: 'Never drive inductive/high-current loads directly from an I/O pin, and never short the 5V pin directly to GND.',
    },
    focusPoint: [-3.8, 0.4, 0],
  },

  breadboard: {
    id: 'breadboard',
    icon: '📋',
    name: {
      th: 'โพรโทบอร์ดแบบไม่ต้องบัดกรี (Half-Size Breadboard)',
      en: 'Solderless Prototyping Breadboard (400 Tie-Points)',
    },
    category: { th: 'ฐานต่อวงจรทดลอง', en: 'Prototyping Interconnect' },
    packageType: { th: 'ABS พลาสติกพร้อมคลิปสปริงนิกเกิลฟอสเฟอร์บรอนซ์ด้านใน ระยะห่างรู 2.54 mm (0.1")', en: 'ABS housing with internal phosphor-bronze spring clips, 2.54 mm (0.1") pitch' },
    ratings: {
      th: 'รองรับแรงดันต่ำ (< 36V) | กระแสแนะนำ ≤ 1A | ขนาดสายไฟที่เหมาะสม 22–24 AWG',
      en: 'Low-voltage prototyping (< 36V) | ≤ 1A continuous | Accepts 22–24 AWG solid-core leads',
    },
    pins: [
      {
        name: 'แถวส่งไฟ + (เส้นสีแดง)',
        badgeColor: '#dc2626',
        desc: {
          th: 'รางจ่ายไฟบวก (Power Bus) เชื่อมถึงกันตามแนวยาวตลอดทั้งแถบ',
          en: 'Positive supply rail connected continuously along the outer length.',
        },
      },
      {
        name: 'แถวกราวด์ - (เส้นสีน้ำเงิน)',
        badgeColor: '#2563eb',
        desc: {
          th: 'รางกราวด์ 0V (Ground Bus) เชื่อมถึงกันตามแนวยาวตลอดทั้งแถบ',
          en: '0V Ground bus rail connected continuously along the outer length.',
        },
      },
      {
        name: 'ช่องเสียบ A–E และ F–J',
        badgeColor: '#059669',
        desc: {
          th: 'ในแถวตัวเลขเดียวกัน รู A-B-C-D-E เชื่อมถึงกัน 5 รู และ F-G-H-I-J เชื่อมถึงกันอีก 5 รู โดยถูกคั่นกลางด้วยร่องเว้า (Center Trench)',
          en: 'Terminal strips: holes A–E are common within each numbered row, isolated from F–J by the 7.62 mm center DIP trench.',
        },
      },
    ],
    principle: {
      th: 'ภายในแต่ละแถวมีแผ่นโลหะสปริงหนีบขาอุปกรณ์ไว้ด้วยกัน ทำให้ต่อวงจรและปรับเปลี่ยนได้ทันทีโดยไม่ต้องใช้หัวแร้งบัดกรี ร่องตรงกลางออกแบบมาให้เสียบไอซีหรือปุ่มกด 4 ขาคร่อมสองฝั่งเพื่อไม่ให้ขาด้านซ้ายและขวาช็อตถึงกัน',
      en: 'Internal spring clips grip component leads in 5-hole terminal groups, while the center ravine prevents DIP packages and tactile switches from shorting across opposite pins.',
    },
    labTip: {
      th: 'ระวังการเสียบขาทั้งสองของตัวต้านทานหรือ LED ลงในแถวตัวเลขฝั่งเดียวกัน เพราะคลิปโลหะด้านล่างจะเชื่อมขาทั้งสองเข้าหากันจนลัดวงจร',
      en: 'Do not plug both leads of a resistor or LED into the same 5-hole row—they will be shorted together by the underlying metal clip.',
    },
    focusPoint: [4.2, 0.3, 0],
  },

  led: {
    id: 'led',
    icon: '💡',
    name: {
      th: 'ไดโอดเปล่งแสง (5mm Diffused LED)',
      en: '5mm Light-Emitting Diode (LED)',
    },
    category: { th: 'อุปกรณ์แสดงผลเชิงแสง (Output)', en: 'Optoelectronic Indicator' },
    packageType: { th: 'เลนส์อีพ็อกซีขนาด 5 มม. ขาทะลุรู (Through-Hole)', en: '5mm T-1¾ Radial Epoxy Dome' },
    ratings: {
      th: 'แรงดันตกคร่อมเดินหน้า (Vf) ≈ 1.8–2.2V (สีแดง/เหลือง), 3.0–3.2V (สีน้ำเงิน/ขาว) | กระแสใช้งานแนะนำ 10–20 mA',
      en: 'Forward Voltage (Vf) ≈ 1.8–2.2V (Red/Amber), 3.0–3.2V (Blue/White) | Recommended If = 10–20 mA',
    },
    pins: [
      {
        name: 'Anode (+) ขายาว',
        badgeColor: '#ef4444',
        desc: {
          th: 'ขั้วบวก (แกนโลหะด้านในโคมมีขนาดเล็กกว่า) ต่อรับไฟบวกผ่านตัวต้านทานจำกัดกระแส',
          en: 'Positive Anode (longer lead, smaller internal post). Connects to the signal pin via a series resistor.',
        },
      },
      {
        name: 'Cathode (-) ขาสั้น / ขอบปาดเรียบ',
        badgeColor: '#475569',
        desc: {
          th: 'ขั้วลบ (ฐานแอนวิลด้านในใหญ่กว่า และขอบพลาสติกด้านล่างปาดแบน) ต่อลง GND',
          en: 'Negative Cathode (shorter lead, flat rim edge, larger internal anvil cup). Connects to GND.',
        },
      },
    ],
    principle: {
      th: 'เป็นสารกึ่งตัวนำชนิด P-N Junction ที่ยอมให้กระแสไหลผ่านในทิศทางไบอัสตรง (Forward Bias) เท่านั้น เมื่ออิเล็กตรอนรวมตัวกับโฮลจะคายพลังงานออกมาเป็นโฟตอนของแสงสีตามชนิดของสารกึ่งตัวนำ',
      en: 'A P-N junction semiconductor that emits photons via electroluminescence when forward-biased above its threshold voltage Vf.',
    },
    labTip: {
      th: 'ต้องต่ออนุกรมกับตัวต้านทาน (เช่น 220Ω–330Ω) เสมอ หากต่อตรงกับ 5V กระแสจะไหลเกินพิกัดจนหลอดขาดทันที',
      en: 'Always place a current-limiting resistor (e.g., 330 Ω) in series; connecting an LED directly across 5V will destroy the junction.',
    },
    focusPoint: [4.2, 1.0, -1.2],
  },

  resistor: {
    id: 'resistor',
    icon: '〰️',
    name: {
      th: 'ตัวต้านทานคงที่ (Axial Film Resistor 330Ω / 10kΩ)',
      en: 'Fixed Axial Resistor (330 Ω & 10 kΩ)',
    },
    category: { th: 'อุปกรณ์พาสซีฟจำกัดกระแสและแบ่งแรงดัน', en: 'Passive Current Limiter / Voltage Divider' },
    packageType: { th: 'ตัวต้านทานชนิดฟิล์มขนาด 1/4 วัตต์ อ่านค่าด้วยแถบสี 4 แถบ', en: '1/4W Axial Through-Hole with 4 Color Bands' },
    ratings: {
      th: '330 Ω (ส้ม-ส้ม-น้ำตาล-ทอง) จำกัดกระแส LED ≈ 9 mA | 10 kΩ (น้ำตาล-ดำ-ส้ม-ทอง) สำหรับวงจรแบ่งแรงดันเซนเซอร์',
      en: '330 Ω (Orange-Orange-Brown-Gold) limits LED current | 10 kΩ (Brown-Black-Orange-Gold) forms analog voltage dividers',
    },
    pins: [
      {
        name: 'Terminal 1 & 2 (ไม่มีขั้ว)',
        badgeColor: '#d97706',
        desc: {
          th: 'ตัวต้านทานไม่มีขั้วบวกหรือลบ สามารถเสียบสลับทิศทางได้โดยให้ผลทางไฟฟ้าเหมือนเดิมทุกประการ',
          en: 'Non-polarized component—can be inserted in either orientation with identical electrical behavior.',
        },
      },
    ],
    principle: {
      th: 'ทำหน้าที่ต้านทานการไหลของกระแสไฟฟ้าตามกฎของโอห์ม (V = I × R) ใช้จำกัดกระแสไม่ให้ทำลาย LED หรือใช้คู่กับเซนเซอร์ต้านทานแปรค่า (เช่น LDR, FSR) เพื่อแปลงการเปลี่ยนความต้านทานให้เป็นแรงดันที่ขา A0 อ่านได้',
      en: 'Governs current and voltage drops according to Ohm’s Law (V = I × R), protecting LEDs or forming a reference leg in sensor voltage dividers.',
    },
    labTip: {
      th: 'สังเกตแถบสีให้แม่นยำ: 330Ω คือ ส้ม-ส้ม-น้ำตาล ส่วน 10kΩ คือ น้ำตาล-ดำ-ส้ม หากใส่ 10kΩ แทน 330Ω ไฟ LED จะติดหรี่มากจนแทบมองไม่เห็น',
      en: 'Check color bands carefully: 330 Ω is Orange-Orange-Brown, while 10 kΩ is Brown-Black-Orange. Using 10 kΩ on an LED makes it extremely dim.',
    },
    focusPoint: [4.2, 0.6, 0.2],
  },

  button: {
    id: 'button',
    icon: '🔘',
    name: {
      th: 'ปุ่มกดไมโครสวิตช์ 4 ขา (Tactile Push Button 6×6mm)',
      en: '6×6mm Momentary Tactile Push Button Switch',
    },
    category: { th: 'อุปกรณ์รับค่าดิจิทัล (Digital Input)', en: 'Momentary Digital Switch' },
    packageType: { th: 'สวิตช์ปุ่มกดติด-ปล่อยดับแบบ 4 ขา คร่อมร่องกลางโพรโทบอร์ด', en: '4-Pin Through-Hole SPST-NO Tactile Switch' },
    ratings: {
      th: '12V DC / 50 mA | เวลาการเด้งของหน้าสัมผัส (Contact Bounce) ≈ 5–25 ms',
      en: '12V DC / 50 mA | Typical mechanical contact bounce ≈ 5–25 ms',
    },
    pins: [
      {
        name: 'Side A (ขาคู่ฝั่งหนึ่ง → D2)',
        badgeColor: '#0284c7',
        desc: {
          th: 'ต่อเข้ากับพินดิจิทัลที่เปิดโหมด INPUT_PULLUP (มีตัวต้านทานดึงขึ้น 5V ภายในชิปประมาณ 20kΩ–50kΩ)',
          en: 'Connected to digital input configured with internal INPUT_PULLUP (~20–50 kΩ to 5V).',
        },
      },
      {
        name: 'Side B (ขาคู่อีกฝั่ง → GND)',
        badgeColor: '#475569',
        desc: {
          th: 'ต่อลงกราวด์ เมื่อกดปุ่มหน้าสัมผัสจะเชื่อม Side A เข้ากับ GND ทำให้พินอ่านค่าเป็น LOW (Active-Low)',
          en: 'Connected to GND. Pressing bridges A to B, pulling the input pin to logic LOW (0V).',
        },
      },
    ],
    principle: {
      th: 'ใช้โดมโลหะสปริงภายใน เมื่อยังไม่กดวงจรจะเปิด (Open) ตัวต้านทาน Pull-up ภายในชิปจะดึงแรงดันพินไว้ที่ HIGH (1) เมื่อกดปุ่มโดมโลหะจะยุบตัวเชื่อมลง GND ทำให้แรงดันตกเป็น LOW (0) พร้อมใช้อัลกอริทึม Debounce กรองสัญญาณกระเพื่อมขณะหน้าสัมผัสกระทบกัน',
      en: 'An internal snap-dome bridges the switch contacts when depressed. With INPUT_PULLUP, the pin idles HIGH and drops LOW when pressed, while software debouncing filters mechanical contact chatter.',
    },
    labTip: {
      th: 'เสียบสวิตช์ให้คร่อมร่องกลางของโพรโทบอร์ดเสมอ และเลือกต่อสายจากขาที่อยู่คนละฝั่งกัน (หรือทแยงมุม) เพื่อให้แน่ใจว่าวงจรตัด-ต่อผ่านปุ่มกดจริง',
      en: 'Straddle the breadboard center trench and wire diagonally opposite legs so you never accidentally wire two already-shorted pins.',
    },
    focusPoint: [4.2, 0.7, 1.8],
  },

  potentiometer: {
    id: 'potentiometer',
    icon: '🎛️',
    name: {
      th: 'ตัวต้านทานปรับค่าได้แบบหมุน (10kΩ Rotary Potentiometer)',
      en: '10 kΩ Linear Rotary Potentiometer (B10K)',
    },
    category: { th: 'อุปกรณ์รับค่าแอนะล็อก (Analog Voltage Divider)', en: 'Variable Voltage Divider Input' },
    packageType: { th: 'โพเทนชิโอมิเตอร์แกนหมุนพร้อมหน้าสัมผัสกวาด (Wiper) 3 ขา', en: '3-Terminal Panel/Breadboard Rotary Potentiometer' },
    ratings: {
      th: 'ความต้านทานรวม 10 kΩ เชิงเส้น (Type B) | มุมหมุนประมาณ 270° | แรงดันใช้งาน 0–5V',
      en: '10 kΩ Linear Taper (B10K) | ~270° Mechanical Travel | 0–5V Operating Span',
    },
    pins: [
      {
        name: 'Pin 1 (CCW End → GND หรือ 5V)',
        badgeColor: '#475569',
        desc: {
          th: 'ขั้วปลายด้านหนึ่งของแถบความต้านทาน ต่อกับ GND (0V)',
          en: 'One outer end of the resistive track, connected to GND (0V).',
        },
      },
      {
        name: 'Pin 2 (Wiper ขากลาง → A0)',
        badgeColor: '#7c3aed',
        desc: {
          th: 'หน้าสัมผัสเลื่อน (Wiper) ให้แรงดันแปรผันต่อเนื่องตั้งแต่ 0V ถึง 5V ตามมุมการหมุน',
          en: 'Sliding wiper terminal outputting a continuously variable voltage (0–5V) to analog input A0.',
        },
      },
      {
        name: 'Pin 3 (CW End → 5V)',
        badgeColor: '#dc2626',
        desc: {
          th: 'ขั้วปลายอีกด้านของแถบความต้านทาน ต่อกับไฟเลี้ยง 5V',
          en: 'Opposite outer end of the resistive track, connected to 5V.',
        },
      },
    ],
    principle: {
      th: 'ทำหน้าที่เป็นวงจรแบ่งแรงดันปรับค่าได้ (Variable Voltage Divider) เมื่อหมุนแกน ตำแหน่งของขากลาง (Wiper) จะแบ่งอัตราส่วนความต้านทานสองฝั่ง ทำให้แรงดันที่ขา A0 เปลี่ยนแปลงเชิงเส้นตั้งแต่ 0.00V (ADC=0) จนถึง 5.00V (ADC=1023)',
      en: 'Acts as a ratiometric three-terminal voltage divider. Rotating the shaft moves the wiper along a carbon/cermet resistive element, scaling Vout between 0V and 5V.',
    },
    labTip: {
      th: 'ขาสัญญาณไป A0 ต้องต่อที่ขากลางเสมอ หากต่อสลับเอาขากลางไปเข้า 5V หรือ GND เมื่อหมุนสุดแกนอาจทำให้ 5V ช็อตลง GND โดยตรงได้!',
      en: 'Always connect the center wiper pin to A0. Never wire 5V and GND across the center pin, or turning to the end-stop will short 5V to GND!',
    },
    focusPoint: [4.2, 0.9, -0.8],
  },

  rgb: {
    id: 'rgb',
    icon: '🌈',
    name: {
      th: 'หลอด LED สามสีขั้วลบร่วม (5mm Common-Cathode RGB LED)',
      en: '5mm Common-Cathode RGB LED (4-Pin)',
    },
    category: { th: 'อุปกรณ์แสดงผลผสมแสงสี (PWM Color Output)', en: '3-Channel Additive Color Emitter' },
    packageType: { th: 'หลอดใส 5 มม. ภายในบรรจุไดโอด 3 ชิป (Red, Green, Blue) มี 4 ขา', en: '5mm 4-Lead Package containing Red, Green, and Blue semiconductor dies' },
    ratings: {
      th: 'แยกควบคุม PWM 3 ช่อง (D9=R, D10=G, D11=B) | ใช้ตัวต้านทาน 330 Ω แยกอิสระทั้ง 3 ขา',
      en: '3 Independent PWM Channels (D9=R, D10=G, D11=B) | 3 × 330 Ω individual series resistors',
    },
    pins: [
      {
        name: 'Pin 1: Red Anode (D9 ผ่าน 330Ω)',
        badgeColor: '#ef4444',
        desc: { th: 'ขั้วบวกของชิปแสงสีแดง (Vf ≈ 2.0V)', en: 'Red die anode driven by D9 PWM via a 330 Ω resistor.' },
      },
      {
        name: 'Pin 2: Common Cathode (ขายาวสุด → GND)',
        badgeColor: '#475569',
        desc: { th: 'ขั้วลบร่วมของทั้ง 3 สี ต่อลง GND', en: 'Longest lead: shared Common Cathode connected to GND.' },
      },
      {
        name: 'Pin 3: Green Anode (D10 ผ่าน 330Ω)',
        badgeColor: '#22c55e',
        desc: { th: 'ขั้วบวกของชิปแสงสีเขียว (Vf ≈ 3.1V)', en: 'Green die anode driven by D10 PWM via a 330 Ω resistor.' },
      },
      {
        name: 'Pin 4: Blue Anode (D11 ผ่าน 330Ω)',
        badgeColor: '#3b82f6',
        desc: { th: 'ขั้วบวกของชิปแสงสีน้ำเงิน (Vf ≈ 3.1V)', en: 'Blue die anode driven by D11 PWM via a 330 Ω resistor.' },
      },
    ],
    principle: {
      th: 'อาศัยการผสมแสงแบบบวก (Additive Color Mixing) โดยปรับสัดส่วน Duty Cycle ของ PWM (0–255) ในแต่ละแม่สีแสง เช่น แดง+เขียว ได้แสงสีเหลือง, แดง+น้ำเงิน ได้สีม่วงมาเจนตา และเมื่อเปิดครบทั้งสามสีจะได้แสงโทนขาว',
      en: 'Combines red, green, and blue light additively. Modulating each channel’s PWM duty cycle (0–255) varies perceived hue and brightness.',
    },
    labTip: {
      th: 'ห้ามใช้ตัวต้านทานเพียงตัวเดียวต่อที่ขา Common Cathode ร่วมกัน เพราะชิปสีแดงมีแรงดันตกคร่อมต่ำกว่าสีเขียวและน้ำเงิน จะแย่งกระแสไปจนสีอื่นไม่ติดหรือสว่างผิดเพี้ยน',
      en: 'Never share a single resistor on the common cathode—because Red has a lower forward voltage (~2.0V) than Green/Blue (~3.1V), Red would hog the current.',
    },
    focusPoint: [4.2, 1.0, 0],
  },

  ldr: {
    id: 'ldr',
    icon: '☀️',
    name: {
      th: 'ตัวต้านทานแปรค่าตามแสง (LDR / Photoresistor GL5528)',
      en: 'CdS Photoresistor / Light-Dependent Resistor (LDR)',
    },
    category: { th: 'เซนเซอร์ตรวจวัดความเข้มแสง (Optical Sensor)', en: 'Photoconductive Analog Sensor' },
    packageType: { th: 'แผ่นเซรามิกเคลือบลายคดเคี้ยวของสารแคดเมียมซัลไฟด์ (CdS) ขนาด 5 มม.', en: '5mm Ceramic Wafer with Serpentine Cadmium-Sulfide (CdS) Track' },
    ratings: {
      th: 'ความต้านทานในที่มืด ≈ 500 kΩ–1 MΩ | ในที่สว่างจ้า ≈ 1 kΩ–10 kΩ | ใช้คู่กับตัวต้านทานคงที่ 10 kΩ',
      en: 'Dark Resistance ≈ 500 kΩ–1 MΩ | Bright Light ≈ 1–10 kΩ | Paired with 10 kΩ pull-down resistor',
    },
    pins: [
      {
        name: 'Lead 1 (ต่อไฟเลี้ยง 5V)',
        badgeColor: '#dc2626',
        desc: { th: 'ขาด้านบนของวงจรแบ่งแรงดัน ต่อรับแรงดัน 5V', en: 'Upper leg of the voltage divider connected to 5V.' },
      },
      {
        name: 'Lead 2 (จุดร่วม A0 & ตัวต้านทาน 10kΩ)',
        badgeColor: '#06b6d4',
        desc: {
          th: 'จุดแบ่งแรงดันส่งเข้าขา A0 และต่อผ่านตัวต้านทาน 10 kΩ ลง GND',
          en: 'Divider node connected to A0 and pulled to GND through a fixed 10 kΩ resistor.',
        },
      },
    ],
    principle: {
      th: 'ปรากฏการณ์โฟโตคอนดักทิวิตี (Photoconductivity): เมื่อโฟตอนของแสงตกกระทบแถบสาร CdS จะกระตุ้นอิเล็กตรอนให้หลุดออกมานำไฟฟ้าได้ดีขึ้น ทำให้ความต้านทานของ LDR ลดลง แรงดันที่จุดแบ่ง A0 จึงสูงขึ้นเมื่อมีแสงสว่างมากขึ้น ($V_{A0} = 5V \\times \\frac{10k\\Omega}{R_{LDR} + 10k\\Omega}$)',
      en: 'Incident photons excite charge carriers in the CdS track, lowering its resistance. With LDR on the high side and 10 kΩ on the low side, brighter light increases the voltage at A0.',
    },
    labTip: {
      th: 'ค่า ADC ที่อ่านได้เป็นสัดส่วนจากวงจรแบ่งแรงดันซึ่งไม่เชิงเส้นกับหน่วยลักซ์ (Lux) จึงเหมาะกับการตั้งเกณฑ์เปรียบเทียบ (Threshold) เพื่อแยกมืด/สว่าง',
      en: 'The ADC reading reflects a non-linear voltage divider ratio rather than calibrated illuminance in lux, making it ideal for threshold switching.',
    },
    focusPoint: [4.2, 0.9, 1.5],
  },

  ultrasonic: {
    id: 'ultrasonic',
    icon: '📡',
    name: {
      th: 'โมดูลวัดระยะทางด้วยคลื่นอัลตราโซนิก (HC-SR04)',
      en: 'HC-SR04 Ultrasonic Distance Sensor Module',
    },
    category: { th: 'เซนเซอร์วัดระยะทางแบบไม่สัมผัส (Time-of-Flight Sonar)', en: 'Non-Contact Acoustic Rangefinder' },
    packageType: { th: 'โมดูล PCB 4 พิน พร้อมกระบอกส่งคลื่น (T) และรับคลื่นสะท้อน (R) ความถี่ 40 kHz', en: '4-Pin PCB Module with Dual 40 kHz Piezoelectric Ultrasonic Transducers (T & R)' },
    ratings: {
      th: 'แรงดัน 5V DC | ช่วงวัดปกติ 2–400 cm | มุมกระจายคลื่น ~15° | ความถี่คลื่นเสียง 40 kHz',
      en: '5V DC Supply | Nominal Range 2–400 cm | ~15° Cone Angle | 40 kHz Ultrasonic Burst',
    },
    pins: [
      {
        name: 'VCC (5V)',
        badgeColor: '#dc2626',
        desc: { th: 'ไฟเลี้ยงวงจรโมดูล 5V', en: '5V DC power supply input.' },
      },
      {
        name: 'Trig (ต่อขา D9)',
        badgeColor: '#0284c7',
        desc: { th: 'ขารับพัลส์คำสั่งเริ่มต้น (ส่ง HIGH นานอย่างน้อย 10 µs เพื่อยิงคลื่น 8 ลูก)', en: 'Trigger input: send a ≥10 µs HIGH pulse to emit an 8-cycle 40 kHz burst.' },
      },
      {
        name: 'Echo (ต่อขา D10)',
        badgeColor: '#06b6d4',
        desc: { th: 'ขาส่งสัญญาณ HIGH ออกมาตามเวลาที่คลื่นเดินทางไป-กลับ (อ่านด้วย pulseIn)', en: 'Echo output: stays HIGH for the round-trip acoustic travel duration (µs).' },
      },
      {
        name: 'GND (0V)',
        badgeColor: '#475569',
        desc: { th: 'กราวด์ร่วมของวงจร', en: 'Common ground.' },
      },
    ],
    principle: {
      th: 'ใช้หลักการ Time-of-Flight (ToF) เมื่อกระตุ้นขา Trig หัวส่ง T จะปล่อยคลื่นเหนือเสียง 40 kHz ออกไปกระทบวัตถุแล้วสะท้อนกลับมาเข้าหัวรับ R เนื่องจากคลื่นต้องเดินทาง "ไปและกลับ" เป็นระยะทาง $2d$ จึงคำนวณระยะทางได้จาก $d = \\frac{t_{\\text{echo}} \\times 0.0343}{2}\\text{ cm}$',
      en: 'Measures round-trip acoustic Time-of-Flight. Because the ultrasonic pulse travels to the target and back (total path = 2d), distance is half the total travel distance: d = (t_echo × 0.0343) / 2 cm.',
    },
    labTip: {
      th: 'เมื่อ pulseIn() คืนค่า 0 แปลว่าหมดเวลารอคลื่นสะท้อน (Timeout / ไม่มีวัตถุในระยะ หรือวัตถุเอียงสะท้อนคลื่นหนี) ต้องจัดการแยกกรณี "ไม่มีข้อมูล" ออกจากระยะ 0 ซม. เสมอ!',
      en: 'A pulseIn() return value of 0 means timeout (no echo received), NOT zero distance! Always handle missing echo data explicitly in code.',
    },
    focusPoint: [3.2, 1.5, 0],
  },

  obstacle: {
    id: 'obstacle',
    icon: '🚧',
    name: {
      th: 'แผ่นเป้าหมายสะท้อนคลื่นเสียง (Acoustic Target Obstacle)',
      en: 'Movable Acoustic Target / Obstacle Surface',
    },
    category: { th: 'วัตถุทดสอบในสภาพแวดล้อม', en: 'Physical Environment Target' },
    packageType: { th: 'แผ่นสะท้อนผิวเรียบตั้งฉากกับแนวแกนคลื่นอัลตราโซนิก', en: 'Flat reflective target plane perpendicular to the sonar beam axis' },
    ratings: {
      th: 'ระยะจำลองปรับได้ 2–200 cm หรือจำลองสภาวะไร้คลื่นสะท้อน (No Echo)',
      en: 'Adjustable target distance 2–200 cm plus simulated No-Echo condition',
    },
    pins: [
      {
        name: 'พื้นผิวสะท้อนคลื่น (Reflective Face)',
        badgeColor: '#f59e0b',
        desc: { th: 'สะท้อนคลื่น 40 kHz กลับไปยังตัวรับ R ของโมดูล HC-SR04', en: 'Reflects the 40 kHz ultrasonic wavefront back toward transducer R.' },
      },
    ],
    principle: {
      th: 'คลื่นเสียงความถี่สูงสะท้อนได้ดีบนพื้นผิวแข็งและเรียบที่ตั้งฉากกับลำคลื่น หากวัตถุอยู่นอกระยะหรือวัสดุดูดซับเสียง (เช่น ผ้าฟองน้ำ) คลื่นสะท้อนจะอ่อนจนเกิดสภาวะ No Echo',
      en: 'Hard, flat surfaces normal to the acoustic cone reflect strong echoes, whereas soft textiles, steep angles, or out-of-range targets cause echo timeout.',
    },
    labTip: {
      th: 'ในการทดลองจริง ควรใช้วัตถุแผ่นเรียบขนาดใหญ่อย่างน้อย 10×10 ซม. ตั้งให้ขนานกับหน้าเซนเซอร์เพื่อให้ได้ค่าเวลา Echo ที่นิ่งและแม่นยำ',
      en: 'In physical labs, use a flat rigid card (≥10×10 cm) held parallel to the sensor face for repeatable echo timing.',
    },
    focusPoint: [6.8, 1.4, 0],
  },

  piezo: {
    id: 'piezo',
    icon: '🔊',
    name: {
      th: 'ลำโพงเพียโซแบบพาสซีฟ (Passive Piezo Buzzer)',
      en: 'Passive Piezoelectric Buzzer Transducer',
    },
    category: { th: 'อุปกรณ์กำเนิดเสียงด้วยความถี่ (Acoustic Output)', en: 'Piezoelectric Audio Transducer' },
    packageType: { th: 'กระบอกพลาสติกสีดำทรงกลม ภายในบรรจุแผ่นเซรามิกเพียโซอิเล็กทริก', en: '12mm Cylindrical Acoustic Cavity with Piezoceramic Diaphragm' },
    ratings: {
      th: 'ขับด้วยคลื่นสี่เหลี่ยมจากคำสั่ง tone() | ช่วงความถี่ที่ได้ยินชัดเจน 100–4,000 Hz',
      en: 'Driven by square-wave frequency via tone() | Audible test range 100–4,000 Hz',
    },
    pins: [
      {
        name: 'Positive (+) → พินสัญญาณ (D8 หรือ D10)',
        badgeColor: '#7c3aed',
        desc: { th: 'ขั้วบวก (มีเครื่องหมาย + บนตัวถัง) รับสัญญาณพัลส์ความถี่จาก Arduino', en: 'Positive terminal (+) receiving the square-wave tone signal.' },
      },
      {
        name: 'Negative (-) → GND',
        badgeColor: '#475569',
        desc: { th: 'ขั้วลบต่อลงกราวด์ร่วม', en: 'Negative terminal connected to GND.' },
      },
    ],
    principle: {
      th: 'แผ่นเซรามิกเพียโซจะโก่งตัวและคลายตัวตามจังหวะการสลับแรงดันไฟฟ้า (Piezoelectric Effect) เมื่อส่งสัญญาณคลื่นสี่เหลี่ยมด้วยคำสั่ง tone(pin, hz) แผ่นไดอะแฟรมจะสั่นอัดอากาศเกิดเป็นเสียงที่มีระดับเสียงสูง-ต่ำ (Pitch) ตามความถี่ Hz',
      en: 'Reverse piezoelectric effect: alternating voltage flexes a ceramic disc at the commanded frequency (Hz), vibrating air to produce musical pitch.',
    },
    labTip: {
      th: 'ต้องใช้เพียโซแบบ "Passive" เท่านั้นจึงจะเปลี่ยนความถี่โน้ตดนตรีได้ (แบบ Active จะมีวงจรกำเนิดความถี่คงที่ในตัว จ่ายไฟแล้วดังเสียงเดียว)',
      en: 'Use a "Passive" buzzer for tone() pitch control; an "Active" buzzer has an internal fixed oscillator and only plays a single fixed beep.',
    },
    focusPoint: [4.2, 0.8, 0.5],
  },

  'dc-motor': {
    id: 'dc-motor',
    icon: '⚙️',
    name: {
      th: 'มอเตอร์กระแสตรงแบบมีแปรงถ่าน (Brushed DC Motor + ใบพัด)',
      en: 'Brushed Permanent-Magnet DC Motor with Rotor Fan',
    },
    category: { th: 'อุปกรณ์ขับเคลื่อนเชิงกล (Electromechanical Actuator)', en: 'Rotary Electromechanical Actuator' },
    packageType: { th: 'ตัวถังเหล็กทรงกระบอกพร้อมแม่เหล็กถาวร ทุ่นอาร์เมเจอร์ และใบพัดแสดงการหมุน', en: 'Cylindrical Metal Can Type-130/140 DC Motor with 3-Blade Visual Impeller' },
    ratings: {
      th: 'แรงดันแหล่งจ่ายแยก 3–6V DC | กระแสขณะหมุน 150–400 mA (กระแสขณะติดขัด Stall อาจสูงเกิน 800 mA)',
      en: 'External 3–6V Supply | Running Current 150–400 mA (Stall Current > 800 mA)',
    },
    pins: [
      {
        name: 'Motor (+) → แหล่งจ่ายไฟแยก EXT.+',
        badgeColor: '#dc2626',
        desc: { th: 'ต่อเข้าขั้วบวกของแหล่งจ่ายไฟภายนอกสำหรับมอเตอร์ (และต่อคู่กับขั้ว Cathode ของไดโอด)', en: 'Connected to external motor supply V+ (and flyback diode cathode).' },
      },
      {
        name: 'Motor (-) → ขาเอาต์พุตวงจรขับ (Collector / Drain)',
        badgeColor: '#059669',
        desc: { th: 'ต่อเข้าสวิตช์กำลังของทรานซิสเตอร์/ไดรเวอร์เพื่อสวิตช์ลงกราวด์ตามสัญญาณ PWM', en: 'Switched to ground by the driver transistor/MOSFET collector/drain.' },
      },
    ],
    principle: {
      th: 'เมื่อกระแสไหลผ่านขดลวดอาร์เมเจอร์ภายในสนามแม่เหล็กถาวร จะเกิดแรงลอเรนตซ์สร้างแรงบิดหมุนเพลา การปรับค่า Duty Cycle ของสัญญาณ PWM จะเปลี่ยนพลังงานเฉลี่ยที่จ่ายให้ขดลวด จึงควบคุมความเร็วสัมพัทธ์ได้',
      en: 'Current flowing through armature windings inside a permanent magnetic field produces Lorentz torque. Varying PWM duty cycle modulates average applied power.',
    },
    labTip: {
      th: 'ความเร็วมอเตอร์กระแสตรงแบบไม่มีเซนเซอร์วัดรอบ (Open-loop) จะเปลี่ยนแปลงตามแรงเสียดทานและภาระโหลด จึงไม่ควรสรุปว่า Duty 50% จะได้ RPM ครึ่งหนึ่งเป๊ะเสมอไป',
      en: 'Open-loop DC motor speed varies with friction and mechanical load, so PWM duty cycle controls average drive effort rather than guaranteed RPM.',
    },
    focusPoint: [4.8, 1.3, -1.2],
  },

  driver: {
    id: 'driver',
    icon: '🔌',
    name: {
      th: 'วงจรขับกำลังทรานซิสเตอร์ / มอสเฟต (Low-Side Transistor Driver)',
      en: 'NPN Transistor / Logic-Level MOSFET Power Driver Stage',
    },
    category: { th: 'สวิตช์ขยายกระแสไฟฟ้า (Power Electronic Switch)', en: 'Solid-State High-Current Switch' },
    packageType: { th: 'ตัวถัง TO-92 / TO-220 พร้อมตัวต้านทานจำกัดกระแสขาเข้า', en: 'TO-92 / TO-220 Semiconductor Package with Base/Gate Resistor' },
    ratings: {
      th: 'ใช้สัญญาณกระแสต่ำจากพิน D5 ควบคุมกระแสหลักหลายร้อยมิลลิแอมป์ของมอเตอร์',
      en: 'Amplifies low-current logic PWM from D5 to switch hundreds of milliamps for the motor',
    },
    pins: [
      {
        name: 'IN (Base / Gate) ← D5 ผ่านตัวต้านทาน',
        badgeColor: '#0284c7',
        desc: { th: 'รับสัญญาณควบคุม PWM จากพิน D5 ของ Arduino', en: 'Receives logic-level PWM from Arduino D5 via a current-limiting resistor.' },
      },
      {
        name: 'OUT (Collector / Drain) → Motor (-)',
        badgeColor: '#059669',
        desc: { th: 'ขั้วรับกระแสจากขั้วลบของมอเตอร์เพื่อสวิตช์ลงกราวด์', en: 'Sinks motor current when the driver switch turns ON.' },
      },
      {
        name: 'GND (Emitter / Source) → Common GND',
        badgeColor: '#475569',
        desc: { th: 'ต่อลงกราวด์ร่วมระหว่าง Arduino กับแหล่งจ่ายไฟมอเตอร์', en: 'Connected to common ground shared by Arduino and external supply.' },
      },
    ],
    principle: {
      th: 'พินของ Arduino จ่ายกระแสได้อย่างปลอดภัยเพียง ~20 mA ซึ่งไม่พอขับมอเตอร์ ทรานซิสเตอร์จึงทำหน้าที่เป็น "วาล์วไฟฟ้า" ที่ใช้สัญญาณเล็กน้อยจากพิน D5 ไปเปิด-ปิดทางเดินกระแสใหญ่จากแบตเตอรี่ภายนอกด้วยความเร็วสูงตามจังหวะ PWM',
      en: 'Because an Arduino pin can safely source only ~20 mA, the transistor acts as an electronic relay—using a tiny base/gate signal to switch high motor current.',
    },
    labTip: {
      th: 'ต้องต่อกราวด์ของแหล่งจ่ายไฟภายนอก (EXT.-) เข้ากับ GND ของ Arduino เสมอ สัญญาณควบคุมที่ขา Base/Gate จึงจะมีจุดอ้างอิง 0V เดียวกัน',
      en: 'Always tie the negative terminal of the external motor battery to Arduino GND so the control signal has a common 0V reference.',
    },
    focusPoint: [3.6, 0.8, 0.8],
  },

  diode: {
    id: 'diode',
    icon: '🛡️',
    name: {
      th: 'ไดโอดฟลายแบ็กป้องกันแรงดันย้อนกลับ (1N4007 Flyback Diode)',
      en: '1N4007 Flyback / Freewheeling Protection Diode',
    },
    category: { th: 'อุปกรณ์ป้องกันวงจรจากภาระเหนี่ยวนำ', en: 'Inductive Kickback Snubber' },
    packageType: { th: 'DO-41 ทรงกระบอกสีดำ มีแถบคาดสีเงินแสดงขั้ว Cathode (K)', en: 'DO-41 Axial Package with Silver Cathode Band' },
    ratings: {
      th: 'ทนแรงดันย้อนกลับสูงสุด 1000V | กระแสเดินหน้าต่อเนื่อง 1A',
      en: '1000V Peak Repetitive Reverse Voltage | 1.0A Average Forward Current',
    },
    pins: [
      {
        name: 'Cathode (K - แถบสีเงิน) → ต่อฝั่งไฟบวก MOTOR.+',
        badgeColor: '#dc2626',
        desc: { th: 'ด้านที่มีแถบคาดสีเงิน ต้องหันไปทางขั้วบวกของมอเตอร์/แหล่งจ่าย (Reverse-biased ในสภาวะปกติ)', en: 'Silver-banded Cathode MUST face Motor (+) / positive supply rail.' },
      },
      {
        name: 'Anode (A) → ต่อฝั่งสวิตช์ MOTOR.-',
        badgeColor: '#059669',
        desc: { th: 'ต่อเข้ากับจุดเชื่อมระหว่างขั้วลบมอเตอร์และขาเอาต์พุตของทรานซิสเตอร์', en: 'Connected to the switched node between Motor (-) and transistor collector/drain.' },
      },
    ],
    principle: {
      th: 'ขดลวดมอเตอร์มีสมบัติความเหนี่ยวนำ ($V = -L \\frac{dI}{dt}$) เมื่อทรานซิสเตอร์ตัดกระแสกะทันหันในแต่ละลูกคลื่น PWM ขดลวดจะสร้างแรงดันกระชากย้อนกลับสูงมาก (Back-EMF Spike) ไดโอดที่ต่อขนานกลับหัวไว้จะเปิดทางให้กระแสเหนี่ยวนำไหลวนสลายตัวในขดลวดอย่างปลอดภัย ไม่ทะลุไปทำลายทรานซิสเตอร์',
      en: 'When PWM switches OFF, collapsing magnetic flux in the motor coils generates a high-voltage inductive spike. The antiparallel diode conducts this flyback current safely around the motor loop.',
    },
    labTip: {
      th: 'ตรวจดูแถบสีเงินบนตัวไดโอดก่อนจ่ายไฟทุกครั้ง: แถบสีเงินต้องอยู่ฝั่งไฟบวก (MOTOR.+) หากต่อกลับด้านจะเกิดการลัดวงจรทันทีที่ทรานซิสเตอร์ทำงาน!',
      en: 'Double-check the silver band! It must connect to Motor (+). Reversing the flyback diode creates a dead short across the supply when the transistor turns on.',
    },
    focusPoint: [4.2, 0.7, -0.2],
  },

  supply: {
    id: 'supply',
    icon: '🔋',
    name: {
      th: 'แหล่งจ่ายไฟภายนอกสำหรับโหลดกำลัง (External 5V–6V Power Supply)',
      en: 'Dedicated External Power Supply (Battery / Regulated DC)',
    },
    category: { th: 'ภาคจ่ายไฟกำลัง (Power Rail)', en: 'High-Current Actuator Supply' },
    packageType: { th: 'รางถ่าน AA 4 ก้อน หรือแหล่งจ่ายไฟ DC ควบคุมแรงดันพร้อมสายไฟแดง/ดำ', en: '4×AA Battery Pack / Bench DC Supply Module' },
    ratings: {
      th: '5V–6V DC | จ่ายกระแสรองรับมอเตอร์ เซอร์โว และสเต็ปเปอร์โดยไม่ดึงไฟจากพอร์ต USB ของคอมพิวเตอร์',
      en: '5V–6V DC | Isolates high-current motor transients from the Arduino logic regulator',
    },
    pins: [
      {
        name: 'EXT.+ (สายสีแดง)',
        badgeColor: '#dc2626',
        desc: { th: 'จ่ายไฟบวกเข้ากับมอเตอร์ เซอร์โว หรือบอร์ดขับ ULN2003 โดยตรง', en: 'Positive high-current rail feeding the actuator or driver V+.' },
      },
      {
        name: 'EXT.- (สายสีดำ → Common GND)',
        badgeColor: '#475569',
        desc: { th: 'ต่อเชื่อมเข้ากับขา GND ของบอร์ด Arduino เพื่อสร้างจุดอ้างอิงแรงดัน 0V ร่วมกัน', en: 'Tied to Arduino GND to establish a single 0V reference.' },
      },
    ],
    principle: {
      th: 'การแยกแหล่งจ่ายไฟสำหรับอุปกรณ์กลไกช่วยป้องกันไม่ให้กระแสกระชากขณะมอเตอร์ออกตัวดึงแรงดัน 5V ของชิปไมโครคอนโทรลเลอร์ตก (Brown-out Reset)',
      en: 'Separating actuator power from the MCU logic rail prevents motor start-up current spikes from causing voltage droop and microcontroller resets.',
    },
    labTip: {
      th: 'กฎเหล็กของการใช้แหล่งจ่ายแยก: "แยกสายไฟบวก แต่ต้องรวมสายกราวด์ (Common Ground)" เสมอ',
      en: 'Golden rule of dual supplies: keep positive rails separate, but ALWAYS connect their negative grounds together.',
    },
    focusPoint: [6.2, 0.7, 2.2],
  },

  tmp36: {
    id: 'tmp36',
    icon: '🌡️',
    name: {
      th: 'เซนเซอร์วัดอุณหภูมิแอนะล็อกเชิงเส้น (TMP36GT9Z)',
      en: 'TMP36 Low-Voltage Precision Centigrade Temperature Sensor',
    },
    category: { th: 'เซนเซอร์วัดอุณหภูมิแบบแอนะล็อก (Analog Thermal Sensor)', en: 'Solid-State Bandgap Temperature Sensor' },
    packageType: { th: 'ตัวถังพลาสติก TO-92 3 ขา (หน้าตาคล้ายทรานซิสเตอร์ ต้องดูด้านปาดแบน)', en: '3-Pin TO-92 Package (Flat Front Face Orientation)' },
    ratings: {
      th: 'ช่วงวัด −40°C ถึง +125°C | ความชัน 10 mV/°C | แรงดันชดเชย (Offset) 0.50V ที่ 0°C',
      en: 'Range −40°C to +125°C | Scale Factor 10 mV/°C | 500 mV Offset at 0°C',
    },
    pins: [
      {
        name: 'Pin 1 (ซ้ายสุดเมื่อหันด้านแบนเข้าหาตัว): +Vs (5V)',
        badgeColor: '#dc2626',
        desc: { th: 'ขั้วรับไฟเลี้ยงบวก 2.7V–5.5V', en: 'Left pin (flat face toward you): +Vs supply (5V).' },
      },
      {
        name: 'Pin 2 (ขากลาง): Vout → A0',
        badgeColor: '#f59e0b',
        desc: { th: 'ขาส่งออกแรงดันแอนะล็อกตามอุณหภูมิ $V_{\\text{out}} = 0.5\\text{V} + (0.01\\text{V}/^\\circ\\text{C}) \\times T$', en: 'Center pin: Analog voltage output proportional to Celsius temperature.' },
      },
      {
        name: 'Pin 3 (ขวาสุด): GND',
        badgeColor: '#475569',
        desc: { th: 'ขั้วกราวด์ 0V', en: 'Right pin: Ground (0V).' },
      },
    ],
    principle: {
      th: 'ใช้วงจร Bandgap ภายในสารกึ่งตัวนำสร้างแรงดันที่เป็นฟังก์ชันเชิงเส้นกับอุณหภูมิสัมบูรณ์ โดยมีค่า Offset 0.5V ที่ 0°C ทำให้วัดอุณหภูมิติดลบได้โดยไม่ต้องใช้ไฟเลี้ยงลบ ที่อุณหภูมิห้อง 25°C จะจ่ายแรงดัน $0.5 + 0.25 = 0.75\\text{ V}$',
      en: 'Uses a silicon bandgap reference to produce a linear 10 mV/°C output offset by 0.5V at 0°C, allowing sub-zero readings without a negative supply rail.',
    },
    labTip: {
      th: 'ระวังสับสนกับทรานซิสเตอร์และห้ามต่อขา +Vs กับ GND สลับกันเด็ดขาด! หากต่อกลับขั้ว ตัวเซนเซอร์ TMP36 จะร้อนจัดภายในไม่กี่วินาที',
      en: 'Never confuse TMP36 with an NPN transistor or reverse +Vs and GND—reverse polarity causes the TO-92 package to overheat rapidly!',
    },
    focusPoint: [4.2, 0.9, 0],
  },

  servo: {
    id: 'servo',
    icon: '🦾',
    name: {
      th: 'ไมโครเซอร์โวมอเตอร์ 180 องศา (SG90 Micro Servo)',
      en: 'SG90 9g Micro Positional Servo Motor (0°–180°)',
    },
    category: { th: 'อุปกรณ์ควบคุมตำแหน่งเชิงมุม (Closed-Loop Positional Actuator)', en: 'Closed-Loop Angular Servo Actuator' },
    packageType: { th: 'ตัวถังสีฟ้าใสเห็นชุดเฟืองทดภายใน พร้อมแขนหมุน (Servo Horn) และสายแพร 3 เส้น', en: 'Translucent Blue Case with Gear Train, Feedback Potentiometer & 3-Wire Ribbon' },
    ratings: {
      th: 'แรงดัน 4.8V–6.0V | ช่วงมุมคำสั่งมาตรฐาน 0°–180° | พัลส์ควบคุม 50 Hz (ความกว้างพัลส์ ~1000–2000 µs)',
      en: '4.8V–6.0V Supply | 0°–180° Command Span | 50 Hz Servo Control Pulse',
    },
    pins: [
      {
        name: 'สายสีส้ม / เหลือง (SIG → D9)',
        badgeColor: '#f59e0b',
        desc: { th: 'ขารับสัญญาณพัลส์ควบคุมตำแหน่งมุมจากไลบรารี <Servo.h>', en: 'Orange/Yellow wire: positional control pulse input from pin D9.' },
      },
      {
        name: 'สายสีแดง (V+ → แหล่งจ่ายไฟแยก 5V)',
        badgeColor: '#dc2626',
        desc: { th: 'ไฟเลี้ยงกำลังของมอเตอร์และวงจรควบคุมภายใน', en: 'Red wire: positive power supply (4.8–6V rated).' },
      },
      {
        name: 'สายสีน้ำตาล / ดำ (GND → Common GND)',
        badgeColor: '#475569',
        desc: { th: 'กราวด์ร่วมระหว่างแหล่งจ่ายไฟเซอร์โวและ Arduino', en: 'Brown/Black wire: common ground shared with Arduino.' },
      },
    ],
    principle: {
      th: 'ภายในประกอบด้วยมอเตอร์กระแสตรง ชุดเฟืองทดเพิ่มแรงบิด โพเทนชิโอมิเตอร์วัดมุมเพลา และแผงวงจรเปรียบเทียบตำแหน่ง เมื่อสั่ง arm.write(angle) วงจรภายในจะขับมอเตอร์จนกว่ามุมของเพลาจะตรงกับมุมที่สั่งแล้วหยุดนิ่งรักษามุมนั้นไว้',
      en: 'Combines a DC motor, reduction gearbox, coupled potentiometer, and internal control IC that drives the horn until measured shaft angle matches the commanded pulse width.',
    },
    labTip: {
      th: 'ห้ามใช้มือบิดแขนเซอร์โวฝืนแรงเฟืองขณะที่จ่ายไฟอยู่ และไม่ควรสั่งมุมเกินขีดจำกัดทางกลของตัวเซอร์โวเพราะจะทำให้มอเตอร์กินกระแสค้าง (Stall)',
      en: 'Avoid forcing the servo horn by hand while powered, and watch for mechanical end-stop binding near 0° or 180°.',
    },
    focusPoint: [4.2, 1.4, -0.5],
  },

  stepper: {
    id: 'stepper',
    icon: '🧭',
    name: {
      th: 'สเต็ปเปอร์มอเตอร์ 5 สายพร้อมชุดเฟืองทด (28BYJ-48 5V)',
      en: '28BYJ-48 5V Unipolar Reduction Stepper Motor',
    },
    category: { th: 'มอเตอร์ควบคุมการหมุนแบบนับก้าว (Stepping Actuator)', en: 'Geared Unipolar Stepper Motor' },
    packageType: { th: 'ตัวถังโลหะเส้นผ่านศูนย์กลาง 28 มม. เพลาเยื้องศูนย์ พร้อมหัวต่อ JST 5 สาย', en: '28mm Steel Housing with Internal ~64:1 Gear Reduction & 5-Pin Connector' },
    ratings: {
      th: '5V DC | 4 เฟส (Coil A, B, C, D) | ประมาณ 2048 ก้าวต่อรอบในโหมด Full-Step (5.625°/64 ต่อก้าว)',
      en: '5V DC | 4-Phase Unipolar | Nominal 2048 steps/rev in full-step mode',
    },
    pins: [
      {
        name: 'สายสีแดง (Common Center-Tap V+)',
        badgeColor: '#dc2626',
        desc: { th: 'จุดร่วมของขดลวดทั้ง 4 เฟส ต่อรับไฟบวกจากบอร์ดขับ ULN2003', en: 'Common center-tap of the stator windings, powered via the ULN2003 header.' },
      },
      {
        name: 'สายสีส้ม / เหลือง / ชมพู / น้ำเงิน (Coils A–D)',
        badgeColor: '#f59e0b',
        desc: { th: 'ปลายขดลวดแม่เหล็กไฟฟ้าทั้ง 4 เฟสที่ถูกสวิตช์ลงกราวด์ตามลำดับก้าว', en: 'Four stator phase leads energized sequentially by the ULN2003 driver.' },
      },
    ],
    principle: {
      th: 'แทนที่จะหมุนต่อเนื่องเหมือนมอเตอร์ทั่วไป สเต็ปเปอร์มอเตอร์จะจ่ายไฟกระตุ้นขดลวดแม่เหล็กทีละเฟสเรียงลำดับกัน ดึงให้โรเตอร์ขยับทีละก้าวคงที่ (Step Angle) ทำให้สามารถควบคุมทั้งมุมหมุนสะสม จำนวนรอบ และทิศทางได้อย่างแม่นยำด้วยการนับจำนวนก้าว',
      en: 'Energizing stator coils in a discrete phase sequence advances the rotor by fixed angular increments, allowing precise open-loop rotation tracking.',
    },
    labTip: {
      th: 'เมื่อใช้ไลบรารี Stepper ของ Arduino กับ 28BYJ-48 มักต้องระบุลำดับพินใน Constructor เป็น Stepper(stepsPerRev, 8, 10, 9, 11) (สลับพินคู่กลาง 9 กับ 10) เพื่อให้ลำดับขดลวดหมุนไปในทิศทางที่ถูกต้อง',
      en: 'With the standard Arduino Stepper library, pin order is typically Stepper(stepsPerRev, 8, 10, 9, 11) so the coil excitation sequence advances smoothly.',
    },
    focusPoint: [5.0, 1.3, -1.2],
  },

  uln2003: {
    id: 'uln2003',
    icon: '📟',
    name: {
      th: 'โมดูลขับสเต็ปเปอร์มอเตอร์ (ULN2003A Darlington Driver Board)',
      en: 'ULN2003A 7-Channel Darlington Array Stepper Driver Module',
    },
    category: { th: 'แผงวงจรขับขดลวด 4 เฟสพร้อมไฟแสดงสถานะ', en: '4-Phase Stepper Driver & LED Indicator Board' },
    packageType: { th: 'โมดูล PCB พร้อมชิป ULN2003A DIP-16, ขั้วเสียบมอเตอร์ 5 พิน และไฟ LED 4 ดวง (A, B, C, D)', en: 'PCB Module with ULN2003A IC, 5-Pin XH Socket & 4 Phase Indicator LEDs (A–D)' },
    ratings: {
      th: 'รองรับกระแสสูงสุด 500 mA ต่อช่อง | มีไดโอดป้องกันแรงดันย้อนกลับ (Clamp Diodes) ภายในชิปครบทุกช่อง',
      en: '500 mA per Darlington pair | Built-in inductive suppression diodes',
    },
    pins: [
      {
        name: 'IN1–IN4 (รับสัญญาณจาก D8, D9, D10, D11)',
        badgeColor: '#0284c7',
        desc: { th: 'พินรับลอจิกควบคุมเฟสทั้ง 4 จากบอร์ด Arduino', en: 'Logic inputs driven by Arduino pins D8–D11.' },
      },
      {
        name: 'LED A, B, C, D บนบอร์ด',
        badgeColor: '#ef4444',
        desc: { th: 'ไฟแสดงจังหวะการทำงานของแต่ละเฟสแบบเรียลไทม์', en: 'Onboard phase LEDs showing active coil excitation sequence.' },
      },
      {
        name: 'V+ / GND (5V Motor Supply)',
        badgeColor: '#dc2626',
        desc: { th: 'ขั้วรับไฟเลี้ยงภายนอกสำหรับมอเตอร์และกราวด์ร่วม', en: 'External 5V motor power pins and common ground.' },
      },
    ],
    principle: {
      th: 'ภายในชิป ULN2003A ประกอบด้วยวงจรทรานซิสเตอร์คู่ดาร์ลิงตัน (Darlington Pair) ที่มีอัตราขยายกระแสสูงมาก ทำหน้าที่รับสัญญาณลอจิกจาก D8–D11 ไปดึงขดลวดแต่ละเฟสของสเต็ปเปอร์มอเตอร์ลงกราวด์ตามลำดับก้าว',
      en: 'High-gain Darlington transistor pairs amplify logic signals from D8–D11 to sink current through each of the four stepper stator windings.',
    },
    labTip: {
      th: 'สังเกตไฟ LED 4 ดวง (A, B, C, D) บนบอร์ด ULN2003: หากไฟวิ่งเรียงลำดับสม่ำเสมอแต่มอเตอร์สั่นอยู่กับที่ ให้ตรวจดูลำดับสายพิน 8, 10, 9, 11 ในโค้ด',
      en: 'Watch LEDs A–D on the ULN2003 board: if they step in order confirm the 8, 10, 9, 11 pin mapping in your Stepper constructor.',
    },
    focusPoint: [3.2, 0.7, 1.2],
  },

  'soil-sensor': {
    id: 'soil-sensor',
    icon: '🌱',
    name: {
      th: 'เซนเซอร์วัดความชื้นในวัสดุปลูก (Soil Moisture Probe & Module)',
      en: 'Soil Moisture Sensor Probe with Analog Conditioning Module',
    },
    category: { th: 'เซนเซอร์ตรวจวัดสภาพแวดล้อมเกษตรอัจฉริยะ', en: 'Environmental / Agritech Analog Sensor' },
    packageType: { th: 'หัววัดง่ามคู่เคลือบทอง (หรือแผ่นเก็บประจุ) ปักในกระถางดิน พร้อมโมดูลแอนะล็อก AO', en: 'Dual-Prong Gold-Plated Fork Probe in Soil Pot with Analog Amplifier Board' },
    ratings: {
      th: 'เอาต์พุตแอนะล็อก AO → A0 | อ่านค่าดิบสูงเมื่อดินแห้ง (เช่น ~800) และค่าลดลงเมื่อดินเปียกชื้น (เช่น ~350)',
      en: 'Analog Output AO → A0 | Higher raw ADC when dry (~800), lower raw ADC when wet (~350)',
    },
    pins: [
      {
        name: 'AO (Analog Output → A0)',
        badgeColor: '#059669',
        desc: { th: 'ส่งแรงดันแอนะล็อกเข้าพิน A0 เพื่อนำมาปรับเทียบสองจุด (Dry / Wet Calibration)', en: 'Analog output voltage wired to A0 for two-point Dry/Wet calibration.' },
      },
      {
        name: 'VCC / GND',
        badgeColor: '#dc2626',
        desc: { th: 'ไฟเลี้ยงโมดูลตามพิกัดและกราวด์ร่วม', en: 'Module supply voltage and common ground.' },
      },
    ],
    principle: {
      th: 'น้ำและแร่ธาตุในดินช่วยนำไฟฟ้า (หรือเปลี่ยนค่าไดอิเล็กทริก) เมื่อดินแห้งความต้านทานระหว่างง่ามวัดจะสูงมาก ทำให้แรงดันที่ขา AO สูง (ADC ใกล้ 800–1023) เมื่อรดน้ำจนดินชื้น ค่า ADC จะลดลง (ใกล้ 300–400) โปรแกรมจึงใช้การปรับเทียบ 2 จุดแปลงเป็นสเกลสัมพัทธ์ 0–100%',
      en: 'Soil water content alters conductivity/permittivity between the probe tines. Two-point calibration maps measured dryRaw (0%) and wetRaw (100%) readings onto a clamped relative percentage scale.',
    },
    labTip: {
      th: 'ดินแต่ละชนิด (ดินร่วน ทราย ขุยมะพร้าว) มีความหนาแน่นและเกลือแร่ต่างกัน จึงต้องวัดค่าตอนแห้งจริง (dryRaw) และตอนเปียกจริง (wetRaw) เพื่อปรับเทียบใหม่เสมอ',
      en: 'Different potting mixes have different conductivity profiles—always measure actual dryRaw and wetRaw endpoints in your specific soil medium.',
    },
    focusPoint: [5.2, 1.4, 1.4],
  },

  oled: {
    id: 'oled',
    icon: '🖥️',
    name: {
      th: 'จอแสดงผลกราฟิก 0.96 นิ้ว (SSD1306 I2C OLED 128×64)',
      en: '0.96" SSD1306 Monochrome OLED Display (I2C 128×64)',
    },
    category: { th: 'อุปกรณ์แสดงผลดิจิทัลผ่านบัสสื่อสาร I2C', en: 'I2C Serial Graphic Display Module' },
    packageType: { th: 'โมดูลจอ OLED เปล่งแสงเอง 128×64 พิกเซล ใช้สายสัญญาณ I2C เพียง 2 เส้น', en: '4-Pin I2C Self-Emissive OLED Panel (Address 0x3C)' },
    ratings: {
      th: 'ความละเอียด 128×64 พิกเซล | โปรโตคอล I2C (Address 0x3C) | ใช้ขา A4 (SDA) และ A5 (SCL)',
      en: '128×64 Pixels | I2C Bus Address 0x3C | Wired to Uno A4 (SDA) & A5 (SCL)',
    },
    pins: [
      {
        name: 'GND & VCC',
        badgeColor: '#475569',
        desc: { th: 'ขั้วกราวด์และไฟเลี้ยงโมดูลจอแสดงผล (ตรวจสอบลำดับขา GND/VCC บนแผ่น PCB จริงก่อนต่อ)', en: 'Power and Ground rails (always verify pin order printed on your OLED PCB).' },
      },
      {
        name: 'SCL (Serial Clock → A5)',
        badgeColor: '#0284c7',
        desc: { th: 'สัญญาณนาฬิกาซิงโครไนซ์ของบัส I2C ต่อกับขา A5 บน Arduino Uno', en: 'I2C clock line wired to pin A5 (or dedicated SCL header pin) on Uno.' },
      },
      {
        name: 'SDA (Serial Data → A4)',
        badgeColor: '#06b6d4',
        desc: { th: 'สายรับ-ส่งข้อมูลอนุกรม I2C ต่อกับขา A4 บน Arduino Uno', en: 'I2C bidirectional data line wired to pin A4 (or dedicated SDA pin) on Uno.' },
      },
    ],
    principle: {
      th: 'แต่ละพิกเซลเป็นหลอด OLED ขนาดจิ๋วที่เปล่งแสงได้เองโดยไม่ต้องใช้ไฟ Backlight ไมโครคอนโทรลเลอร์ส่งชุดข้อมูลตัวอักษรและกราฟิกผ่านบัส I2C ไปยังชิปควบคุม SSD1306 เพื่อแสดงค่าความชื้นและสถานะ DRY / OK / WET แบบเรียลไทม์',
      en: 'Each pixel is a self-luminous organic LED controlled by an onboard SSD1306 driver IC over the two-wire I2C bus (SDA/SCL).',
    },
    labTip: {
      th: 'บนบอร์ด Arduino Uno ขา I2C คือ A4 (SDA) และ A5 (SCL) หากสลับสายสองเส้นนี้จอจะไม่แสดงผลแต่ไม่เสียหาย',
      en: 'On Arduino Uno R3, hardware I2C lives on A4 (SDA) and A5 (SCL). Swapping them prevents communication until corrected.',
    },
    focusPoint: [3.5, 1.5, -1.2],
  },

  fsr: {
    id: 'fsr',
    icon: '👇',
    name: {
      th: 'เซนเซอร์ตรวจจับแรงกดแบบแผ่นฟิล์ม (Interlink FSR-402)',
      en: 'Force-Sensitive Resistor Thin-Film Pressure Pad (FSR-402)',
    },
    category: { th: 'เซนเซอร์วัดแรงกด/สัมผัสแบบแอนะล็อก', en: 'Piezoresistive Tactile Force Sensor' },
    packageType: { th: 'แผ่นพอลิเมอร์บางทรงกลมพร้อมลายนิ้วตัวนำประสานกัน (Interdigitated Electrodes)', en: 'Circular Polymer Film Pad with Interdigitated Conductive Fingers' },
    ratings: {
      th: 'เมื่อไม่กด ความต้านทาน > 1 MΩ (เปิดวงจร) | เมื่อออกแรงกด ความต้านทานลดลงเหลือ ~100 kΩ ถึง < 1 kΩ',
      en: 'Unpressed Resistance > 1 MΩ | Pressed Resistance drops from ~100 kΩ down to < 1 kΩ',
    },
    pins: [
      {
        name: 'Pin 1 → 5V',
        badgeColor: '#dc2626',
        desc: { th: 'ขั้วหนึ่งของแผ่น FSR ต่อรับแรงดัน 5V', en: 'Connected to the 5V supply rail.' },
      },
      {
        name: 'Pin 2 → จุดร่วม A0 & ตัวต้านทาน 10kΩ ลง GND',
        badgeColor: '#7c3aed',
        desc: { th: 'ส่งแรงดันจากวงจรแบ่งแรงดันเข้าขา A0 (ยิ่งกดแรง แรงดันที่ A0 ยิ่งสูงขึ้น)', en: 'Divider node connected to A0 and a 10 kΩ pull-down resistor to GND.' },
      },
    ],
    principle: {
      th: 'ภายในแผ่นฟิล์มมีชั้นหมึกพอลิเมอร์กึ่งตัวนำ เมื่อออกแรงกดบนแป้นวงกลม หมึกนำไฟฟ้าจะสัมผัสกับลายซี่โลหะมากขึ้นพื้นที่ ทำให้ความต้านทานลดลงอย่างรวดเร็ว แรงดันที่ตกคร่อมตัวต้านทาน 10 kΩ ที่ขา A0 จึงพุ่งสูงขึ้นตามแรงกด',
      en: 'Compressing the conductive polymer film against interdigitated electrodes increases microscopic contact area, lowering resistance and raising voltage at A0.',
    },
    labTip: {
      th: 'FSR ออกแบบมาเพื่อตรวจจับว่า "มีการกด/สัมผัสมากหรือน้อย" แบบสัมพัทธ์ ไม่ใช่ตาชั่งวัดน้ำหนักที่มีความแม่นยำเชิงเส้นเป็นหน่วยนิวตันหรือกรัมโดยตรง',
      en: 'FSRs provide qualitative tactile pressure detection rather than precision gravimetric weight measurement in newtons or grams.',
    },
    focusPoint: [3.5, 0.6, 1.6],
  },

  'traffic-led': {
    id: 'traffic-led',
    icon: '🚦',
    name: {
      th: 'ชุดไฟสัญญาณบอกโซนระยะทาง 3 สี (Green / Yellow / Red LEDs)',
      en: '3-Zone Traffic Status Indicator LEDs (Green D2, Yellow D3, Red D4)',
    },
    category: { th: 'ระบบแสดงผลแจ้งเตือนหลายระดับ (Multi-Stage Visual Output)', en: 'Multi-Zone Visual Status Array' },
    packageType: { th: 'หลอด LED 5 มม. สีเขียว เหลือง และแดง พร้อมตัวต้านทานจำกัดกระแส 330 Ω แยกอิสระ 3 ชุด', en: 'Three 5mm LEDs (Green, Yellow, Red) with individual 330 Ω series resistors' },
    ratings: {
      th: 'เขียว (D2: ปลอดภัย > farCm) | เหลือง (D3: เตือนระวัง ≤ farCm) | แดง (D4: ใกล้มาก ≤ nearCm) | ดับทั้งหมดเมื่อ No Echo',
      en: 'Green (D2: Safe > farCm) | Yellow (D3: Caution ≤ farCm) | Red (D4: Stop ≤ nearCm) | All OFF on No Echo',
    },
    pins: [
      {
        name: 'D2 → 330Ω → LED สีเขียว (Green)',
        badgeColor: '#22c55e',
        desc: { th: 'ติดสว่างเมื่อระยะวัตถุมากกว่าเกณฑ์ไกล (distanceCm > farCm)', en: 'Illuminates when measured distance exceeds farCm.' },
      },
      {
        name: 'D3 → 330Ω → LED สีเหลือง (Yellow)',
        badgeColor: '#eab308',
        desc: { th: 'ติดสว่างเมื่อระยะอยู่ในโซนกลาง (nearCm < distanceCm ≤ farCm)', en: 'Illuminates in the intermediate caution zone (nearCm < d ≤ farCm).' },
      },
      {
        name: 'D4 → 330Ω → LED สีแดง (Red)',
        badgeColor: '#ef4444',
        desc: { th: 'ติดสว่างเมื่อวัตถุเข้าใกล้ถึงเกณฑ์เตือนภัย (distanceCm ≤ nearCm)', en: 'Illuminates when obstacle is within the near threshold (d ≤ nearCm).' },
      },
    ],
    principle: {
      th: 'ทำงานร่วมกับเงื่อนไข if / else if / else ในไมโครคอนโทรลเลอร์ โดยเปิดไฟเพียงสีเดียวที่ตรงกับช่วงระยะทางที่วัดได้ และมีตรรกะ Fail-safe ปิดไฟทุกดวงทันทีเมื่อเซนเซอร์ไม่ได้รับคลื่นสะท้อน (No Echo) เพื่อไม่ให้ผู้ใช้งานเข้าใจผิดว่าปลอดภัย',
      en: 'Combines sensor data validation with mutually exclusive threshold branching (near < far), turning all indicators OFF if echo data is missing.',
    },
    labTip: {
      th: 'การออกแบบระบบวิศวกรรมที่ดีต้องแยกสถานะ "ปลอดภัย (ไฟเขียว)" ออกจากสถานะ "เซนเซอร์เสีย/ไม่มีสัญญาณสะท้อน (ไฟดับทั้งหมด)" เสมอ',
      en: 'Good engineering design never shows a Green "Safe" light when the sensor times out or loses echo data!',
    },
    focusPoint: [4.6, 0.9, 2.0],
  },
};

export function getEquipmentForLesson(lessonId: string, componentIds: string[]): EquipmentSpec[] {
  const ids = [...componentIds];
  if (lessonId !== 'board' && !ids.includes('breadboard')) {
    ids.splice(1, 0, 'breadboard');
  }
  const seen = new Set<string>();
  const specs: EquipmentSpec[] = [];
  for (const id of ids) {
    if (!seen.has(id) && EQUIPMENT_CATALOG[id]) {
      seen.add(id);
      specs.push(EQUIPMENT_CATALOG[id]);
    }
  }
  return specs;
}

export function renderEquipmentInspector(
  lessonId: string,
  componentIds: string[],
  selectedPartId: string,
  lang: Locale
): string {
  const parts = getEquipmentForLesson(lessonId, componentIds);
  const activePart = parts.find((p) => p.id === selectedPartId) || parts[0];
  if (!activePart) return '';

  return `
    <div class="space-y-3">
      <!-- Equipment Selector Pills -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1">
        ${parts
          .map((part) => {
            const isSelected = part.id === activePart.id;
            return `
              <button
                type="button"
                class="equipment-part-btn flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm shadow-brand-500/25'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-400'
                }"
                data-part-id="${part.id}"
              >
                <span>${part.icon}</span>
                <span>${part.name[lang].split(' (')[0]}</span>
              </button>
            `;
          })
          .join('')}
      </div>

      <!-- Active Equipment Detail Card -->
      <div class="p-4 rounded-xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 space-y-3 text-xs">
        <div class="flex flex-wrap items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5">
          <div>
            <div class="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              <span>${activePart.icon}</span>
              <span>${activePart.category[lang]}</span>
            </div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white mt-0.5">${activePart.name[lang]}</h4>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">${activePart.packageType[lang]}</p>
          </div>
          <button
            type="button"
            id="btn-focus-3d-part"
            data-part-id="${activePart.id}"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-300 border border-brand-200 dark:border-brand-800 hover:bg-brand-600 hover:text-white transition-colors"
            title="${lang === 'th' ? 'ซูมดูชิ้นส่วนนี้ในมุมมอง 3 มิติ' : 'Focus this part in 3D view'}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
            <span>${lang === 'th' ? 'ซูมดูอุปกรณ์ 3D' : 'Focus in 3D'}</span>
          </button>
        </div>

        <!-- Electrical Ratings Badge -->
        <div class="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 font-mono text-[11px] text-slate-700 dark:text-slate-300">
          <strong class="text-slate-900 dark:text-white">${lang === 'th' ? 'พิกัดทางวิศวกรรม:' : 'Specs & Ratings:'}</strong> ${activePart.ratings[lang]}
        </div>

        <!-- Pin-by-Pin Breakdown -->
        <div>
          <div class="font-bold text-slate-800 dark:text-slate-200 mb-1.5">
            ${lang === 'th' ? 'โครงสร้างขาพินและการเชื่อมต่อ (Pinout & Terminals):' : 'Pinout & Terminal Structure:'}
          </div>
          <div class="grid grid-cols-1 gap-1.5">
            ${activePart.pins
              .map(
                (pin) => `
              <div class="p-2 rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200/70 dark:border-slate-800/80 flex items-start gap-2">
                <span class="mt-0.5 w-2.5 h-2.5 rounded-full flex-shrink-0" style="background:${pin.badgeColor}"></span>
                <div>
                  <span class="font-mono font-bold text-slate-900 dark:text-white">${pin.name}:</span>
                  <span class="text-slate-600 dark:text-slate-300 ml-1">${pin.desc[lang]}</span>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- Working Principle & Lab Safety Tip -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <div class="p-2.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/50">
            <div class="font-bold text-indigo-900 dark:text-indigo-300 mb-0.5">
              ⚙️ ${lang === 'th' ? 'หลักการทำงานเชิงฟิสิกส์/ไฟฟ้า' : 'Engineering Principle'}
            </div>
            <p class="text-indigo-950/80 dark:text-indigo-200/90 leading-relaxed text-[11px]">${activePart.principle[lang]}</p>
          </div>
          <div class="p-2.5 rounded-lg bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/50">
            <div class="font-bold text-amber-900 dark:text-amber-300 mb-0.5">
              ⚠️ ${lang === 'th' ? 'ข้อควรระวังในการต่อวงจรจริง' : 'Practical Lab Tip'}
            </div>
            <p class="text-amber-950/80 dark:text-amber-200/90 leading-relaxed text-[11px]">${activePart.labTip[lang]}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}
