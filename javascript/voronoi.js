/**
 * The width of the SVG element that displays the Voronoi diagram.
 * @type {number}
 */
const width = 800;

/**
 * The height of the SVG element that displays the Voronoi diagram.
 * @type {number}
 */
const height = 600;

/**
 * The number of points to generate when the page is loaded.
 * @type {number}
 */
const numStartingPoints = 30
// const numStartingPoints = 500

/**
 * Maps the index of each cell to its color. This is used when points are added
 * to the diagram.
 * @type {Map<any, any>}
 */
const cellColors = new Map();

/**
 * Flag that determines whether the points in the Voronoi diagram should be
 * visible. This is read at page load, and updated when the checkbox is clicked.
 * @type {boolean}
 */
// let pointsVisible = true;
let pointsVisible = false;

/**
 * Flag that indicates whether an image has been uploaded. This is used to
 * determine whether the Voronoi cells should be transparent.
 * @type {boolean}
 */
let imageUploaded = false;

/**
 * Flag that indicates whether the stained glass effect is enabled.
 * @type {boolean}
 */
let stainedGlassEffect = false;

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

/**
 * Give the SVG element the correct dimensions and make it update on click
 */
const svg = d3.select("#voronoi-diagram")
    .attr("width", width)
    .attr("height", height)
    .on("click", addPointOnClick);

/**
 * Generates the given number of points for use in constructing the initial
 * Voronoi diagram when the page is loaded.
 * @param num_points the number of points to generate.
 * @returns {*[]} the array containing points in the form `[x, y]`
 */
function generateRandomPoints(num_points) {
    const gen_points = [];
    for (let i = 0; i < num_points; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        gen_points.push([x, y]);
    }
    return gen_points
}

/**
 * Stores the points for the diagram.
 * @type {*[]}
 */
const points = generateRandomPoints(numStartingPoints)

/**
 * Generates a random RGB color. Floor is used so the values are in the range
 * [0, 255].
 * @returns {string} the color as a string in the form `rgb(r, g, b)`. This is
 * done using a template literal.
 */
function randomRGBColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`; // this is "rgb(r, g, b)"
}

/**
 * Draws the points on the diagram.
 * @param visible boolean flag that controls point visibility (true = visible,
 * false = invisible).
 */
function drawPoints(visible) {
    svg.selectAll("circle")
        .data(points)
        .join("circle")
        .attr("class", "point")
        // set circle positions
        .attr("cx", d => d[0])
        .attr("cy", d => d[1])
        .attr("r", 4)
        .attr("fill", "black")
        // control visibility
        .style("visibility", visible ? "visible" : "hidden");
        // .style("display", visible ? "block" : "none");
}

/**
 * Toggles the visibility of points on the diagram. It uses the pointsVisible
 * flag, which is initially set to true.
 *
 * This function is called whenever the "toggle-points" checkbox is updated.
 */
function togglePoints() {
    pointsVisible = !pointsVisible;
    drawPoints(pointsVisible);
}

/**
 * This function takes an array of points as input and draws the corresponding
 * Voronoi diagram.
 * @param points the array of points. Each point is in the form `[x, y]`.
 */
function drawVoronoi(points) {
    // need to draw the diagram with the correct dimensions
    const svgWidth = +svg.attr("width");
    const svgHeight = +svg.attr("height");

    // create the delaunay triangulation and generate the voronoi diagram
    const delaunay = d3.Delaunay.from(points);
    // const voronoi = delaunay.voronoi([0, 0, width, height]);
    const voronoi = delaunay.voronoi([0, 0, svgWidth, svgHeight]);

    // each point corresponds to a cell, so by giving each point a color, we
    // can color the cells.
    points.forEach((point, i) => {
        if (!cellColors.has(i)) {  // if this cell doesn't have a color yet, give it one
            cellColors.set(i, randomRGBColor());
        }
    });

    // draw the cells and the lines between them
    // use the fill color from earlier, and set the line color to black
    svg.selectAll("path")
        .data(points)
        .join("path")
        .attr("class", "voronoi-cell")
        .attr("d", (_, i) => voronoi.renderCell(i))
        .attr("stroke", "#000")
        // .attr("fill", (_, i) => cellColors.get(i)) // Use persistent color
        // make cells transparent if an image has been uploaded
        .attr("fill", (_, i) => imageUploaded ? "none" : cellColors.get(i))
        // .attr("fill", (_, i) => "none")
        // increase line thickness
        .attr("stroke-width", 2)
        // .attr("stroke", "#5b4469");

    // draw the points here
    // drawPoints(true)
    drawPoints(pointsVisible)
}

/**
 * This function is called when the SVG is clicked. It adds a new point at the
 * position of the click, then redraws the diagram.
 * @param event the click event.
 */
function addPointOnClick(event) {
    // get click coordinates
    const [x, y] = d3.pointer(event);
    points.push([x, y]);
    drawVoronoi(points);  // redraw

    // todo stained glass effect global variable check here
    if (stainedGlassEffect) {
        applyStainedGlassEffect();
    }
}

/**
 * This function is called when the user uploads an image. It puts the image
 * underneath the diagram and makes the cells transparent.
 */
function overlayImage() {
    imageUploaded = true;
    const fileInput = document.getElementById("upload-image");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
            const imageURL = event.target.result;

            // so we can get dimensions for when we resize the diagram
            const img = new Image();
            img.src = imageURL;
            img.onload = function () {
                // get new dimensions
                const imgAspectRatio = img.naturalWidth / img.naturalHeight;
                const newWidth = height * imgAspectRatio;
                svg.attr("width", newWidth).attr("height", height);

                // add image
                svg.selectAll("image").remove();
                svg.append("image")
                    .attr("xlink:href", imageURL)
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", newWidth)
                    .attr("height", height)
                    // prevent dragging the image becaucse it's annoying
                    .attr("style", "pointer-events: none;")
                    .lower();  // behind

                // draw again in case we resized
                drawVoronoi(points);
            };
        };

        reader.readAsDataURL(file);
    } else {
        console.error("No file selected");
    }
}


// TODO documentation
// TODO put svgWidth and svgHeight in global scope
function applyStainedGlassEffect() {
    const canvas = document.getElementById("image-canvas");
    const context = canvas.getContext("2d");

    const img = document.querySelector("image");
    if (!img) {
        console.error("No background image found.");
        return;
    }

    // Get SVG dimensions
    const svgWidth = +svg.attr("width");
    const svgHeight = +svg.attr("height");

    // Set canvas dimensions to match SVG
    canvas.width = svgWidth;
    canvas.height = svgHeight;

    // Draw the image onto the canvas
    context.drawImage(img, 0, 0, svgWidth, svgHeight);

    // Get image data
    const imageData = context.getImageData(0, 0, svgWidth, svgHeight);
    const { data } = imageData;

    // Get Voronoi diagram data
    const delaunay = d3.Delaunay.from(points);
    const voronoi = delaunay.voronoi([0, 0, svgWidth, svgHeight]);

    // Compute average color for each cell
    svg.selectAll(".voronoi-cell")
        .data(points)
        .attr("fill", (_, i) => {
            // Get cell path
            const path = new Path2D(voronoi.renderCell(i));

            // Collect pixels within the cell
            let r = 0, g = 0, b = 0, count = 0;
            for (let y = 0; y < svgHeight; y++) {
                for (let x = 0; x < svgWidth; x++) {
                    if (context.isPointInPath(path, x, y)) {
                        const index = (y * svgWidth + x) * 4;
                        r += data[index];
                        g += data[index + 1];
                        b += data[index + 2];
                        count++;
                    }
                }
            }

            // Avoid division by zero
            if (count === 0) return "rgba(0, 0, 0, 0)";

            // Compute average color
            r = Math.round(r / count);
            g = Math.round(g / count);
            b = Math.round(b / count);

            return `rgb(${r}, ${g}, ${b})`;
        });
}




// TODO documentation
function toggleStainedGlassEffect() {

    stainedGlassEffect = !stainedGlassEffect;

    // const checkbox = document.getElementById("toggle-stained-glass");

    // if (checkbox.checked) {
    if (stainedGlassEffect) {
        applyStainedGlassEffect();
    } else {
        // Revert cells to original colors
        drawVoronoi(points);
        // svg.selectAll(".voronoi-cell")
        //     .data(points)
        //     .attr("fill", (_, i) => cellColors.get(i)) // Restore original colors
        //     .attr("fill-opacity", 1); // Reset opacity if it was changed
    }
}


/**
 * Main function, runs everything. (not much for now)
 */
function main() {
    // draw the initial diagram with random points
    drawVoronoi(points);
}

main();
