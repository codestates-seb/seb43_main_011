package com.BE.cocktail.dto.utils;

import jdk.dynalink.beans.StaticClass;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MultiResponseDto<T> {

    private List<T> data;

    private PageInfo pageInfo;

    public static <T> MultiResponseDto<T> of(List<T> data, PageInfo pageInfo) {

        MultiResponseDto<T> multiResponseDto = new MultiResponseDto(data, pageInfo);

        return multiResponseDto;
    }

}
