package com.example.demo.service

import com.example.demo.domain.Car
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.stereotype.Service

@Service
class CarService {
    @PreAuthorize("hasRole('USER')")
    fun updateCar(car: Car?) {
        // This method can be invoked by user with USER role
    }

    @PreAuthorize("hasRole('ADMIN')")
    fun deleteOwner(car: Car?) {
        // This method can be invoked by user with ADMIN role
    }
}
