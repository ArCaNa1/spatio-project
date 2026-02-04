환경 구성

OS: Windows 11 WSL2 (Ubuntu 22.04 LTS)  
Container: Docker Desktop  
Orchestration:k3s (Lightweight Kubernetes)  
Package Management: Helm v3 (Kubernetes App Manager)

실행 및 배포 가이드

1. 이미지 빌드 및 태그 설정
docker build -t arcana1/spatio-backend:v1.0 ./backend
docker tag spatio-backend:latest arcana1/spatio-backend:v1.0

2. 외부 리포지토리 배포
docker push arcana1/spatio-backend:v1.0

3. 쿠버네티스 리소스 반영
kubectl apply -f backend.yaml

Docker / Kubernetes / Helm 사용 흐름

1. Build & Ship (Docker)
역할: 애플리케이션 소드 코드와 실행 환경을 하나의 '이미지'로 표준화 합니다.
상세흐름: 로컬 환경에서 Dockerfile을 기반으로 이미지를 빌드하고, 이를 공용 저장소인 Docker Hub에 업로드 하여 어디서든 동일한 환경으로 실행할 수 있는 상태를 만듭니다.

2. Orchestrate & Self-heal (Kubernetes)
역할: 배포된 컨테이너 24시간 안정적으로 돌아가도록 관리합니다.
상세흐름: backend.yaml 정의서에 따라 Pod를 생성합니다. 쿠버네티스의 Liveness.Readiness Probe 기능을 통해 서비스 장애를 감지하면, 윤영자의 개입 없이 자동으로 컨테이너를 재시작하는 Self-healing 과정을 수행합니다.

3. Package & Config Management (Helm)
역할: 쿠버네티스 리소스와 복잡한 오픈소스 스택의 설정을 코드화하여 관리합니다.
상세 흐름: 수많은 YAML파일을 일일이 수정하는 대신, values.yaml 파일 하나로 통합 관리합니다. 비밀번호 변경이나 리소스 제한 같은 설정 변경시 helm upgrade 명령어를 통해 인프라 전체에 즉시 반영합니다.