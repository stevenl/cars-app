package com.example.demo.domain

import com.example.demo.service.JwtService
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.HttpHeaders
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class AuthenticationFilter(val jwtService: JwtService) : OncePerRequestFilter() {
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain,
    ) {
        // Get token from the Authorization header
        request.getHeader(HttpHeaders.AUTHORIZATION)?.let {
            // Verify token and get user
            val user: String? = jwtService.getAuthUser(request)
            // Authenticate
            SecurityContextHolder.getContext().authentication =
                UsernamePasswordAuthenticationToken(user, null, emptyList())
        }
        filterChain.doFilter(request, response)
    }
}
