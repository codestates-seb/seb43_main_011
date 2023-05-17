package com.BE.cocktail.dto.customRecipe;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class CustomPatchDto {

    @NotBlank
    private String imageUrl;

    @Pattern(regexp = "^[가-힣]+$") //한글만 사용 가능
    @NotBlank
    private String name;

    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "특수 기호는 사용이 불가합니다.") //특수 기호 사용 불가, 알파벳, 숫자, 한글로만 구성
    @NotBlank
    private String description;

    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "특수 기호는 사용이 불가합니다.")
    @NotBlank
    private String recipe;

    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "특수 기호는 사용이 불가합니다.")
    @NotBlank
    private String ingredient;

}
