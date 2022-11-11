import { memo } from "react";
import { ResetDebitProps } from "./props";
import { Container, DebitDays } from "./styles";

const ResetDebit = memo<ResetDebitProps>(
  ({ dailyCash = 1, expenseByDay = 1 }) => {
    const daysToResetDebit = Math.abs(dailyCash / expenseByDay);

    if (dailyCash > 1)
      return (
        <Container>
          <span>🤑</span>
          <span>Você ainda pode gastar hoje!</span>
        </Container>
      );

    if (Math.abs(dailyCash) <= expenseByDay)
      return (
        <Container>
          <span>🥺</span>
          <span>
            Você <DebitDays>não</DebitDays> pode mais gastar hoje!
          </span>
        </Container>
      );

    const dayText = daysToResetDebit > 1 ? "dias" : "dia";

    return (
      <Container>
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
