export const useGetDailyInitialCash = () => {
  const getDailyInitialCash = (monthlyRent: number, fixedExpenses: number) => {
    const daysOfMonth = 30;
    const dayliInitialCash = (monthlyRent - fixedExpenses) / daysOfMonth;

    return dayliInitialCash;
  };

  return { getDailyInitialCash };
};
