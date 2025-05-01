# Mini-Instapay Project

## Running the Application with Docker Compose

Set the environment variable for the desired environment:

- **Development environment**:
  ```powershell
  $env:ENV="dev"
  $env:NODE_ENV="development"
  ```

- **Production environment**:
  ```powershell
  $env:ENV="prod"
  $env:NODE_ENV="production"
  ```

- **Staging environment**:
  ```powershell
  $env:ENV="staging"
  $env:NODE_ENV="staging"
  ```

Then run:

```powershell
docker-compose up -d --build
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

