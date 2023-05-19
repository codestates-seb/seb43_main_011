package com.BE.cocktail.service.member;

import com.BE.cocktail.dto.apiResponse.ApiResponse;
import com.BE.cocktail.dto.apiResponse.CocktailRtnConsts;
import com.BE.cocktail.dto.member.MemberInfoResponseDto;
import com.BE.cocktail.dto.member.SignUpDto;
import com.BE.cocktail.exception.CocktailException;
import com.BE.cocktail.persistence.domain.member.Member;
import com.BE.cocktail.persistence.repository.member.MemberRepository;
import com.BE.cocktail.utils.AuthorityUtils;
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
//    private final CustomAuthorityUtils customAuthorityUtils;

    private final AuthorityUtils authorityUtils;
//    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils customAuthorityUtils) {
//        this.memberRepository = memberRepository;
//        this.passwordEncoder = passwordEncoder;
//        this.customAuthorityUtils = customAuthorityUtils;
//    }


    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, AuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    public void saveMember(SignUpDto sign) {

        String encryptedPassword = passwordEncoder.encode(sign.getPassword());
//        List<String> roles = authorityUtils.createRoles(sign.getEmail());

        Member member = new Member();
        member.setPassword(encryptedPassword);
        member.addRoles(authorityUtils.createRoles(member.getEmail()));
//        Member member = Member.of(sign, encryptedPassword, roles);

        memberRepository.save(member);
}

//    public Member saveMember(Member member) {
//        verifyExistMember(member.getEmail());
//        String encryptedPassword = passwordEncoder.encode(member.getPassword());
//        member.setPassword(encryptedPassword);
//        member.addRoles(authorityUtils.createRoles(member.getEmail()));
//
//        return memberRepository.save(member);
//
//    }
//
//    private ApiResponse verifyExistMember(String email) {
//        Optional<Member> member = memberRepository.findByEmail(email);
//        if (member.isPresent()) {
//            throw ApiResponse.ok(CocktailRtnConsts.ERR407);
//        }
//    }


    public Member getLoginMember() {
        Optional<Member> findMember = memberRepository.findByEmail(GetAuthUserUtils.getAuthUser().getName());
        findMember.orElseThrow(() -> new CocktailException(CocktailRtnConsts.ERR401));
        Member member = findMember.get();
        return member;
    }

    public MemberInfoResponseDto findMyPageInfo() {

        Member member = getLoginMember();

        return MemberInfoResponseDto.of(member);
    }
}
