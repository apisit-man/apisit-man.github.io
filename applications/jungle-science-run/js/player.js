import * as THREE from 'three';

const V = (x, y, z) => new THREE.Vector3(x, y, z);

/** ตัวละครนักสำรวจจิ๋ว (low-poly) พร้อมแอนิเมชันวิ่ง/กระโดด/สไลด์ */
export class Player {
  constructor() {
    this.group = new THREE.Group();
    this.root = new THREE.Group();
    this.group.add(this.root);
    this.phase = 0;
    this.landT = 0;
    this.build();
    this.buildShadow();
  }

  /** เปลี่ยนสีหมวก/เป้ตามสกินที่ปลดล็อก */
  setSkin(skin) {
    if (!skin) return;
    if (this.hatMat) this.hatMat.color.setHex(skin.hat);
    if (this.bagMat) this.bagMat.color.setHex(skin.bag);
    this.skinId = skin.id;
  }

  land() {
    this.landT = 0.22;
  }

  build() {
    const skin = new THREE.MeshStandardMaterial({ color: 0xf7c9a3, roughness: 0.72 });
    const shirt = new THREE.MeshStandardMaterial({ color: 0x24d8a8, roughness: 0.55 });
    const shorts = new THREE.MeshStandardMaterial({ color: 0x2b3a63, roughness: 0.8 });
    const capM = new THREE.MeshStandardMaterial({ color: 0xff7a45, roughness: 0.65 });
    const packM = new THREE.MeshStandardMaterial({ color: 0xffc14d, roughness: 0.62 });
    const shoeM = new THREE.MeshStandardMaterial({ color: 0xf2f6ff, roughness: 0.55 });
    const glassM = new THREE.MeshStandardMaterial({ color: 0xe9fbff, roughness: 0.12, metalness: 0.65 });
    const darkM = new THREE.MeshStandardMaterial({ color: 0x1d2836, roughness: 0.7 });
    this.materials = [skin, shirt, shorts, capM, packM, shoeM, glassM, darkM];
    this.hatMat = capM;
    this.bagMat = packM;

    // ลำตัว
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.52, 0.3), shirt);
    torso.position.y = 1.02;
    this.root.add(torso);

    const hips = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.26, 0.28), shorts);
    hips.position.y = 0.76;
    this.root.add(hips);

    // หัว
    const head = new THREE.Group();
    head.position.y = 1.5;
    this.head = head;
    this.root.add(head);

    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.27, 16, 12), skin);
    head.add(skull);

    const capDome = new THREE.Mesh(new THREE.SphereGeometry(0.285, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.52), capM);
    capDome.position.y = 0.02;
    head.add(capDome);

    const brim = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.045, 0.24), capM);
    brim.position.set(0, 0.06, 0.24);
    head.add(brim);

    const band = new THREE.Mesh(new THREE.TorusGeometry(0.235, 0.035, 6, 18), glassM);
    band.rotation.x = Math.PI / 2;
    band.position.set(0, 0.02, 0.05);
    head.add(band);

    const lensL = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.05, 12), glassM);
    lensL.rotation.x = Math.PI / 2;
    lensL.position.set(-0.1, 0.03, 0.25);
    head.add(lensL);
    const lensR = lensL.clone();
    lensR.position.x = 0.1;
    head.add(lensR);

    // เป้
    const pack = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.44, 0.22), packM);
    pack.position.set(0, 1.06, -0.23);
    this.root.add(pack);

    const packTop = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.12, 0.16), darkM);
    packTop.position.set(0, 1.3, -0.23);
    this.root.add(packTop);

    // แขน
    const armGeo = new THREE.BoxGeometry(0.13, 0.46, 0.15);
    this.armL = new THREE.Group();
    this.armL.position.set(-0.31, 1.2, 0);
    const armLm = new THREE.Mesh(armGeo, shirt);
    armLm.position.y = -0.23;
    this.armL.add(armLm);
    const handL = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 6), skin);
    handL.position.y = -0.46;
    this.armL.add(handL);
    this.root.add(this.armL);

    this.armR = new THREE.Group();
    this.armR.position.set(0.31, 1.2, 0);
    const armRm = new THREE.Mesh(armGeo, shirt);
    armRm.position.y = -0.23;
    this.armR.add(armRm);
    const handR = handL.clone();
    this.armR.add(handR);
    this.root.add(this.armR);

    // ขา
    const legGeo = new THREE.BoxGeometry(0.17, 0.48, 0.19);
    const shoeGeo = new THREE.BoxGeometry(0.19, 0.12, 0.26);

    this.legL = new THREE.Group();
    this.legL.position.set(-0.13, 0.74, 0);
    const legLm = new THREE.Mesh(legGeo, shorts);
    legLm.position.y = -0.24;
    this.legL.add(legLm);
    const shoeL = new THREE.Mesh(shoeGeo, shoeM);
    shoeL.position.set(0, -0.52, 0.04);
    this.legL.add(shoeL);
    this.root.add(this.legL);

    this.legR = new THREE.Group();
    this.legR.position.set(0.13, 0.74, 0);
    const legRm = new THREE.Mesh(legGeo, shorts);
    legRm.position.y = -0.24;
    this.legR.add(legRm);
    const shoeR = shoeL.clone();
    this.legR.add(shoeR);
    this.root.add(this.legR);

    // อุปกรณ์เล็ก ๆ กลางหลัง
    const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.32, 5), darkM);
    antenna.position.set(0.14, 1.45, -0.2);
    this.root.add(antenna);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), new THREE.MeshBasicMaterial({ color: 0x9dffcf }));
    bulb.position.set(0.14, 1.63, -0.2);
    this.root.add(bulb);
  }

  buildShadow() {
    const geo = new THREE.CircleGeometry(0.55, 20);
    const mat = new THREE.MeshBasicMaterial({ color: 0x04120c, transparent: true, opacity: 0.3, depthWrite: false });
    this.shadow = new THREE.Mesh(geo, mat);
    this.shadow.rotation.x = -Math.PI / 2;
    this.shadow.position.y = 0.02;
  }

  /** ปรับท่าทางตามสถานะการวิ่ง */
  update(dt, { speed = 10, airborne = false, sliding = false } = {}) {
    this.phase += dt * (4.0 + speed * 0.62);
    this.landT = Math.max(0, this.landT - dt);
    const p = this.phase;

    let legL = Math.sin(p) * 0.95;
    let legR = Math.sin(p + Math.PI) * 0.95;
    let armL = Math.sin(p + Math.PI) * 0.75;
    let armR = Math.sin(p) * 0.75;
    let bob = Math.abs(Math.sin(p)) * 0.045;
    let lean = 0.11 + Math.min(0.14, speed * 0.006);
    let rootY = 0;
    let squash = 1;

    if (airborne) {
      legL = -0.75;
      legR = 0.45;
      armL = -1.25;
      armR = -1.05;
      bob = 0.02;
      lean = -0.06;
    } else if (sliding) {
      legL = 0.6;
      legR = 0.4;
      armL = 1.0;
      armR = 0.8;
      bob = 0;
      lean = 0.22;
      squash = 0.6;
      rootY = -0.02;
    }

    const k = 1 - Math.exp(-dt * 16);
    const landSquash = 1 - (this.landT / 0.22) * 0.16;
    this.legL.rotation.x += (legL - this.legL.rotation.x) * k;
    this.legR.rotation.x += (legR - this.legR.rotation.x) * k;
    this.armL.rotation.x += (armL - this.armL.rotation.x) * k;
    this.armR.rotation.x += (armR - this.armR.rotation.x) * k;
    this.root.position.y += (bob + rootY - this.root.position.y) * k;
    this.root.rotation.x += (lean - this.root.rotation.x) * k;
    this.root.scale.y += (squash * landSquash - this.root.scale.y) * k;
    this.root.rotation.z = Math.sin(p * 0.5) * 0.02;
    this.head.rotation.z = Math.sin(p * 0.5 + 1) * 0.04;
  }

  setShadow(sunHeight) {
    const s = Math.max(0.35, 1 - sunHeight * 0.45);
    this.shadow.scale.setScalar(s);
    this.shadow.material.opacity = 0.3 * s;
  }

  /** กระพริบแบบโปร่งแสงเมื่ออยู่ในช่วงอมตะหลังโดนชน */
  setInvulnerable(on, t = 0) {
    const op = on ? 0.4 + 0.35 * Math.abs(Math.sin(t * 18)) : 1;
    for (const m of this.materials) {
      m.opacity = op;
      m.transparent = op < 1;
      m.depthWrite = op >= 0.95;
    }
  }
}
