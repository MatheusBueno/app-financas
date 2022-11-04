import styled from "styled-components";

export const MainContainer = styled.main`
  padding: 24px 16px;
  height: calc(100vh - ${(props) => props.theme.mensure.navbarHeight});
  position: relative;
`;
