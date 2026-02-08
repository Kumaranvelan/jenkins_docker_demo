pipeline {
    agent any

    environment {
        IMAGE_NAME = "johnvelan/jenkins-docker-demo"
        IMAGE_TAG = "${env.BUILD_NUMBER}" // Unique tag for each build
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Kumaranvelan/jenkins_docker_demo'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
                sh 'docker tag $IMAGE_NAME:$IMAGE_TAG $IMAGE_NAME:latest'
            }
        }

        stage('Docker Hub Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds-new',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Image') {
            steps {
                sh 'docker push $IMAGE_NAME:$IMAGE_TAG'
                sh 'docker push $IMAGE_NAME:latest'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl set image deployment/jenkins-demo jenkins-demo=$IMAGE_NAME:$IMAGE_TAG --record'
                sh 'kubectl rollout status deployment/jenkins-demo'
            }
        }
    }

    post {
        success {
            echo "Deployment successful! Image: $IMAGE_NAME:$IMAGE_TAG"
        }
        failure {
            echo "Pipeline failed!"
        }
    }
}