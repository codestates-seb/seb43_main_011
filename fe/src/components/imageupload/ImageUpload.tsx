import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { FcEditImage } from "react-icons/fc";
interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isEmpty?: boolean;
  initailImage?: string;
}
const ImageUpload = ({
  onImageUpload,
  isEmpty,
  initailImage,
}: ImageUploadProps) => {
  const [previewImage, setPreviewImage] = useState<string>("");

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEmpty && initailImage) {
      setPreviewImage(initailImage);
    } else if (isEmpty && !initailImage) {
      setPreviewImage("");
    }
  }, [isEmpty]);

  const handleUploadImage = () => {
    // 파일 선택(input) 요소를 클릭하여 이미지 선택 다이얼로그 표시
    if (inputFileRef.current !== undefined) {
      inputFileRef.current?.click();
    }
  };

  //업로드할 이미지 변경
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 선택한 이미지 파일
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // 미리보기 이미지 URL 설정
      onImageUpload(file);
    }
  };
  return (
    <>
      <UploadImgButton onClick={handleUploadImage}>
        {previewImage ? (
          <PreviewImg src={previewImage} alt="Preview" />
        ) : (
          <UploadImgIcon />
        )}
      </UploadImgButton>
      <UploadImgInput
        type="file"
        ref={inputFileRef}
        onChange={handleImageChange}
      />
    </>
  );
};

export default ImageUpload;

const UploadImgIcon = styled(FcEditImage)`
  font-size: 3rem;
`;

const UploadImgButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  margin-top: 5rem;
  width: 16rem;
  height: 16rem;
  border: none;
  background: none;
  border-radius: 5px;
  cursor: pointer;
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const UploadImgInput = styled.input`
  display: none;
`;
