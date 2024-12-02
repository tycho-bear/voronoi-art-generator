// Set the dimensions for the SVG container
const width = 800;
const height = 600;

// Create a random set of points for the Voronoi diagram
const points = d3.range(100).map(() => ({
    x: Math.random() * width,  // X-coordinate
    y: Math.random() * height  // Y-coordinate
}));

// Create the SVG element and append it to the container
const svg = d3.select('#container')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// Create a Voronoi diagram using D3's voronoi layout
const voronoi = d3.voronoi()
    .extent([[0, 0], [width, height]]);  // Set the extent of the diagram (SVG bounds)

// Generate the Voronoi polygons for the points
const diagram = voronoi(points);

// Draw the Voronoi cells (regions) in the SVG container
svg.selectAll('.cell')
    .data(diagram.polygons())  // Using polygons() to get Voronoi cells
    .enter().append('path')
    .attr('class', 'cell')
    .attr('d', d => `M${d.join('L')}Z`)  // Create a path for each Voronoi cell
    .style('fill', 'lightgray')
    .style('stroke', 'black')
    .style('stroke-width', 1);

// Add the points to the diagram
svg.selectAll('.point')
    .data(points)
    .enter().append('circle')
    .attr('class', 'point')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', 3)
    .style('fill', 'red');
