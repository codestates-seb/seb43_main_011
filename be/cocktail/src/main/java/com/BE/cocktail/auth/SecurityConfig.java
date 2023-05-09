package com.BE.cocktail.auth;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // CSRF(Cross-Site Request Forgery) 공격 방어 기능 비활성화
                .authorizeRequests()
                .anyRequest().permitAll(); // 모든 요청에 대해 인증을 요구하지 않음
    }
}

