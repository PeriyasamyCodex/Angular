FROM maven:3.6.1-jdk-8-slim AS build
RUN mkdir -p /eureka-registry-server
WORKDIR /eureka-registry-server
COPY pom.xml /eureka-registry-server
COPY src /eureka-registry-server/src
RUN mvn -f pom.xml clean package

FROM openjdk:8-jdk-alpine
COPY --from=build /eureka-registry-server/target/*.jar eureka-registry-server.jar
EXPOSE 8671
ENTRYPOINT ["java","-jar", "eureka-registry-server.jar"]
