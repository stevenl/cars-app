package com.example.demo

import com.example.demo.domain.Car
import com.example.demo.domain.CarRepository
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class DemoApplication(val repository: CarRepository) : CommandLineRunner {
    override fun run(vararg args: String?) {
        repository.save(
            Car(
                "Ford",
                "Mustang",
                "Red",
                "ADF-1121",
                2023,
                59000,
            ),
        )
        repository.save(
            Car(
                "Nissan",
                "Leaf",
                "White",
                "SSJ-3002",
                2020,
                29000,
            ),
        )
        repository.save(
            Car(
                "Toyota",
                "Prius",
                "Silver",
                "KKO-0212",
                2022,
                39000,
            ),
        )
        // Fetch all cars and log to console
        for (car in repository.findAll()) {
            logger.info("brand: ${car.brand}, model: ${car.model}")
        }
    }
}

val logger: Logger = LoggerFactory.getLogger(DemoApplication::class.java)

fun main(args: Array<String>) {
    runApplication<DemoApplication>(*args)
    logger.info("Application started")
}
