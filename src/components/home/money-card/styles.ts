import styled from "styled-components";

export const MoneyCardContent = styled.div`
  width: 100%;
  padding: 8px;
  max-width: 400px;
  min-height: 90px;
  margin: 24px auto;
  border: 1px solid ${(props) => props.theme.colors.primary}50;
  border-radius: ${(p) => p.theme.mensure.baseRadius}px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  background-color: #00000020;
  box-shadow: 0 8px 80px 0 ${(props) => props.theme.colors.primary}60;
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(13.5px);
`;

export const DailyCash = styled.span<{ value: number }>`
  text-align: center;
  font-family: "Monoton", cursive;
  font-size: 2.9rem;
  color: ${(props) => props.theme.colors.primary};

  color: ${(p) =>
    p.value < 0 ? p.theme.colors.negative : p.theme.colors.primary};
`;

export const CustomNumber = styled.span<{ value: number }>`
  font-weight: 600;
  font-size: 1.3rem;

  color: ${(p) =>
    p.value === 0
      ? p.theme.colors.text
      : p.value > 1
      ? p.theme.colors.positive
      : p.theme.colors.negative};
`;

export const List = styled.ul`
  margin: 24px 0;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 16px;

  li {
    list-style: none;

    a {
      :hover {
        filter: brightness(90%);
      }
    }
  }

  li * {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    text-align: center;
  }
`;
