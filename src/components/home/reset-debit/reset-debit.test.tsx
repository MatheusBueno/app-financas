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

  it("should show can not expenses today", () => {
    sut(1, 1);

    const id = screen.getByTestId(TypeResetDebit.CAN_NOT_EXPENSES);
    expect(id).toBeInTheDocument();
  });

  it("should show can not expenses today", () => {
    sut(10, -2);

    const id = screen.getByTestId(TypeResetDebit.CAN_NOT_EXPENSES);
    expect(id).toBeInTheDocument();
  });

  it("should show days to expense", () => {
    sut(10, -20);

    const id = screen.getByTestId(TypeResetDebit.EXPENSES_DAYS);
    expect(id).toBeInTheDocument();
    expect(screen.getByText("2 dias")).toBeInTheDocument();
  });

  it("should show days to expense", () => {
    sut(10, -100);

    const id = screen.getByTestId(TypeResetDebit.EXPENSES_DAYS);
    expect(id).toBeInTheDocument();
    expect(screen.getByText("10 dias")).toBeInTheDocument();
  });

  it("should show days to expense", () => {
    sut(10, -100);

    const id = screen.getByTestId(TypeResetDebit.EXPENSES_DAYS);
    expect(id).toBeInTheDocument();
    expect(screen.getByText("10 dias")).toBeInTheDocument();
  });
});
