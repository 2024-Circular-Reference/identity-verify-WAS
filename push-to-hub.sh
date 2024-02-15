#!/bin/bash

USER_NAME=edac99
PASSWORD=단하나뿐인비밀번호야
HUB_REPOSITORY_NAME=image-repo

declare -A images=(
  ["holder"]="holder-1.0.0"
  ["issuer"]="issuer-1.0.0"
  ["verifier"]="verifier-1.0.0"
  ["service"]="service-1.0.0"
)

echo "Docker Hub에 로그인..."
echo "$PASSWORD" | docker login --username "$USER_NAME" --password-stdin

if [ $? -ne 0 ]; then
    echo "로그인 실패"
    exit 1
fi

echo "Docker Compose 빌드..."
docker-compose -f docker-compose.push.yml build

for name in "${!images[@]}"; do
  tag=${images[$name]}
  echo "Docker Hub에 $tag 배포..."
  docker push "$USER_NAME/$HUB_REPOSITORY_NAME:$tag"
done

echo "완료!"

