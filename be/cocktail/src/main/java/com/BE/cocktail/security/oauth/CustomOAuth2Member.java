package com.BE.cocktail.security.oauth;

import com.BE.cocktail.persistence.domain.member.Member;
import com.BE.cocktail.utils.AuthorityUtils;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Getter
public class CustomOAuth2Member extends DefaultOAuth2User {
    private String email;
    private List<String> role;

    public CustomOAuth2Member(Collection<? extends GrantedAuthority> authorities,
                            Map<String, Object> attributes,
                            String nameAttributeKey,
                            String email,
                            List<String> role) {
        super(authorities, attributes, nameAttributeKey);
        this.email = email;
        this.role = role;
    }

    public static CustomOAuth2Member of(Member member,
                                        Map<String, Object> attributes,
                                        OAuthAttributes oAuthAttributes) {
        return new CustomOAuth2Member(
                AuthorityUtils.getAuthorities(member.getRoles()),
                attributes,
                oAuthAttributes.getProviderId(),
                member.getEmail(),
                member.getRoles()
        );
    }
}
