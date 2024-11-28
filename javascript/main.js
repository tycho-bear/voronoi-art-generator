/*
This file ...
 */


import { initializeCanvas, renderPoints, renderVoronoi } from './canvasHandler.js';
import { convertToClipSpace, calculateVoronoi, clipLineToBoundingBox } from './utils.js';

import { Delaunay } from 'd3-delaunay';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const gl = initializeCanvas(canvas);

    const points = [];
    const boundingBox = {
        xMin: -1, yMin: -1, xMax: 1, yMax: 1 // Canvas in clip space
    };

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        points.push([x, y]); // Store points in screen space

        const delaunay = Delaunay.from(points);
        const voronoi = delaunay.voronoi([0, 0, canvas.width, canvas.height]);

        // Render points and Voronoi diagram
        renderPoints(gl, points.map(([x, y]) => convertToClipSpace(x, y, canvas.width, canvas.height)));
        renderVoronoi(gl, voronoi.cellPolygons());
    });

//     canvas.addEventListener('click', (event) => {
//         const rect = canvas.getBoundingClientRect();
//         const x = event.clientX - rect.left;
//         const y = event.clientY - rect.top;
//
//         const [clipX, clipY] = convertToClipSpace(x, y, canvas.width, canvas.height);
//
//         points.push({ x: clipX, y: clipY });
//
//         // Calculate Voronoi edges and clip them to the bounding box
//         const voronoiEdges = calculateVoronoi(points)
//             .map(edge => clipLineToBoundingBox(edge, boundingBox))
//             .filter(edge => edge !== null); // Remove edges outside the bounding box
//
//         renderPoints(gl, points);
//         renderVoronoi(gl, voronoiEdges);
//     });
});

// ----------------------------------------------------------------------------
// with Delaunay
// import { Delaunay } from 'd3-delaunay';
//
// canvas.addEventListener('click', (event) => {
//     const rect = canvas.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;
//
//     points.push([x, y]); // Store points in screen space
//
//     const delaunay = Delaunay.from(points);
//     const voronoi = delaunay.voronoi([0, 0, canvas.width, canvas.height]);
//
//     // Render points and Voronoi diagram
//     renderPoints(gl, points.map(([x, y]) => convertToClipSpace(x, y, canvas.width, canvas.height)));
//     renderVoronoi(gl, voronoi.cellPolygons());
// });
// ----------------------------------------------------------------------------

// // Import functions and classes from other modules
// import {initializeCanvas, renderPoints} from './canvasHandler.js';
// import {convertToClipSpace} from './utils.js';
//
// document.addEventListener('DOMContentLoaded', () => {
//     const canvas = document.getElementById('canvas');
//     const gl = initializeCanvas(canvas);
//
//     const points = [];
//
//     canvas.addEventListener('click', (event) => {
//         const rect = canvas.getBoundingClientRect();
//         const x = event.clientX - rect.left;
//         const y = event.clientY - rect.top;
//
//         // Convert to WebGL clip space
//         const [clipX, clipY] = convertToClipSpace(x, y, canvas.width, canvas.height);
//
//
//         points.push({ x: clipX, y: clipY });
//         renderPoints(gl, points);  // Render all points on canvas
//     });
// });


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
