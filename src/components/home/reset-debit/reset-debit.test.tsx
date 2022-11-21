import { renderTestingWithTheme } from "@app/styles/testingTheme";
import { screen } from "@testing-library/react";
import { TypeResetDebit } from "./constants";
import ResetDebit from "./index";

const sut = (startDailyCash: number, totalDailyCash: number) => {
  return renderTestingWithTheme(
    <ResetDebit
      initCashByDay={startDailyCash}
      totalDailyCash={totalDailyCash}
    />
  );
};

describe("Reset Debit", () => {
  it("should show can expenses today", () => {
    sut(1, 10);

    const id = screen.getByTestId(TypeResetDebit.CAN_EXPENSES);
    expect(id).toBeInTheDocument();
  });

  it("should not show component", () => {
    sut(0, 0);

    expect(
      screen.queryByTestId(TypeResetDebit.CAN_EXPENSES)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(TypeResetDebit.EXPENSES_DAYS)
    ).not.toBeInTheDocument();
  });

  it("should show '1 dia' to expense", () => {
    sut(1, 1);

    expect(
      screen.getByTestId(TypeResetDebit.EXPENSES_DAYS)
    ).toBeInTheDocument();
    expect(screen.getByText("1 dia")).toBeInTheDocument();
  });

  it("should show '2 dias' to expense", () => {
    sut(10, -20);

    const id = screen.getByTestId(TypeResetDebit.EXPENSES_DAYS);
    expect(id).toBeInTheDocument();
    expect(screen.getByText("2 dias")).toBeInTheDocument();
  });

  it("should show '10 dias' to expense", () => {
    sut(10, -100);

    const id = screen.getByTestId(TypeResetDebit.EXPENSES_DAYS);
    expect(id).toBeInTheDocument();
    expect(screen.getByText("10 dias")).toBeInTheDocument();
  });
});
