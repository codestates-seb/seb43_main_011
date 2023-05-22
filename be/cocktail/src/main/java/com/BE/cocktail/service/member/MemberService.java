package com.BE.cocktail.service.member;

import com.BE.cocktail.auth.CustomAuthorityUtils;
import com.BE.cocktail.dto.apiResponse.CocktailRtnConsts;
import com.BE.cocktail.dto.member.MemberInfoResponseDto;
import com.BE.cocktail.dto.member.MemberUpdateDto;
import com.BE.cocktail.dto.member.SignUpDto;
import com.BE.cocktail.exception.CocktailException;
import com.BE.cocktail.persistence.domain.customRecipe.CustomRecipe;
import com.BE.cocktail.persistence.domain.member.Member;
import com.BE.cocktail.persistence.repository.member.MemberRepository;
import com.BE.cocktail.s3.service.S3Uploader;
import com.BE.cocktail.utils.GetAuthUserUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    //비번 생성기
    private final PasswordEncoder passwordEncoder;

    //역할 부여
    private final CustomAuthorityUtils customAuthorityUtils;

    private final S3Uploader s3Uploader;

    private final HttpServletRequest request;

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
// 로그인 유무 확인하는 메서드
    public boolean CheckMember() {
        if (request.getHeader("Authorization").isEmpty()) return false ;

        return true;
    }

    public MemberInfoResponseDto findMyPageInfo() {

        Member member = getLoginMember();

        return MemberInfoResponseDto.of(member);
    }

    @Transactional
    public void updateContent(MemberUpdateDto updateDto) {

        Member findMember = getLoginMember();

        findMember.updateContent(updateDto);
    }

    @Transactional
    public void updateImage(MultipartFile image) throws IOException {

        String storedFileName = s3Uploader.upload(image,"images");

        Member findMember = getLoginMember();

        findMember.updateImage(storedFileName);
    }
}
