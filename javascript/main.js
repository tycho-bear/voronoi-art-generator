/*
This file ...
 */

// Import functions and classes from other modules
import {initializeCanvas, renderPoints} from './canvasHandler.js';
import {convertToClipSpace} from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const gl = initializeCanvas(canvas);

    const points = [];

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Convert to WebGL clip space
        const [clipX, clipY] = convertToClipSpace(x, y, canvas.width, canvas.height);


        points.push({ x: clipX, y: clipY });
        renderPoints(gl, points);  // Render all points on canvas
    });
});


// const canvas = document.getElementById('canvas');
// const gl = initializeCanvas(canvas);
//
// const points = [];
//
// canvas.addEventListener('click', (event) => {
//     const rect = canvas.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;
//
//     // Convert to WebGL clip space
//     const [clipX, clipY] = convertToClipSpace(x, y, canvas.width, canvas.height);
//
//     points.push({ x: clipX, y: clipY });
//     renderPoints(gl, points);  // Render all points on canvas
// });
