package com.BE.cocktail.service.member;

import com.BE.cocktail.auth.CustomAuthorityUtils;
import com.BE.cocktail.dto.apiResponse.CocktailRtnConsts;
import com.BE.cocktail.dto.member.SignUpDto;
import com.BE.cocktail.exception.CocktailException;
import com.BE.cocktail.persistence.domain.member.Member;
import com.BE.cocktail.persistence.repository.member.MemberRepository;
import com.BE.cocktail.utils.GetAuthUserUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    //비번 생성기
    private final PasswordEncoder passwordEncoder;

    //역할 부여
    private final CustomAuthorityUtils customAuthorityUtils;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils customAuthorityUtils) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.customAuthorityUtils = customAuthorityUtils;
    }

    public void saveMember(SignUpDto sign) {

        String encryptedPassword = passwordEncoder.encode(sign.getPassword());
        List<String> roles = customAuthorityUtils.createRole(sign.getEmail());

        Member member = Member.of(sign, encryptedPassword, roles);

        memberRepository.save(member);
    }

    public Member getLoginMember() {
        Optional<Member> findMember = memberRepository.findByEmail(GetAuthUserUtils.getAuthUser().getName());
        findMember.orElseThrow(() -> new CocktailException(CocktailRtnConsts.ERR401));
        Member member = findMember.get();
        return member;
    }
}
