package com.example.demo.service

import com.example.demo.domain.AppUser
import com.example.demo.domain.AppUserRepository
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class UserDetailsServiceImpl(val repository: AppUserRepository) : UserDetailsService {
    override fun loadUserByUsername(username: String): UserDetails {
        val user: AppUser =
            repository.findByUsername(username)
                ?: throw UsernameNotFoundException("User not found")
        return User.withUsername(username)
            .password(user.password)
            .roles(user.role)
            .build()
    }
}
