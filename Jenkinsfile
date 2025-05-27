pipeline {
    agent any

   stage('Build') {
    steps {
        echo '🐳 Building personalized Docker image for Node.js app...'
        sh 'docker build -t s224849242-node-app:latest .'
    }
}
}
