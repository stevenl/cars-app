package com.example.demo.service

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.HttpHeaders
import org.springframework.stereotype.Component
import java.security.Key
import java.util.*

@Component
class JwtService {
    val EXPIRATION_TIME: Long = 3600000 // 1 hour in ms
    val PREFIX: String = "Bearer"

    // Generate secret key. Only for demonstration purposes.
    // In production, you should read it from the application configuration.
    val key: Key = Keys.secretKeyFor(SignatureAlgorithm.HS256)

    // Generate signed JWT token
    fun getToken(username: String?): String =
        Jwts.builder()
            .setSubject(username)
            .setExpiration(Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(key)
            .compact()

    // Get a token from request Authorization header,
    // verify the token, and get username
    fun getAuthUser(request: HttpServletRequest): String? {
        val token =
            request.getHeader(HttpHeaders.AUTHORIZATION)
                ?: return null
        return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token.replace(PREFIX, ""))
            .getBody()
            .getSubject()
    }
}
