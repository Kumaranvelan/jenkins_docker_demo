# Jenkins Docker Demo - Automated CI/CD Pipeline

## Overview
Automated CI/CD pipeline that demonstrates continuous integration and deployment using Jenkins, Docker, and Kubernetes. This project showcases webhook-triggered builds, secure credential management, and automated deployment to a Kubernetes cluster.

## Architecture Flow
```
Developer Push to GitHub
        ↓
GitHub Webhook Triggers Jenkins
        ↓
Jenkins Pipeline Stages:
  1. Checkout Code
  2. Build Docker Image
  3. Login to Docker Hub (secure credentials)
  4. Push Image to Docker Hub
  5. Deploy to Kubernetes
        ↓
Application Running in K8s Cluster
```

## Tech Stack
- **CI/CD:** Jenkins (with GitHub webhook integration)
- **Containerization:** Docker
- **Orchestration:** Kubernetes
- **Application:** Node.js
- **Version Control:** Git, GitHub
- **Registry:** Docker Hub

## Project Structure
```
jenkins_docker_demo/
├── Dockerfile              # Multi-stage Docker build
├── Jenkinsfile            # Pipeline definition with stages
├── app.js                 # Node.js application
├── package.json           # Dependencies
├── deployment.yaml        # Kubernetes deployment manifest
└── service.yaml           # Kubernetes service manifest
```

## Key Features

### 1. Automated CI/CD Pipeline
- **GitHub Webhook Integration:** Automatic trigger on code push
- **Multi-stage Pipeline:** Build → Test → Push → Deploy
- **Zero Manual Intervention:** Fully automated from code to production

### 2. Secure Credential Management
- Jenkins Credentials Manager for Docker Hub authentication
- No hardcoded passwords or tokens
- Username/password injected at runtime via environment variables

### 3. Kubernetes Deployment
- Automated deployment using kubectl within Jenkins
- Health checks and readiness probes
- Service exposure for external access

## Jenkinsfile Stages

```groovy
pipeline {
    stages {
        stage('Checkout') {
            // Pull latest code from GitHub
        }
        stage('Build') {
            // Build Docker image with version tag
        }
        stage('Docker Hub Login') {
            // Secure login using credentials manager
        }
        stage('Push') {
            // Push image to Docker Hub registry
        }
        stage('Deploy to K8s') {
            // Apply Kubernetes manifests
        }
    }
}
```

## How to Run

### Prerequisites
- Jenkins server installed
- Docker installed on Jenkins agent
- kubectl configured for Kubernetes cluster
- GitHub repository
- Docker Hub account

### Setup Steps

1. **Configure Jenkins:**
```bash
# Install required plugins:
- Docker Pipeline
- GitHub Integration
- Kubernetes CLI
```

2. **Add Docker Hub Credentials in Jenkins:**
- Go to Jenkins → Manage Jenkins → Credentials
- Add username/password credential
- ID: `dockerhub-creds-new`

3. **Configure GitHub Webhook:**
- GitHub Repo → Settings → Webhooks
- Payload URL: `http://your-jenkins-server:8080/github-webhook/`
- Content type: `application/json`
- Trigger: Push events

4. **Create Jenkins Pipeline Job:**
- New Item → Pipeline
- Configure → Pipeline from SCM
- Repository: This GitHub repo
- Script Path: `Jenkinsfile`

5. **Push Code:**
```bash
git add .
git commit -m "trigger build"
git push origin main
```

Jenkins will automatically:
- Detect the push via webhook
- Build Docker image
- Push to Docker Hub
- Deploy to Kubernetes

## Kubernetes Manifests

### Deployment
- **Replicas:** 2 (for high availability)
- **Image:** Node.js app from Docker Hub
- **Resource Limits:** CPU and memory defined
- **Health Checks:** Liveness and readiness probes

### Service
- **Type:** LoadBalancer (or NodePort for local)
- **Port:** 80 → 3000
- **Exposes:** Application to external traffic

## What I Learned

### Technical Skills
- Setting up Jenkins pipelines from scratch
- Integrating GitHub webhooks for automatic triggers
- Secure credential management in CI/CD
- Multi-stage Docker builds for optimization
- Kubernetes deployment automation
- kubectl integration within Jenkins

### DevOps Practices
- Infrastructure as Code (pipeline definition)
- Continuous Integration principles
- Automated testing and deployment
- Version control best practices

### Challenges Overcome
- **Docker not found error:** Installed Docker inside Jenkins container
- **kubectl not found error:** Configured kubectl on Jenkins agent
- **Credential issues:** Learned Jenkins credentials binding
- **Webhook not triggering:** Fixed ngrok tunnel for local development

## Security Considerations
- Docker Hub credentials stored in Jenkins Credentials Manager
- No secrets in code repository
- Kubernetes secrets for sensitive data
- RBAC implemented for service accounts

## Future Enhancements
- Add automated testing stage (unit tests, integration tests)
- Implement blue-green deployment strategy
- Add Slack/email notifications on build status
- Integrate SonarQube for code quality checks
- Add Prometheus monitoring for deployed app
- Implement rollback mechanism on failed deployments

## Troubleshooting

### Pipeline Fails at Build Stage
- Check Docker is installed: `docker --version`
- Verify Dockerfile syntax
- Check build logs in Jenkins console

### Image Push Fails
- Verify Docker Hub credentials in Jenkins
- Check network connectivity
- Ensure correct image tag format

### Kubernetes Deployment Fails
- Verify kubectl is configured: `kubectl get nodes`
- Check Kubernetes manifests syntax
- Verify cluster has sufficient resources

## Related Projects
- [DevOps End-to-End Project](https://github.com/Kumaranvelan/devops-end-to-end-project) - Complete pipeline with AWS
- [K8s Networking Demo](https://github.com/Kumaranvelan/k8s-networking-service-types-demo) - Service types explained
- [K8s RBAC & Secrets](https://github.com/Kumaranvelan/k8s-rbac-secrets) - Security implementation

## Contact
**Kumaravelan Subramani**
- GitHub: [@Kumaranvelan](https://github.com/Kumaranvelan)
- LinkedIn: [kumaravelan-subramani](https://linkedin.com/in/kumaravelan-subramani-a1399b253)

---

*This project demonstrates practical DevOps skills in CI/CD automation, containerization, and Kubernetes orchestration.*
