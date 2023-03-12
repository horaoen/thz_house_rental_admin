pipline {
  agent any
  stages {
    
    stage("docker build") {
      setps {
        sh 'sudo docker build -t thz_house_rental_admin:v1 .'
      }
    } 
    stage("dokcer run") {
      setps {
        sh 'sudo docker run --name thz_house_rental_admin -p 2000:80 -d thz_house_rental_admin:v1'
      }
    }
  }
}
