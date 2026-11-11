import { Locale } from '../i18n';
import { LessonId, MaterialId, LedColorId, BreadboardPresetId } from '../domain/circuitModels';

export interface LessonInquiryConfig {
  predictQuestion: Record<Locale, string>;
  predictOptions: Record<'A' | 'B' | 'C', Record<Locale, string>>;
  correctPrediction: 'A' | 'B' | 'C';
  experimentSteps: Array<Record<Locale, string>>;
  obsRowLabels: {
    row1: Record<Locale, string>;
    row2: Record<Locale, string>;
  };
  transferQuestion: Record<Locale, string>;
  transferOptions: Record<'A' | 'B' | 'C', Record<Locale, string>>;
  correctTransfer: 'A' | 'B' | 'C';
  transferFeedbackCorrect: Record<Locale, string>;
  transferFeedbackRetry: Record<Locale, string>;
  explainPrompt: Record<Locale, string>;
  teacherAnswerSummary: Record<Locale, string>;
}

export interface Lesson {
  id: LessonId;
  order: number;
  category: string;
  titles: Record<Locale, string>;
  subtitles: Record<Locale, string>;
  objectives: Record<Locale, string[]>;
  initialCircuit: {
    voltage: number;
    forwardVoltage: number;
    resistance: number;
    power: boolean;
    polarity: 'forward' | 'reverse';
    wireConnected?: boolean;
    materialId?: MaterialId;
    ledColor?: LedColorId;
    breadboardPreset?: BreadboardPresetId;
  };
  overviewContent: Record<Locale, string>;
  teacherNotes: Record<Locale, string>;
  inquiry: LessonInquiryConfig;
}

export interface DeferredTopic {
  id: string;
  stage: 'P3';
  category: Record<Locale, string>;
  titles: Record<Locale, string>;
}

export const DEFERRED_TOPICS: DeferredTopic[] = [
  {
    id: 'capacitor-charging',
    stage: 'P3',
    category: { th: 'หมวดตัวเก็บประจุ (Capacitors)', en: 'Capacitors' },
    titles: { th: 'การเก็บและคายประจุของตัวเก็บประจุ (RC Transient Model)', en: 'Capacitor Charging & Discharging (RC Transient Model)' }
  },
  {
    id: 'transistor-switch',
    stage: 'P3',
    category: { th: 'หมวดทรานซิสเตอร์ (Transistors)', en: 'Transistors' },
    titles: { th: 'ทรานซิสเตอร์ในฐานะสวิตช์และตัวขยาย (Cutoff / Active / Saturation)', en: 'NPN Transistor Switch & Regions' }
  },
  {
    id: 'ldr-light-sensor',
    stage: 'P3',
    category: { th: 'หมวดเซนเซอร์ (Sensors)', en: 'Sensors' },
    titles: { th: 'ตัวต้านทานไวแสงและวงจรแบ่งแรงดัน (LDR Sensor Threshold)', en: 'Light-Dependent Resistor (LDR) & Voltage Divider' }
  }
];

