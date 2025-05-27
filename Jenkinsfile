pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 's224849242-node-app:latest'
    }

    stages {
        stage('Build') {
            steps {
                echo '🐳 Building personalized Docker image for Node.js app...'
                bat 'docker build -t s224849242-node-app:latest .'
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running Mocha test suite...'
                bat 'npm install'
                bat 'npm test'
            }
        }
    }

    post {
        always {
            echo '✅ Build and test stages completed.'
        }
    }
}
