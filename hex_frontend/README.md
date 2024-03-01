


A React-Fiber Three-Powered Game

Introduction

This frontend application is built with React and powered by React Fiber Three for 3D rendering. 


Game Overview

This game allows users to upload an image that serves as the base for a puzzle. The backend application processes this image by overlaying an isohedral grid of regular hexagons. Each hexagon is then transformed into a separate image, undergoing zero to some various operations like blurring, rotation, and color modifications. The player's objective is to reassemble and rectify these modified hexagons to recreate the original image

Project Status

This project is currently a work in progress. We are actively developing new features and making improvements. Feedback and contributions are always welcome!
Features

    Image Upload: Users can upload an image of their choice to start the game.
    Dynamic Image Processing: The backend applies a grid of hexagons to the image and performs random operations on each segment.
    Interactive 3D Rendering: Utilizing React Fiber Three, the game offers a 3D experience.
    Puzzle Gameplay: Players rearrange and modify hexagons to match the original image.



# run this command in parent folder where docker-compose file is located to build docker image

docker build --file=hex-puzzle-too/dev.frontend.dockerfile -t frontend_img .
docker build --file=hex-puzzle-too/prod.frontend.dockerfile -t frontend_img_prod .