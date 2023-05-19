package com.BE.cocktail.security.oauth;

import com.BE.cocktail.dto.apiResponse.CocktailRtnConsts;
import com.BE.cocktail.exception.CocktailException;
import com.BE.cocktail.persistence.domain.member.Member;
import com.BE.cocktail.persistence.domain.member.Role;
import com.BE.cocktail.security.oauth.userinfo.GoogleMemberInfo;
import com.BE.cocktail.security.oauth.userinfo.OAuth2MemberInfo;
import com.BE.cocktail.security.oauth.userinfo.ProviderType;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.Map;
import java.util.UUID;

@Getter
public class OAuthAttributes {

    private String providerId;
    private OAuth2MemberInfo oAuth2MemberInfo;

    @Builder
    public OAuthAttributes(String providerId, OAuth2MemberInfo oAuth2MemberInfo) {
        this.providerId = providerId;
        this.oAuth2MemberInfo = oAuth2MemberInfo;
    }

    public static OAuthAttributes of(ProviderType providerType,
                                     String providerId,
                                     Map<String, Object> attributes) {
        if (providerType == ProviderType.GOOGLE) {
            return ofGoogle(providerId, attributes);
        }
        if (providerType == ProviderType.KAKAO) {
            return ofKakao(providerId, attributes);
        }
//        if (providerType == ProviderType.NAVER) {
//            return ofNaver(providerId, attributes);
//        }

        throw new CocktailException(CocktailRtnConsts.ERR408);
    }

    private static OAuthAttributes ofGoogle(String providerId, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .providerId(providerId)
                .oAuth2MemberInfo(new GoogleMemberInfo(attributes))
                .build();
    }

    private static OAuthAttributes ofKakao(String providerId, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .providerId(providerId)
                //.oAuth2UserInfo(new KakaoUserInfo(attributes))
                .build();
    }

//    private static OAuthAttributes ofNaver(String providerId, Map<String, Object> attributes) {
//        return OAuthAttributes.builder()
//                .providerId(providerId)
//                .oAuth2UserInfo(new NaverUserInfo(attributes))
//                .build();
//    }

    public Member toEntity(ProviderType providerType, OAuth2MemberInfo oAuth2MemberInfo, PasswordEncoder passwordEncoder) {
        return Member.builder()
                .provider(providerType.getProvider())
                .providerId(oAuth2MemberInfo.getProviderId())
                .email(oAuth2MemberInfo.getEmail())
                .nickname(oAuth2MemberInfo.getName())
                .roles(Collections.singletonList(Role.USER.getRole()))
                .password(passwordEncoder.encode("NO_PASS" + UUID.randomUUID()))
                .build();
    }
}
