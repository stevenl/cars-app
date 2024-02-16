package com.example.demo

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class DemoApplication

val logger: Logger = LoggerFactory.getLogger(DemoApplication::class.java)

fun main(args: Array<String>) {
    runApplication<DemoApplication>(*args)
    logger.info("Application started")
}
