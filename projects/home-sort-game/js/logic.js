const GameLogic = (() => {
  // ระดับความยาก: easy=3 ห้อง / medium=4 ห้อง / hard=5 ห้อง (index-based: level + 1 categories)
  const DIFF_LEVELS = { easy: 2, medium: 3, hard: 4 };

  const ALL_CATEGORIES = ["bedroom", "kitchen", "bathroom", "classroom", "livingroom"];

  function getCategoriesForLevel(level) {
    const count = Math.min(ALL_CATEGORIES.length, Math.max(2, (level ?? 2) + 1));
    return ALL_CATEGORIES.slice(0, count);
  }

  function shuffle(items) {
    const a = [...items];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function createQueue(items, activeCategories, rounds = 10) {
    if (!Array.isArray(items) || !items.length) return [];
    const validCats = Array.isArray(activeCategories) && activeCategories.length
      ? activeCategories
      : ALL_CATEGORIES;

    const filtered = items.filter(item => item && validCats.includes(item.category));
    if (!filtered.length) return [];

    const result = [];
    let safetyCounter = 0;
    const maxSafety = Math.max(100, rounds * 25);

    while (result.length < rounds && safetyCounter < maxSafety) {
      safetyCounter++;
      const shuffled = shuffle(filtered);
      for (const item of shuffled) {
        if (result.length >= rounds) break;
        // Avoid consecutive duplicate if more than one distinct item exists
        if (result.length > 0 && result[result.length - 1].id === item.id && filtered.length > 1) {
          continue;
        }
        result.push(item);
      }
    }

    // Fallback if strict loop couldn't satisfy target count
    while (result.length < rounds) {
      result.push(filtered[result.length % filtered.length]);
    }

    return result;
  }

  function calculatePoints(attempts) {
    if (attempts === 0) return 10;
    if (attempts === 1) return 7;
    return 5;
  }

  function calculateStars(correct, rounds) {
    if (!rounds || rounds <= 0) return "⭐";
    const ratio = correct / rounds;
    if (ratio >= 0.85) return "⭐⭐⭐";
    if (ratio >= 0.6) return "⭐⭐";
    return "⭐";
  }

  function getResultHeading(correct, rounds) {
    if (!rounds || rounds <= 0) return "ยังดีนะ! ลองอีกครั้ง 💪";
    const ratio = correct / rounds;
    if (ratio >= 0.85) return "เยี่ยมมากเลย! 🎉";
    if (ratio >= 0.6) return "ทำได้ดีมาก! 👍";
    return "ยังดีนะ! ลองอีกครั้ง 💪";
  }

  return {
    DIFF_LEVELS,
    ALL_CATEGORIES,
    getCategoriesForLevel,
    shuffle,
    createQueue,
    calculatePoints,
    calculateStars,
    getResultHeading
  };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = GameLogic;
}
