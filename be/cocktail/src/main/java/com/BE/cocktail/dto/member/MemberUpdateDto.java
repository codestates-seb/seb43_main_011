package com.BE.cocktail.dto.member;

import lombok.Getter;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
public class MemberUpdateDto {

    @Pattern(regexp = "^[a-zA-Z가-힣0-9-_.]{2,12}$")
    private String nickname;

    @Size(min=1, max=255)
    private String statusMessage;

}