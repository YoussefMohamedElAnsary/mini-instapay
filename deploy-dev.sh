#!/bin/bash

# Create namespace first
echo "Creating namespace..."
kubectl apply -f k8s/dev/namespace.yaml

# Wait for namespace to be ready
echo "Waiting for namespace to be ready..."
sleep 5

# Create PVC and secrets first
echo "Creating PVC and secrets..."
kubectl apply -f k8s/dev/postgres-pvc.yaml -n instapay-dev
kubectl apply -f k8s/dev/postgres-secret.yaml -n instapay-dev
kubectl apply -f k8s/dev/postgres-initdb-configmap.yaml -n instapay-dev

# Wait for PVC to be bound
echo "Waiting for PVC to be bound..."
sleep 5

# Create ConfigMaps
echo "Creating ConfigMaps..."
kubectl apply -f k8s/dev/user-service-configmap.yaml -n instapay-dev
kubectl apply -f k8s/dev/transaction-service-configmap.yaml -n instapay-dev
kubectl apply -f k8s/dev/reporting-service-configmap.yaml -n instapay-dev

# Create all other resources
echo "Creating all other resources..."
kubectl apply -f k8s/dev/ -n instapay-dev

echo "Deployment completed!" 