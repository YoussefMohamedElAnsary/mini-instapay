# Mini-Instapay Project

## Running the Application with Docker Compose

Set the environment variable for the desired environment:

- **Development environment**:
  ```powershell
  $env:ENV="dev"
  ```

- **Production environment**:
  ```powershell
  $env:ENV="prod"
  ```

- **Staging environment**:
  ```powershell
  $env:ENV="staging"
  ```

Then run:

```powershell
docker-compose up -d --build
```
```ubuntu docker compose
ENV="dev" docker compose up -d --build
```
```ubuntu kubernetes
minikube start --driver=docker
kubectl apply -f ./k8s/dev/
```
```to check tables in ubuntu terminal
psql "postgresql://admin:admin@localhost:5433/user-service-dev"
\dt             To view available tables
SELECT * FROM users;
```

## To Run Migrations for Specific Environments

- **Development environment**:
  ```powershell
  ENV=dev docker-compose run --rm user-service-migrations
  ENV=dev docker-compose run --rm transaction-service-migrations
  ENV=dev docker-compose run --rm reporting-service-migrations
  ```

- **Staging environment**:
  ```powershell
  ENV=staging docker-compose run --rm user-service-migrations
  ENV=staging docker-compose run --rm transaction-service-migrations
  ENV=staging docker-compose run --rm reporting-service-migrations
  ```

- **Production environment**:
  ```powershell
  ENV=prod docker-compose run --rm user-service-migrations
  ENV=prod docker-compose run --rm transaction-service-migrations
  ENV=prod docker-compose run --rm reporting-service-migrations
  ```

## To run Kubernetes dev env:
kubectl apply -f k8s/dev/

## To delete Kubernetes dev env:
kubectl delete -f k8s/dev/