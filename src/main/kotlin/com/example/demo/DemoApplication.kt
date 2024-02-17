package com.example.demo

import com.example.demo.domain.*
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class DemoApplication(val carRepository: CarRepository, val ownerRepository: OwnerRepository, val userRepository: AppUserRepository) : CommandLineRunner {
    override fun run(vararg args: String?) {
        val owner1 = Owner("John", "Johnson")
        val owner2 = Owner("Mary", "Robinson")
        ownerRepository.saveAll(listOf(owner1, owner2))

        carRepository.save(
            Car(
                "Ford",
                "Mustang",
                "Red",
                "ADF-1121",
                2023,
                59000,
                owner1,
            ),
        )
        carRepository.save(
            Car(
                "Nissan",
                "Leaf",
                "White",
                "SSJ-3002",
                2020,
                29000,
                owner2,
            ),
        )
        carRepository.save(
            Car(
                "Toyota",
                "Prius",
                "Silver",
                "KKO-0212",
                2022,
                39000,
                owner2,
            ),
        )
        // Fetch all cars and log to console
        for (car in carRepository.findAll()) {
            logger.info("brand: ${car.brand}, model: ${car.model}")
        }

        // Username: user, password: user
        userRepository.save(
            AppUser(
                "user",
                "$2a$10\$NVM0n8ElaRgg7zWO1CxUdei7vWoPg91Lz2aYavh9.f9q0e4bRadue",
                "USER"
            )
        )
        // Username: admin, password: admin
        userRepository.save(
            AppUser(
                "admin",
                "$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW",
                "ADMIN"
            )
        )
    }
}

val logger: Logger = LoggerFactory.getLogger(DemoApplication::class.java)

fun main(args: Array<String>) {
    runApplication<DemoApplication>(*args)
    logger.info("Application started")
}
