import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin: 8px auto;
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: ${(p) => p.theme.mensure.baseRadius}px;

  font-size: 1rem;
`;
