docker build -t docker-stg .
set port=8082
set app=docker-stg-%port%
docker stop %app%
docker rm %app%
docker run --env PORT=80 -d -p %port%:80 --name %app% docker-stg