package com.example.demo.domain

import jakarta.persistence.*


@Entity
class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    var id: Long? = null

    @Column(nullable = false, unique = true)
    var username: String? = null

    @Column(nullable = false)
    var password: String? = null

    @Column(nullable = false)
    var role: String? = null

    constructor()
    constructor(username: String, password: String, role: String) : this() {
        this.username = username
        this.password = password
        this.role = role
    }
}
