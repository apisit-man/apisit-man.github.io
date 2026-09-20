// Unit test for i18n and Stereotaxic Probe modules
global.window = {};
global.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, val) { this.store[key] = String(val); }
};
global.document = {
  querySelectorAll: () => []
};

async function testI18nAndProbe() {
  const { TRANSLATIONS, I18nManager } = await import('./i18n.js');
  const { StereotaxicProbe } = await import('./stereotaxic-probe.js');
  const { BRAIN_STRUCTURES } = await import('./brain-data.js');

  console.log('--- Testing I18nManager ---');
  let langChangeNotified = null;
  const i18n = new I18nManager({
    onLanguageChange: (lang) => { langChangeNotified = lang; }
  });

  if (i18n.currentLang !== 'th') throw new Error('Default language must be "th"');
  if (i18n.t('sound') !== 'เสียง') throw new Error(`Expected "เสียง", got "${i18n.t('sound')}"`);

  i18n.toggleLanguage();
  if (i18n.currentLang !== 'en') throw new Error('toggleLanguage() should switch to "en"');
  if (langChangeNotified !== 'en') throw new Error('onLanguageChange callback not fired with "en"');
  if (i18n.t('sound') !== 'Sound') throw new Error(`Expected "Sound", got "${i18n.t('sound')}"`);

  i18n.setLanguage('th');
  if (i18n.currentLang !== 'th') throw new Error('setLanguage("th") failed');

  console.log('I18nManager verified successfully!');

  console.log('--- Testing StereotaxicProbe ---');
  const mockScene = {
    children: [],
    add(obj) { this.children.push(obj); }
  };

  let coordChangedData = null;
  let targetLockedStruct = null;

  const probe = new StereotaxicProbe({
    scene: mockScene,
    onCoordinateChange: (data) => { coordChangedData = data; },
    onTargetLock: (struct) => { targetLockedStruct = struct; }
  });

  if (probe.isActive !== false) throw new Error('Probe must start inactive');
  if (mockScene.children.length === 0) throw new Error('Probe 3D group was not added to scene');

  probe.toggleProbe();
  if (probe.isActive !== true) throw new Error('toggleProbe() should activate probe');
  if (probe.probeGroup.visible !== true) throw new Error('probeGroup should be visible when active');

  // Test coordinate stepping
  probe.setCoordinates(0, 0, 0);
  if (probe.coords.x !== 0 || probe.coords.y !== 0 || probe.coords.z !== 0) {
    throw new Error('setCoordinates failed');
  }

  probe.stepCoordinate('x', 10);
  if (probe.coords.x !== 10) throw new Error('stepCoordinate x+10 failed');

  probe.stepCoordinate('y', -20);
  if (probe.coords.y !== -20) throw new Error('stepCoordinate y-20 failed');

  // Test landmark calculation & target lock
  const testStruct = BRAIN_STRUCTURES.find(s => s.id === 'frontal_lobe_left');
  if (!testStruct || !testStruct.center) throw new Error('frontal_lobe_left not found or has no center');

  probe.jumpToStructure('frontal_lobe_left');
  if (probe.coords.x !== testStruct.center[0] ||
      probe.coords.y !== testStruct.center[1] ||
      probe.coords.z !== testStruct.center[2]) {
    throw new Error(`jumpToStructure coordinates mismatch: expected ${testStruct.center}, got ${JSON.stringify(probe.coords)}`);
  }

  if (!probe.nearestLandmark || probe.nearestLandmark.id !== 'frontal_lobe_left') {
    throw new Error(`Nearest landmark should be "frontal_lobe_left", got "${probe.nearestLandmark?.id}"`);
  }

  if (probe.nearestDistance !== 0) {
    throw new Error(`Distance to locked landmark should be 0, got ${probe.nearestDistance}`);
  }

  if (!targetLockedStruct || targetLockedStruct.id !== 'frontal_lobe_left') {
    throw new Error('onTargetLock callback did not pass target structure');
  }

  console.log('StereotaxicProbe verified successfully!');
  console.log('ALL i18n and Stereotaxic Probe tests PASSED!');
}

testI18nAndProbe().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
