package com.BE.cocktail.controller.member;

import com.BE.cocktail.dto.apiResponse.ApiResponse;
import com.BE.cocktail.dto.member.MemberInfoResponseDto;
import com.BE.cocktail.dto.member.MemberUpdateDto;
import com.BE.cocktail.dto.member.SignUpDto;
import com.BE.cocktail.service.member.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;

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

    @ApiOperation(value = "회원 정보 수정(content)")
    @PatchMapping("/member/update/content")
    public ApiResponse<Void> updateMypageContent(@RequestBody MemberUpdateDto updateDto) {

        memberService.updateContent(updateDto);

        return ApiResponse.ok();

    }

    @ApiOperation(value = "회원 정보 수정(image)")
    @PatchMapping(value = "/member/update/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Void> updateMypageImage(@RequestPart(value="image") MultipartFile image) throws IOException {

        if(image.getSize() == 0) return ApiResponse.ok();

        memberService.updateImage(image);

        return ApiResponse.ok();

    }
}