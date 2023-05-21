package com.BE.cocktail.dto.apiResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CocktailRtnConsts {

    //NomalResponseMode
    NRM000(CocktailRtnGrp.Success, 200, "응답성공"),

    NRM001(CocktailRtnGrp.Success, 201, "성공적으로 생성되었습니다."),

    SCC202(CocktailRtnGrp.Success, 202, "레시피가 성공적으로 삭제되었습니다."),

    SCC203(CocktailRtnGrp.Success, 203, "레시피 등록이 성공적으로 완료되었습니다."),

    SCC204(CocktailRtnGrp.Success, 204, "찜등록이 완료되었습니다"),

    SCC205(CocktailRtnGrp.Success, 205, "찜등록이 취소되었습니다"),

    ERR400(CocktailRtnGrp.Validation, 400, "없는 레시피 이름입니다"),

    ERR401(CocktailRtnGrp.Validation, 401, "데이터베이스 조회할 데이터가 없습니다"),

    ERR402(CocktailRtnGrp.Validation, 402, "비밀번호 형식이 맞지 않습니다"),

    ERR403(CocktailRtnGrp.Validation, 403, "삭제에 실패했습니다."),

    ERR404(CocktailRtnGrp.Validation, 404, "이미 삭제된 레시피입니다."),

    ERR405(CocktailRtnGrp.Validation, 405, "가져올 상세 페이지가 없습니다."),
    ERR406(CocktailRtnGrp.Validation, 404, "회원을 찾을 수 없습니다."),
    ERR407(CocktailRtnGrp.Validation, 406, "이미 사용중인 이메일입니다."),
    ERR408(CocktailRtnGrp.Validation, 404, "지원하지 않는 OAuth 입니다."),

    ERR409(CocktailRtnGrp.Validation, 404, "탈퇴한 사용자 입니다"),
    ERR410(CocktailRtnGrp.Validation, 404, "이미 찜등록이 되어있습니다");



    private CocktailRtnGrp grp;

    private int code;

    private String description;

}
