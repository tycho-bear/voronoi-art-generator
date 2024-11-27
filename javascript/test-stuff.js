// Set up SVG dimensions
const width = 800;
const height = 600;

// Select the SVG element
const svg = d3.select("#voronoi-diagram");

// Generate random points
const points = d3.range(50).map(() => [Math.random() * width, Math.random() * height]);

// Create a Delaunay triangulation
const delaunay = d3.Delaunay.from(points);

// Generate the Voronoi diagram
const voronoi = delaunay.voronoi([0, 0, width, height]);

// Draw Voronoi cells
svg.selectAll("path")
    .data(points)
    .join("path")
    .attr("class", "voronoi-cell")
    .attr("d", (_, i) => voronoi.renderCell(i))
    .attr("stroke", "#ccc");

// Draw points
svg.selectAll("circle")
    .data(points)
    .join("circle")
    .attr("class", "point")
    .attr("cx", d => d[0])
    .attr("cy", d => d[1])
    .attr("r", 5);
