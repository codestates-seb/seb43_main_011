package com.BE.cocktail.service.bookmark;

import com.BE.cocktail.dto.apiResponse.CocktailRtnConsts;
import com.BE.cocktail.dto.bookmark.BookmarkFindAllResponseDto;
import com.BE.cocktail.dto.bookmark.BookmarkRequestDto;
import com.BE.cocktail.dto.utils.MultiResponseDto;
import com.BE.cocktail.dto.utils.PageInfo;
import com.BE.cocktail.exception.CocktailException;
import com.BE.cocktail.persistence.domain.bookmark.Bookmark;
import com.BE.cocktail.persistence.domain.customRecipe.CustomRecipe;
import com.BE.cocktail.persistence.domain.regularRecipe.RegularRecipe;
import com.BE.cocktail.persistence.repository.bookmark.BookmarkRepository;
import com.BE.cocktail.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;

    private final MemberService memberService;

    private Long recipeId;


    @Transactional
    public void checkBookmark(Long id, BookmarkRequestDto requestDto) {

        Long memberId = memberService.getLoginMember().getId();

        Bookmark bookmark = bookmarkRepository.findByRecipe(memberId, id, requestDto.getRecipeType());

        if (bookmark == null) {
            saveBookmark(id, requestDto);
        }

        else if(bookmark.isDeleted() != false) {
            bookmark.update();
        }

        else {
            throw new CocktailException(CocktailRtnConsts.ERR410);
        }
    }

    @Transactional
    public void saveBookmark(Long id, BookmarkRequestDto requestDto) {

        Long memberId = memberService.getLoginMember().getId();

        if(requestDto.getRecipeType() == Bookmark.RecipeType.CUSTOM_RECIPE) {
            CustomRecipe findCustom = bookmarkRepository.findCustomById(id).orElseThrow(() -> new CocktailException(CocktailRtnConsts.ERR401));

            recipeId = findCustom.getId();
        }

        else if(requestDto.getRecipeType() == Bookmark.RecipeType.REGULAR_RECIPE) {
            RegularRecipe findRegular = bookmarkRepository.findRegularById(id).orElseThrow(() -> new CocktailException(CocktailRtnConsts.ERR401));

            recipeId = findRegular.getId();
        }

        Bookmark bookmark = Bookmark.of(recipeId, requestDto.getRecipeType(), memberId);

        bookmarkRepository.save(bookmark);

    }

    @Transactional
    public void cancelBookmark(Long id, BookmarkRequestDto requestDto) {
        Long memberId = memberService.getLoginMember().getId();

        if(requestDto.getRecipeType() == Bookmark.RecipeType.CUSTOM_RECIPE) {
            CustomRecipe findCustom = bookmarkRepository.findCustomById(id).orElseThrow(() -> new CocktailException(CocktailRtnConsts.ERR401));

            recipeId = findCustom.getId();
        }

        else if(requestDto.getRecipeType() == Bookmark.RecipeType.REGULAR_RECIPE) {
            RegularRecipe findRegular = bookmarkRepository.findRegularById(id).orElseThrow(() -> new CocktailException(CocktailRtnConsts.ERR401));

            recipeId = findRegular.getId();
        }

        Bookmark bookmark = bookmarkRepository.findByRecipe(memberId, id, requestDto.getRecipeType());

        if(bookmark == null) {
            throw new CocktailException(CocktailRtnConsts.ERR401);
        }

        bookmark.cancel();

    }

    public MultiResponseDto<BookmarkFindAllResponseDto> findAll(int page, int size) {

        Long memberId = memberService.getLoginMember().getId();

        List<Bookmark> customBookmark = bookmarkRepository.findAllCustomByMemberId(memberId, Bookmark.RecipeType.CUSTOM_RECIPE);
        List<Bookmark> regularBookmark = bookmarkRepository.findAllRegularByMemberId(memberId, Bookmark.RecipeType.REGULAR_RECIPE);

        List<CustomRecipe> customRecipes = customBookmark.stream().map(bookmark -> {
            CustomRecipe customRecipe = bookmarkRepository.findCustomById(bookmark.getRecipeId()).orElseThrow(() -> new CocktailException(CocktailRtnConsts.ERR401));
            return customRecipe;
        }).collect(Collectors.toList());
        List<RegularRecipe> regularRecipes = regularBookmark.stream().map(bookmark -> {
            RegularRecipe regularRecipe = bookmarkRepository.findRegularById(bookmark.getRecipeId()).orElseThrow(() -> new CocktailException(CocktailRtnConsts.ERR401));
            return regularRecipe;
        }).collect(Collectors.toList());


        BookmarkFindAllResponseDto data = BookmarkFindAllResponseDto.of(customRecipes, regularRecipes);


        PageRequest pageRequest = PageRequest.of(page, size);
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), data.getData().size());
        Page<BookmarkFindAllResponseDto> bookmarkPage = new PageImpl<>(data.getData().subList(start, end), pageRequest, data.getData().size());

        List<BookmarkFindAllResponseDto> responseData = bookmarkPage.getContent();

        return MultiResponseDto.of(responseData, PageInfo.of(bookmarkPage));
    }
}
