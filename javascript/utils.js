export function convertToClipSpace(x, y, canvasWidth, canvasHeight) {
    const clipX = (x / canvasWidth) * 2 - 1;
    const clipY = -((y / canvasHeight) * 2 - 1);
    return [clipX, clipY];
}

// Calculate Voronoi edges using a simple incremental algorithm
export function calculateVoronoi(points) {
    const voronoiEdges = [];
    const numPoints = points.length;

    for (let i = 0; i < numPoints; i++) {
        for (let j = i + 1; j < numPoints; j++) {
            const midX = (points[i].x + points[j].x) / 2;
            const midY = (points[i].y + points[j].y) / 2;

            const dx = points[j].x - points[i].x;
            const dy = points[j].y - points[i].y;

            const perpDX = -dy;
            const perpDY = dx;

            // Add a line (edge) representing the perpendicular bisector
            voronoiEdges.push({
                start: { x: midX - perpDX, y: midY - perpDY },
                end: { x: midX + perpDX, y: midY + perpDY }
            });
        }
    }
    return voronoiEdges;
}

// Clip a line segment to the bounding box
export function clipLineToBoundingBox(edge, boundingBox) {
    const { xMin, xMax, yMin, yMax } = boundingBox;

    const intersections = [];

    // Check intersection with each side of the bounding box
    const sides = [
        { x1: xMin, y1: yMin, x2: xMax, y2: yMin }, // Top
        { x1: xMax, y1: yMin, x2: xMax, y2: yMax }, // Right
        { x1: xMax, y1: yMax, x2: xMin, y2: yMax }, // Bottom
        { x1: xMin, y1: yMax, x2: xMin, y2: yMin }  // Left
    ];

    for (const side of sides) {
        const intersection = lineIntersection(
            edge.start.x, edge.start.y, edge.end.x, edge.end.y,
            side.x1, side.y1, side.x2, side.y2
        );
        if (intersection) {
            intersections.push(intersection);
        }
    }

    // If two intersections, return the clipped line
    if (intersections.length === 2) {
        return { start: intersections[0], end: intersections[1] };
    }

    // No valid clipped line
    return null;
}

// Find the intersection of two lines (helper function)
function lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denom === 0) return null; // Parallel lines

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return {
            x: x1 + t * (x2 - x1),
            y: y1 + t * (y2 - y1)
        };
    }
    return null; // No intersection within the segments
}




// Convert canvas coordinates to WebGL clip space
// export function convertToClipSpace(x, y, width, height) {
//     const clipX = (x / width) * 2 - 1;
//     const clipY = (y / height) * -2 + 1;
//     return [clipX, clipY];
// }
//
// // Create a shader of a given type
// export function createShader(gl, type, source) {
//     const shader = gl.createShader(type);
//     gl.shaderSource(shader, source);
//     gl.compileShader(shader);
//     if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//         console.error("Shader compile error:", gl.getShaderInfoLog(shader));
//         gl.deleteShader(shader);
//         return null;
//     }
//     return shader;
// }
//
// // Create a WebGL program from vertex and fragment shaders
// export function createProgram(gl, vertexShader, fragmentShader) {
//     const program = gl.createProgram();
//     gl.attachShader(program, vertexShader);
//     gl.attachShader(program, fragmentShader);
//     gl.linkProgram(program);
//     if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
//         console.error("Program link error:", gl.getProgramInfoLog(program));
//         gl.deleteProgram(program);
//         return null;
//     }
//     return program;
// }
