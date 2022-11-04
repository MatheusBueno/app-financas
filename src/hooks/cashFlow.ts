import { DailyExpenses } from "@app/models/dailyExpenses";
import { Expense } from "@app/models/expense";
import { useGetDailyInitialCash } from "./getDailyInitialCash";
import { useGetToday } from "./getToday";
import { useRepository } from "./repository";
import { useUpdateUserConfigFinancial } from "./updateUserConfigFinancial";

export const useCashFlow = () => {
  const { getDate } = useGetToday();
  const { getData, setData } = useRepository();
  const { getExpenses, getMonthlyRent } = useUpdateUserConfigFinancial();
  const { getDailyInitialCash } = useGetDailyInitialCash();

  const getYesterdayExpenses = (): number => {
    const previous = new Date();
    previous.setDate(new Date().getDate() - 1);

    const yesterdayExpenses: DailyExpenses = getData(getDate(previous)) || [];
    const yesterdayTotalExpenses = yesterdayExpenses.reduce(
      (total, current) => total + current.value,
      0
    );

    return yesterdayTotalExpenses;
  };

  const getDailyTotalCash = (day: string = getDate()): number => {
    const dailyExpenses: DailyExpenses = getData(day);
    const yesterday = getYesterdayExpenses();

    if (!dailyExpenses) {
      const dayliInitialCash = getDailyInitialCash(
        getMonthlyRent(),
        getExpenses()
      );

      return dayliInitialCash + yesterday;
    }

    return dailyExpenses.reduce(
      (total, current) => total + current.value,
      yesterday
    );
  };

  const getDailyExpensesValue = (day: string = getDate()): number => {
    const dailyExpenses: DailyExpenses = getData(day);

    if (!dailyExpenses) {
      return 0;
    }

    // remove initial value
    dailyExpenses.shift();
    return dailyExpenses.reduce((total, current) => total + current.value, 0);
  };

  const addExpense = (expense: Expense, day: string = getDate()): void => {
    const dailyExpenses: DailyExpenses = getData(day);

    const currentExpense = {
      ...expense,
      value: expense.value < 0 ? expense.value : expense.value * -1,
    };

    if (!dailyExpenses) {
      setData(day, [
        {
          description: "dailyCash",
          value: getDailyInitialCash(getMonthlyRent(), getExpenses()),
        },
        currentExpense,
      ]);

      return;
    }

    dailyExpenses.push(currentExpense);

    setData(day, dailyExpenses);
  };

  return {
    addExpense,
    getDailyExpensesValue,
    getYesterdayExpenses,
    getDailyTotalCash,
    dailyInitialCash: getDailyInitialCash(getMonthlyRent(), getExpenses()),
  };
};
