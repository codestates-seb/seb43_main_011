package com.BE.cocktail.apiResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CocktailRtnConsts {

    //NomalResponseMode
    NRM000(CocktailRtnGrp.Success, 201, "응답성공"),

    ERR400(CocktailRtnGrp.Validation, 400, "없는 레시피 이름입니다"),

    ERR401(CocktailRtnGrp.Validation, 401, "데이터베이스 조회할 데이터가 없습니다"),

    ERR402(CocktailRtnGrp.Validation, 402, "비밀번호 형식이 맞지 않습니다");



    private CocktailRtnGrp grp;

    private int code;

    private String description;

}
