FROM openjdk:8
EXPOSE 9192
#ARG JAR_FILE=out/*.jar
#COPY ./out/artifacts/Login_Register_jar/Login_Register.jar app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]


ADD target/spring-boot-docker.jar springboot-docker-demo.jar
ENTRYPOINT ["java","-jar","springboot-docker-demo.jar"]

