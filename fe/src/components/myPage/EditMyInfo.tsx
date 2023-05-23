import { useState, ChangeEvent } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import ImageUpload from "../imageupload/ImageUpload";
import { tokenInstance } from "../../utils/tokeninstance";
import { MyInfoData } from "../../pages/Mypage";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1052px;
  height: 420px;
  background: #ffffff;
  box-shadow: 2px 2px 13px -1px rgba(93, 93, 93, 0.7);
  border-radius: 30px;
  padding: 100px;
`;

const MyPhotoWrapper = styled.div`
  margin-right: 100px;
  margin-bottom: 100px;
  overflow: hidden;
`;

const MyPhoto = styled.div`
  margin: 0px 100px 50px 0px;
  width: 230px;
  height: 230px;
  background-color: #ffffff;
  border-radius: 10px;
`;

const InfoWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
`;

const Title = styled.h2`
  font-size: 23px;
  font-weight: 800;
  margin: 10px;
  text-align: left;
`;

const Input = styled.input`
  padding: 5px;
  margin: 10px 50px 10px 0;

  border-radius: 5px;
  border: 1.5px solid #828282;
  font-size: 17px;
  width: 100%;
  height: 50px;
  &:focus {
    outline: none;
    border: 1px solid #96a5ff;
    box-shadow: 0 0 3px 1px #abb7fc;
  }
`;

const Button = styled.button`
  width: 111px;
  height: 40px;
  background-color: #96a5ff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  color: #ffff;
  font-weight: 800;
  font-size: 24px;
  border: none;
  cursor: pointer;
  margin: 28px;
  margin-left: auto;
`;

interface EditProps {
  infoData: MyInfoData | undefined;
  ToggleEditHandle: () => void;
}

export default function EditMyInfo({ infoData, ToggleEditHandle }: EditProps) {
  const [nickname, setNickname] = useState(infoData?.nickName);
  const [statusMessage, setStatusMessage] = useState(infoData?.description);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const contentMutation = useMutation(
    (data: {
      nickname: string | undefined;
      statusMessage: string | undefined;
    }) =>
      tokenInstance
        .patch("/member/update/content", data)
        .then((response) => response.data),
  );

  const imageMutation = useMutation(
    async (image: File | null) => {
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        return await tokenInstance
          .patch("/member/update/image", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => response.data);
      } else {
        return null;
      }
    },
    {
      onSuccess: () => {
        QueryClient.invalidateQueries("userInfo");
        ToggleEditHandle();
      },
      onError: () => {
        window.alert("이미지가 너무 커 업로드에 실패했습니다.");
        setNickname("");
        setStatusMessage("");
        setImageFile(null);
      },
    },
  );
  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleStatusMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatusMessage(e.target.value);
  };

  const handleImageUpload = (file: File) => {
    setImageFile(file);
  };
  const QueryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname === "" || nickname === undefined) {
      window.alert("이름은 비울수 없습니다.");
    } else {
      const data = {
        nickname: nickname,
        statusMessage: statusMessage,
      };
      contentMutation.mutate(data, {
        onSuccess: () => {
          imageMutation.mutate(imageFile);
        },
      });
    }
  };
  return (
    <Container>
      <MyPhotoWrapper>
        <MyPhoto>
          <ImageUpload
            onImageUpload={handleImageUpload}
            isEmpty={imageFile === null}
            initailImage={infoData?.imageUrl}
          />
        </MyPhoto>
      </MyPhotoWrapper>
      <InfoWrapper>
        <Title>Nickname</Title>
        <Input
          type="text"
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={handleNicknameChange}
        />
        <Title>Status Message</Title>
        <Input
          type="text"
          placeholder="상태메세지를 입력해주세요."
          value={statusMessage}
          onChange={handleStatusMessageChange}
        />
        <Button onClick={handleSubmit}>save</Button>
      </InfoWrapper>
    </Container>
  );
}
