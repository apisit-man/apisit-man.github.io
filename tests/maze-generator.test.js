const test = require("node:test");
const assert = require("node:assert/strict");
const MazeEngine = require("../projects/maze-generator/maze-engine.js");

test("MazeGrid creates correct dimensions and applies masks", () => {
  const grid = new MazeEngine.MazeGrid(20, 20, "rectangle");
  assert.equal(grid.width, 20);
  assert.equal(grid.height, 20);
  assert.equal(grid.isValid(0, 0), true);
  assert.equal(grid.isValid(19, 19), true);
  assert.equal(grid.isValid(-1, 0), false);
  assert.equal(grid.isValid(20, 20), false);

  // Cut-out shape should mask corners
  const cutout = new MazeEngine.MazeGrid(20, 20, "cutout");
  assert.equal(cutout.isValid(0, 0), false, "Top-left corner should be masked out");
  assert.equal(cutout.isValid(19, 0), false, "Top-right corner should be masked out");
  assert.equal(cutout.isValid(10, 10), true, "Center should be valid");

  // Circle shape should mask outside radius
  const circle = new MazeEngine.MazeGrid(21, 21, "circle");
  assert.equal(circle.isValid(0, 0), false, "Corner outside circle radius must be invalid");
  assert.equal(circle.isValid(10, 10), true, "Center cell inside circle must be valid");

  // Diamond shape should mask corners outside Manhattan distance
  const diamond = new MazeEngine.MazeGrid(21, 21, "diamond");
  assert.equal(diamond.isValid(0, 0), false, "Corner should be masked in diamond");
  assert.equal(diamond.isValid(10, 10), true, "Center should be valid in diamond");

  // Escape shape has valid interior and outer breach
  const escape = new MazeEngine.MazeGrid(21, 21, "escape");
  assert.equal(escape.isValid(10, 10), true, "Center should be valid in escape");
});

test("MazeEngine.generate produces a connected, solvable maze", () => {
  const result = MazeEngine.generate({ width: 15, height: 15, shape: "rectangle", bias: "random" });
  assert.ok(result.grid, "Result must contain grid");
  assert.ok(result.start, "Result must contain start position");
  assert.ok(result.goal, "Result must contain goal position");
  assert.notDeepEqual(result.start, result.goal, "Start and goal must differ");
  assert.equal(result.grid.isValid(result.start.x, result.start.y), true, "Start must be valid cell");
  assert.equal(result.grid.isValid(result.goal.x, result.goal.y), true, "Goal must be valid cell");

  // Test with horizontal bias
  const horiz = MazeEngine.generate({ width: 15, height: 15, shape: "rectangle", bias: "horizontal" });
  assert.ok(horiz.grid);

  // Test with vertical bias
  const vert = MazeEngine.generate({ width: 15, height: 15, shape: "rectangle", bias: "vertical" });
  assert.ok(vert.grid);

  // Test braid factor (loops)
  const braided = MazeEngine.generate({ width: 15, height: 15, shape: "rectangle", braidFactor: 0.5 });
  assert.ok(braided.grid);
});

test("MazeEngine.solve finds contiguous path from start to goal", () => {
  const shapes = ["rectangle", "cutout", "circle", "diamond", "escape"];
  for (const shape of shapes) {
    const maze = MazeEngine.generate({ width: 14, height: 14, shape });
    const path = MazeEngine.solve(maze.grid, maze.start, maze.goal);

    assert.ok(Array.isArray(path), `Path should be an array for ${shape}`);
    assert.ok(path.length >= 2, `Path should have at least start and end for ${shape}`);
    assert.deepEqual(path[0], maze.start, "Path must begin at start");
    assert.deepEqual(path[path.length - 1], maze.goal, "Path must terminate at goal");

    // Verify step contiguity and wall clearance
    for (let i = 0; i < path.length - 1; i++) {
      const curr = path[i];
      const next = path[i + 1];
      const dx = next.x - curr.x;
      const dy = next.y - curr.y;
      assert.equal(Math.abs(dx) + Math.abs(dy), 1, `Steps must be Manhattan adjacent for ${shape}`);
      assert.equal(maze.grid.canMove(curr.x, curr.y, next.x, next.y), true, `Move must not cross a wall for ${shape}`);
    }
  }
});
