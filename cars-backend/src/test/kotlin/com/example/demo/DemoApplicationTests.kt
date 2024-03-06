package com.example.demo

import com.example.demo.web.CarController
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class DemoApplicationTests(
    @Autowired val controller: CarController,
) {
    @Test
    fun contextLoads() {
        assertThat(controller).isNotNull()
    }

}
