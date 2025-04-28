#!/bin/bash
set -e

# Create service databases if they don't exist
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_ADMIN_USER" <<-EOSQL
  CREATE DATABASE "user-service-${ENV}" WITH OWNER = "${DB_USER}";
  CREATE DATABASE "transaction-service-${ENV}" WITH OWNER = "${DB_USER}";
  CREATE DATABASE "reporting-service-${ENV}" WITH OWNER = "${DB_USER}";
EOSQL

echo "Service databases created successfully"