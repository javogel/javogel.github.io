// 🎌 IMPORT MODULES, COMPONENTS AND WHATNOT. CREATE THE VUE INSTANCE 🎌
// import Vue from 'vue'
// import WebFont from 'webfontloader'
// import Marked from 'marked'
// import App from '../components/app.vue'

// 🎌 GOOGLE FONTS, CAUSE TYPOGRAPHY 🎌
// WebFont.load({
//  google: {
//    families: ['Alegreya:400,italic,700,900']
//  }
// });

// var app = new Vue({
//   el: '#header-content',
//   render: h => h(App)
// })

const random = require("canvas-sketch-util/random");
const tome = require("chromotome");

const MULTIPLE_COLORS = true;

const settings = {
  dimensions: [2048, 2048],
};

function drawPath(context, points, stroke = false) {
  if (points.length === 0) return;
  const point = points[0];
  context.beginPath();
  context.moveTo(point.x, point.y);
  for (let i = 1; i < points.length; i++) {
    context.lineTo(points[i].x, points[i].y);
  }
  context.fill();

  if (stroke) {
    context.stroke();
  }
}

// Iterator function
function times(x) {
  return (f) => {
    if (x > 0) {
      f();
      times(x - 1)(f);
    }
  };
}

function paintBackground(context, grid) {
  const gridHeight = grid.bottomLeft.y - grid.topLeft.y;
  const gridWidth = grid.bottomRight.x - grid.bottomLeft.x;

  context.fillStyle = random.pick(grid.color);
  context.fillRect(grid.topLeft.x, grid.topLeft.y, gridWidth, gridHeight);
}

function verticalLineGrid(context, grid) {
  const lineCount = random.pick([10]);
  const gridHeight = grid.bottomLeft.y - grid.topLeft.y;
  const gridWidth = grid.bottomRight.x - grid.bottomLeft.x;
  const lineWidth = Math.floor(gridWidth / lineCount);
  paintBackground(context, grid);
  for (let x = 0; x < lineCount; x += 1) {
    context.fillStyle = random.pick(grid.color);
    const colWidth =
      x === lineCount - 1 ? gridWidth - x * lineWidth : lineWidth;

    context.fillRect(
      grid.topLeft.x + x * lineWidth,
      grid.topLeft.y,
      colWidth,
      gridHeight
    );
  }
}

function horizontalLineGrid(context, grid) {
  const lineCount = random.pick([2, 5, 7, 10]);
  const gridHeight = grid.bottomLeft.y - grid.topLeft.y;
  const gridWidth = grid.bottomRight.x - grid.bottomLeft.x;
  const lineHeight = Math.floor(gridHeight / lineCount);

  paintBackground(context, grid);
  for (let y = 0; y < lineCount; y += 1) {
    context.fillStyle = random.pick(grid.color);

    // If last row color all the way to the end
    const rowHeight =
      y === lineCount - 1 ? gridHeight - y * lineHeight : lineHeight;
    context.fillRect(
      grid.topLeft.x,
      grid.topLeft.y + y * lineHeight,
      gridWidth,
      rowHeight
    );
  }
}

function squaresGrid(context, grid) {
  const squareCount = random.pick([2, 10, 5, 7]);
  const gridHeight = grid.bottomLeft.y - grid.topLeft.y;
  const gridWidth = grid.bottomRight.x - grid.bottomLeft.x;
  const squareDifferenceY = gridHeight / (squareCount * 2);
  const squareDifferenceX = gridWidth / (squareCount * 2);
  let squareOrigin = { x: 0, y: 0 };
  let count = 0;

  while (squareOrigin.y < gridHeight / 2 && squareOrigin.x < gridWidth / 2) {
    const topLeftX = grid.topLeft.x + squareOrigin.x;
    const topLeftY = grid.topLeft.y + squareOrigin.x;
    const squareWidth = gridWidth - count * 2 * squareDifferenceX;
    const squareHeight = gridHeight - count * 2 * squareDifferenceY;
    context.fillStyle = random.pick(grid.color);
    context.fillRect(topLeftX, topLeftY, squareWidth, squareHeight);

    squareOrigin = {
      x: squareOrigin.x + squareDifferenceX,
      y: squareOrigin.y + squareDifferenceY,
    };
    count++;
  }
}

