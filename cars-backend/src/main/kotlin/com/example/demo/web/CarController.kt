package com.example.demo.web

import com.example.demo.domain.Car
import com.example.demo.domain.CarRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController


@RestController
class CarController(val carRepository: CarRepository) {
    @GetMapping("/cars")
    fun getCars(): Iterable<Car> = carRepository.findAll()
}
