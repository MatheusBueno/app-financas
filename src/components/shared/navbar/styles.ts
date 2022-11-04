import styled from "styled-components";

export const NavbarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  padding-top: 8px;
  background: rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(13.5px);
  border-start-start-radius: 20px;
  border-start-end-radius: 20px;

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;

    li {
      height: 50px;
      width: 100%;
      text-align: center;
      list-style: none;

      a {
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
      }
    }
  }
`;
