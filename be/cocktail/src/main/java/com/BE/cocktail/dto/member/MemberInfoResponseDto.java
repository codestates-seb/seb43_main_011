package com.BE.cocktail.dto.member;

import com.BE.cocktail.persistence.domain.member.Member;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MemberInfoResponseDto {

    private String imageUrl;

    private String nickName;

    private String description;

    public static MemberInfoResponseDto of(Member member) {

        MemberInfoResponseDto response = new MemberInfoResponseDto(member.getImageUrl(), member.getNickname(), member.getStatusMessage());

        return response;
    }

}
