# Mini-InstaPay

A microservices-based payment processing system built with modern cloud technologies.

## Overview

Mini-InstaPay is a distributed payment processing system that demonstrates the implementation of microservices architecture using Docker and Kubernetes. The system is designed to handle payment transactions with high reliability and scalability.

## Project Structure

```
.
├── services/           # Microservices source code
├── k8s/               # Kubernetes configuration files
├── envs/              # Environment configuration files
├── docs/              # Project documentation
├── docker-compose.yml # Docker Compose configuration
├── deploy-dev.sh      # Development deployment script
└── init-db.sh         # Database initialization script
```

## Prerequisites

- Docker
- Docker Compose
- Kubernetes (for production deployment)
- Node.js (for local development)

## Quick Start

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mini-instapay
   ```

2. Set up environment variables:
   ```bash
   cp envs/.env.example envs/.env
   # Edit envs/.env with your configuration
   ```

3. Start the development environment:
   ```bash
   ./deploy-dev.sh
   ```

4. Initialize the database:
   ```bash
   ./init-db.sh
   ```

## Development

For local development, the project uses Docker Compose to orchestrate the services. Each service can be developed independently and tested using the provided development environment.

## Deployment

The project includes Kubernetes configurations for production deployment. The deployment process is automated through the provided scripts and configurations in the `k8s/` directory.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.