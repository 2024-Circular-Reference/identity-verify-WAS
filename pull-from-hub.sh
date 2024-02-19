#!/bin/bash

DOCKER_HUB_PASSWORD=$DOCKER_HUB_PASSWORD

echo "Docker Hub에 로그인..."
echo "$DOCKER_HUB_PASSWORD" | docker login --username "edac99" --password-stdin

if [ $? -ne 0 ]; then
    echo "로그인 실패"
    exit 1
fi

echo "Docker Compose를 사용하여 Docker Hub에서 이미지 가져와 실행..."
docker-compose -f docker-compose.pull.yml up -d

echo "완료!"

