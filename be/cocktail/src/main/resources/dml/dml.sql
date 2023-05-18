--INSERT INTO `member` (id, image_url, nickname, email, password, status_message, created_at, modified_at, deleted)
--VALUES(0, 'imageUrl', '최재영', 'asdf@asdf.com', 'asdf11234@', '살려줘',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);
--
--INSERT INTO `custom_recipe` (id, member_id, image_url, name, description, recipe, ingredient, created_at, modified_at, deleted)
--VALUES(0, 1, 'imageUrl', '장도리', '멜론맛인 칵테일', '1. 쉐이커에 얼음과 재료들을 넣고 쉐이킹한다 \\n2. 쉐이킹 후 얼음이 있는 글라스에 부어준다 \\n3. 마지막으로 스프라이트를 부어서 저어준 후 취향에 맞게 가니시를 올려서 완성',   '미도리 40ml \\n 스윗 앤 사워 믹스 15ml', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);
--

--regular--
--논 알코올--
INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EB%94%B8%EA%B8%B0%EB%A7%88%ED%8B%B0%EB%8B%88.png', '딸기마티니', '달콤한 딸기와 신선한 라임 주스가 어우러진 논 알코올 칵테일입니다. 딸기의 상큼한 맛과 마티니의 클래식한 맛이 더해져 독특한 맛을 만들어냅니다.', '1. 딸기를 잘게 썰어 새커에 넣습니다 \\n2. 라임 주스와 시럽을 추가하고 믹서기로 갈아줍니다 \\n3. 필터를 통해 체에 걸러주어 잔에 담습니다 \\n4. 얼음을 추가한 후 잘 저어 섞습니다.',   '딸기 150g \\n라임 주스 30ml \\n시럽 20ml', 0, '주스',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EB%9D%BC%EC%9E%84%EC%BF%A8%EB%9F%AC.png', '라임쿨러', '라임의 신맛과 탄산수의 청량감이 어우러진 논 알코올 칵테일입니다.', '1. 라임 주스, 시럽을 섞어 줍니다 \\n2. 얼음을 넣은 뒤, 탄산수로 채웁니다 \\n3. 잘 저어 섞습니다.',   '라임 주스 30ml \\n시럽 20ml \\n탄산수 150ml', 0, '주스',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EC%8B%A0%EB%8D%B0%EB%A0%90%EB%9D%BC.png', '신데렐라', '논 알콜 중 대표적인 칵테일로 3가지의 쥬스를 조합하여 만드는 칵테일이다 3가지 모두 신맛이 나는 쥬스이기에 배합이 중요한 칵테일 중 하나다.', '1. 쉐이커의 3가지 재료를 모두 넣는다 \\n 2. 쉐이킹 한 다음 잔에 따른다 \\n 3. 스타일에 맞게 따르기전 석류 시럽을 넣거나 가니시를 첨가한다',   '레몬 주스 20ml \\n오렌지 주스 20ml \\n파인애플 주스 20ml', 0, '주스',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EC%98%A4%EB%A0%8C%EC%A7%80%ED%8E%80%EC%B9%98.png', '오렌지펀치', '오렌지 주스와 사과 주스, 레몬 주스를 혼합한 논 알코올 칵테일입니다.', '1. 오렌지 주스, 사과 주스, 레몬 주스를 섞습니다 \\n2. 얼음을 넣고 섞습니다',   '오렌지 주스 80ml \\n사과 주스 40ml \\n레몬 주스 10ml', 0, '주스',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%ED%94%8C%EB%A1%9C%EB%A6%AC%EB%8B%A4.png', '플로리다', '논 알콜 칵테일로, 미국 금주법 때 만들어진 칵테일로 레몬 주스와 오렌지 주스가 들어가 새콤달콤한 맛이 특징이다', '1. 쉐이커에 오렌지 주스, 레몬 주스를 넣는다 \\n2. 그다음 설탕 1tsp과 앙고스투라 비터 2dash를 넣어준다 \\n3. 넣은 재료들을 모두 쉐이킹한 후 잔에 따라준다 \\n4. 기호에 맞게 레몬 필과 체리로 가니쉬 해준다',   '오렌지 주스 22ml \\n레몬 주스 7ml \\n설탕 1tsp \\n앙고스투라 비터 2dash', 0, '주스',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);


INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EB%A7%88%EA%B0%80%EB%A6%AC%ED%83%80.png', '마가리타', '마가리타(Margarita)는 멕시코에서 온 클래식한 틸라 시그니처 칵테일로, 라임 주스와 틸라를 기반으로 만들어집니다', '1.글래스에 얼음을 채웁니다\\n2.쉐이커에 틸라, 라임 주스, 살란트로를 넣고 얼음을 추가합니다\\n3.쉐이커를 잘 흔들어 주세요\\n4.얼음을 제거한 준비된 마가리타 글래스에 스트레이너를 사용하여 쉐이커의 혼합물을 따라 부어줍니다\\n5.선택적으로 라임 슬라이스로 장식합니다.',   '틸라(틸라 오렌지 리큐르)  45ml \\n신선한 라임 주스 30ml  \\n살란트로 (살란트로 또는 살란트로 시럽) 30ml  \\n얼음', 15, '테킬라',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EB%9D%BC%EC%9D%B4%ED%8A%B8%EB%9F%BC.png', '다이키리', '다이키리는 럼과 라임 주스를 기반으로 한 상쾌한 칵테일입니다. 아래는 다이키리의 클래식한 레시피입니다', '1.무빙 글래스 또는 칵테일 글래스에 얼음을 채웁니다 \\n2.쉐이커에 화이트 럼, 라임 주스, 단맛 시럽을 넣고 얼음을 추가합니다\\n3.쉐이커를 잘 흔들어 줍니다\\n4.얼음을 제거한 준비된 글래스에 스트레이너를 사용하여 쉐이커의 혼합물을 따라 부어줍니다\\n5.선택적으로 라임 휠 또는 라임 절반 슬라이스로 장식합니다.',   '화이트 럼 (화이트 럼은 선호하는 브랜드를 사용하시면 됩니다.) 60ml \\n신선한 라임 주스 30ml  \\n단맛 시럽 (예: 갈색 설탕 시럽 또는 단맛 시럽) 15ml ', 23, '라이트럼',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EB%93%9C%EB%9D%BC%EC%9D%B4%EB%A7%88%ED%8B%B0%EB%8B%88.png', '드라이 마티니', '드라이 마티니는 진을 기반으로 한 전통적인 칵테일로, 간단하면서도 고급스러운 맛을 가지고 있습니다', '1.쉐이커에 드라이 진과 옵셔널하게 드라이 베르무트를 넣습니다\\n2.얼음을 쉐이커에 추가합니다\\n3.쉐이커를 잘 흔들어 줍니다 (약 10-15초)\\n4.냉장고에서 꺼낸 준비된 글래스에 스트레이너를 사용하여 쉐이커의 혼합물을 따라 부어줍니다\\n5.선택적으로 레몬 껍질 또는 올리브로 장식합니다',   '드라이 진 (드라이한 특징을 가진 진) 60ml  \\n드라이 베르무트 (옵셔널하게 사용) 15ml \\n레몬껍질 또는 올리브 (옵셔널하게 사용)', 35, '진',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EA%B7%B8%EB%A0%88%EC%9D%B4%ED%94%84%ED%94%84%EB%A3%A8%ED%8A%B8_%EC%8A%A4%ED%94%84%EB%A6%AC%EC%B8%A0.png', '그레이프프루트 스프리츠', '상쾌하고 과일 향이 풍부한 그레이프프루트 스프리츠는 여름에 시원하게 즐기기에 적합합니다.', '1. 칵테일 쉐이커에 얼음 조각을 넣습니다.\\n2. 그레이프프루트 주스, 탄산수, 레몬 주스, 단순 시럽을 추가합니다.\\n3. 10초 동안. 가볍게 흔들어 섞습니다.\n4. 롱 글래스에 얼음 조각을 채워 넣습니다.\\n5. 그레이프프루트 스프리츠를 걸러 넣습니다.\\n6. 그레이프프루트 슬라이스로 장식합니다.',   '그레이프프루트 주스 90ml\\n탄산수 60ml\\n레몬 주스 15ml\\n단순 시럽 15ml\\n그레이프프루트 슬라이스 (장식용)\\n얼음', 0, '주스',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EB%AA%A8%ED%9E%88%EB%98%90.png', '모히또', '모히또는 상쾌하고 청량감 있는 민트와 라임이 특징인 클래식한 칵테일입니다', '1.하이볼 글래스 또는 무빙 글래스에 민트 잎과 설탕을 넣고 가볍게 미는 도구(뮬러 또는 칵테일 뮬)를 사용하여 민트 잎을 부수고 설탕을 녹입니다\\n2.라임 주스를 추가하고 잘 섞어줍니다\\n3.화이트 럼을 넣고 스핀 스푼으로 가볍게 저어줍니다\\n4.글래스를 얼음으로 채웁니다\\n5.탄산수를 천천히 부어줍니다\\n6.선택적으로 라임 휠과 민트 잎으로 장식합니다.',   '화이트 럼 45ml \\n신선한 라임 주스 30ml \\n민트 잎 12개\\n설탕 2tsp\\n탄산수\\n얼음', 17, '화이트 럼',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%ED%8E%98%EB%8B%88%EC%8B%A4%EB%A6%B0.png', '페니실린', '페니실린은 위스키와 생강 시럽, 레몬 주스를 기반으로 한 현대적인 칵테일입니다.', '1.올드 패션드 글래스 또는 무빙 글래스에 얼음을 채웁니다\\n2.쉐이커에 스카치 위스키, 레몬 주스, 생강 시럽, 페토벤(선택적)을 넣고 얼음을 추가합니다\\n3.쉐이커를 잘 흔들어 줍니다 (약 10-15초)\\n4.얼음을 제거한 준비된 글래스에 스트레이너를 사용하여 쉐이커의 혼합물을 따라 부어줍니다\\n5.선택적으로 레몬 슬라이스, 생강 슬라이스로 장식합니다','스카치 위스키 60ml \\n신선한 레몬 주스 22.5ml \\n생강 시럽 22.5ml \\n얼음\\n페토벤 7.5ml \\n레몬 슬라이스\\n생강 슬라이스', 25, '스카치위스키',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EB%A7%88%ED%8B%B0%EB%8B%88.png', '마티니', '진을 베이스로 하는 칵테일의 왕이라 불리는 칵테일이다.', '1. 글라스에 얼음을 넣고 진과 베르무트를 넣는다. \\n2. 잘 젓는다. \\n3. 차갑게 식힌 마티니 글라스에 얼음을 걸러내고 따라준다. \\n4. 올리브로 장식해주면 끝.',   '드라이진 60ml \\n드라이 베르무트 10ml', 22, '진', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%ED%94%BC%EB%82%98%EC%BD%9C%EB%9D%BC%EB%8B%A4.png', '피나콜라다', '럼을 베이스로 하는 파인애플과 코코넛향이 매력적인 칵테일이다.', '1. 모든 재료들을 얼음 5~6개와 함께 블렌딩해준다. \\n2. 컵에 따른다.  \\n3. 파인에플과 체리로 가니쉬를 해주면 끝.',   '화이트럼 35ml \\n피나콜라다 믹스 60ml  \\n파인애플 주스 60ml', 8, '화이트럼',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EC%BD%94%EC%8A%A4%EB%AA%A8%ED%8F%B4%EB%A6%AC%ED%83%84.png', '코스모폴리탄', '보드카를 베이스로 하는 대표적인 레이디 킬러 칵테일 중 하나로, 달콤한 맛에 비해 강한 도수를 자랑한다.', '1. 모든 재료를 얼음과 함께 8~10초간 셰이킹한다. \\n2. 더블 스트레인으로 걸러낸다.  \\n3. 큰 사이즈의 마티니 글라스에 담아준다. \\n4. 레몬 필 트위스트로 가니쉬 끝.',   '보드카 30ml  \\n트리플 색 15ml  \\n라임 주스 15ml  \\n크린배리 주스 15ml ', 24, '보드카',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EB%A7%88%EC%9D%B4%ED%83%80%EC%9D%B4.png', '마이타이', '럼 베이스의 칵테일로 타히티어로 최고를 의미하는 칵테일이다.', '1.재료들을 간얼음과 함께 10초동안 셰이킹한다. \\n2. 하이볼 글라스에 따라준다. \\n3. 파일애플이나 라임필, 민트로 가니쉬 끝.',   '화이트럼 37.5ml  \\n트리플 색 22.5ml \\n라임주스 30ml  \\n오렌지주스30ml  \\n파인애플주스30ml  \\n그래나딘 시럽 7.5ml', 15, '화이트럼',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EB%AF%B8%EB%AA%A8%EC%82%AC.png', '미모사', '와인 베이스로, 단순히 오렌지 주스와 섞기만 하면 만들 수 있는 간단한 칵테일이다.', '1. 플루트 글라스에 오렌지 주스로 잔의 절반을 채운다. \\n2. 나머지 절반을 샴페인으로 채운다 \\n3. 섞지 않고 마시면 끝.',   '오렌지 주스 잔의 1/2 \\n 샴페인  잔의 1/2', 6, '샴페인',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EB%84%A4%EA%B7%B8%EB%A1%9C%EB%8B%88.png', '네그로니', '쓴맛, 단맛, 허브 향이 완벽한 균형을 이룬 클래식 칵테일.', '1. 믹싱 글라스에 얼음을 채웁니다.\\n2. 진, 캄파리, 스위트 베르무트를 넣습니다.\\n3. 약 30초간 부드럽게 저어줍니다.\\n4. 얼음을 채운 차가운 락 글래스에 걸러냅니다.\\n5. 오렌지 트위스트로 장식합니다.',   '진 30ml(40% ABV)\\n캄파리 30ml(24% ABV)\\n스위트 버무스 30ml(15% ABV)\\n오렌지 트위스트(장식용)\\n얼음', 20, '진',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EC%9C%84%EC%8A%A4%ED%82%A4%EC%83%A4%EC%9B%8C.png', '위스키샤워', '위스키, 레몬 주스, 슈가시럽의 풍부하고 톡 쏘는 맛이 어우러진 클래식한 사워 칵테일입니다.', '1. 셰이커에 얼음을 채웁니다.\\n2. 위스키, 레몬즙, 슈가시럽을 넣는다.\\n3. 약 15초간 세게 흔듭니다.\\n4. 얼음을 채운 락 글래스에 걸러냅니다.\\n5. 오렌지 휠과 체리로 장식한다.',   '위스키 60ml(40% ABV)\\n레몬즙 30ml\\n슈가시럽 22.5ml\\n오렌지 휠 앤 체리(장식용)\\n얼음', 21, '위스키',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EC%A7%84%ED%86%A0%EB%8B%89.png', '진토닉', '상쾌하고 향긋한 진과 탄산수의 조합으로 만들어지는 클래식한 칵테일입니다.', '1. 높은 글래스에 얼음 조각을 채워 넣습니다.\\n2. 진을 잔에 붓고 토닉 워터를 추가합니다.\\n3. 가볍게 젓거나 스트로우로 섞어줍니다.\\n4. 라임 혹은 레몬 웨지로 장식합니다.',   '진 45ml\\n토닉 워터 120ml\\n라임 혹은 레몬 웨지 (장식용)\\n얼음', 16, '진',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EB%A7%A8%ED%95%B4%ED%8A%BC.png', '맨해튼', '고전적인 위스키 칵테일로, 달콤하고 향긋한 맛이 특징입니다.', '1. 믹싱 글래스에 얼음 조각을 채워 넣습니다.\\n2. 라이 위스키, 스위트 베르무트, 앙고스투라 비터스를 추가합니다.\\n3. 젓지 않고 가볍게 저어줍니다.\\n4. 칵테일 글래스에 체리를 넣고, 스트레이너를 사용하여 칵테일을 걸러줍니다.',   '라이 위스키 60ml\\n스위트 베르무트 30ml\\n앙고스투라 비터스 3spoon\\n체리 1개\\n얼음', 18, '위스키',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EB%B8%94%EB%9E%99%EB%9F%AC%EC%8B%9C%EC%95%88.png', '블랙러시안', '블랙 러시안 칵테일은 보드카와 커피 리큐어의 조화로운 조합으로, 부드럽고 풍부한 커피 향과 리치한 맛을 제공하고, 간단하면서도 풍부한 맛과 향을 가진 고전적인 칵테일이다.', '1.샤케일러 (칵테일 쉐이커)에 얼음을 넣는다\\n2.보드카, 깔루아를 샤케일러에 추가한다\\n3케일러를 잘 흔들어 섞는다\\n4스트레이너를 사용하여 칵테일을 마시는 잔에 옮겨 따라준다\\n5레몬, 귤 조각으로 장식한다',   '보드카 45ml\\n깔루아 45ml\\n 레몬&체리 1개\\n커피 스틱 1개\\n조각 얼음', 20, '보드카',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EB%B8%94%EB%A3%A8%ED%95%98%EC%99%80%EC%9D%B4.png', '블루하와이', '블루 하와이 칵테일은 매우 인기있는 푸른색의 시원하고 화려며  시각적으로 매력적인 외관을 가지며, 상쾌하고 과일향이 풍부한 맛을 가지고 있다.', '1.샤케일러 (칵테일 쉐이커)에 얼음을 넣는다\\n2.보드카, 화이트 럼 , 블루 큐라소, 파인애플 주스를 샤케일러에 추가한다\\n3.샤케일러를 잘 흔들어 섞는다\\n4.스트레이너를 사용하여 칵테일을 마시는 잔에 옮겨 따라준다','화이트 럼 22ml\\n보드카 22ml\\n블루 큐라소 15ml\\n파인애플 주스 90ml\\n스윗 앤 샤워 믹스 30ml', 15, '화이트럼',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EC%98%A4%EB%A0%8C%EC%A7%80%EC%A3%BC%EC%8A%A4_%EB%9F%BC.png', '오렌지주스 럼', '오렌지 주스 럼 칵테일은 매우 간단하면서도 상쾌한 맛을 가지고 있고, 오렌지 주스의 상큼함과 럼의 풍부한 향과 맛이 어우러져 깔끔하고 상쾌한 맛을 선사한다.', '1.하이볼 클래스를 얼음으로 맨 위에 채운다\\n2. 화이트 럼 50ml를 붓는다\\n3.오렌지 주스를 붓고 칵테일 스푼으로 부드럽게 저어준다\\n4.오렌지 슬라이스로 장식한다',   '화이트 럼 50ml\\n오렌지 주스 150ml\\n오렌지 40g\\n각얼음 180g', 20, '화이트럼',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EC%B2%B4%EB%A6%AC%EB%B8%94%EB%9D%BC%EC%8D%B8.png', '체리블라썸', '체리 블라썸 칵테일은 체리와 레몬의 상큼한 맛과 향기가 어우러져 화사하고 고급스러운 맛을 선사하고, 달콤한 진과 과일의 조화로 인해 여성적이고 로맨틱한 분위기를 연출한다.', '1.마티니 글래스를 준비하고, 얼음을 넣어 칠링한다\\n2.쉐이커 하단부에 각 재료를 정량대로 넣는다\\n3.뚜껑을 닫고 양손으로 잡은 뒤, 10초가량 힘차게 쉐이킹한다\\n4.마티니 글래스의 칠리용 얼음을 버리고, 쉐이커의 음료를 얼음이 딸려 들어가지 않게 마티니 글라스에 붓는다',   '꼬냑 40ml\\n체리 브랜디 20ml\\n그레나딘 시럽 5ml\\n레몬 주스 5ml', 30, '와인',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%ED%95%91%ED%81%AC%EB%A0%88%EC%9D%B4%EB%94%94.png', '핑크레이디', '핑크 레이디라는 이름의 유래는 1912년 영국 런던에서 공연된 동명의 연극이 흥행하고 열린 파티에서 그 여주인공을 연기한 여배우에게 바쳐진 데에서 유래한 것이며, 이후 오늘날까지 전해 내려온 것이라고 한다.', '1.칵테일 글라스에 얼음을 채워준다\\n2.보드카, 자몽 주스, 그리고 크랜베리 주스 또는 딸기 주스를 적당한 비율로 섞어준다. 보통 45ml의 보드카, 60ml의 자몽 주스, 30ml의 크랜베리 주스 또는 딸기 주스를 사용한다\\n3.만약 더 맛을 조절하고 싶다면, 약간의 레몬 또는 라임 주스를 추가할 수 있다\\n4.선택적으로, 단맛을 더해주기 위해 시럽을 조금 추가할 수도 있다\\n5.잘 저어준 후에, 칵테일 글라스에 옮겨 담는다',   '보드카 45ml\\n자몽 주스 60ml\\n크린베리 주스 또는 딸기 주스 30ml\\n레몬 또는 라임 주스 (선택 사항)\\n시럽(선택 사항)\\n얼음', 40, '보드카',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

--INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
--VALUES(0, '', '', '', '',   '', 0, '',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);