package com.BE.cocktail.security.oauth.userinfo;

import lombok.Getter;

@Getter
public enum ProviderType {

    GOOGLE("google"),
    NAVER("naver"),
    KAKAO("kakao");

    private String provider;

    ProviderType(String provider) {
        this.provider = provider;
    }
}

