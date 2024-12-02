/*
This file ...
 */


// import {initializeCanvas, renderPoints} from './canvasHandler.js';
// import {convertToClipSpace} from './utils.js';
// import {Delaunay} from "d3-delaunay";
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


// ----------------------------------------------------------------------------
// NEW CODE (garbage)
// ----------------------------------------------------------------------------


// import { initializeCanvas } from './canvasHandler.js';
// import { convertToClipSpace } from './utils.js';
// import * as d3 from 'd3-delaunay'; // Import the D3 library
//
// document.addEventListener('DOMContentLoaded', () => {
//     const canvas = document.getElementById('canvas');
//     const context = canvas.getContext('2d'); // Use 2D rendering context
//
//     const points = [];
//
//     canvas.addEventListener('click', (event) => {
//         const rect = canvas.getBoundingClientRect();
//         const x = event.clientX - rect.left;
//         const y = event.clientY - rect.top;
//
//         points.push([x, y]);
//         console.log('Points:', points); // Debugging log
//
//         renderVoronoi(context, points, canvas.width, canvas.height);
//     });
// });
//
// function renderVoronoi(context, points, width, height) {
//     context.clearRect(0, 0, width, height); // Clear canvas
//
//     if (points.length < 2) return; // At least two points needed
//
//     const delaunay = d3.Delaunay.from(points);
//     const voronoi = delaunay.voronoi([0, 0, width, height]);
//
//     console.log('Voronoi:', voronoi); // Debugging log
//
//     context.beginPath();
//     voronoi.render(context); // Render Voronoi edges
//     context.strokeStyle = 'black';
//     context.lineWidth = 1;
//     context.stroke();
// }







// ----------------------------------------------------------------------------
// INITIAL CODE
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



// ----------------------------------------------------------------------------
// RANDOM STUFF, TRYING INCREMENTAL APPROACH
// ----------------------------------------------------------------------------


// import { initializeCanvas, renderPoints, renderVoronoi } from './canvasHandler.js';
// import { convertToClipSpace, calculateVoronoi, clipLineToBoundingBox } from './utils.js';
//
// import { Delaunay } from 'd3-delaunay';
//
// document.addEventListener('DOMContentLoaded', () => {
//     const canvas = document.getElementById('canvas');
//     const gl = initializeCanvas(canvas);
//
//     const points = [];
//     const boundingBox = {
//         xMin: -1, yMin: -1, xMax: 1, yMax: 1 // Canvas in clip space
//     };
//
//     canvas.addEventListener('click', (event) => {
//         const rect = canvas.getBoundingClientRect();
//         const x = event.clientX - rect.left;
//         const y = event.clientY - rect.top;
//
//         points.push([x, y]); // Store points in screen space
//
//         const delaunay = Delaunay.from(points);
//         const voronoi = delaunay.voronoi([0, 0, canvas.width, canvas.height]);
//
//         // Render points and Voronoi diagram
//         renderPoints(gl, points.map(([x, y]) => convertToClipSpace(x, y, canvas.width, canvas.height)));
//         renderVoronoi(gl, voronoi.cellPolygons());
//     });
//
// //     canvas.addEventListener('click', (event) => {
// //         const rect = canvas.getBoundingClientRect();
// //         const x = event.clientX - rect.left;
// //         const y = event.clientY - rect.top;
// //
// //         const [clipX, clipY] = convertToClipSpace(x, y, canvas.width, canvas.height);
// //
// //         points.push({ x: clipX, y: clipY });
// //
// //         // Calculate Voronoi edges and clip them to the bounding box
// //         const voronoiEdges = calculateVoronoi(points)
// //             .map(edge => clipLineToBoundingBox(edge, boundingBox))
// //             .filter(edge => edge !== null); // Remove edges outside the bounding box
// //
// //         renderPoints(gl, points);
// //         renderVoronoi(gl, voronoiEdges);
// //     });
// });
//
// // ----------------------------------------------------------------------------
// // with Delaunay
// // import { Delaunay } from 'd3-delaunay';
// //
// // canvas.addEventListener('click', (event) => {
// //     const rect = canvas.getBoundingClientRect();
// //     const x = event.clientX - rect.left;
// //     const y = event.clientY - rect.top;
// //
// //     points.push([x, y]); // Store points in screen space
// //
// //     const delaunay = Delaunay.from(points);
// //     const voronoi = delaunay.voronoi([0, 0, canvas.width, canvas.height]);
// //
// //     // Render points and Voronoi diagram
// //     renderPoints(gl, points.map(([x, y]) => convertToClipSpace(x, y, canvas.width, canvas.height)));
// //     renderVoronoi(gl, voronoi.cellPolygons());
// // });
// // ----------------------------------------------------------------------------




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
