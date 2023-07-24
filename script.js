"use strict";

// Array of colors for arcs
const arcs = [
  "#D0E7F5", "#D9E7F4", "#D6E3F4", "#BCDFF5", "#B7D9F4", "#C3D4F0",
  "#9DC1F3", "#9AA9F4", "#8D83EF", "#AE69F0", "#D46FF1", "#DB5AE7",
  "#D911Da", "#D601Cb", "#E713Bf", "#F24CAe", "#FB79AB", "#FFB6C1",
  "#FED2CF", "#FDDFD5", "#FEDCD1"
];

// Getting the canvas and context
const paper = document.getElementById("paper");
const pen = paper.getContext("2d");

// Start time to calculate elapsed time
let startTime = new Date().getTime();

const draw = function() {
  // Set the canvas dimensions to match its container
  paper.width = paper.clientWidth;
  paper.height = paper.clientHeight;

  const start = { x: paper.width * 0.1, y: paper.height * 0.9 };
  const end = { x: paper.width * 0.9, y: paper.height * 0.9 };
  const center = { x: paper.width * 0.5, y: paper.height * 0.9 };

  const length = end.x - start.x;
  const initialArcRadius = length * 0.05;
  const circleRadius = length * 0.0065;
  const spacing = (length / 2 - initialArcRadius) / arcs.length;
  const currentTime = new Date().getTime();
  const elapsedTime = (currentTime - startTime) / 1000;

  pen.strokeStyle = "white";
  pen.lineWidth = 6;

  // DRAWING BOTTOM LINE
  pen.beginPath();
  pen.moveTo(start.x, start.y);
  pen.lineTo(end.x, end.y);
  pen.stroke();

  arcs.forEach((arc, index) => {
    const numberOfLoops = 50 - index;
    const oneFullLoop = 2 * Math.PI;
    const velocity = (oneFullLoop * numberOfLoops) / 900;
    const maxAngle = 2 * Math.PI;
    const distance = Math.PI + elapsedTime * velocity;
    const modDistance = distance % maxAngle;
    const adjustDistance = modDistance >= Math.PI ? modDistance : maxAngle - modDistance;
    const arcRadius = initialArcRadius + spacing * (index + 1);
    const x = center.x + arcRadius * Math.cos(adjustDistance);
    const y = center.y + arcRadius * Math.sin(adjustDistance);

    // DRAWING CENTER ARC
    pen.beginPath();
    pen.strokeStyle = arc;
    pen.arc(center.x, center.y, arcRadius, Math.PI, 2 * Math.PI);
    pen.stroke();

    // DRAWING CENTRAL CIRCLE
    pen.fillStyle = "black";
    pen.beginPath();
    pen.arc(x, y, circleRadius, 0, 2 * Math.PI);
    pen.fill();
  });

  requestAnimationFrame(draw);
};

draw();