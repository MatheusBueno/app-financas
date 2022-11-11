import generateUuid from "@app/helpers/generateUuid";
import { DailyExpenses } from "@app/models/dailyExpenses";
import { Expense } from "@app/models/expense";
import { persist } from "zustand/middleware";

import create from "zustand";

interface CashFlowStore {
  userMonthyRent: number;
  userMonthyExpenses: number;
  updateUserMonthyRent: (value: number) => void;
  updateUserMonthyExpenses: (value: number) => void;

  expenses: Record<string, DailyExpenses>;
  addExpense: (expense: Omit<Expense, "id">) => void;
  getExpense: (id: string) => Expense | null;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expense: Omit<Expense, "id">) => void;
  getExpensesHistory: () => { day: string; expenses: Expense[] }[];

  addInitialDailyCash: () => void;
  loadStartDaily: () => void;

  getTotalDailyExpenses: () => number;
  getDailyBalance: () => DailyExpenses;
  getTotalYesterdayBalance: () => number;
  getTotalDailyCash: () => number;
  getTotalInitialDailyCash: () => number;
  getDailyExpenses: () => DailyExpenses;
  getYesterdayExpenses: () => DailyExpenses;
  getDailyInitialCash: () => number;
}

const getDateKey = (date: Date = new Date()): string => {
  return date.toLocaleDateString(["pt-BR"]);
};

const initialCashDescription = "INITIAL DAILY";
const yesterdayCashDescription = "YESTERDAY DAILY";

