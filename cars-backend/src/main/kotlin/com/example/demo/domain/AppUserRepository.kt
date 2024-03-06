package com.example.demo.domain

import org.springframework.data.repository.CrudRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(exported = false)  // Don't expose this repo as a REST resource
interface AppUserRepository : CrudRepository<AppUser, Long> {
    fun findByUsername(username: String): AppUser?
}
