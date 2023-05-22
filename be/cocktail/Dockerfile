FROM openjdk:11-jdk
COPY build/libs/cocktail-0.0.1-SNAPSHOT.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "app.jar"]
