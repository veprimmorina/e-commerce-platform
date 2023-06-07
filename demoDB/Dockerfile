FROM openjdk:17
EXPOSE 8080
LABEL maintainer="test.net"
ADD target/demo-0.0.1-SNAPSHOT.jar springboot-docker-demo.jar
ENTRYPOINT ["java","-jar","springboot-docker-demo.jar"]