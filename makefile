build-docker-production:
	docker build -t rcsalles/node-sorting-service --file ./Dockerfile.production .

build-docker-test:
	docker build -t rcsalles/node-sorting-service-test --file ./Dockerfile.test .

build-docker-images: build-docker-production build-docker-test

test-app:
	docker run --rm rcsalles/node-sorting-service-test:latest

run-app:
	docker run --rm -p 8080:8080 rcsalles/node-sorting-service:latest

push-docker-images:
	docker push rcsalles/node-sorting-service:latest