package com.BE.cocktail.controller.member;

import com.BE.cocktail.dto.apiResponse.ApiResponse;
import com.BE.cocktail.dto.member.SignUpDto;
import com.BE.cocktail.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ApiResponse<Void> signUpMember(@RequestBody SignUpDto sign) {

        memberService.saveMember(sign);

        return ApiResponse.ok();
    }

}
