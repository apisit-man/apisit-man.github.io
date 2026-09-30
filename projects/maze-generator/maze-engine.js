/**
 * MazeEngine - Core procedural maze generation and pathfinding engine
 * Developed for Dr. Apisit Tongchai's Personal Learning Platform (apisit-man.github.io)
 * Supports multiple topological masks, directional biases, and BFS shortest-path solving.
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MazeEngine = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /**
   * Topological shape masking evaluation
   */
  function isCellValidForShape(x, y, width, height, shape) {
    if (x < 0 || x >= width || y < 0 || y >= height) return false;

    const cx = (width - 1) / 2;
    const cy = (height - 1) / 2;

    switch (shape) {
      case 'rectangle':
        return true;

      case 'cutout': {
        const cornerW = Math.max(2, Math.floor(width * 0.22));
        const cornerH = Math.max(2, Math.floor(height * 0.22));
        const inTopLeft = (x < cornerW && y < cornerH);
        const inTopRight = (x >= width - cornerW && y < cornerH);
        const inBottomLeft = (x < cornerW && y >= height - cornerH);
        const inBottomRight = (x >= width - cornerW && y >= height - cornerH);
        return !(inTopLeft || inTopRight || inBottomLeft || inBottomRight);
      }

      case 'circle': {
        const rx = width / 2;
        const ry = height / 2;
        const dx = (x + 0.5 - rx) / rx;
        const dy = (y + 0.5 - ry) / ry;
        return (dx * dx + dy * dy) <= 0.98;
      }

      case 'diamond': {
        const dx = Math.abs(x - cx) / cx;
        const dy = Math.abs(y - cy) / cy;
        return (dx + dy) <= 1.05;
      }

      case 'escape': {
        // Octagonal-like outer boundary with open path to center
        const rx = width / 2;
        const ry = height / 2;
        const dx = Math.abs(x + 0.5 - rx) / rx;
        const dy = Math.abs(y + 0.5 - ry) / ry;
        if (dx + dy > 1.35) return false;
        return true;
      }

      default:
        return true;
    }
  }

  /**
   * MazeGrid representation
   */
  class MazeGrid {
    constructor(width, height, shape = 'rectangle') {
      this.width = width;
      this.height = height;
      this.shape = shape;
      this.cells = [];

      for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
          const valid = isCellValidForShape(x, y, width, height, shape);
          row.push({
            x,
            y,
            valid,
            visited: false,
            walls: { top: true, right: true, bottom: true, left: true }
          });
        }
        this.cells.push(row);
      }
    }

    isValid(x, y) {
      if (x < 0 || x >= this.width || y < 0 || y >= this.height) return false;
      return this.cells[y][x].valid;
    }

    getCell(x, y) {
      if (!this.isValid(x, y)) return null;
      return this.cells[y][x];
    }

    getNeighbors(x, y) {
      const neighbors = [];
      const deltas = [
        { dir: 'top', dx: 0, dy: -1 },
        { dir: 'right', dx: 1, dy: 0 },
        { dir: 'bottom', dx: 0, dy: 1 },
        { dir: 'left', dx: -1, dy: 0 }
      ];

      for (const d of deltas) {
        const nx = x + d.dx;
        const ny = y + d.dy;
        if (this.isValid(nx, ny)) {
          neighbors.push({ dir: d.dir, x: nx, y: ny, cell: this.getCell(nx, ny) });
        }
      }
      return neighbors;
    }

    canMove(x1, y1, x2, y2) {
      if (!this.isValid(x1, y1) || !this.isValid(x2, y2)) return false;
      const c1 = this.getCell(x1, y1);
      const dx = x2 - x1;
      const dy = y2 - y1;

      if (dx === 1 && dy === 0) return !c1.walls.right;
      if (dx === -1 && dy === 0) return !c1.walls.left;
      if (dx === 0 && dy === 1) return !c1.walls.bottom;
      if (dx === 0 && dy === -1) return !c1.walls.top;
      return false;
    }

    removeWall(x1, y1, x2, y2) {
      const c1 = this.getCell(x1, y1);
      const c2 = this.getCell(x2, y2);
      if (!c1 || !c2) return;

      const dx = x2 - x1;
      const dy = y2 - y1;

      if (dx === 1 && dy === 0) {
        c1.walls.right = false;
        c2.walls.left = false;
      } else if (dx === -1 && dy === 0) {
        c1.walls.left = false;
        c2.walls.right = false;
      } else if (dx === 0 && dy === 1) {
        c1.walls.bottom = false;
        c2.walls.top = false;
      } else if (dx === 0 && dy === -1) {
        c1.walls.top = false;
        c2.walls.bottom = false;
      }
    }
  }

  /**
   * Procedural maze generation using Recursive Backtracking with directional weights
   */
  function generate(options = {}) {
    const width = Math.max(5, options.width || 20);
    const height = Math.max(5, options.height || 20);
    const shape = options.shape || 'rectangle';
    const bias = options.bias || 'random';
    const braidFactor = typeof options.braidFactor === 'number' ? options.braidFactor : 0;

    const grid = new MazeGrid(width, height, shape);

    // Find first valid cell as entry point
    let start = null;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (grid.isValid(x, y)) {
          start = { x, y };
          break;
        }
      }
      if (start) break;
    }

    if (!start) {
      start = { x: Math.floor(width / 2), y: Math.floor(height / 2) };
    }

    // Carve passages using stack-based recursive backtracker
    const stack = [start];
    const startCell = grid.getCell(start.x, start.y);
    if (startCell) startCell.visited = true;

    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const neighbors = grid.getNeighbors(current.x, current.y);
      const unvisited = neighbors.filter(n => !n.cell.visited);

      if (unvisited.length === 0) {
        stack.pop();
        continue;
      }

      // Calculate directional weights based on bias
      const weightedList = [];
      for (const n of unvisited) {
        let weight = 1;
        const isHorizontal = (n.dir === 'left' || n.dir === 'right');
        const isVertical = (n.dir === 'top' || n.dir === 'bottom');

        if (bias === 'horizontal' && isHorizontal) weight = 5;
        else if (bias === 'vertical' && isVertical) weight = 5;
        else if (bias === 'checkerboard') {
          const check = (current.x + current.y) % 2 === 0;
          weight = (check && isHorizontal) || (!check && isVertical) ? 4 : 1;
        }

        for (let w = 0; w < weight; w++) {
          weightedList.push(n);
        }
      }

      const chosen = weightedList[Math.floor(Math.random() * weightedList.length)];
      grid.removeWall(current.x, current.y, chosen.x, chosen.y);
      chosen.cell.visited = true;
      stack.push({ x: chosen.x, y: chosen.y });
    }

    // Apply loop braiding to dead-ends if braidFactor > 0
    if (braidFactor > 0) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (!grid.isValid(x, y)) continue;
          const cell = grid.getCell(x, y);
          const openCount = (!cell.walls.top ? 1 : 0) + (!cell.walls.right ? 1 : 0) +
                            (!cell.walls.bottom ? 1 : 0) + (!cell.walls.left ? 1 : 0);
          if (openCount === 1 && Math.random() < braidFactor) {
            const neighbors = grid.getNeighbors(x, y);
            const closedNeighbors = neighbors.filter(n => !grid.canMove(x, y, n.x, n.y));
            if (closedNeighbors.length > 0) {
              const pick = closedNeighbors[Math.floor(Math.random() * closedNeighbors.length)];
              grid.removeWall(x, y, pick.x, pick.y);
            }
          }
        }
      }
    }

    // Determine goal using BFS distance from start for optimal depth
    let maxDist = -1;
    let goal = { ...start };
    const queue = [{ x: start.x, y: start.y, dist: 0 }];
    const distMap = new Map();
    distMap.set(`${start.x},${start.y}`, 0);

    while (queue.length > 0) {
      const { x, y, dist } = queue.shift();
      if (dist > maxDist) {
        maxDist = dist;
        goal = { x, y };
      }

      const neighbors = grid.getNeighbors(x, y);
      for (const n of neighbors) {
        if (grid.canMove(x, y, n.x, n.y)) {
          const key = `${n.x},${n.y}`;
          if (!distMap.has(key)) {
            distMap.set(key, dist + 1);
            queue.push({ x: n.x, y: n.y, dist: dist + 1 });
          }
        }
      }
    }

    return {
      grid,
      start,
      goal,
      width,
      height,
      shape,
      bias
    };
  }

  /**
   * Breadth-First Search shortest path solver
   */
  function solve(grid, start, goal) {
    if (!grid || !start || !goal) return [];
    if (start.x === goal.x && start.y === goal.y) return [{ x: start.x, y: start.y }];

    const queue = [{ x: start.x, y: start.y }];
    const parentMap = new Map();
    const visited = new Set();
    const startKey = `${start.x},${start.y}`;
    const goalKey = `${goal.x},${goal.y}`;

    visited.add(startKey);

    let found = false;
    while (queue.length > 0) {
      const current = queue.shift();
      const currKey = `${current.x},${current.y}`;

      if (current.x === goal.x && current.y === goal.y) {
        found = true;
        break;
      }

      const neighbors = grid.getNeighbors(current.x, current.y);
      for (const n of neighbors) {
        if (grid.canMove(current.x, current.y, n.x, n.y)) {
          const nextKey = `${n.x},${n.y}`;
          if (!visited.has(nextKey)) {
            visited.add(nextKey);
            parentMap.set(nextKey, current);
            queue.push({ x: n.x, y: n.y });
          }
        }
      }
    }

    if (!found) return [];

    // Reconstruct path
    const path = [];
    let curr = { x: goal.x, y: goal.y };
    while (curr) {
      path.push(curr);
      const k = `${curr.x},${curr.y}`;
      if (curr.x === start.x && curr.y === start.y) break;
      curr = parentMap.get(k);
    }

    return path.reverse();
  }

  return {
    MazeGrid,
    isCellValidForShape,
    generate,
    solve
  };
}));
