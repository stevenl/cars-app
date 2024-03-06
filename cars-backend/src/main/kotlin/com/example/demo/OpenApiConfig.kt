package com.example.demo

import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Info
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class OpenApiConfig {
    @Bean
    fun carDatabaseOpenAPI(): OpenAPI =
        OpenAPI().info(
            Info()
                .title("Car REST API")
                .description("My car stock")
                .version("1.0")
        )
}