function circlesGrid(context, grid) {
  const circlesCount = random.pick([2, 10, 5, 7]);
  const gridHeight = grid.bottomLeft.y - grid.topLeft.y;
  const gridWidth = grid.bottomRight.x - grid.bottomLeft.x;
  const circleDistanceX = gridWidth / circlesCount;
  const circleOrigin = {
    x: grid.topLeft.x + gridWidth / 2,
    y: grid.topLeft.y + gridHeight / 2,
  };
  context.fillStyle = random.pick(grid.color);
  context.fillRect(grid.topLeft.x, grid.topLeft.y, gridWidth, gridHeight);
  for (let i = 0; i < circlesCount; i++) {
    context.fillStyle = random.pick(grid.color);
    context.beginPath();
    context.moveTo(circleOrigin.x, circleOrigin.y);
    context.arc(
      circleOrigin.x,
      circleOrigin.y,
      (gridWidth - i * circleDistanceX) / 2.8,
      0,
      Math.PI * 2,
      false
    );
    context.fill();
  }
}

function triangleGrid(context, grid) {
  const gridHeight = grid.bottomLeft.y - grid.topLeft.y;
  const gridWidth = grid.bottomRight.x - grid.bottomLeft.x;
  paintBackground(context, grid);
  const center = {
    x: grid.topLeft.x + gridWidth / 2,
    y: grid.topLeft.y + gridHeight / 2,
  };
  const count = 3;
  for (let i = 1; i <= count; i++) {
    const sideLength = gridWidth / (i + 0.5);
    const height = (Math.sqrt(3) * sideLength) / 2;
    const a = { x: center.x, y: center.y - height / 2 };
    const b = { x: center.x - (3 * height) / 4, y: center.y + height / 2 };
    const c = { x: center.x + (3 * height) / 4, y: center.y + height / 2 };
    context.fillStyle = random.pick(grid.color);
    drawPath(context, [a, b, c]);

    context.fillStyle = random.pick(grid.color);
    drawPath(context, [a, b, center]);

    context.fillStyle = random.pick(grid.color);
    drawPath(context, [b, c, center]);
  }
}

function cubeGrid(context, grid) {
  const gridHeight = grid.bottomLeft.y - grid.topLeft.y;
  const gridWidth = grid.bottomRight.x - grid.bottomLeft.x;
  const sideLength = gridWidth / 2;
  paintBackground(context, grid);
  const center = {
    x: grid.topLeft.x + gridWidth / 2,
    y: grid.topLeft.y + gridHeight / 2,
  };
  const midTop = { ...center, y: center.y - sideLength / 2 };
  const midBottom = { ...center, y: center.y + sideLength / 2 };
  const rightTop = {
    x: center.x + sideLength / 2,
    y: center.y - sideLength / 4,
  };
  const rightBottom = {
    x: center.x + sideLength / 2,
    y: center.y + sideLength / 4,
  };
  const leftTop = {
    x: center.x - sideLength / 2,
    y: center.y - sideLength / 4,
  };
  const leftBottom = {
    x: center.x - sideLength / 2,
    y: center.y + sideLength / 4,
  };

  context.fillStyle = random.pick(grid.color);
  drawPath(context, [center, rightTop, midTop, leftTop]);

  context.fillStyle = random.pick(grid.color);
  drawPath(context, [center, midBottom, leftBottom, leftTop]);

  context.fillStyle = random.pick(grid.color);
  drawPath(context, [center, rightTop, rightBottom, midBottom]);
}

function xGrid(context, grid) {
  const { topLeft, topRight, bottomLeft, bottomRight } = grid;
  const gridHeight = bottomLeft.y - topLeft.y;
  const gridWidth = bottomRight.x - bottomLeft.x;

  paintBackground(context, grid);
  const center = {
    x: grid.topLeft.x + gridWidth / 2,
    y: grid.topLeft.y + gridHeight / 2,
  };

  const shapes = [
    [center, topLeft, bottomLeft],
    [center, topLeft, topRight],
    [center, topRight, bottomRight],
    [center, bottomRight, bottomLeft],
  ];
  context.lineWidth = 0.1;
  context.strokeStyle = random.pick(grid.color);
  shapes.forEach((ps) => {
    if (!MULTIPLE_COLORS) {
      context.globalAlpha = random.pick([0.25, 0.5, 0.77, 1]);
    }

    context.fillStyle = random.pick(grid.color);

    drawPath(context, ps, true);
  });
}

