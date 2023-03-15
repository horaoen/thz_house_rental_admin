pipeline {
  agent {
    label 'front'
  }
  stages {
    stage("docker clean") {
      steps {
        sh 'docker ps -a | grep thz_house_rental_admin && docker stop thz_house_rental_admin && docker rm thz_house_rental_admin || true'
        sh 'docker images | grep thz_house_rental_admin:v1 && docker rmi thz_house_rental_admin:v1 || true'
      }
    }
    stage("docker build") {
      steps {
        sh 'sudo docker build -t thz_house_rental_admin:v1 .'
      }
    } 
    stage("dokcer run") {
      steps {
        sh 'sudo docker run --name thz_house_rental_admin -p 80:80 -d thz_house_rental_admin:v1'
      }
    }
  }
}
