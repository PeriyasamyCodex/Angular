FROM maven:3.6.1-jdk-8-slim AS build
RUN mkdir -p /userservice
WORKDIR /userservice
COPY pom.xml /userservice
COPY src /userservice/src
RUN mvn -f pom.xml clean package

FROM openjdk:8-jdk-alpine
COPY --from=build /userservice/target/*.jar userservice.jar
EXPOSE 8082
ENTRYPOINT ["java","-jar", "userservice.jar"]