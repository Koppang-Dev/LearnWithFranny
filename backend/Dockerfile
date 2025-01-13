# Use an official OpenJDK image as a base
FROM maven:3.8.4-openjdk-17 as build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and install dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Add the JAR file to the container
COPY target/your-application.jar app.jar

# Copy source code and build the application
COPY src ./src

# Skip the tests
RUN mvn clean package -DskipTests

# Use OpenJDK image to run the application
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the built JAR File from the build stge
COPY --from=build /app/target/file-name.jar .

# Expose port 8080
EXPOSE 8080

# Specify the command to run the application
ENTRYPOINT [ "java", "-jar", "/app/target/file-name.jar "]