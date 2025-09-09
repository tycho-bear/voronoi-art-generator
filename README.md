# Voronoi Art Generator


## Overview

This project is a web application that allows users to apply [Voronoi diagrams](https://en.wikipedia.org/wiki/Voronoi_diagram)
in an artistic manner. Users can click on the canvas to create points, and this will generate edges and partition the plane into different regions. 

The application also supports overlaying Voronoi diagrams on images and applying a "stained glass" effect that fills each cell with the average color of the pixels within it. The goal is to create a visually pleasing representation of the input image. 

## Website

To try out this project, navigate to the website:

https://tycho-bear.github.io/voronoi-art-generator/

More detailed information, explanations, and example images may be found on the ["about this project"](https://tycho-bear.github.io/voronoi-art-generator/about) page of the website.

## Docker

This project may also be run locally inside a Docker container. To do this, clone the repository, navigate to its directory, and run the following command:

```bash
make start
```

This will build the Docker image and run it. Navigate to [http://0.0.0.0:4000/](http://0.0.0.0:4000/) to see the webpage.

If you are running this from inside Docker Desktop, you may need to specify the port (4000) when you run the image.

## Some references

1. Cayman theme files downloaded from here: https://pages-themes.github.io/cayman/ 

2. The Cayman theme repository may be found here: https://github.com/pages-themes/cayman
