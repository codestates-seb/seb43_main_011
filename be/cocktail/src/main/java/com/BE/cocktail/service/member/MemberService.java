package com.BE.cocktail.service.member;

import com.BE.cocktail.auth.CustomAuthorityUtils;
import com.BE.cocktail.dto.apiResponse.CocktailRtnConsts;
import com.BE.cocktail.dto.member.MemberInfoResponseDto;
import com.BE.cocktail.dto.member.SignUpDto;
import com.BE.cocktail.exception.CocktailException;
import com.BE.cocktail.persistence.domain.member.Member;
import com.BE.cocktail.persistence.repository.member.MemberRepository;
import com.BE.cocktail.utils.GetAuthUserUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
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
        String defaultProfileImage = "https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EA%B8%B0%EB%B3%B8%ED%94%84%EC%82%AC.png";

        Member member = Member.of(sign, encryptedPassword, roles, defaultProfileImage);

        memberRepository.save(member);
    }

    public Member getLoginMember() {

        Member findMember = memberRepository.findByEmail(GetAuthUserUtils.getAuthUser().getName())
                .orElseThrow(() -> new CocktailException(CocktailRtnConsts.ERR401));

        if(findMember.isDeleted()) {
            throw new CocktailException(CocktailRtnConsts.ERR406);
        }

        return findMember;
    }

    public MemberInfoResponseDto findMyPageInfo() {

        Member member = getLoginMember();

        return MemberInfoResponseDto.of(member);
    }
}
