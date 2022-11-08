import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 16px;
  max-width: 400px;
  min-height: 90px;
  margin: 24px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  text-align: center;

  border: 1px solid ${(props) => props.theme.colors.primary}50;
  border-radius: ${(p) => p.theme.mensure.baseRadius}px;
  background-color: #00000020;
  box-shadow: 0 8px 80px 0 ${(props) => props.theme.colors.primary}50;
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(13.5px);
`;

export const DebitDays = styled.strong`
  color: ${(props) => props.theme.colors.negative};
`;
