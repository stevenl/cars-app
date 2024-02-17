package com.example.demo.domain

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest

@DataJpaTest
class OwnerRepositoryTest(
    @Autowired val repository: OwnerRepository,
) {
    @Test
    fun saveOwner() {
        repository.save(Owner("Lucy", "Smith"))
        assertThat(
            repository.findByFirstname("Lucy")
        ).isNotNull()
    }

    @Test
    fun deleteOwners() {
        repository.save(Owner("Lisa", "Morrison"))
        repository.deleteAll()
        assertThat(repository.count()).isZero()
    }
}
