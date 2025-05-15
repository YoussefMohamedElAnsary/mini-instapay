#!/bin/bash
set -e

# Default to 'dev' if ENV is not set
ENV=${ENV:-dev}
echo "Setting up databases for environment: ${ENV}"

# Function to setup database
setup_database() {
  DB_NAME=$1
  
  echo "Setting up database: $DB_NAME"
  
  # Check if database exists
  if psql -lqt -U "$POSTGRES_USER" | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
    echo "Database $DB_NAME already exists"
  else
    echo "Creating database: $DB_NAME"
    createdb -U "$POSTGRES_USER" "$DB_NAME"
  fi
  
  # Grant privileges to the user
  echo "Granting privileges on $DB_NAME to ${DB_USER}"
  psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -c "GRANT ALL PRIVILEGES ON DATABASE \"$DB_NAME\" TO ${DB_USER};"
  psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -c "ALTER DATABASE \"$DB_NAME\" OWNER TO ${DB_USER};"
}

# Create the DB user if it doesn't exist
echo "Creating database user ${DB_USER} if not exists"

psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" <<-EOSQL
  DO \$\$
  BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '${DB_USER}') THEN
      CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASSWORD}';
    END IF;
  END \$\$;
EOSQL

# Setup all service databases
setup_database "user-service-${ENV}"
setup_database "transaction-service-${ENV}"
setup_database "reporting-service-${ENV}"

echo "All databases setup completed successfully"

# Create a flag file to indicate this script has run
touch /var/lib/postgresql/data/.init_complete