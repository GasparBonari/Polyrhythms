"use strict";

const paper = document.getElementById("paper")
const pen = paper.getContext("2d");
let startTime = new Date().getTime();

const draw = function()
{
    paper.width = paper.clientWidth;
    paper.height = paper.clientHeight;

    const start = 
    {
        x: paper.width * 0.1,
        y: paper.height * 0.9
    }

    const end = 
    {
        x: paper.width * 0.9,
        y: paper.height * 0.9
    }

    const center =
    {
        x: paper.width * 0.5,
        y: paper.height * 0.9
    }

    const length = end.x - start.x;
    const arcRadius = length * 0.05;
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000;
    const velocity = 0.5;
    const maxAngle = 2 * Math.PI;
    const distance = Math.PI + (elapsedTime * velocity);
    const modDistance = distance % maxAngle;
    
    const adjustDistance = modDistance >= Math.PI ? modDistance : maxAngle - modDistance;
    
    const x = center.x + arcRadius * Math.cos(adjustDistance);
    const y = center.y + arcRadius * Math.sin(adjustDistance);

    pen.strokeStyle = "white";
    pen.lineWidth = 6;

    // DRAWING BOTTOM LINE
    pen.beginPath();
    pen.moveTo(start.x, start.y);
    pen.lineTo(end.x, end.y);
    pen.stroke();

    // DRAWING CENTER ARC
    pen.beginPath();
    pen.arc(center.x, center.y, length * 0.05, Math.PI, 2 * Math.PI);
    pen.stroke();

    // DRAWING CENTRAL CIRCLE
    pen.fillStyle = "white";
    pen.beginPath();
    pen.arc(x, y, length * 0.0065, 0, 2 * Math.PI);
    pen.fill();


    requestAnimationFrame(draw);
}

draw();