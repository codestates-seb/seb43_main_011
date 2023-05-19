package com.BE.cocktail.security.oauth.handler;

import com.BE.cocktail.security.jwt1.JwtTokenProvider;
import com.BE.cocktail.security.oauth.CustomOAuth2Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        log.info("OAuth login 성공");
        CustomOAuth2Member oAuth2Member = (CustomOAuth2Member) authentication.getPrincipal();
        loginSuccess(response, oAuth2Member);
    }

        private void loginSuccess(HttpServletResponse response, CustomOAuth2Member oAuth2Member) throws IOException {
            String accessToken = jwtTokenProvider.generateAccessToken(oAuth2Member.getEmail(), oAuth2Member.getRole());
            String refreshToken = jwtTokenProvider.generateRefreshToken();
            response.setHeader("Authorization", "Bearer " + accessToken);
            response.setHeader("Refresh", refreshToken);
            log.info("accessToken : {}", accessToken);
            log.info("refreshToken : {}", refreshToken);

            jwtTokenProvider.sendAccessAndRefreshToken(response, accessToken, refreshToken);
            response.sendRedirect(createURI());
        }

        private String createURI(){
            return UriComponentsBuilder.newInstance()
                    .scheme("http")
                    .host("localhost")
                    .port(3000)
                    .encode(StandardCharsets.UTF_8)
                    .build()
                    .toUriString();
        }
}
