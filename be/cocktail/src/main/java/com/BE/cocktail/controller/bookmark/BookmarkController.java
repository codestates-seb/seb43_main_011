package com.BE.cocktail.controller.bookmark;

import com.BE.cocktail.dto.apiResponse.ApiResponse;
import com.BE.cocktail.dto.bookmark.BookmarkFindAllResponseDto;
import com.BE.cocktail.dto.bookmark.BookmarkRequestDto;
import com.BE.cocktail.dto.utils.MultiResponseDto;
import com.BE.cocktail.service.bookmark.BookmarkService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookmark")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @ApiOperation(value = "북마크 등록")
    @PostMapping("/submit/{recipe_id}")
    public ApiResponse<Void> submitBookmark(@PathVariable("recipe_id") Long id, @RequestBody BookmarkRequestDto requestDto) {

        bookmarkService.checkBookmark(id, requestDto);

        return ApiResponse.bookmark();
    }

    @ApiOperation(value = "북마크 취소")
    @DeleteMapping("/cancel/{recipe_id}")
    public ApiResponse<Void> cancelBookmark(@PathVariable("recipe_id") Long id, @RequestBody BookmarkRequestDto requestDto) {

        bookmarkService.cancelBookmark(id, requestDto);

        return ApiResponse.cancelBookmark();
    }

    @ApiOperation(value = "나의 북마크목록 조회")
    @GetMapping("/findAll")
    public ApiResponse<MultiResponseDto<BookmarkFindAllResponseDto>> findBookmark(@RequestParam int page, @RequestParam int size) {

        MultiResponseDto<BookmarkFindAllResponseDto> responseDto = bookmarkService.findAll(page - 1, size);

        return ApiResponse.ok(responseDto);
    }

}
