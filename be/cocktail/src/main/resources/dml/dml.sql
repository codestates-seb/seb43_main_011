INSERT INTO `member` (id, image_url, nickname, email, password, status_message, created_at, modified_at, deleted)
VALUES(0, 'imageUrl', '최재영', 'asdf@asdf.com', 'asdf11234@', '살려줘',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `custom_recipe` (id, member_id, image_url, name, description, recipe, ingredient, created_at, modified_at, deleted)
VALUES(0, 1, 'imageUrl', '장도리', '멜론맛인 칵테일', '1. 쉐이커에 얼음과 재료들을 넣고 쉐이킹한다 \\n2. 쉐이킹 후 얼음이 있는 글라스에 부어준다 \\n3. 마지막으로 스프라이트를 부어서 저어준 후 취향에 맞게 가니시를 올려서 완성',   '미도리 40ml \\n 스윗 앤 사워 믹스 15ml', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);


--regular--
--논 알코올--
INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EB%94%B8%EA%B8%B0%EB%A7%88%ED%8B%B0%EB%8B%88.png', '딸기마티니', '달콤한 딸기와 신선한 라임 주스가 어우러진 논 알코올 칵테일입니다. 딸기의 상큼한 맛과 마티니의 클래식한 맛이 더해져 독특한 맛을 만들어냅니다.', '1. 딸기를 잘게 썰어 새커에 넣습니다 \\n2. 라임 주스와 시럽을 추가하고 믹서기로 갈아줍니다 \\n3. 필터를 통해 체에 걸러주어 잔에 담습니다 \\n4. 얼음을 추가한 후 잘 저어 섞습니다.',   '딸기 150g \\n라임 주스 30ml \\n시럽 20ml', 0, '주스',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(1, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EB%9D%BC%EC%9E%84%EC%BF%A8%EB%9F%AC.png', '라임쿨러', '라임의 신맛과 탄산수의 청량감이 어우러진 논 알코올 칵테일입니다.', '1. 라임 주스, 시럽을 섞어 줍니다 \\n2. 얼음을 넣은 뒤, 탄산수로 채웁니다 \\n3. 잘 저어 섞습니다.',   '라임 주스 30ml \\n시럽 20ml \\n탄산수 150ml', 0, '주스',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(2, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EC%8B%A0%EB%8D%B0%EB%A0%90%EB%9D%BC.png', '신데렐라', '논 알콜 중 대표적인 칵테일로 3가지의 쥬스를 조합하여 만드는 칵테일이다 3가지 모두 신맛이 나는 쥬스이기에 배합이 중요한 칵테일 중 하나다.', '1. 쉐이커의 3가지 재료를 모두 넣는다 \\n 2. 쉐이킹 한 다음 잔에 따른다 \\n 3. 스타일에 맞게 따르기전 석류 시럽을 넣거나 가니시를 첨가한다',   '레몬 주스 20ml \\n오렌지 주스 20ml \\n파인애플 주스 20ml', 0, '주스',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(3, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EC%98%A4%EB%A0%8C%EC%A7%80%ED%8E%80%EC%B9%98.png', '오렌지펀치', '오렌지 주스와 사과 주스, 레몬 주스를 혼합한 논 알코올 칵테일입니다.', '1. 오렌지 주스, 사과 주스, 레몬 주스를 섞습니다 \\n2. 얼음을 넣고 섞습니다',   '오렌지 주스 80ml \\n사과 주스 40ml \\n레몬 주스 10ml', 0, '주스',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(4, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%ED%94%8C%EB%A1%9C%EB%A6%AC%EB%8B%A4.png', '플로리다', '논 알콜 칵테일로, 미국 금주법 때 만들어진 칵테일로 레몬 주스와 오렌지 주스가 들어가 새콤달콤한 맛이 특징이다', '1. 쉐이커에 오렌지 주스, 레몬 주스를 넣는다 \\n2. 그다음 설탕 1tsp과 앙고스투라 비터 2dash를 넣어준다 \\n3. 넣은 재료들을 모두 쉐이킹한 후 잔에 따라준다 \\n4. 기호에 맞게 레몬 필과 체리로 가니쉬 해준다',   '오렌지 주스 22ml \\n레몬 주스 7ml \\n설탕 1tsp \\n앙고스투라 비터 2dash', 0, '주스',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);


INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(5, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EB%A7%88%EA%B0%80%EB%A6%AC%ED%83%80.png', '마가리타', '마가리타(Margarita)는 멕시코에서 온 클래식한 틸라 시그니처 칵테일로, 라임 주스와 틸라를 기반으로 만들어집니다', '1.마가리타 글래스의 림을 소금으로 장식하려면, 글래스 림을 라임 주스에 적셔서 적당히 촉촉하게 만든 다음, 소금을 얇게 붙인 씻지 않은 플레이트에 글래스 림을 가볍게 찍습니다\\n2.글래스에 얼음을 채웁니다\\n3.쉐이커에 틸라, 라임 주스, 살란트로를 넣고 얼음을 추가합니다\\n4.쉐이커를 잘 흔들어 주세요 (약 10-15초)\\n5.얼음을 제거한 준비된 마가리타 글래스에 스트레이너를 사용하여 쉐이커의 혼합물을 따라 부어줍니다\\n6.선택적으로 라임 슬라이스로 장식합니다.',   '틸라(틸라 오렌지 리큐르)  45ml \\n신선한 라임 주스 30ml  \\n살란트로 (살란트로 또는 살란트로 시럽) 30ml  \\n얼음', 15, '테킬라',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(6, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EB%9D%BC%EC%9D%B4%ED%8A%B8%EB%9F%BC.png', '다이키리', '다이키리는 럼과 라임 주스를 기반으로 한 상쾌한 칵테일입니다. 아래는 다이키리의 클래식한 레시피입니다', '1.무빙 글래스 또는 칵테일 글래스에 얼음을 채웁니다 \\n2.쉐이커에 화이트 럼, 라임 주스, 단맛 시럽을 넣고 얼음을 추가합니다\\n3.쉐이커를 잘 흔들어 줍니다\\n4.얼음을 제거한 준비된 글래스에 스트레이너를 사용하여 쉐이커의 혼합물을 따라 부어줍니다\\n5.선택적으로 라임 휠 또는 라임 절반 슬라이스로 장식합니다.',   '화이트 럼 (화이트 럼은 선호하는 브랜드를 사용하시면 됩니다.) 60ml \\n신선한 라임 주스 30ml  \\n단맛 시럽 (예: 갈색 설탕 시럽 또는 단맛 시럽) 15ml ', 23, '라이트 럼',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(7, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EB%93%9C%EB%9D%BC%EC%9D%B4%EB%A7%88%ED%8B%B0%EB%8B%88.png', '드라이 마티니', '드라이 마티니는 진을 기반으로 한 전통적인 칵테일로, 간단하면서도 고급스러운 맛을 가지고 있습니다', '1.칵테일 글래스 또는 마티니 글래스를 냉장고에 미리 식히거나 얼음으로 차갑게 만듭니다\\n2.쉐이커에 드라이 진과 옵셔널하게 드라이 베르무트를 넣습니다\\n3.얼음을 쉐이커에 추가합니다\\n4.쉐이커를 잘 흔들어 줍니다 (약 10-15초)\\n5.냉장고에서 꺼낸 준비된 글래스에 스트레이너를 사용하여 쉐이커의 혼합물을 따라 부어줍니다\\n6.선택적으로 레몬 껍질 또는 올리브로 장식합니다 (레몬 껍질은 표면을 가볍게 닦아서 살짝 휘어서 글래스 안쪽으로 넣으면 됩니다)',   '드라이 진 (드라이한 특징을 가진 진) 60ml  \\n드라이 베르무트 (옵셔널하게 사용) 15ml \\n레몬껍질 또는 올리브 (옵셔널하게 사용)', 35, '진',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(4, '', '', '', '',   '', 0, '',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(4, '', '', '', '',   '', 0, '',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(4, '', '', '', '',   '', 0, '',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(4, '', '', '', '',   '', 0, '',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(4, '', '', '', '',   '', 0, '',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(4, '', '', '', '',   '', 0, '',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(4, '', '', '', '',   '', 0, '',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);