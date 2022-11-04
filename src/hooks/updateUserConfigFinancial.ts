import { DailyExpenses } from "@app/models/dailyExpenses";
import { useGetDailyInitialCash } from "./getDailyInitialCash";
import { useGetToday } from "./getToday";
import { useRepository } from "./repository";

export const useUpdateUserConfigFinancial = () => {
  enum TypeUserFinancial {
    userRent = "user-monthy-rent",
    userExpenses = "user-monthy-expenses",
  }

  const { getDate } = useGetToday();
  const { getData, setData } = useRepository();

  const getMonthlyRent = () => {
    return Number(getData(TypeUserFinancial.userRent)) || 0;
  };
  const getExpenses = () => {
    return Number(getData(TypeUserFinancial.userExpenses)) || 0;
  };

  const { getDailyInitialCash } = useGetDailyInitialCash();

  const updateMonthlyRent = (newValue: number) => {
    setData(TypeUserFinancial.userRent, newValue);

    updateDailyCash();
  };

  const updateExpenses = (newValue: number) => {
    setData(TypeUserFinancial.userExpenses, newValue);

    updateDailyCash();
  };

  const updateDailyCash = () => {
    const dayliInitialCash = getDailyInitialCash(
      getMonthlyRent(),
      getExpenses()
    );

    const dailyExpenses: DailyExpenses = getData(getDate()) || [];

    dailyExpenses.splice(0, 1, {
      value: dayliInitialCash,
      description: "dailyCash",
    });

    setData(getDate(), dailyExpenses);
  };

  return {
    updateMonthlyRent,
    updateExpenses,
    getMonthlyRent,
    getExpenses,
  };
};