export const useCashFlowStore = create(
  persist<CashFlowStore>(
    (set, get) => ({
      expenses: {},
      userMonthyRent: 0,
      userMonthyExpenses: 0,
      updateUserMonthyRent: (userMonthyRent: number) => set({ userMonthyRent }),
      updateUserMonthyExpenses: (userMonthyExpenses: number) =>
        set({ userMonthyExpenses }),
      addExpense: (expense: Omit<Expense, "id">) => {
        const currentExpense: Expense = {
          ...expense,
          value: -Math.abs(expense.value),
          id: generateUuid(),
        };

        set((state) => ({
          expenses: {
            ...state.expenses,
            [getDateKey()]: [...state.getDailyExpenses(), currentExpense],
          },
        }));
      },
      getExpense: (id: string) => {
        const allExpenses = Object.values(get().expenses).reduce(
          (total, item) => {
            return [...total, ...item];
          }
        );

        return allExpenses.find((item) => item.id === id) || null;
      },
      updateExpense: (id: string, expense: Omit<Expense, "id">) => {
        const currentExpense: Expense = {
          ...expense,
          value: -Math.abs(expense.value),
          id,
        };

        const updatedExpenses = Object.entries(get().expenses).reduce(
          (total, [key, values]) => ({
            ...total,
            [key]: values.map((item) =>
              item.id === id ? currentExpense : item
            ),
          }),
          {}
        );

        set({ expenses: updatedExpenses });
      },
      deleteExpense: (id: string) => {
        const updatedExpenses = Object.entries(get().expenses).reduce(
          (total, [key, values]) => ({
            ...total,
            [key]: values.filter((item) => item.id !== id),
          }),
          {}
        );

        set({ expenses: updatedExpenses });
      },

      loadStartDaily: () => {
        const { userMonthyRent } = get();

        if (!userMonthyRent) return;

        const updatedExpenses = Object.entries(get().expenses)
          .sort((a, b) => (a[0] > b[0] ? 1 : -1))
          .reduce((total, [day, expenses], index, array) => {
            const initialCash = expenses.find(
              ({ description }) => description === initialCashDescription
            );

            if (!initialCash) {
              const dailyCash: Expense = {
                description: initialCashDescription,
                value: get().getDailyInitialCash(),
                id: generateUuid(),
              };

              expenses.push(dailyCash);
            }

            if (index !== 0) {
              // get last report filled by user
              const [lastDay, lastBalance] = array[index - 1];

              const allYesterdaySum = sumDaysWithoutExpenses(
                day,
                lastDay,
                lastBalance.reduce(sumExpenses, 0),
                get().getDailyInitialCash()
              );

              const yesterdayCash: Expense = {
                description: yesterdayCashDescription,
                value: allYesterdaySum,
                id: generateUuid(),
              };

              const replaceIndex = expenses.findIndex(
                ({ description }) => description === yesterdayCashDescription
              );

              if (replaceIndex === -1) {
                expenses.push(yesterdayCash);
              } else {
                expenses.splice(replaceIndex, 1, yesterdayCash);
              }
            }

            return {
              ...total,
              [day]: expenses,
            };
          }, {});

        set({ expenses: updatedExpenses });
      },
      addInitialDailyCash: () => {
        const dailyCash: Expense = {
          description: initialCashDescription,
          value: get().getDailyInitialCash(),
          id: generateUuid(),
        };

        set((state) => ({
          expenses: {
            ...state.expenses,
            [getDateKey()]: [dailyCash, ...state.expenses[getDateKey()]],
          },
        }));
      },
      getExpensesHistory: () => {
        return Object.entries(get().expenses)
          .reverse()
          .map(([daily, expenses]) => {
            return {
              day: daily,
              expenses: expenses.filter(
                (item) =>
                  item.description !== initialCashDescription &&
                  item.description !== yesterdayCashDescription
              ),
            };
          });
      },

      getDailyExpenses: () => {
        const expenses: DailyExpenses = get().expenses[getDateKey()];

        if (!expenses) return [];

        return expenses.filter((item) => item.value < 0);
      },
      getYesterdayExpenses: () => {
        const previous = new Date();
        previous.setDate(new Date().getDate() - 1);

        const expenses = get().expenses[getDateKey(previous)];

        if (!expenses) return [];

        return expenses.filter((item) => item.value < 0);
      },
      getTotalYesterdayBalance: () => {
        const expenses: DailyExpenses = get().getDailyBalance();

        const yesterdayCash = expenses.find(
          ({ description }) => description === yesterdayCashDescription
        );

        return yesterdayCash?.value || 0;
      },
      getTotalDailyExpenses: () => {
        const expenses: DailyExpenses = get().getDailyExpenses();

        return expenses
          .filter((item) => item.description !== yesterdayCashDescription)
          .filter((item) => item.value < 0)
          .reduce(sumExpenses, 0);
      },
      getDailyBalance: () => {
        const expenses: DailyExpenses = get().expenses[getDateKey()];

        if (!expenses) return [];

        return expenses;
      },
      getTotalDailyCash: () => {
        return get().getDailyBalance().reduce(sumExpenses, 0);
      },
      getTotalInitialDailyCash: () => {
        const expenses: DailyExpenses = get().getDailyBalance();

        const initialCash = expenses.find(
          ({ description }) => description === initialCashDescription
        );
        const yesterdayCash = expenses.find(
          ({ description }) => description === yesterdayCashDescription
        );

        return yesterdayCash!?.value + initialCash!?.value || 0;
      },
      getDailyInitialCash: () => {
        const { userMonthyRent, userMonthyExpenses } = get();
        const daysOfMonth = 30;

        const dayliInitialCash =
          (userMonthyRent - userMonthyExpenses) / daysOfMonth;

        return dayliInitialCash;
      },
    }),
    { name: "my-app-storage" }
  )
);

const sumDaysWithoutExpenses = (
  currentDay: string,
  lastDay: string,
  lastDayBalance: number,
  initialDailyCash: number
): number => {
  const [d, m, y] = currentDay.split("/");
  const [d2, m2, y2] = lastDay.split("/");

  const current = new Date(Number(y), Number(m) - 1, Number(d));
  const last = new Date(Number(y2), Number(m2) - 1, Number(d2));

  const diff = Math.abs(current.getTime() - last.getTime());
  const oneDayInMileseconds = 1000 * 60 * 60 * 24;
  const days = Math.ceil(diff / oneDayInMileseconds) - 1;

  return initialDailyCash * days + lastDayBalance;
};

const sumExpenses = (total: number, current: { value: number }) =>
  total + current.value;
