package com.example.demo.domain

import org.springframework.data.repository.CrudRepository

interface OwnerRepository : CrudRepository<Owner, Long>
