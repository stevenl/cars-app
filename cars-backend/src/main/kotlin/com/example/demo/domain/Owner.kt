package com.example.demo.domain

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.OneToMany

@Entity
class Owner {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val ownerId: Long? = null
    var firstname: String? = null
    var lastname: String? = null

    @JsonIgnore
    @OneToMany(cascade = [CascadeType.ALL], mappedBy = "owner")
    var cars: List<Car>? = null

    constructor()
    constructor(firstname: String?, lastname: String?) : super() {
        this.firstname = firstname
        this.lastname = lastname
    }
}
