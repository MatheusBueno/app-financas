import styled from "styled-components";

export const HeaderList = styled.h2`
  margin-bottom: 0px;
  margin-top: 24px;
  font-size: 1rem;
  font-weight: 800;
  color: ${(p) => p.theme.colors.primary};
`;

export const List = styled.ul`
  margin-top: 8px;

  li a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    padding: 8px 16px;
    border-bottom: 1px solid ${(p) => p.theme.colors.primary}95;
  }
`;

export const Cash = styled.span`
  font-weight: 600;
  flex: 2;
`;

export const Description = styled.span`
  flex: 4;
`;

export const EmptyList = styled.p`
  text-align: center;
  color: #abababd0;
  font-size: 0.95rem;

  margin: 16px;
`;
