/**
 * Brain Atlas 3D - Bilingual Internationalization (i18n) Engine
 * Seamless zero-dependency Thai / English localization for secondary and bilingual biology education
 */

export const TRANSLATIONS = {
  th: {
    appTitle: 'Brain Atlas 3D',
    appTag: 'CLINICAL',
    appSubtitle: 'FREESURFER PIAL & 7T ANGIOGRAPHY STANDARD',
    searchPlaceholder: 'ค้นหาโครงสร้างสมอง (เช่น Frontal lobe, Hippocampus, Circle of Willis, Pons)...',
    sound: 'เสียง',
    soundMuted: 'ปิดเสียง',
    quest: 'ภารกิจสมอง',
    cases: 'เคสคนไข้',
    eeg: 'คลื่นสมอง EEG',
    biologyMedia: 'สื่อชีววิทยา',
    home: 'หน้าแรก',
    peelCortex: 'ลอกผิวสมอง:',
    colorModeRealistic: 'สีเนื้อเยื่อจริง',
    colorModeFunctional: 'แยกสีตามหน้าที่',
    cuttingPlane: 'ระนาบตัด:',
    planeNone: 'ปิดระนาบ',
    planeAxial: 'Axial (ขวาง)',
    planeCoronal: 'Coronal (หน้าผาก)',
    planeSagittal: 'Sagittal (แบ่งซีก)',
    probe: 'เข็มชี้พิกัด MNI',
    layers: 'ชั้นโครงสร้าง',
    tours: 'นำชมกายวิภาค',
    hudHint: '💡 คลิกที่ชิ้นส่วนเพื่ออ่านข้อมูลชีววิทยาและการแพทย์',
    inspectorTitleDefault: 'คำอธิบายโครงสร้าง',
    btnFocus: '🔍 โฟกัสชิ้นนี้',
    btnIsolate: '👁️ แยกแสดงเดี่ยว',
    btnSimulateLesion: '⚡ จำลองรอยโรค',
    btnActiveLesion: '⚡ รอยโรคแอคทีฟ',
    btnRestore: '🩺 ฟื้นฟู',
    probeNearest: 'โครงสร้างใกล้เคียงที่สุด:',
    probeDistance: 'ระยะห่าง:',
    probeLock: '🎯 ล็อกเป้าหมายกายวิภาค',
    tracts: 'เส้นใยประสาท 3D',
    socraticPreceptor: 'ปรึกษาอาจารย์แพทย์ (Socratic)',
    socraticHeader: '👨‍⚕️ คำถามกระตุ้นความคิดโดย อ.โสเครตีส',
    socraticClose: 'ปิด',
    synapse: 'แล็บไซแนปส์',
    pwaInstall: 'ติดตั้งแอป',
    pwaOfflineReady: 'พร้อมใช้งานออฟไลน์ 100%',
    fireAp: '⚡ ยิงศักย์ไฟกระทำ',
    spikeTrain: 'กระตุ้นต่อเนื่อง 10 Hz',
    neurotransmitter: 'สารสื่อประสาท:',
    challenge: 'การทดสอบฤทธิ์ยา/สารพิษ:',
    membranePotential: 'ศักย์ไฟฟ้าเยื่อเซลล์ (Vm)',
    closeSynapse: 'ปิดห้องแล็บ'
  },
  en: {
    appTitle: 'Brain Atlas 3D',
    appTag: 'CLINICAL',
    appSubtitle: 'FREESURFER PIAL & 7T ANGIOGRAPHY STANDARD',
    searchPlaceholder: 'Search brain structures (e.g. Frontal lobe, Hippocampus, Circle of Willis, Pons)...',
    sound: 'Sound',
    soundMuted: 'Muted',
    quest: 'Quest Mode',
    cases: 'Clinical Cases',
    eeg: 'EEG Studio',
    biologyMedia: 'Biology Media',
    home: 'Home',
    peelCortex: 'Peel Cortex:',
    colorModeRealistic: 'Realistic Tissue',
    colorModeFunctional: 'Functional Lobes',
    cuttingPlane: 'Cutting Plane:',
    planeNone: 'None',
    planeAxial: 'Axial (Transverse)',
    planeCoronal: 'Coronal (Frontal)',
    planeSagittal: 'Sagittal (Median)',
    probe: 'MNI Probe',
    layers: 'Anatomical Layers',
    tours: 'Guided Tours',
    hudHint: '💡 Click any structure to inspect biology & clinical notes',
    inspectorTitleDefault: 'Structure Description',
    btnFocus: '🔍 Focus',
    btnIsolate: '👁️ Isolate',
    btnSimulateLesion: '⚡ Simulate Lesion',
    btnActiveLesion: '⚡ Lesion Active',
    btnRestore: '🩺 Restore',
    probeNearest: 'Nearest Landmark:',
    probeDistance: 'Distance:',
    probeLock: '🎯 Lock Anatomical Target',
    tracts: '3D Neural Tracts',
    socraticPreceptor: 'Consult Socratic Preceptor',
    socraticHeader: '👨‍⚕️ Socratic Clinical Preceptor',
    socraticClose: 'Close',
    synapse: 'Synapse Lab',
    pwaInstall: 'Install App',
    pwaOfflineReady: '100% Offline Ready',
    fireAp: '⚡ Fire Action Potential',
    spikeTrain: '10 Hz Spike Train',
    neurotransmitter: 'Neurotransmitter:',
    challenge: 'Drug / Toxin Challenge:',
    membranePotential: 'Membrane Potential (Vm)',
    closeSynapse: 'Close Lab'
  }
};

export class I18nManager {
  constructor(options = {}) {
    this.currentLang = 'th';
    this.onLanguageChange = options.onLanguageChange || (() => {});
    this.loadStorage();
  }

  loadStorage() {
    try {
      const saved = localStorage.getItem('brain_atlas_lang');
      if (saved === 'en' || saved === 'th') {
        this.currentLang = saved;
      }
    } catch (e) {}
  }

  saveStorage() {
    try {
      localStorage.setItem('brain_atlas_lang', this.currentLang);
    } catch (e) {}
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'th' ? 'en' : 'th';
    this.saveStorage();
    this.applyTranslations();
    this.onLanguageChange(this.currentLang);
    return this.currentLang;
  }

  setLanguage(lang) {
    if (lang === 'th' || lang === 'en') {
      this.currentLang = lang;
      this.saveStorage();
      this.applyTranslations();
      this.onLanguageChange(this.currentLang);
    }
  }

  t(key, fallback = '') {
    const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.th;
    return dict[key] || fallback || key;
  }

  applyTranslations() {
    const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.th;

    // Elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Elements with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });
  }
}
