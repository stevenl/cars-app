package com.example.demo.domain

import jakarta.persistence.*

@Entity
class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long? = null
    var brand: String? = null
    var model: String? = null
    var color: String? = null
    var registrationNumber: String? = null
    var modelYear: Int = 0
    var price: Int = 0

    constructor()
    constructor(
        brand: String?,
        model: String?,
        color: String?,
        registrationNumber: String?,
        modelYear: Int,
        price: Int,
    ) : super() {
        this.brand = brand
        this.model = model
        this.color = color
        this.registrationNumber = registrationNumber
        this.modelYear = modelYear
        this.price = price
    }
}
