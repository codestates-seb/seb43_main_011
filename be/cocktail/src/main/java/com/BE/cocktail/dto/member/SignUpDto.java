package com.BE.cocktail.dto.member;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
public class SignUpDto {

    private String imageUrl;

    @Pattern(regexp = "^[a-zA-Z가-힣0-9-_.]{2,12}$") // 한글, 영문, 숫자, 특수문자 (- _ .) 포함한 2 ~ 12글자
    @NotBlank
    private String nickName;

    @Email
    @NotBlank
    private String email;

    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[#?!@$%^&*-]).{6,24}$") // 영어, 특수문자 조합의 6~24 자리
    @NotBlank
    private String password;

}
