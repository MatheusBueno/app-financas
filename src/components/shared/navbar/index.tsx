import Link from "next/link";
import { memo } from "react";
import { DEFAULT_ROTES } from "@app/constants/routes";
import { NavbarContainer } from "./styles";

const Navbar = memo(() => {
  return (
    <NavbarContainer>
      <ul>
        <li>
          <Link title='Ir para página de início' href={DEFAULT_ROTES.HOME}>
            Início
          </Link>
        </li>
        <li>
          <Link
            title='Ir para o histórico de gastos'
            href={DEFAULT_ROTES.DAILY_HISTORY}
          >
            Histórico
          </Link>
        </li>
        <li>
          <Link
            title='Ir para página de configurações'
            href={DEFAULT_ROTES.CONFIG}
          >
            Configurações
          </Link>
        </li>
      </ul>
    </NavbarContainer>
  );
});

export default Navbar;
