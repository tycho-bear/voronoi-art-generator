IMAGE_NAME = voronoi-art-generator
PORT = 4000

# build command
build:
	docker build -t $(IMAGE_NAME) .

# run command
run:
	docker run -p $(PORT):$(PORT) $(IMAGE_NAME)

# two in one
start: build run

# stop and remove containers
stop:
	docker stop $$(docker ps -q --filter ancestor=$(IMAGE_NAME))

# clean up
clean:
	docker system prune -f
