package com.BE.cocktail.controller.member;

import com.BE.cocktail.dto.apiResponse.ApiResponse;
import com.BE.cocktail.dto.member.MemberInfoResponseDto;
import com.BE.cocktail.dto.member.SignUpDto;
import com.BE.cocktail.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ApiResponse<Void> signUpMember(@Valid @RequestBody SignUpDto sign) {

        memberService.saveMember(sign);

        return ApiResponse.ok();
    }

    @GetMapping("/member/myPage")
    public ApiResponse<MemberInfoResponseDto> findMypageInfo() {

        MemberInfoResponseDto response = memberService.findMyPageInfo();

        return ApiResponse.ok(response);
    }

    //todo : 회원 정보 업데이트

    //todo : 나의 레시피목록


    //todo : 나의 찜목록


}
