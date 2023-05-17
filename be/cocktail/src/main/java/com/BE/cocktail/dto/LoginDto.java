package com.BE.cocktail.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
public class LoginDto {

    @Email
    @NotBlank
    private String email;

    @Size(min = 8, max = 20, message = "8에서 20자 사이의 문자열을 입력하세요.")
    @Pattern(regexp = "^(?=.*?[0-9])(?=.*?[#?!@$%^&*-])\\S*$", message = "띄어쓰기 없이 알파벳, 숫자, 특수문자를 포함한 문자열을 입력하세요.")
    @NotBlank
    private String password;

}