function chaoticGrid(context, grid) {
  const { topLeft, topRight, bottomLeft, bottomRight } = grid;
  const gridHeight = bottomLeft.y - topLeft.y;
  const gridWidth = bottomRight.x - bottomLeft.x;
  const pointCount = 10;
  const shapes = random.range(1, 20);
  const margin = gridWidth / 10;
  paintBackground(context, grid);

  const points = new Array(pointCount).fill(0).map(() => ({
    x: random.range(topLeft.x + margin, topRight.x - margin),
    y: random.range(topLeft.y + margin, bottomRight.y - margin),
  }));

  times(shapes)(() => {
    const ps = random.range(2, pointCount);
    const shuffledPoints = random.shuffle(points);
    const chosenPoints = [];
    for (let i = 0; i < ps; i++) {
      chosenPoints.push(shuffledPoints[i]);
    }
    context.fillStyle = random.pick(grid.color);
    drawPath(context, [...chosenPoints]);
  });
}

const palette = tome.get().colors;
const colors = MULTIPLE_COLORS ? palette : [palette[0]];

const createGrid = (width, height, origin = { x: 0, y: 0 }) => {
  let miniGrids = [];
  const count = 4;
  const margin = 0;

  // const miniGridWidth =  Math.floor(width / count);
  const miniGridHeight = Math.floor(height / count);
  const miniGridWidth = miniGridHeight;

  const countX = Math.floor(width / miniGridWidth);

  for (let x = 0; x < countX; x++) {
    for (let y = 0; y < count; y++) {
      const topLeft = {
        x: origin.x + miniGridWidth * x,
        y: origin.y + miniGridHeight * y,
      };

      // In order to avoid floating point math errors the grid dimensions are rounded down
      // and the last row and column assume the remainder.
      const gridWidth =
        x === countX - 1 ? width - miniGridWidth * x : miniGridWidth;
      const gridHeight =
        y === count - 1 ? height - miniGridHeight * y : miniGridHeight;

      const topRight = {
        x: topLeft.x + gridWidth,
        y: topLeft.y,
      };

      const bottomLeft = {
        x: topLeft.x,
        y: topLeft.y + gridHeight,
      };

      const bottomRight = {
        x: topRight.x,
        y: topRight.y + gridHeight,
      };

      if (random.value() < 0 && gridWidth >= 50) {
        const children = createGrid(gridWidth, gridHeight, topLeft);

        miniGrids = miniGrids.concat(children);
      } else {
        miniGrids.push({
          color: colors,
          topLeft,
          topRight,
          bottomLeft,
          bottomRight,
        });
      }
    }
  }
  return miniGrids;
};

function drawMiniGrid(context, grid) {
  const builderTypes = [
    chaoticGrid,
    xGrid,
    cubeGrid,
    triangleGrid,
    circlesGrid,
    squaresGrid,
    horizontalLineGrid,
    verticalLineGrid,
  ];

  const gridBuilder = random.pick(builderTypes);
  context.save();
  context.globalCompositeOperation = "source-over";
  gridBuilder(context, grid);
  context.restore();
}

$(document).ready(function () {
  var canvas = document.getElementById("myCanvas");
  var body = document.querySelector("body");

  var ctx = canvas.getContext("2d");

  var sketch = document.querySelector(".panel-cover");

  canvas.width = sketch.offsetWidth;
  canvas.height = sketch.offsetHeight;

  if (
    canvas === undefined ||
    body === undefined ||
    sketch === undefined ||
    canvas.width === 0 ||
    canvas.height === 0
  )
    return;


  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  random.setSeed(random.value());

  ctx.globalAlpha = 0.3;
  createGrid(canvas.width, canvas.height).forEach((g) => {
    drawMiniGrid(ctx, g);
  });
});
