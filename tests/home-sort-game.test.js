const test = require("node:test");
const assert = require("node:assert/strict");

const { CATEGORIES, GAME_ITEMS } = require("../projects/home-sort-game/js/data.js");
const GameLogic = require("../projects/home-sort-game/js/logic.js");

test("Data: CATEGORIES should contain all 5 valid categories with required properties", () => {
  const expectedCategories = ["bedroom", "kitchen", "bathroom", "classroom", "livingroom"];
  assert.deepEqual(Object.keys(CATEGORIES).sort(), expectedCategories.sort());

  for (const [catKey, catVal] of Object.entries(CATEGORIES)) {
    assert.ok(catVal.name, `Category ${catKey} missing name`);
    assert.ok(catVal.icon, `Category ${catKey} missing icon`);
    assert.ok(catVal.speak, `Category ${catKey} missing speak`);
  }
});

test("Data: GAME_ITEMS should have valid structure and unique IDs", () => {
  assert.equal(GAME_ITEMS.length, 30, "Expected exactly 30 game items (6 per category * 5)");
  const seenIds = new Set();

  for (const item of GAME_ITEMS) {
    assert.ok(item.id, "Item missing id");
    assert.ok(!seenIds.has(item.id), `Duplicate item id: ${item.id}`);
    seenIds.add(item.id);

    assert.ok(item.word, `Item ${item.id} missing word`);
    assert.ok(item.emoji, `Item ${item.id} missing emoji`);
    assert.ok(item.hint, `Item ${item.id} missing hint`);
    assert.ok(CATEGORIES[item.category], `Item ${item.id} has invalid category: ${item.category}`);
  }
});

test("Data: Each of the 5 categories should have 6 items", () => {
  const counts = {};
  for (const item of GAME_ITEMS) {
    counts[item.category] = (counts[item.category] || 0) + 1;
  }
  for (const cat of Object.keys(CATEGORIES)) {
    assert.equal(counts[cat], 6, `Category ${cat} should have 6 items`);
  }
});

test("Logic: getCategoriesForLevel should return correct category subsets", () => {
  assert.equal(GameLogic.getCategoriesForLevel(2).length, 3); // easy
  assert.equal(GameLogic.getCategoriesForLevel(3).length, 4); // medium
  assert.equal(GameLogic.getCategoriesForLevel(4).length, 5); // hard
});

test("Logic: createQueue should generate requested number of cards from active categories", () => {
  const activeCats = ["bedroom", "kitchen", "bathroom"];
  const rounds = 10;
  const queue = GameLogic.createQueue(GAME_ITEMS, activeCats, rounds);

  assert.equal(queue.length, rounds);
  for (const item of queue) {
    assert.ok(activeCats.includes(item.category), `Item ${item.id} has category not in active list`);
  }
});

test("Logic: createQueue should handle edge cases safely without infinite loop", () => {
  // Empty items
  assert.deepEqual(GameLogic.createQueue([], ["bedroom"], 10), []);

  // Single item pool
  const singleItem = [GAME_ITEMS[0]];
  const queueSingle = GameLogic.createQueue(singleItem, [singleItem[0].category], 8);
  assert.equal(queueSingle.length, 8);
  assert.equal(queueSingle[0].id, singleItem[0].id);

  // No active category match
  assert.deepEqual(GameLogic.createQueue(GAME_ITEMS, ["nonexistent"], 10), []);
});

test("Logic: createQueue avoids consecutive duplicate items when pool has > 1 item", () => {
  const activeCats = ["bedroom", "kitchen"];
  const queue = GameLogic.createQueue(GAME_ITEMS, activeCats, 20);
  assert.equal(queue.length, 20);

  let consecutiveDupes = 0;
  for (let i = 1; i < queue.length; i++) {
    if (queue[i].id === queue[i - 1].id) {
      consecutiveDupes++;
    }
  }
  assert.equal(consecutiveDupes, 0, "Queue should not have consecutive duplicate items");
});

test("Logic: calculatePoints correctly gives points based on attempt count", () => {
  assert.equal(GameLogic.calculatePoints(0), 10);
  assert.equal(GameLogic.calculatePoints(1), 7);
  assert.equal(GameLogic.calculatePoints(2), 5);
  assert.equal(GameLogic.calculatePoints(5), 5);
});

test("Logic: calculateStars correctly rates performance", () => {
  assert.equal(GameLogic.calculateStars(10, 10), "⭐⭐⭐");
  assert.equal(GameLogic.calculateStars(9, 10), "⭐⭐⭐");
  assert.equal(GameLogic.calculateStars(8.5, 10), "⭐⭐⭐");
  assert.equal(GameLogic.calculateStars(8, 10), "⭐⭐");
  assert.equal(GameLogic.calculateStars(6, 10), "⭐⭐");
  assert.equal(GameLogic.calculateStars(5, 10), "⭐");
  assert.equal(GameLogic.calculateStars(0, 10), "⭐");
  assert.equal(GameLogic.calculateStars(0, 0), "⭐");
});

test("Logic: getResultHeading provides encouraging feedback", () => {
  assert.ok(GameLogic.getResultHeading(10, 10).includes("เยี่ยมมาก"));
  assert.ok(GameLogic.getResultHeading(7, 10).includes("ทำได้ดีมาก"));
  assert.ok(GameLogic.getResultHeading(4, 10).includes("ลองอีกครั้ง"));
});

test("Logic: Active categories index corresponds to 1-based keyboard keys", () => {
  for (const level of [2, 3, 4]) {
    const cats = GameLogic.getCategoriesForLevel(level);
    cats.forEach((cat, index) => {
      const keyNum = index + 1;
      assert.ok(keyNum >= 1 && keyNum <= 5);
      assert.equal(cats[keyNum - 1], cat);
    });
  }
});

test("Logic: createQueue works correctly for configured round lengths (8, 10, 12)", () => {
  const activeCats = ["bedroom", "kitchen", "bathroom"];
  for (const rounds of [8, 10, 12]) {
    const queue = GameLogic.createQueue(GAME_ITEMS, activeCats, rounds);
    assert.equal(queue.length, rounds);
    for (const item of queue) {
      assert.ok(activeCats.includes(item.category));
    }
  }
});

test("Logic: calculateStars correctly evaluates different round lengths (8 and 12)", () => {
  // 8 rounds: 7/8 = 87.5% (3 stars), 5/8 = 62.5% (2 stars), 4/8 = 50% (1 star)
  assert.equal(GameLogic.calculateStars(7, 8), "⭐⭐⭐");
  assert.equal(GameLogic.calculateStars(5, 8), "⭐⭐");
  assert.equal(GameLogic.calculateStars(4, 8), "⭐");

  // 12 rounds: 11/12 = 91.6% (3 stars), 8/12 = 66.7% (2 stars), 6/12 = 50% (1 star)
  assert.equal(GameLogic.calculateStars(11, 12), "⭐⭐⭐");
  assert.equal(GameLogic.calculateStars(8, 12), "⭐⭐");
  assert.equal(GameLogic.calculateStars(6, 12), "⭐");
});


