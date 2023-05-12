package com.BE.cocktail.dto.utils;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.awt.print.Pageable;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PageInfo {

    private int page;

    private int size;

    private int totalPage;

    private long totalSize;

    public static <T> PageInfo of(Page<T> page) {

        PageInfo pageInfo = new PageInfo(page.getNumber() + 1, page.getSize(), page.getTotalPages(), page.getTotalElements());

        return pageInfo;
    }

}
