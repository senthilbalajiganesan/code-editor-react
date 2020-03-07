pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh 'sudo docker build -t code-editor:frontend .'
      }
    }

    stage('stop') {
      steps {
        sh 'sudo docker kill code-editor:frontend'
      }
    }

    stage('deploy') {
      steps {
        sh 'docker run -p 3502:3502 code-editor:frontend'
      }
    }

  }
}