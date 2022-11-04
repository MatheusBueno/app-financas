import styled from "styled-components";

export const ButtonContainer = styled.button`
  width: 100%;
  padding: 12px 16px;
  margin: 8px auto;

  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: ${(p) => p.theme.mensure.baseRadius * 3}px;
  box-shadow: 0 4px 24px 0 ${(props) => props.theme.colors.primary}20;

  background-color: ${(p) => p.theme.colors.primary};
  background-color: transparent;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.2px;
  cursor: pointer;

  :hover,
  :focus {
    animation: pulse 1s;
    box-shadow: 0 0 0 2em rgba(#fff, 0);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 ${(props) => props.theme.colors.primary};
    }
  }
`;
