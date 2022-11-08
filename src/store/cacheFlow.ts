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

  getTotalDailyExpenses: () => number;
  getTotalYesterdayExpenses: () => number;
  getTotalDailyCash: () => number;
  getTotalInitialDailyCash: () => number;
  getDailyInitialCash: () => number;
  getDailyExpenses: () => DailyExpenses;
  getYesterdayExpenses: () => DailyExpenses;
}

const getDateKey = (date: Date = new Date()) => {
  return date.toLocaleDateString(["pt-BR"]);
};

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

      getDailyExpenses: () => {
        const expenses: DailyExpenses = get().expenses[getDateKey()];

        if (!expenses) return [];

        return expenses;
      },
      getYesterdayExpenses: () => {
        const previous = new Date();
        previous.setDate(new Date().getDate() - 1);

        const expenses = get().expenses[getDateKey(previous)];

        if (!expenses) return [];

        return expenses;
      },
      getTotalYesterdayExpenses: () => {
        const expenses = get().getYesterdayExpenses();

        return expenses.reduce((total, current) => total + current.value, 0);
      },
      getTotalDailyExpenses: () => {
        const expenses: DailyExpenses = get().getDailyExpenses();

        return expenses
          .filter((item) => item.value < 0)
          .reduce((total, current) => total + current.value, 0);
      },
      getTotalDailyCash: () => {
        const expensesToday = get().getTotalDailyExpenses();
        const expensesYesterday = get().getTotalYesterdayExpenses();
        const initialDailyCash = get().getDailyInitialCash();

        return expensesYesterday + expensesToday + initialDailyCash;
      },
      getTotalInitialDailyCash: () => {
        const yesterday = get().getTotalYesterdayExpenses();
        const initialCash = get().getDailyInitialCash();

        return yesterday + initialCash;
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
