pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 's224849242-node-app:latest'
    }

    stages {
        stage('Build') {
            steps {
                echo '🐳 Building personalized Docker image for Node.js app...'
                sh 'docker build -t s224849242-node-app:latest .'
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running Mocha test suite...'
                sh 'npm install'  // Ensures test dependencies are present
                sh 'npm test'     // Runs mocha via npm script
            }
        }
    }

    post {
        always {
            echo '✅ Build and test stages completed.'
        }
    }
}
