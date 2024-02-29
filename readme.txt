
#run for development

docker build --file=hex-puzzle-too/dev.frontend.dockerfile -t frontend_img .
docker build --file=hex_backend/dev.backend.dockerfile -t backend_img .

# run for development in respective folder
docker build --file=dev.backend.dockerfile -t backend_img .
docker build --file=dev.frontend.dockerfile -t frontend_img .

docker-compose --file=dev.docker-compose.yaml up

# run to take down
docker-compose down




# run for production
docker build --file=hex-puzzle-too/prod.frontend.dockerfile -t frontend_img_prod .
docker build --file=hex_backend/prod.backend.dockerfile -t backend_img_prod .


# run for production in respective folder
docker build --file=prod.backend.dockerfile -t backend_img_prod .
docker build --file=prod.frontend.dockerfile -t frontend_img_prod .

# for if you need to run image separetely
docker run -d backend_img_prod

docker-compose --file=prod.docker-compose.yaml up