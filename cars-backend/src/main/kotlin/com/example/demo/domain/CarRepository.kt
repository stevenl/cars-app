package com.example.demo.domain

import org.springframework.data.repository.CrudRepository

interface CarRepository : CrudRepository<Car, Long> {
    // Fetch cars by brand
    fun findByBrand(brand: String): List<Car>

    // Fetch cars by color
    fun findByColor(color: String): List<Car>

    // Fetch cars by model year
    fun findByModelYear(modelYear: Int): List<Car>
}
