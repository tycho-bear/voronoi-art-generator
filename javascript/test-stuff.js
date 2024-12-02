// Set up SVG dimensions
const width = 800;
const height = 600;

// Select the SVG element and set up its dimensions and click handler
const svg = d3.select("#voronoi-diagram")
    .attr("width", width)
    .attr("height", height)
    .on("click", addPointOnClick);

// // Initialize an array for points
// let points = [
//     [100, 100],
//     [200, 150],
//     [300, 200]
//     // Add initial points here if desired
// ];

// generate some random points
// const points = d3.range(70).map(() => [Math.random() * width, Math.random() * height]);
const points = [];
for (let i = 0; i < 20; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    points.push([x, y]);
}


// Function to draw the Voronoi diagram
function drawVoronoi(points) {
    // Create a Delaunay triangulation
    const delaunay = d3.Delaunay.from(points);

    // Generate the Voronoi diagram
    const voronoi = delaunay.voronoi([0, 0, width, height]);

    // Draw Voronoi cells
    // Selects all path elements in the SVG, binds the points data to them,
    // and creates new path elements if necessary.
    // Sets the class attribute to "voronoi-cell", defines the d attribute to
    // render the Voronoi cell, and sets the stroke color to #ccc.
    svg.selectAll("path")
        .data(points)
        .join("path")
        .attr("class", "voronoi-cell")
        .attr("d", (_, i) => voronoi.renderCell(i))
        .attr("stroke", "#ccc");
        // .attr("stroke", "#5b4469");

    // Draw points
    // get the circle elements in the svg
    // Bind the points array to the selected elements
    // Join the data to the selected elements, creating new <circle> elements if necessary
    // Set the class attribute of each <circle> element to "point"
    // Set the cx (x-coordinate) attribute of each <circle> element to the first value of the corresponding point
    // Set the cy (y-coordinate) attribute of each <circle> element to the second value of the corresponding point
    // Set the radius (r) attribute of each <circle> element to 5
    svg.selectAll("circle")
        .data(points)
        .join("circle")
        .attr("class", "point")
        // set circle positions and radii
        .attr("cx", d => d[0])
        .attr("cy", d => d[1])
        // .attr("r", 5);
        .attr("r", 0);
}

// Function to handle clicks and add new points
function addPointOnClick(event) {
    // Get the click coordinates
    const [x, y] = d3.pointer(event);

    // Add the new point to the array
    points.push([x, y]);

    // Re-draw the diagram
    drawVoronoi(points);
}

// Initial draw
drawVoronoi(points);




// ----------------------------------------------------------------------------
// Also old code - draws the diagram from points in an array.
// ----------------------------------------------------------------------------


// // Set up SVG dimensions
// const width = 800;
// const height = 600;
//
// // Select the SVG element
// const svg = d3.select("#voronoi-diagram");
//
// // Define your custom points
// const points = [
//     [100, 100],
//     [200, 150],
//     [300, 200],
//     [400, 250],
//     [500, 300],
//     [600, 350],
//     [700, 400],
//     [800, 450],
//     [150, 500],
//     [250, 550]
//     // Add more points as needed
// ];
//
// // Create a Delaunay triangulation
// const delaunay = d3.Delaunay.from(points);
//
// // Generate the Voronoi diagram
// const voronoi = delaunay.voronoi([0, 0, width, height]);
//
// // Draw Voronoi cells
// svg.selectAll("path")
//     .data(points)
//     .join("path")
//     .attr("class", "voronoi-cell")
//     .attr("d", (_, i) => voronoi.renderCell(i))
//     .attr("stroke", "#ccc");
//
// // Draw points
// svg.selectAll("circle")
//     .data(points)
//     .join("circle")
//     .attr("class", "point")
//     .attr("cx", d => d[0])
//     .attr("cy", d => d[1])
//     .attr("r", 5);





// ----------------------------------------------------------------------------
// Old code - this works! It just displays a randomly generated diagram.
// ----------------------------------------------------------------------------

// // Set up SVG dimensions
// const width = 800;
// const height = 600;
//
// // Select the SVG element
// const svg = d3.select("#voronoi-diagram");
//
// // Generate random points
// const points = d3.range(70).map(() => [Math.random() * width, Math.random() * height]);
//
// // Create a Delaunay triangulation
// const delaunay = d3.Delaunay.from(points);
//
// // Generate the Voronoi diagram
// const voronoi = delaunay.voronoi([0, 0, width, height]);
//
// // Draw Voronoi cells
// svg.selectAll("path")
//     .data(points)
//     .join("path")
//     .attr("class", "voronoi-cell")
//     .attr("d", (_, i) => voronoi.renderCell(i))
//     .attr("stroke", "#ccc");
//
// // Draw points
// svg.selectAll("circle")
//     .data(points)
//     .join("circle")
//     .attr("class", "point")
//     .attr("cx", d => d[0])
//     .attr("cy", d => d[1])
//     .attr("r", 5);
