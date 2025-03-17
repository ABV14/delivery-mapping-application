FROM node:18-alpine

# Install PostgreSQL
RUN apk add --no-cache postgresql postgresql-client

# Create necessary directories with root user
RUN mkdir -p /var/lib/postgresql/data /run/postgresql && \
    chmod 0700 /run/postgresql && \
    # Check if postgres user exists, or create it
    id -u postgres &>/dev/null || adduser -D postgres && \
    # Change ownership to postgres user
    chown -R postgres:postgres /var/lib/postgresql/data /run/postgresql

# Initialize PostgreSQL database
USER postgres
RUN initdb -D /var/lib/postgresql/data

# Create a database
RUN pg_ctl -D /var/lib/postgresql/data start && \
    createdb mydatabase && \
    pg_ctl -D /var/lib/postgresql/data stop

# Switch back to root for application setup
USER root

# Set up the application directory
WORKDIR /app

# Copy application files
COPY . .

# Install backend dependencies
WORKDIR /app/Backend
RUN npm install

# Install frontend dependencies
WORKDIR /app/Frontend
RUN npm install

# Create start script
WORKDIR /app

EXPOSE 5173 3547 5432

# Start PostgreSQL, backend, and frontend
CMD sh -c "\
  echo 'Starting PostgreSQL...' && \
  su - postgres -c 'pg_ctl -D /var/lib/postgresql/data start' && \
  sleep 2 && \
  echo 'Starting Express backend...' && \
  ( cd /app/Backend && . .env && npm run dev ) & \
  sleep 5 && \
  echo 'Starting Svelte frontend...' && \
  cd /app/Frontend && \
  if [ \"$NODE_ENV\" = 'production' ]; then \
    echo 'Loading production environment variables...' && . .env.production; \
  else \
    echo 'Loading development environment variables...' && . .env.development; \
  fi && \
  npm run dev -- --host 0.0.0.0 && \
  wait"