package com.BE.cocktail.security.oauth.service;

import com.BE.cocktail.dto.apiResponse.CocktailRtnConsts;
import com.BE.cocktail.exception.CocktailException;
import com.BE.cocktail.persistence.domain.member.Member;
import com.BE.cocktail.persistence.repository.member.MemberRepository;
import com.BE.cocktail.security.oauth.CustomOAuth2Member;
import com.BE.cocktail.security.oauth.OAuthAttributes;
import com.BE.cocktail.security.oauth.userinfo.OAuth2MemberInfo;
import com.BE.cocktail.security.oauth.userinfo.ProviderType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomOAuth2MemberService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        log.info("CustomOAuth2UserSerivce.loadUser() 실행 - OAuth2 로그인 요청 진입");

        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String provider = userRequest.getClientRegistration()
                .getRegistrationId();
        ProviderType providerType = getProviderType(provider);
        String providerId = userRequest.getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        log.info("provider : {} ", provider);
        log.info("providerId : {}", providerId);

        OAuthAttributes oAuthAttributes = OAuthAttributes.of(providerType, providerId, attributes);

        log.info("username : {}", oAuthAttributes.getOAuth2MemberInfo().getName());
        log.info("email : {}", oAuthAttributes.getOAuth2MemberInfo().getEmail());

        Member member = getMember(oAuthAttributes, providerType);

        log.info("CustomOAuth2UserSerivce.loadUser() 종료");
        return CustomOAuth2Member.of(member, attributes, oAuthAttributes);
    }

    private ProviderType getProviderType(String provider) {
        if (provider.equals("naver")) {
            return ProviderType.NAVER;
        }
        if (provider.equals("kakao")) {
            return ProviderType.KAKAO;
        }
        if (provider.equals("google")) {
            return ProviderType.GOOGLE;
        }
        throw new CocktailException(CocktailRtnConsts.ERR408);
    }

    private Member getMember(OAuthAttributes attributes, ProviderType providerType) {
        return memberRepository.findByEmail(attributes.getOAuth2MemberInfo().getEmail())
                .orElseGet(() -> createMember(attributes, providerType));
    }

    private Member createMember(OAuthAttributes attributes, ProviderType providerType) {
        Member member = attributes.toEntity(providerType,
                attributes.getOAuth2MemberInfo(),
                passwordEncoder);
        return memberRepository.save(member);
    }
}
