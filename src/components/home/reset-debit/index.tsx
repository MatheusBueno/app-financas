import { memo } from "react";
import { ResetDebitProps } from "./props";
import { TypeResetDebit } from "./constants";
import { Container, DebitDays } from "./styles";

const ResetDebit = memo<ResetDebitProps>(
  ({ totalDailyCash = 1, shouldToSpendByDay = 1 }) => {
    const daysToResetDebit = Math.abs(totalDailyCash / shouldToSpendByDay);

    if (isNaN(daysToResetDebit)) return null;

    if (totalDailyCash >= 1)
      return (
        <Container data-testid={TypeResetDebit.CAN_EXPENSES}>
          <span>🤑</span>
          <span>Você ainda pode gastar hoje!</span>
        </Container>
      );

    const dayText = daysToResetDebit > 1 ? "dias" : "dia";

    return (
      <Container data-testid={TypeResetDebit.EXPENSES_DAYS}>
        <span>🥹</span>
        <span>
          Você precisa de{" "}
          <DebitDays>{`${Math.ceil(daysToResetDebit)} ${dayText} `}</DebitDays>
          para pagar suas contas!
        </span>
      </Container>
    );
  }
);

export default ResetDebit;
