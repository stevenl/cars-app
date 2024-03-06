package com.example.demo

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.HttpHeaders
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status


@SpringBootTest
@AutoConfigureMockMvc
internal class CarRestTest(
    @Autowired private val mockMvc: MockMvc,
) {
    @Test
    fun testAuthentication() {
        // Testing authentication with correct credentials
        mockMvc.perform(
            post("/login")
                .content("""{"username":"admin","password":"admin"}""")
                .header(HttpHeaders.CONTENT_TYPE, "application/json")
            )
            .andDo { println(it) }
            .andExpect(status().isOk())
    }
}
