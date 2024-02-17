package com.example.demo.web

import com.example.demo.domain.AccountCredentials
import com.example.demo.service.JwtService
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody


@Controller
class LoginController(val jwtService: JwtService, val authenticationManager: AuthenticationManager) {
    @PostMapping("/login")
    fun getToken(@RequestBody credentials: AccountCredentials): ResponseEntity<*> {
        // Generate token and send it in the response Authorization header
        val creds = UsernamePasswordAuthenticationToken(credentials.username, credentials.password)
        val auth: Authentication = authenticationManager.authenticate(creds)

        // Generate token
        val jwts = jwtService.getToken(auth.getName())

        // Build response with the generated token
        return ResponseEntity.ok()
            .header(
                HttpHeaders.AUTHORIZATION,
                "Bearer $jwts"
            ).header(
                HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS,
                "Authorization"
            ).build<Any>()
    }
}