export const LESSONS: Lesson[] = [
  // ==========================================================================
  // 1. OPEN & CLOSED CIRCUITS
  // ==========================================================================
  {
    id: 'open-closed-circuit',
    order: 1,
    category: 'basics',
    titles: {
      th: '1. วงจรเปิดและวงจรปิด (Open & Closed Circuits)',
      en: '1. Open & Closed Circuits'
    },
    subtitles: {
      th: 'สำรวจเส้นทางครบรอบของกระแสไฟฟ้าและความต่างศักย์เมื่อวงจรขาด',
      en: 'Explore complete current loops and terminal voltage across an open break'
    },
    objectives: {
      th: [
        'เปรียบเทียบเงื่อนไขของวงจรปิด (Closed Circuit) และวงจรเปิด (Open Circuit) ได้',
        'อธิบายได้ว่าเหตุใดเมื่อสวิตช์เปิดหรือสายไฟหลุด กระแสจึงเป็นศูนย์แต่แรงดันแบตเตอรี่ยังคงอยู่',
        'วัดและคำนวณกระแสไฟฟ้าในวงจรพื้นฐานเมื่อต่อครบรอบได้'
      ],
      en: [
        'Distinguish between a complete closed circuit and an interrupted open circuit',
        'Explain why zero current in an open circuit does not mean battery voltage is zero',
        'Calculate steady-state loop current when all continuity paths are closed'
      ]
    },
    initialCircuit: {
      voltage: 3.0,
      forwardVoltage: 0,
      resistance: 150,
      power: false,
      polarity: 'forward',
      wireConnected: true
    },
    overviewContent: {
      th: `กระแสไฟฟ้าจะไหลอย่างต่อเนื่องได้ก็ต่อเมื่อมี **เส้นทางตัวนำที่เชื่อมต่อครบรอบ (Closed Loop)** จากขั้วบวกของแหล่งจ่าย ผ่านอุปกรณ์โหลด และวนกลับเข้าสู่ขั้วลบของแหล่งจ่ายโดยไม่มีจุดขาด

### วงจรปิด vs วงจรเปิด
* **วงจรปิด (Closed Circuit)**: สวิตช์ปิดเชื่อมถึงกันและสายไฟครบทุกเส้น กระแสไฟฟ้าไหลผ่านหลอดไฟและตัวต้านทานตามกฎ $I = V_s / R$
* **วงจรเปิด (Open Circuit)**: สวิตช์ถูกยกขึ้น หรือสายไฟเส้นใดเส้นหนึ่งหลุดออก ทำให้เส้นทางขาด กระแสไฟฟ้าในวงจรเป็นศูนย์ ($I = 0\\text{ mA}$) แต่ที่ขั้วแบตเตอรี่และจุดที่วงจรขาดยังคงมีความต่างศักย์ไฟฟ้าเท่ากับ $V_s$ ตกคร่อมอยู่`,
      en: `Electric current requires a **continuous closed conducting loop** from the positive supply terminal, through the load component, and back to the negative terminal.

### Closed vs. Open Circuit
* **Closed Circuit**: Both the switch and return wire form an unbroken loop. Current flows according to $I = V_s / R$.
* **Open Circuit**: Either the switch is open or a wire is disconnected. Current drops to zero ($I = 0\\text{ mA}$), while the full supply voltage $V_s$ appears across the open break.`
    },
    teacherNotes: {
      th: `1. ความเข้าใจคลาดเคลื่อนที่พบบ่อย: นักเรียนมักคิดว่าถ้าสายไฟขากลับ (ด้านขั้วลบ) หลุด กระแสจะยังไหลไปถึงหลอดไฟและทำให้หลอดสว่างได้ครึ่งหนึ่ง ให้ใช้การทดลองปลดสายไฟขากลับเพื่อพิสูจน์ว่ากระแสเป็น 0 mA ทันทีทั่วทั้งวงจรเดี่ยว
2. เน้นย้ำว่าเมื่อวงจรเปิด ($I = 0$) แบตเตอรี่ไม่ได้หมดไฟ แรงดัน $V_s$ ยังคงปรากฏตกคร่อมที่ช่องว่างของสวิตช์ที่เปิดอยู่`,
      en: `1. Common Misconception: Students often think current leaves the battery and lights the bulb before hitting a disconnected return wire. Use the Return Wire toggle to show that breaking the loop anywhere stops current everywhere in a series loop.
2. Highlight that zero current does not imply zero voltage across the open switch terminals.`
    },
    inquiry: {
      predictQuestion: {
        th: 'หากเราสับสวิตช์ลง (ON) แต่สายไฟขากลับเข้าขั้วลบหลุดออก หลอดไฟและกระแสในวงจรจะเป็นอย่างไร?',
        en: 'If the switch is closed (ON) but the return wire to the negative terminal is disconnected, what happens to the lamp and current?'
      },
      predictOptions: {
        A: { th: 'กระแสไหลไปถึงหลอดไฟได้ครึ่งทาง ทำให้หลอดสว่างหรี่ๆ', en: 'Current reaches the lamp halfway, making it glow dimly.' },
        B: { th: 'ไม่มีกระแสไหลในวงจรเลย (0 mA) และหลอดไม่สว่าง เพราะวงจรไม่ครบรอบ', en: 'Zero current flows (0 mA) and the lamp stays off because the loop is incomplete.' },
        C: { th: 'กระแสไหลเพิ่มขึ้นเพราะไม่มีสายไฟขากลับคอยต้าน', en: 'Current increases because the return wire is removed.' }
      },
      correctPrediction: 'B',
      experimentSteps: [
        { th: 'กดปุ่มเปิดสวิตช์ไฟเมื่อสายไฟต่อครบ แล้วสังเกตค่ากระแสไฟฟ้า', en: 'Close the switch with the wire connected and observe the current' },
        { th: 'ทดลองปลดสายไฟขากลับ (วงจรขาด) หรือเปิดสวิตช์ แล้วสังเกตค่ากระแสและแรงดันที่จุดขาด', en: 'Disconnect the return wire or open the switch and observe current and gap voltage' }
      ],
      obsRowLabels: {
        row1: { th: 'วงจรปิดครบรอบ (สวิตช์ปิด + สายไฟครบ)', en: 'Closed Loop (Switch ON + Wire Connected)' },
        row2: { th: 'วงจรเปิด (สวิตช์เปิด หรือ สายไฟหลุด)', en: 'Open Loop (Switch OFF or Wire Disconnected)' }
      },
      transferQuestion: {
        th: 'คำถามเชื่อมโยง: เมื่อสวิตช์เปิดอยู่ (วงจรเปิด กระแส 0 mA) ความต่างศักย์ตกคร่อมระหว่างขั้วของสวิตช์ที่เปิดอยู่มีค่าเท่าใด?',
        en: 'Transfer Question: When the switch is open (0 mA current), what is the voltage across the open switch contacts?'
      },
      transferOptions: {
        A: { th: 'เท่ากับแรงดันแหล่งจ่าย (เช่น 3.00 V) เพราะศักย์ไฟฟ้าจากขั้วบวกและลบมารออยู่ที่ปลายทั้งสองด้านของจุดขาด', en: 'Equal to the supply voltage (e.g., 3.00 V) because the open gap holds the full potential difference.' },
        B: { th: 'เป็น 0 V เสมอ เพราะเมื่อไม่มีกระแส แรงดันทุกจุดต้องหายไปทั้งหมด', en: 'Always 0 V because voltage vanishes whenever current is zero.' },
        C: { th: 'มากกว่าแรงดันแบตเตอรี่ 10 เท่า', en: 'Ten times higher than the battery voltage.' }
      },
      correctTransfer: 'A',
      transferFeedbackCorrect: {
        th: 'ถูกต้อง! แม้กระแสจะเป็นศูนย์ แต่ความต่างศักย์ของแหล่งจ่ายยังคงปรากฏตกคร่อมจุดที่วงจรเปิดอยู่',
        en: 'Correct! Even with zero current, the full supply potential difference appears across the open break.'
      },
      transferFeedbackRetry: {
        th: 'ลองตรวจสอบดูใหม่: เมื่อไม่มีกระแสไหล แรงดันตกคร่อมตัวต้านทานเป็น 0 V ดังนั้นแรงดันแหล่งจ่ายจึงตกคร่อมที่ช่องว่างสวิตช์',
        en: 'Re-check: With zero current, the resistor drops 0 V, so the full source voltage appears across the open switch.'
      },
      explainPrompt: {
        th: 'อธิบายด้วยคำพูดของคุณเอง: เหตุใดวงจรไฟฟ้าจึงต้องมีเส้นทางครบรอบตั้งแต่ขั้วบวกกลับมายังขั้วลบ?',
        en: 'Explain in your own words: Why must an electrical circuit form a complete loop from positive back to negative?'
      },
      teacherAnswerSummary: {
        th: 'ขั้นที่ 1: ข้อ B (วงจรไม่ครบรอบ กระแสเป็น 0 mA) · ขั้นที่ 4: ข้อ A (แรงดันตกคร่อมจุดขาดเท่ากับ Vs = 3.00 V)',
        en: 'Step 1: Option B (incomplete loop yields 0 mA) · Step 4: Option A (open break holds full supply voltage Vs = 3.00 V)'
      }
    }
  },

  // ==========================================================================
  // 2. CONDUCTORS & INSULATORS
  // ==========================================================================
  {
    id: 'conductors-insulators',
    order: 2,
    category: 'basics',
    titles: {
      th: '2. ตัวนำไฟฟ้าและฉนวนไฟฟ้า (Conductors & Insulators)',
      en: '2. Conductors & Insulators'
    },
    subtitles: {
      th: 'ทดสอบวัสดุหลากหลายชนิดในวงจรเพื่อจำแนกตัวนำ ตัวนำกึ่งความต้านทาน และฉนวน',
      en: 'Test real-world materials in a series loop to classify conductors and insulators'
    },
    objectives: {
      th: [
        'จำแนกวัสดุตัวนำไฟฟ้า (ทองแดง, กราไฟต์) และฉนวนไฟฟ้า (พลาสติก, ไม้แห้ง, ยาง) จากผลการทดลองได้',
        'เปรียบเทียบความแตกต่างของกระแสไฟฟ้าระหว่างตัวนำที่ดีมาก (ทองแดง) กับตัวนำที่มีความต้านทานสูงกว่า (ไส้ดินสอกราไฟต์) ได้',
        'เชื่อมโยงการเลือกใช้วัสดุตัวนำและฉนวนกับความปลอดภัยในอุปกรณ์ไฟฟ้าจริงได้'
      ],
      en: [
        'Classify conductors (copper, graphite) and insulators (plastic, dry wood, rubber) from circuit evidence',
        'Compare current magnitude between a low-resistance metal (copper) and a higher-resistance conductor (pencil graphite)',
        'Relate conductor cores and insulating jackets to electrical safety in real wires'
      ]
    },
    initialCircuit: {
      voltage: 3.0,
      forwardVoltage: 2.0,
      resistance: 220,
      power: false,
      polarity: 'forward',
      materialId: 'copper'
    },
    overviewContent: {
      th: `วัสดุแต่ละชนิดยอมให้ประจุไฟฟ้าเคลื่อนที่ผ่านได้ง่ายยากต่างกัน

### ประเภทของวัสดุในบทเรียนนี้
1. **ตัวนำไฟฟ้าที่ดี (Good Conductors)**: เช่น **ทองแดง ($R \\approx 0.05\\,\\Omega$)** มีอิเล็กตรอนอิสระจำนวนมาก ยอมให้กระแสไหลผ่านได้ดีเยี่ยม
2. **ตัวนำที่มีความต้านทาน (Resistive Conductors)**: เช่น **ไส้ดินสอกราไฟต์ ($R \\approx 180\\,\\Omega$)** นำไฟฟ้าได้แต่มีความต้านทานร่วมด้วย ทำให้กระแสรวมลดลงและหลอด LED สว่างน้อยกว่าทองแดง
3. **ฉนวนไฟฟ้า (Insulators)**: เช่น **พลาสติก ไม้แห้ง และยางลบ ($R \\to \\infty$)** กั้นไม่ให้กระแสไฟฟ้าไหลผ่านในระดับแรงดันต่ำนี้ ($I = 0\\text{ mA}$)`,
      en: `Different materials allow electric charge to move with vastly different ease.

### Material Categories in This Lab
1. **Good Conductors**: Such as **Copper ($R \\approx 0.05\\,\\Omega$)**, possessing abundant free electrons for minimal voltage loss.
2. **Resistive Conductors**: Such as **Pencil Graphite ($R \\approx 180\\,\\Omega$)**, which conducts current but adds noticeable series resistance, reducing circuit current.
3. **Insulators**: Such as **Plastic, Dry Wood, and Rubber ($R \\to \\infty$)**, which block current flow in this low-voltage circuit ($I = 0\\text{ mA}$).`
    },
    teacherNotes: {
      th: `1. ไส้ดินสอทำจากกราไฟต์ (คาร์บอน) ผสมดินเหนียว จึงนำไฟฟ้าได้แต่มีความต้านทานสูงกว่าโลหะอย่างชัดเจน เหมาะสำหรับให้นักเรียนเห็นว่า "ตัวนำไม่ได้นำไฟฟ้าเท่ากันทุกชนิด"
2. เชื่อมโยงกับสายไฟจริง: แกนในทำจากทองแดงเพื่อนำกระแส ส่วนเปลือกหุ้มทำจากพลาสติกพีวีซีเพื่อเป็นฉนวนป้องกันไฟดูดและป้องกันการลัดวงจร`,
      en: `1. Pencil "lead" is actually graphite (carbon) mixed with clay, making it a great classroom example showing that conductivity is a continuous spectrum rather than purely binary.
2. Connect to physical jumper wires: copper inner core for conduction, PVC outer jacket for insulation.`
    },
    inquiry: {
      predictQuestion: {
        th: 'หากเรานำ "ไส้ดินสอกราไฟต์" และ "ไม้บรรทัดพลาสติก" มาหนีบในช่องทดสอบตามลำดับ ผลลัพธ์จะเป็นอย่างไรเมื่อเปิดไฟ?',
        en: 'If we clip "Pencil Graphite" and then a "Plastic Ruler" into the test gap with power ON, what will happen?'
      },
      predictOptions: {
        A: { th: 'ทั้งไส้ดินสอและพลาสติกไม่นำไฟฟ้าทั้งคู่ เพราะไม่ใช่โลหะ', en: 'Neither conducts because neither is a metal.' },
        B: { th: 'ไส้ดินสอกราไฟต์นำไฟฟ้าได้ (มีกระแสไหลและหลอดติด) ส่วนพลาสติกเป็นฉนวน (กระแส 0 mA)', en: 'Pencil graphite conducts (current flows and LED lights), whereas plastic is an insulator (0 mA).' },
        C: { th: 'พลาสติกนำไฟฟ้าได้ดีกว่าทองแดง', en: 'Plastic conducts better than copper.' }
      },
      correctPrediction: 'B',
      experimentSteps: [
        { th: 'เปิดสวิตช์ไฟแล้วเลือกวัสดุ "แผ่นทองแดง" และ "ไส้ดินสอกราไฟต์" เปรียบเทียบค่ากระแส', en: 'Turn Power ON and test "Copper Strip" and "Pencil Graphite" to compare current' },
        { th: 'เปลี่ยนวัสดุเป็น "พลาสติก", "ไม้แห้ง" หรือ "ยางลบ" แล้วสังเกตค่ากระแส', en: 'Switch to "Plastic", "Dry Wood", or "Rubber" and observe the current' }
      ],
      obsRowLabels: {
        row1: { th: 'วัสดุตัวนำ (ทองแดง / กราไฟต์)', en: 'Conductive Sample (Copper / Graphite)' },
        row2: { th: 'วัสดุฉนวน (พลาสติก / ไม้ / ยาง)', en: 'Insulating Sample (Plastic / Wood / Rubber)' }
      },
      transferQuestion: {
        th: 'คำถามเชื่อมโยง: เหตุใดสายไฟที่ใช้ต่อวงจรจึงต้องมีแกนในเป็นทองแดงและหุ้มด้านนอกด้วยพลาสติก?',
        en: 'Transfer Question: Why are hookup wires built with a copper core wrapped in a plastic jacket?'
      },
      transferOptions: {
        A: { th: 'ทองแดงทำหน้าที่เป็นตัวนำให้กระแสไหลผ่านได้ดี ส่วนพลาสติกเป็นฉนวนป้องกันการรั่วไหลหรือลัดวงจร', en: 'Copper provides a low-resistance path for current, while plastic insulates and prevents short circuits.' },
        B: { th: 'พลาสติกช่วยนำกระแสไฟฟ้าแทนทองแดงเมื่อเปิดไฟแรงสูง', en: 'The plastic jacket carries the electric current instead of the copper.' },
        C: { th: 'เพื่อเพิ่มความต้านทานของสายไฟให้สูงขึ้นเป็นอนันต์', en: 'To make the wire resistance infinite.' }
      },
      correctTransfer: 'A',
      transferFeedbackCorrect: {
        th: 'ถูกต้อง! ทองแดงนำกระแสไฟฟ้าด้วยความต้านทานต่ำมาก ส่วนเปลือกพลาสติกเป็นฉนวนป้องกันไฟรั่วและการลัดวงจร',
        en: 'Correct! Copper conducts current with negligible resistance, while the plastic jacket insulates the wire.'
      },
      transferFeedbackRetry: {
        th: 'ลองทบทวนสมบัติของทองแดง (ตัวนำ) และพลาสติก (ฉนวน) จากตารางผลการทดลองอีกครั้ง',
        en: 'Review your test results comparing copper (conductor) and plastic (insulator).'
      },
      explainPrompt: {
        th: 'อธิบายเปรียบเทียบผลที่สังเกตได้ระหว่าง แผ่นทองแดง ไส้ดินสอกราไฟต์ และพลาสติก:',
        en: 'Compare and explain your observations for Copper, Pencil Graphite, and Plastic:'
      },
      teacherAnswerSummary: {
        th: 'ขั้นที่ 1: ข้อ B (กราไฟต์นำไฟฟ้าได้ ~2.50 mA, พลาสติก 0 mA) · ขั้นที่ 4: ข้อ A (แกนทองแดงนำไฟฟ้า เปลือกพลาสติกเป็นฉนวน)',
        en: 'Step 1: Option B (graphite conducts ~2.50 mA, plastic 0 mA) · Step 4: Option A (copper core conducts, plastic insulates)'
      }
    }
  },

  // ==========================================================================
  // 3. OHM'S LAW WITH A RESISTOR
  // ==========================================================================
  {
    id: 'ohms-law-resistor',
    order: 3,
    category: 'resistors',
    titles: {
      th: '3. กฎของโอห์มกับตัวต้านทาน (Ohm\'s Law with a Resistor)',
      en: '3. Ohm\'s Law with a Resistor'
    },
    subtitles: {
      th: 'ศึกษาความสัมพันธ์เชิงเส้นระหว่างแรงดัน (V) กระแส (I) และความต้านทาน (R) พร้อมแถบสีตัวต้านทาน',
      en: 'Investigate the linear relationship I = V / R and read EIA 4-band resistor color codes'
    },
    objectives: {
      th: [
        'คำนวณหากระแสไฟฟ้าจากสมการกฎของโอห์ม $I = V / R$ ได้อย่างแม่นยำ',
        'อธิบายแนวโน้มการเปลี่ยนแปลงของกระแสเมื่อเพิ่มแรงดัน หรือเมื่อเพิ่มความต้านทานได้',
        'อ่านค่าแถบสี 4 แถบของตัวต้านทานมาตรฐานที่ใช้ในห้องเรียนได้'
      ],
      en: [
        'Calculate circuit current accurately using Ohm\'s Law ($I = V / R$)',
        'Describe how current changes when voltage increases or when resistance increases',
        'Read standard 4-band resistor color codes corresponding to classroom resistor values'
      ]
    },
    initialCircuit: {
      voltage: 3.0,
      forwardVoltage: 0,
      resistance: 300,
      power: false,
      polarity: 'forward'
    },
    overviewContent: {
      th: `**กฎของโอห์ม (Ohm's Law)** ระบุว่า กระแสไฟฟ้า ($I$) ที่ไหลผ่านตัวต้านทานแปรผันตรงกับความต่างศักย์ไฟฟ้า ($V$) และแปรผกผันกับความต้านทาน ($R$):

$$I = \\frac{V}{R}$$

### สมบัติสำคัญของตัวต้านทาน
* **ไม่มีขั้ว (Non-polarized)**: ตัวต้านทานนำกระแสได้เท่ากันทั้งสองทิศทาง ไม่ว่าจะหันด้านใด
* **การอ่านแถบสี 4 แถบ**: แถบที่ 1 และ 2 คือตัวเลขหลักที่หนึ่งและสอง แถบที่ 3 คือตัวคูณ ($10^n$) และแถบที่ 4 (สีทอง) คือค่าความคลาดเคลื่อน $\\pm 5\\%$`,
      en: `**Ohm's Law** states that the current ($I$) through an ohmic resistor is directly proportional to the applied voltage ($V$) and inversely proportional to resistance ($R$):

$$I = \\frac{V}{R}$$

### Key Resistor Properties
* **Bidirectional (Non-polarized)**: A resistor conducts identically regardless of which way its leads are oriented.
* **4-Band Color Code**: Band 1 and Band 2 represent the first two digits, Band 3 is the decimal multiplier, and Band 4 (Gold) indicates $\\pm 5\\%$ tolerance.`
    },
    teacherNotes: {
      th: `1. ให้นักเรียนสังเกตกราฟ $I\\text{–}V$ และแถบสีบนตัวต้านทานที่จะเปลี่ยนสีตามค่าโอห์มจริงทันทีที่เลื่อนสไลเดอร์
2. ชี้ให้เห็นว่าเมื่อ $V$ คงที่ การเพิ่ม $R$ เป็น 2 เท่า จะทำให้กระแส $I$ ลดลงเหลือครึ่งหนึ่ง`,
      en: `1. Have students observe both the live $I\\text{–}V$ plot and the realistic 4-band color rings updating dynamically as resistance changes.
2. Emphasize inverse proportionality: doubling $R$ at constant $V$ halves the current $I$.`
    },
    inquiry: {
      predictQuestion: {
        th: 'ที่แรงดันคงที่ 3.00 V หากเราเปลี่ยนตัวต้านทานจาก 300 Ω เป็น 600 Ω (เพิ่มขึ้น 2 เท่า) กระแสไฟฟ้าในวงจรจะเปลี่ยนไปอย่างไร?',
        en: 'At a constant 3.00 V supply, if resistance is doubled from 300 Ω to 600 Ω, how will the current change?'
      },
      predictOptions: {
        A: { th: 'กระแสไฟฟ้าเพิ่มขึ้นเป็น 2 เท่า (จาก 10 mA เป็น 20 mA)', en: 'Current doubles (from 10 mA to 20 mA).' },
        B: { th: 'กระแสไฟฟ้าลดลงเหลือครึ่งหนึ่ง (จาก 10.00 mA เหลือ 5.00 mA)', en: 'Current is halved (from 10.00 mA to 5.00 mA).' },
        C: { th: 'กระแสไฟฟ้าเท่าเดิมที่ 10.00 mA', en: 'Current stays unchanged at 10.00 mA.' }
      },
      correctPrediction: 'B',
      experimentSteps: [
        { th: 'เปิดสวิตช์ไฟที่ 3.00 V, 300 Ω แล้วสังเกตค่ากระแสเริ่มต้น (10.00 mA)', en: 'Turn Power ON at 3.00 V, 300 Ω and observe initial current (10.00 mA)' },
        { th: 'เลื่อนปรับค่าตัวต้านทานหรือแรงดัน แล้วสังเกตการเปลี่ยนค่ากระแสและแถบสีตัวต้านทาน', en: 'Adjust resistance or voltage and observe current and resistor color bands' }
      ],
      obsRowLabels: {
        row1: { th: 'ค่าเริ่มต้น (เช่น 3.0 V, 300 Ω)', en: 'Baseline Setting (e.g., 3.0 V, 300 Ω)' },
        row2: { th: 'หลังปรับเปลี่ยนค่า (V หรือ R ใหม่)', en: 'Adjusted Setting (New V or R)' }
      },
      transferQuestion: {
        th: 'คำถามเชื่อมโยง: หากต้องการให้มีกระแสไหล 15.00 mA เมื่อใช้แหล่งจ่าย 4.50 V จะต้องใช้ตัวต้านทานกี่โอห์ม?',
        en: 'Transfer Question: To obtain a current of 15.00 mA from a 4.50 V supply, what resistance value is required?'
      },
      transferOptions: {
        A: { th: '300 Ω (เพราะ R = V / I = 4.50 V / 0.015 A = 300 Ω)', en: '300 Ω (because R = V / I = 4.50 V / 0.015 A = 300 Ω)' },
        B: { th: '100 Ω', en: '100 Ω' },
        C: { th: '900 Ω', en: '900 Ω' }
      },
      correctTransfer: 'A',
      transferFeedbackCorrect: {
        th: 'ถูกต้อง! จาก R = V / I = 4.50 / 0.015 = 300 Ω (แถบสี ส้ม-ดำ-น้ำตาล-ทอง)',
        en: 'Correct! From R = V / I = 4.50 / 0.015 = 300 Ω (Orange-Black-Brown-Gold).'
      },
      transferFeedbackRetry: {
        th: 'ลองใช้สมการ R = V / I โดยแทน V = 4.50 V และ I = 0.015 A',
        en: 'Use R = V / I with V = 4.50 V and I = 0.015 A.'
      },
      explainPrompt: {
        th: 'สรุปความสัมพันธ์ระหว่างแรงดัน (V) ความต้านทาน (R) และกระแสไฟฟ้า (I) จากการทดลอง:',
        en: 'Summarize how voltage (V) and resistance (R) affect current (I) based on your measurements:'
      },
      teacherAnswerSummary: {
        th: 'ขั้นที่ 1: ข้อ B (เพิ่ม R เป็น 2 เท่า กระแสลดลงครึ่งหนึ่งเหลือ 5.00 mA) · ขั้นที่ 4: ข้อ A (R = 4.5 V / 0.015 A = 300 Ω)',
        en: 'Step 1: Option B (doubling R halves current to 5.00 mA) · Step 4: Option A (R = 4.5 V / 0.015 A = 300 Ω)'
      }
    }
  },

  // ==========================================================================
  // 4. LED POLARITY (P0 CORE LESSON)
  // ==========================================================================
  {
    id: 'led-polarity',
    order: 4,
    category: 'leds',
    titles: {
      th: '4. ขั้วของหลอด LED (LED Polarity)',
      en: '4. LED Polarity'
    },
    subtitles: {
      th: 'เรียนรู้ทิศทางการนำกระแสของไดโอดเปล่งแสงและขั้วแอโนด–แคโทด',
      en: 'Learn how light-emitting diodes conduct current in one direction only'
    },
    objectives: {
      th: [
        'ระบุขั้วแอโนด (+) และแคโทด (−) จากสัญลักษณ์วงจร รอยบากแบนที่ขอบหลอด โครงโลหะภายใน และความยาวขาได้',
        'อธิบายผลของการต่อแบบไบแอสตรง (Forward Bias) และไบแอสกลับ (Reverse Bias) ต่อกระแสไฟฟ้าได้',
        'คำนวณหากระแสไฟฟ้าและแรงดันตกคร่อมด้วยกฎแรงดันของเคอร์ชอฟฟ์ (KVL) และกฎของโอห์มได้'
      ],
      en: [
        'Identify the Anode (+) and Cathode (−) by schematic symbol, flat housing edge, internal anvil/post, and lead length',
        'Explain the effect of forward bias and reverse bias on circuit current flow',
        'Calculate circuit current and voltage drops using Kirchhoff\'s Voltage Law (KVL) and Ohm\'s Law'
      ]
    },
    initialCircuit: {
      voltage: 3.0,
      forwardVoltage: 2.0,
      resistance: 220,
      power: false,
      polarity: 'forward'
    },
    overviewContent: {
      th: `หลอด LED (Light Emitting Diode) เป็นอุปกรณ์สารกึ่งตัวนำประเภทไดโอด ยอมให้กระแสไฟฟ้าไหลผ่านได้ในทิศทางเดียวจากขั้วแอโนดไปยังแคโทด เปรียบเสมือนวาล์วทางเดียวทางไฟฟ้า

### การสังเกตขั้วของ LED จากโครงสร้างจริง
* **แอโนด (Anode / +)**: ขั้วบวก โครงโลหะภายในชิ้นเล็ก (Post) และในหลอดใหม่ที่ยังไม่ตัดขาจะมี **ขายาวกว่า**
* **แคโทด (Cathode / −)**: ขั้วลบ มี **รอยบากแบน (Flat Edge)** ที่ขอบพลาสติกฐานหลอด โครงโลหะภายในเป็นถ้วยสะท้อนแสงชิ้นใหญ่ (Anvil) และมีขาสั้นกว่า

### การทำงานในวงจร
1. **ต่อถูกขั้ว / ไบแอสตรง (Forward Bias)**: ต่อขั้วบวกเข้าแอโนด (+) และขั้วลบเข้าแคโทด (−) ผ่านตัวต้านทานจำกัดกระแส เมื่อ $V_s > V_f$ กระแสจะไหลครบวงจรและหลอดเปล่งแสง
2. **ต่อกลับขั้ว / ไบแอสกลับ (Reverse Bias)**: หันแคโทดเข้าด้านขั้วบวก ไดโอดจะกั้นกระแสไว้ ทำให้กระแสในแบบจำลองแรงดันต่ำนี้เป็นศูนย์และหลอดไม่สว่าง`,
      en: `An LED (Light Emitting Diode) is a semiconductor diode that allows conventional current to flow in one direction only—from Anode to Cathode—acting like an electrical one-way check valve.

### Physical LED Terminal Identification
* **Anode (+)**: Positive terminal with the smaller internal post and (on untrimmed leads) the **longer leg**.
* **Cathode (−)**: Negative terminal marked by the **flat edge notch** on the plastic flange, the larger internal anvil reflector cup, and the shorter leg.

### Circuit Behavior
1. **Forward Bias**: Anode (+) toward positive supply, Cathode (−) toward negative through a resistor. When $V_s > V_f$, current conducts and light is emitted.
2. **Reverse Bias**: Connected backward. The diode blocks conduction in this low-voltage model ($I \\approx 0\\text{ mA}$), keeping the LED dark.`
    },
    teacherNotes: {
      th: `1. ความเข้าใจคลาดเคลื่อนที่พบบ่อย: นักเรียนมักคิดว่า LED เหมือนหลอดไฟไส้ที่สลับขั้วแล้วยังสว่าง หรือคิดว่าเมื่อปิดสวิตช์แล้วแรงดันทุกจุดเป็นศูนย์ทั้งหมด
2. การระบุขั้วอุปกรณ์จริง: ย้ำให้นักเรียนสังเกต "รอยบากแบนที่ขอบหลอด" และ "ถ้วยสะท้อนแสง Anvil ด้านแคโทด" ควบคู่กับความยาวขา`,
      en: `1. Common Misconceptions: Students often assume LEDs behave like symmetric incandescent lamps, or believe that opening a switch removes voltage from the battery terminals.
2. Physical Identification: Emphasize checking the flat rim notch and internal anvil cup rather than relying solely on lead length.`
    },
    inquiry: {
      predictQuestion: {
        th: 'ก่อนเปิดไฟทดลอง คุณคิดว่าถ้าเรากลับขั้วหลอด LED (หันขายาวไปทางขั้วลบ) แล้วเปิดสวิตช์ จะเกิดอะไรขึ้น?',
        en: 'Before turning power on: what do you predict will happen if the LED is reversed (long leg toward minus) when the switch is closed?'
      },
      predictOptions: {
        A: { th: 'หลอด LED สว่างตามปกติ เพราะวงจรยังคงเชื่อมต่อครบรอบ', en: 'The LED lights up normally because the loop is still connected.' },
        B: { th: 'หลอด LED ไม่สว่าง เพราะไดโอดยอมให้กระแสไหลผ่านได้ทิศทางเดียว', en: 'The LED stays off because a diode conducts current in one direction only.' },
        C: { th: 'หลอด LED สว่างขึ้นเป็นสองเท่า', en: 'The LED shines twice as brightly.' }
      },
      correctPrediction: 'B',
      experimentSteps: [
        { th: 'เปิดสวิตช์ไฟเพื่อให้วงจรทำงานและสังเกตผลเมื่อต่อถูกขั้ว (ขายาวเข้าบวก)', en: 'Turn Power ON and observe Forward Bias (Anode + toward positive)' },
        { th: 'กดสลับขั้ว LED เป็นต่อกลับขั้ว (ขายาวเข้าลบ) แล้วสังเกตกระแสและหลอด LED', en: 'Flip LED to Reverse Bias (Anode + toward negative) and observe current and LED' }
      ],
      obsRowLabels: {
        row1: { th: 'ต่อถูกขั้ว (ไบแอสตรง)', en: 'Forward Bias' },
        row2: { th: 'ต่อกลับขั้ว (ไบแอสกลับ)', en: 'Reverse Bias' }
      },
      transferQuestion: {
        th: 'คำถามเชื่อมโยง: เพราะเหตุใดตัวต้านทานหรือหลอดไฟไส้จึงต่อสลับขั้วแล้วยังนำกระแสได้ แต่หลอด LED จึงนำกระแสได้เพียงทิศทางเดียว?',
        en: 'Transfer Question: Why does a standard resistor or filament lamp conduct in either orientation, whereas an LED conducts in only one direction?'
      },
      transferOptions: {
        A: { th: 'เพราะตัวต้านทานและหลอดไส้เป็นตัวนำที่ยอมให้กระแสไหลได้สองทิศทาง ส่วน LED เป็นไดโอดสารกึ่งตัวนำที่กั้นกระแสย้อนกลับ', en: 'A resistor conducts bidirectionally, whereas an LED is a semiconductor diode that blocks reverse current.' },
        B: { th: 'เพราะตัวต้านทานสามารถผลิตแรงดันไฟฟ้าเองได้เมื่อกลับขั้ว', en: 'A resistor generates its own voltage when flipped.' },
        C: { th: 'เพราะหลอด LED ไม่มีขาโลหะเชื่อมต่อกับวงจร', en: 'An LED has no electrical terminals.' }
      },
      correctTransfer: 'A',
      transferFeedbackCorrect: {
        th: 'ถูกต้อง! ไดโอดเปล่งแสง (LED) มีรอยต่อสารกึ่งตัวนำที่นำกระแสเมื่อไบแอสตรงและกั้นกระแสเมื่อไบแอสกลับ ต่างจากตัวต้านทานที่นำกระแสได้ทั้งสองทิศทาง',
        en: 'Correct! An LED is a P-N junction diode that conducts under forward bias and blocks conduction under reverse bias, unlike a bidirectional resistor.'
      },
      transferFeedbackRetry: {
        th: 'ยังไม่ตรงหลักการ ลองเปรียบเทียบสมบัติการนำกระแสทิศทางเดียวของไดโอดกับตัวต้านทานอีกครั้ง',
        en: 'Not quite. Compare the one-way conduction property of a diode with a symmetric resistor.'
      },
      explainPrompt: {
        th: 'สรุปคำอธิบายของคุณเอง (สำหรับครูตรวจทาน): เชื่อมโยงทิศทางการต่อขั้วของ LED กับค่ากระแสไฟฟ้าและแสงที่สังเกตได้',
        en: 'Write your explanation (for teacher review): Connect LED terminal orientation to the observed current and light.'
      },
      teacherAnswerSummary: {
        th: 'ขั้นที่ 1: ข้อ B (ไบแอสกลับกั้นกระแส I ≈ 0 mA) · ขั้นที่ 4: ข้อ A (LED เป็นไดโอดนำกระแสทางเดียว ต่างจากตัวต้านทาน)',
        en: 'Step 1: Option B (reverse bias blocks conduction I ≈ 0 mA) · Step 4: Option A (LED is a one-way diode unlike a symmetric resistor)'
      }
    }
  },

  // ==========================================================================
  // 5. CURRENT-LIMITING RESISTOR
  // ==========================================================================
  {
    id: 'current-limiting-resistor',
    order: 5,
    category: 'leds',
    titles: {
      th: '5. ตัวต้านทานจำกัดกระแส (Current-Limiting Resistor)',
      en: '5. Current-Limiting Resistor'
    },
    subtitles: {
      th: 'เลือกค่าตัวต้านทานที่เหมาะสมเพื่อควบคุมกระแส LED ให้อยู่ในเกณฑ์ปลอดภัย',
      en: 'Select the right series resistor to keep LED current within safe classroom limits'
    },
    objectives: {
      th: [
        'อธิบายหน้าที่ของตัวต้านทานอนุกรมในการจำกัดกระแสไม่ให้เกินพิกัดของหลอด LED ได้',
        'คำนวณหาค่าความต้านทานที่เหมาะสมจาก $R = (V_s - V_f) / I$ เมื่อกำหนดแรงดันแหล่งจ่ายและสีของ LED ได้',
        'ระบุสภาวะกระแสเกินเกณฑ์เตือนของแบบจำลอง (> 20 mA) เมื่อใช้ความต้านทานต่ำเกินไปได้'
      ],
      en: [
        'Explain why a series resistor is essential to prevent LED overcurrent',
        'Calculate an appropriate resistor value using $R = (V_s - V_f) / I$ for a given supply and LED forward voltage',
        'Identify model overcurrent conditions (> 20 mA) when series resistance is too small'
      ]
    },
    initialCircuit: {
      voltage: 4.5,
      forwardVoltage: 2.0,
      resistance: 470,
      power: false,
      polarity: 'forward',
      ledColor: 'red'
    },
    overviewContent: {
      th: `เมื่อแรงดันแหล่งจ่าย ($V_s$) สูงกว่าแรงดันตกคร่อมของหลอด LED ($V_f$) แรงดันส่วนที่เกิน ($V_R = V_s - V_f$) จะต้องตกคร่อมที่ **ตัวต้านทานจำกัดกระแส**

$$I = \\frac{V_s - V_f}{R}$$

### เกณฑ์กระแสสำหรับการเรียนรู้ในห้องเรียน
* **ค่าเริ่มต้นสำหรับแหล่งจ่าย 4.5 V**: ใช้ตัวต้านทาน **$470\\,\\Omega$** (เหลือง-ม่วง-น้ำตาล-ทอง) ให้กระแสปลอดภัยประมาณ $5.32\\text{ mA}$
* **เป้าหมายความสว่างในชั้นเรียน**: ประมาณ **$10\\text{ mA}$** (เช่น $4.5\\text{ V}, 220\\,\\Omega \\to 11.36\\text{ mA}$)
* **เกณฑ์เตือนกระแสเกินในแบบจำลอง**: เกิน **$20\\text{ mA}$** (เช่น $4.5\\text{ V}, 100\\,\\Omega \\to 25.00\\text{ mA}$) ซึ่งเสี่ยงทำให้หลอด LED จริงร้อนจัดและเสียหายได้`,
      en: `Whenever the supply voltage ($V_s$) exceeds the LED forward voltage ($V_f$), the remaining voltage ($V_R = V_s - V_f$) drops across the **series current-limiting resistor**:

$$I = \\frac{V_s - V_f}{R}$$

### Classroom Current Benchmarks
* **4.5 V Default Profile**: A **$470\\,\\Omega$** resistor (Yellow-Violet-Brown-Gold) limits current to a safe $5.32\\text{ mA}$.
* **Classroom Target**: Around **$10\\text{ mA}$** (e.g., $4.5\\text{ V}, 220\\,\\Omega \\to 11.36\\text{ mA}$).
* **Model Overcurrent Warning**: Above **$20\\text{ mA}$** (e.g., $4.5\\text{ V}, 100\\,\\Omega \\to 25.00\\text{ mA}$), which risks damaging a physical LED.`
    },
    teacherNotes: {
      th: `1. ย้ำว่าเกณฑ์เป้าหมาย 10 mA และเกณฑ์เตือน 20 mA เป็นค่ามาตรฐานเพื่อการฝึกในชั้นเรียน หากใช้งานอุปกรณ์จริงต้องเปิดดู Datasheet ของรุ่นนั้นเสมอ
2. ให้นักเรียนทดลองลดตัวต้านทานลงเหลือ 100 Ω ที่แหล่งจ่าย 4.5 V เพื่อสังเกตการแจ้งเตือนกระแสเกิน (25.00 mA)`,
      en: `1. Note that 10 mA target and 20 mA warning are conservative classroom model thresholds; real hardware designs must consult the component datasheet.
2. Have students test 4.5 V with 100 Ω (25.00 mA) vs 470 Ω (5.32 mA) to see how the resistor protects the LED.`
    },
    inquiry: {
      predictQuestion: {
        th: 'เมื่อใช้แหล่งจ่าย 4.50 V กับ LED สีแดง (Vf = 2.00 V) หากเปลี่ยนตัวต้านทานจาก 470 Ω ลดลงเหลือ 100 Ω จะเกิดอะไรขึ้น?',
        en: 'With a 4.50 V supply and a Red LED (Vf = 2.00 V), what happens if the resistor is reduced from 470 Ω to 100 Ω?'
      },
      predictOptions: {
        A: { th: 'กระแสจะลดลงและหลอด LED มืดลง', en: 'Current decreases and the LED dims.' },
        B: { th: 'กระแสจะพุ่งสูงขึ้นเป็น 25.00 mA ซึ่งเกินเกณฑ์เตือน 20 mA ของแบบจำลอง', en: 'Current rises to 25.00 mA, exceeding the 20 mA model overcurrent warning threshold.' },
        C: { th: 'แรงดันตกคร่อมตัวต้านทานกลายเป็น 0 V', en: 'Resistor voltage drop becomes 0 V.' }
      },
      correctPrediction: 'B',
      experimentSteps: [
        { th: 'เปิดสวิตช์ที่ค่าเริ่มต้น 4.50 V, 470 Ω สังเกตกระแสที่ปลอดภัย (5.32 mA)', en: 'Turn Power ON at default 4.50 V, 470 Ω and observe safe current (5.32 mA)' },
        { th: 'ลดความต้านทานลงมาที่ 100 Ω แล้วสังเกตค่ากระแส (25.00 mA) และคำเตือนกระแสเกิน', en: 'Reduce resistance to 100 Ω and observe current (25.00 mA) and overcurrent warning' }
      ],
      obsRowLabels: {
        row1: { th: 'ตัวต้านทานค่าปลอดภัย (เช่น 470 Ω หรือ 220 Ω)', en: 'Safe Resistor (e.g., 470 Ω or 220 Ω)' },
        row2: { th: 'ตัวต้านทานต่ำเกินไป (100 Ω ที่ 4.5 V)', en: 'Low Resistor / Overcurrent (100 Ω at 4.5 V)' }
      },
      transferQuestion: {
        th: 'คำถามเชื่อมโยง: หากใช้แบตเตอรี่ 4.50 V กับ LED สีแดง (Vf = 2.00 V) และต้องการจำกัดกระแสไม่ให้เกิน 12 mA ควรเลือกตัวต้านทานมาตรฐานค่าใดระหว่าง 100 Ω กับ 220 Ω?',
        en: 'Transfer Question: With a 4.50 V battery and Red LED (Vf = 2.00 V), which resistor keeps current below 12 mA: 100 Ω or 220 Ω?'
      },
      transferOptions: {
        A: { th: 'เลือก 220 Ω เพราะให้กระแส (4.5 − 2.0) / 220 ≈ 11.36 mA ซึ่งอยู่ในช่วงปลอดภัย', en: 'Choose 220 Ω because (4.5 − 2.0) / 220 ≈ 11.36 mA, which stays safely below 12 mA.' },
        B: { th: 'เลือก 100 Ω เพราะให้กระแส 25.00 mA', en: 'Choose 100 Ω because it gives 25.00 mA.' },
        C: { th: 'ไม่ต้องใส่ตัวต้านทานเลย', en: 'Use no resistor at all.' }
      },
      correctTransfer: 'A',
      transferFeedbackCorrect: {
        th: 'ถูกต้อง! ตัวต้านทาน 220 Ω จำกัดกระแสไว้ที่ 11.36 mA ในขณะที่ 100 Ω ทำให้กระแสสูงถึง 25.00 mA',
        en: 'Correct! A 220 Ω resistor limits current to 11.36 mA, whereas 100 Ω allows 25.00 mA.'
      },
      transferFeedbackRetry: {
        th: 'ลองคำนวณ I = (4.5 − 2.0) / R สำหรับแต่ละค่าเพื่อหาค่าที่กระแสไม่เกิน 12 mA',
        en: 'Calculate I = (4.5 − 2.0) / R for each option to see which keeps current under 12 mA.'
      },
      explainPrompt: {
        th: 'อธิบายเหตุผลว่าทำไมเราจึงไม่ควรต่อหลอด LED เข้ากับแบตเตอรี่ 4.5 V โดยตรงโดยไม่มีตัวต้านทาน:',
        en: 'Explain why we should not connect a 2.0 V LED directly across a 4.5 V battery without a resistor:'
      },
      teacherAnswerSummary: {
        th: 'ขั้นที่ 1: ข้อ B (100 Ω ที่ 4.5 V ให้กระแส 25.00 mA เกินเกณฑ์ 20 mA) · ขั้นที่ 4: ข้อ A (220 Ω ให้กระแส 11.36 mA)',
        en: 'Step 1: Option B (100 Ω at 4.5 V yields 25.00 mA overcurrent) · Step 4: Option A (220 Ω yields 11.36 mA)'
      }
    }
  },

  // ==========================================================================
  // 6. BREADBOARD CONNECTIVITY
  // ==========================================================================
  {
    id: 'breadboard-connectivity',
    order: 6,
    category: 'basics',
    titles: {
      th: '6. การต่อวงจรบนเบรดบอร์ด (Breadboard Connectivity)',
      en: '6. Breadboard Connectivity'
    },
    subtitles: {
      th: 'ทำความเข้าใจแถบโลหะนำไฟฟ้าภายในเบรดบอร์ด ร่องกลางแยกฝั่ง และการต่อวงจรไม่ให้ลัดวงจร',
      en: 'Master internal breadboard spring strips, the center IC trench gap, and valid series placement'
    },
    objectives: {
      th: [
        'อธิบายทิศทางการเชื่อมต่อของแถบโลหะใต้รูเบรดบอร์ด (แถบแนวตั้ง 5 รู A–E, F–J และรางไฟแนวนอน +/−) ได้',
        'วิเคราะห์สาเหตุที่วงจรไม่ทำงานเมื่อเสียบขาอุปกรณ์ลงในแถบเดียวกัน (ลัดวงจรขา) หรือข้ามร่องกลางโดยไม่เชื่อมสายได้',
        'เชื่อมโยงจุดต่อบนเบรดบอร์ดเข้ากับแผนภาพวงจรไฟฟ้า (Electrical Nets) ที่สมมูลกันได้'
      ],
      en: [
        'Describe internal breadboard conductor layout (5-hole vertical terminal strips A–E, F–J and horizontal power rails)',
        'Diagnose why plugging both LED leads into the same 5-hole strip shorts the LED or why crossing the center trench opens the loop',
        'Map physical breadboard hole coordinates to their equivalent schematic electrical nets'
      ]
    },
    initialCircuit: {
      voltage: 3.0,
      forwardVoltage: 2.0,
      resistance: 220,
      power: false,
      polarity: 'forward',
      breadboardPreset: 'valid-series'
    },
    overviewContent: {
      th: `**เบรดบอร์ด (Solderless Breadboard)** ช่วยให้เราประกอบวงจรอิเล็กทรอนิกส์ได้โดยไม่ต้องบัดกรี โดยมีคลิปโลหะสปริงซ่อนอยู่ใต้รูพลาสติก

### โครงสร้างการเชื่อมต่อภายในเบรดบอร์ด
1. **รางจ่ายไฟด้านบนและล่าง (Power Rails + / −)**: เชื่อมต่อกันใน **แนวนอน** ตลอดแถวสีแดง (+) และสีน้ำเงิน (−)
2. **แถบต่ออุปกรณ์ (Terminal Strips A–E และ F–J)**: รูทั้ง 5 รูในคอลัมน์แนวตั้งเดียวกัน (เช่น **A12, B12, C12, D12, E12**) เชื่อมถึงกันด้วยแถบโลหะชิ้นเดียว
3. **ร่องกลาง (Center Trench Gap)**: แยกฝั่งบน (**A–E**) ออกจากฝั่งล่าง (**F–J**) อย่างเด็ดขาด ไม่เชื่อมถึงกัน

### ข้อผิดพลาดที่พบบ่อยในการเสียบอุปกรณ์
* **เสียบขา LED ทั้ง 2 ขาในคอลัมน์เดียวกัน (เช่น C12 กับ D12)**: แถบโลหะคอลัมน์ 12 จะลัดวงจรขาแอโนดและแคโทดเข้าด้วยกัน ทำให้กระแสไหลอ้อมผ่านแถบโลหะใต้บอร์ดแทนที่จะไหลผ่านหลอด LED!
* **เสียบข้ามร่องกลางโดยไม่มีสายเชื่อม (เช่น E12 กับ F12)**: วงจรขาดเพราะร่องกลางแยกแถบโลหะออกจากกัน`,
      en: `A **Solderless Breadboard** allows rapid circuit prototyping using hidden nickel-silver spring clips beneath the grid of holes.

### Internal Conductor Architecture
1. **Horizontal Power Rails (+ / −)**: Run horizontally along the top and bottom edges (marked by red $+$ and blue $-$ lines).
2. **5-Hole Vertical Terminal Strips (A–E and F–J)**: All 5 holes in a single vertical column on one side of the trench (e.g., **A12, B12, C12, D12, E12**) share a single metal clip (one electrical node/net).
3. **Center Trench Gap**: Electrically isolates the top rows (**A–E**) from the bottom rows (**F–J**).

### Classic Breadboard Wiring Mistakes
* **Same-Strip Short (e.g., LED in C12 and D12)**: Because C12 and D12 are on the same metal strip, the strip shorts the LED terminals together. Current bypasses the LED completely!
* **Unbridged Center Gap (e.g., E12 to F12)**: Leaves an open break across the center trench.`
    },
    teacherNotes: {
      th: `1. บทเรียนนี้แก้ปัญหาที่พบบ่อยที่สุดในชั้นเรียนปฏิบัติการจริง คือ นักเรียนเสียบขาตัวต้านทานหรือขา LED ทั้งสองขาลงในแถบ 5 รูเดียวกัน หรือเสียบขาคลาดกัน 1 คอลัมน์ (เช่น B12 กับ C13)
2. ให้สลับดูทั้ง 4 รูปแบบการเสียบบนเบรดบอร์ด (Presets) แล้วสังเกตการไฮไลต์แถบโลหะใต้รูเบรดบอร์ดทั้งในมุมมอง 2D และ 3D`,
      en: `1. This lesson directly addresses the #1 hands-on classroom debugging issue: students plugging both leads of a component into the same 5-hole vertical strip or missing the shared column by one hole (B12 vs C13).
2. Have students cycle through all 4 wiring presets and inspect the highlighted internal copper strips in both 2D and 3D.`
    },
    inquiry: {
      predictQuestion: {
        th: 'หากนักเรียนเสียบขาแอโนดของ LED ลงในรู C12 และเสียบขาแคโทดลงในรู D12 (คอลัมน์ 12 ฝั่งเดียวกัน) เมื่อเปิดไฟจะเกิดอะไรขึ้น?',
        en: 'If a student plugs the LED Anode into hole C12 and Cathode into hole D12 (same vertical column 12 strip), what happens when power is turned on?'
      },
      predictOptions: {
        A: { th: 'หลอด LED สว่างปกติ เพราะทั้งสองขาเสียบอยู่ในแถบโลหะเดียวกัน', en: 'The LED lights up normally because both leads share the same metal strip.' },
        B: { th: 'หลอด LED ไม่สว่าง เพราะแถบโลหะคอลัมน์ 12 ลัดวงจรขาทั้งสองของ LED เข้าด้วยกัน กระแสจึงไหลผ่านแถบโลหะใต้บอร์ดแทน', en: 'The LED stays dark because column 12\'s metal strip shorts both LED leads together, bypassing the LED.' },
        C: { th: 'เบรดบอร์ดจะเพิ่มแรงดันเป็นสองเท่า', en: 'The breadboard doubles the battery voltage.' }
      },
      correctPrediction: 'B',
      experimentSteps: [
        { th: 'เปิดสวิตช์ในรูปแบบที่ 1 "ต่ออนุกรมถูกต้อง (B12 เชื่อม C12 คนละขาไป C16)" สังเกตแถบโลหะและหลอด LED', en: 'Turn Power ON with Preset 1 "Valid Series (B12 to C12, LED to C16)" and observe strips and LED' },
        { th: 'สลับเป็นรูปแบบที่ 2 "ลัดวงจรในแถวเดียว (C12-D12)" และรูปแบบที่ 3 "ข้ามร่องกลาง (E12-F12)" เพื่อเปรียบเทียบ', en: 'Switch to Preset 2 "Same-Strip Short (C12-D12)" and Preset 3 "Across Center Gap (E12-F12)"' }
      ],
      obsRowLabels: {
        row1: { th: 'ต่อถูกแถบ (ขาเข้า C12, ขาออก C16)', en: 'Valid Series Strips (C12 to C16)' },
        row2: { th: 'ต่อผิดแถบ (ลัดวงจร C12-D12 หรือ ข้ามร่องกลาง)', en: 'Faulty Strip Placement (Same-Strip or Gap)' }
      },
      transferQuestion: {
        th: 'คำถามเชื่อมโยง: ถ้าขาขวาของตัวต้านทานเสียบอยู่ที่รู B12 เราควรเสียบขาแอโนดของ LED ที่รูใดเพื่อให้เชื่อมถึงตัวต้านทานโดยไม่ลัดวงจรกับขาแคโทด (ซึ่งอยู่ที่ C16)?',
        en: 'Transfer Question: If the resistor\'s right lead is in hole B12, where should the LED Anode be plugged so it connects to the resistor while its Cathode is in C16?'
      },
      transferOptions: {
        A: { th: 'เสียบที่รู A12, C12, D12 หรือ E12 (คอลัมน์ 12 ฝั่งบนเดียวกันกับ B12)', en: 'Any free hole in column 12 top strip: A12, C12, D12, or E12.' },
        B: { th: 'เสียบที่รู F12 (ข้ามร่องกลางไปฝั่งล่าง)', en: 'Hole F12 on the opposite side of the center trench.' },
        C: { th: 'เสียบที่รู B16 (คอลัมน์เดียวกับขาแคโทด C16)', en: 'Hole B16 in the same strip as the Cathode C16.' }
      },
      correctTransfer: 'A',
      transferFeedbackCorrect: {
        th: 'ถูกต้อง! รู A12–E12 อยู่บนแถบโลหะเดียวกัน จึงเชื่อมขวาของตัวต้านทาน (B12) เข้ากับแอโนดของ LED (C12) ได้พอดี',
        en: 'Correct! Holes A12–E12 share one conductive strip, connecting the resistor in B12 to the LED Anode in C12.'
      },
      transferFeedbackRetry: {
        th: 'จำไว้ว่าในเบรดบอร์ด รู 5 รูแนวตั้งฝั่งเดียวกัน (A12 ถึง E12) เชื่อมถึงกัน ส่วน F12 อยู่คนละฝั่งของร่องกลาง',
        en: 'Remember that holes A12–E12 share one vertical strip, whereas F12 is isolated across the center gap.'
      },
      explainPrompt: {
        th: 'สรุปหลักการเสียบอุปกรณ์บนเบรดบอร์ดไม่ให้ลัดวงจรและไม่ให้วงจรขาด:',
        en: 'Summarize the rules for placing component leads on a breadboard without shorting or opening the loop:'
      },
      teacherAnswerSummary: {
        th: 'ขั้นที่ 1: ข้อ B (เสียบ C12-D12 แถบโลหะเดียวกันทำให้ลัดวงจรขา LED) · ขั้นที่ 4: ข้อ A (เสียบในคอลัมน์ 12 ฝั่งบน A12–E12 เพื่อเชื่อมกับ B12)',
        en: 'Step 1: Option B (C12-D12 shorts the LED leads on one strip) · Step 4: Option A (use A12–E12 to share the node with B12)'
      }
    }
  }
];
