package com.BE.cocktail.controller.member;

import com.BE.cocktail.dto.apiResponse.ApiResponse;
import com.BE.cocktail.dto.member.MemberInfoResponseDto;
import com.BE.cocktail.dto.member.SignUpDto;
import com.BE.cocktail.service.member.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@Api(tags = "member",description = "유저 API")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @ApiOperation(value = "회원가입")
    @PostMapping("/signup")
    public ApiResponse<Void> signUpMember(@Valid @RequestBody SignUpDto sign) {

        memberService.saveMember(sign);

        return ApiResponse.ok();
    }

    @ApiOperation(value = "회원 상세 정보")
    @GetMapping("/member/myPage")
    public ApiResponse<MemberInfoResponseDto> findMypageInfo() {

        MemberInfoResponseDto response = memberService.findMyPageInfo();

        return ApiResponse.ok(response);
    }

    //todo : 회원 정보 업데이트

    //todo : 나의 레시피목록


    //todo : 나의 찜목록


}
