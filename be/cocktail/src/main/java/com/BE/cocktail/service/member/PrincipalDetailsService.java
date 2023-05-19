package com.BE.cocktail.service.member;

import com.BE.cocktail.dto.apiResponse.ApiResponse;
import com.BE.cocktail.dto.apiResponse.CocktailRtnConsts;
import com.BE.cocktail.exception.CocktailException;
import com.BE.cocktail.persistence.domain.member.Member;
import com.BE.cocktail.persistence.domain.member.MemberPrincipal;
import com.BE.cocktail.persistence.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Slf4j
@Component
public class PrincipalDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        log.info("[loadUserByUsername] username : {}", username);
        Member member = memberRepository.findByEmail(username).orElseThrow(() ->
                new CocktailException(CocktailRtnConsts.ERR407));

        return MemberPrincipal.of(member);
    }
}
