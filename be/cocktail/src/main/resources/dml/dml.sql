INSERT INTO `member` (id, image_url, nickname, email, password, status_message, created_at, modified_at, deleted)
VALUES(0, 'imageUrl', '최재영', 'asdf@asdf.com', 'asdf11234@', '살려줘',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `regular_recipe` (id, image_url, name, description, recipe, ingredient, alc_vol, base_alc, created_at, modified_at, deleted)
VALUES(0, 'imageUrl', '미도리샤워(탄산)', '멜론맛인 미도리와 스윗&사워 믹스의 레몬향이 어우러져서 상큼한 색깔과 맛을 연출하는 것이 포인트인 칵테일', '1. 쉐이커에 얼음과 스프라이트를 제외한 나머지 재료들을 넣고 쉐이킹한다 \\n2. 쉐이킹 후 얼음이 있는 글라스에 부어준다 \\n3. 마지막으로 스프라이트를 부어서 저어준 후 취향에 맞게 가니시를 올려서 완성',   '미도리 30ml \\n 스윗 앤 사워 믹스 30ml \\n 스프라이트 60ml', 10, '리큐르',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

INSERT INTO `custom_recipe` (id, member_id, image_url, name, description, recipe, ingredient, created_at, modified_at, deleted)
VALUES(0, 1, 'imageUrl', '장도리', '멜론맛인 칵테일', '1. 쉐이커에 얼음과 재료들을 넣고 쉐이킹한다 \\n2. 쉐이킹 후 얼음이 있는 글라스에 부어준다 \\n3. 마지막으로 스프라이트를 부어서 저어준 후 취향에 맞게 가니시를 올려서 완성',   '미도리 40ml \\n 스윗 앤 사워 믹스 15ml', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);