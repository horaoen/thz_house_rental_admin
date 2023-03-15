pipeline {
  agent {
    label 'front'
  }
  stages {
    stage("docker clean") {
      steps {
        sh 'sudo docker stop thz_house_rental_admin'
        sh 'sudo docker rm thz_house_rental_admin'
        sh 'sudo docker rmi thz_house_rental_admin:v1' 
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
