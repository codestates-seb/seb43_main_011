import styled from "styled-components";

const TabContainer = styled.div`
  width: 100%;
  display: flex;
`;
interface TabProps {
  path: boolean;
}
const RegularTab = styled.div<TabProps>`
  border: 1px solid #6f8892e8;
  font-weight: 600;
  color: ${({ path }) => (path ? "#4c4c4c" : "#767676")};
  background-color: ${({ path }) => (path ? "white" : "#dfdfdf")};
  ${({ path }) => (path ? "border-bottom: none;" : "")}
  font-size: 1.3rem;
  width: 163px;
  padding: 10px 0ch;
  text-align: center;
  border-radius: 5px 5px 0 0;
  &:hover {
    cursor: pointer;
  }
`;
const LeftMargin = styled.div`
  flex-basis: 3%;
  border-bottom: 1px solid #6f8892e8;
`;
const RightMargin = styled(LeftMargin)`
  flex-basis: 73%;
  @media screen and (max-width: 1000px) {
    flex-basis: 65%;
  }
  @media screen and (max-width: 640px) {
    flex-basis: 45%;
  }
`;

const CustomTab = styled(RegularTab)`
  border-left: none;
`;

interface SearchResultTabProps {
  tabs: string[];
  path: string;
  setPath: React.Dispatch<React.SetStateAction<string>>;
}
export default function SearchResultTab({
  tabs,
  path,
  setPath,
}: SearchResultTabProps) {
  return (
    <TabContainer>
      <LeftMargin />
      <RegularTab path={path === tabs[0]} onClick={() => setPath(tabs[0])}>
        정규 레시피
      </RegularTab>
      <CustomTab path={path === tabs[1]} onClick={() => setPath(tabs[1])}>
        커스텀 레시피
      </CustomTab>
      <RightMargin />
    </TabContainer>
  );
}
