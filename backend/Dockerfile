# =========================================================
# BUILD STAGE
# =========================================================

FROM maven:3.9-eclipse-temurin-26 AS build

WORKDIR /app

# Copy Maven configuration
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build Spring Boot application
RUN mvn clean package -DskipTests


# =========================================================
# RUNTIME STAGE
# =========================================================

FROM eclipse-temurin:26-jre

WORKDIR /app

# Copy the generated JAR
COPY --from=build /app/target/linehaul-1.0.0.jar /app/linehaul-1.0.0.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/linehaul-1.0.0.jar"]