FROM maven:3.6.1-jdk-8-slim AS build
RUN mkdir -p /favouriteservice
WORKDIR /favouriteservice
COPY pom.xml /favouriteservice
COPY src /favouriteservice/src
RUN mvn -f pom.xml clean package

FROM openjdk:8-jdk-alpine
COPY --from=build /favouriteservice/target/*.jar favouriteservice.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar", "favouriteservice.jar"]