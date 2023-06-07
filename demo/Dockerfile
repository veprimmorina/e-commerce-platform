FROM openjdk:18
EXPOSE 7000
#ARG JAR_FILE=out/*.jar
#COPY ./out/artifacts/Login_Register_jar/Login_Register.jar app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]


ADD target/demo-0.0.1-SNAPSHOT.jar springboot-docker-demo.jar
ENTRYPOINT ["java","-jar","springboot-docker-demo.jar"]
