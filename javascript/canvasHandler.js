
export function initializeCanvas(canvas) {
    const gl = canvas.getContext('2d'); // For simplicity, using 2D rendering here
    if (!gl) {
        throw new Error('Unable to initialize 2D context.');
    }
    return gl;
}

export function renderPoints(gl, points) {
    gl.clearRect(0, 0, gl.canvas.width, gl.canvas.height);
    points.forEach(point => {
        gl.beginPath();
        gl.arc(
            (point.x + 1) * gl.canvas.width / 2, // Convert from clip space to pixel space
            (1 - point.y) * gl.canvas.height / 2,
            5, 0, 2 * Math.PI
        );
        gl.fillStyle = 'blue';
        gl.fill();
    });
}

export function renderVoronoi(gl, edges) {
    gl.strokeStyle = 'black';
    edges.forEach(edge => {
        gl.beginPath();
        gl.moveTo(
            (edge.start.x + 1) * gl.canvas.width / 2,
            (1 - edge.start.y) * gl.canvas.height / 2
        );
        gl.lineTo(
            (edge.end.x + 1) * gl.canvas.width / 2,
            (1 - edge.end.y) * gl.canvas.height / 2
        );
        gl.stroke();
    });
}




// import { createShader, createProgram } from './utils.js';
//
// // Initialize WebGL and return the WebGL rendering context
// export function initializeCanvas(canvas) {
//     const gl = canvas.getContext('webgl');
//     if (!gl) {
//         console.error("WebGL not supported");
//         return null;
//     }
//     gl.clearColor(1, 1, 1, 1);  // Set background color
//     gl.clear(gl.COLOR_BUFFER_BIT);
//     return gl;
// }
//
// // Render points on the WebGL canvas
// export function renderPoints(gl, points) {
//     // Clear the canvas
//     gl.clear(gl.COLOR_BUFFER_BIT);
//
//     const vertexShaderCode = `
//         attribute vec2 a_position;
//         void main() {
//             gl_PointSize = 10.0;
//             gl_Position = vec4(a_position, 0.0, 1.0);
//         }
//     `;
//
//     const fragmentShaderCode = `
//         void main() {
//             gl_FragColor = vec4(1, 0, 0, 1); // Red color
//         }
//     `;
//
//     const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderCode);
//     const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderCode);
//     const program = createProgram(gl, vertexShader, fragmentShader);
//
//     gl.useProgram(program);
//     const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
//     const positionBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//
//     const positions = [];
//     points.forEach(point => positions.push(point.x, point.y));
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
//
//     gl.enableVertexAttribArray(positionAttributeLocation);
//     gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
//
//     gl.drawArrays(gl.POINTS, 0, points.length);
// }
