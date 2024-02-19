#!/bin/bash

USER_NAME=edac99
PASSWORD=단하나뿐인비밀번호야
HUB_REPOSITORY_NAME=image-repo

echo "Docker Hub에 로그인..."
echo "$PASSWORD" | docker login --username "$USER_NAME" --password-stdin

if [ $? -ne 0 ]; then
    echo "로그인 실패"
    exit 1
fi

echo "Docker Compose를 사용하여 Docker Hub에서 이미지 가져와 실행..."
docker-compose -f docker-compose.pull.yml up -d

echo "완료!"

