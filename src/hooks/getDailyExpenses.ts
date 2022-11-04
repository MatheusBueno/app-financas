import { DailyExpenses } from "@app/models/dailyExpenses";
import { useEffect, useState } from "react";
import { useGetToday } from "./getToday";
import { useRepository } from "./repository";

interface IListExpenses {
  today: DailyExpenses;
  yesterday: DailyExpenses;
}

export const useGetDailyExpenses = () => {
  const yesterday = new Date();
  yesterday.setDate(new Date().getDate() - 1);

  const { getDate, getFriendlyDate } = useGetToday();
  const { getData } = useRepository();
  const [listExpenses, setListExpenses] = useState<IListExpenses>({
    today: [],
    yesterday: [],
  });

  useEffect(() => {
    setListExpenses({
      today: getDailyExpenses(),
      yesterday: getDailyExpenses(getDate(yesterday)),
    });
  }, []);

  const getDailyExpenses = (day: string = getDate()): DailyExpenses => {
    const dailyExpenses: DailyExpenses = getData(day);

    if (!dailyExpenses) {
      return [];
    }

    // remove initial value
    dailyExpenses.shift();
    return dailyExpenses;
  };

  return {
    dailyExpenses: listExpenses.today,
    yesterdayExpenses: listExpenses.yesterday,
    today: getFriendlyDate(),
    yesterday: getFriendlyDate(yesterday),
  };
};
