pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh 'sudo docker build -t code-editor:frontend .'
      }
    }

    stage('deploy') {
      steps {
        sh 'sudo docker run -p 3502:3502 -d code-editor:frontend'
      }
    }

  }
}