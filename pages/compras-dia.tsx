import ExpensesList from "@app/components/expenses-daily/expenses-list";
import { useGetToday } from "@app/hooks/getToday";
import { useCashFlowStore } from "@app/store/cacheFlow";
import shallow from "zustand/shallow";

export default function DailyHistoryPage() {
  const yesterday = new Date();
  yesterday.setDate(new Date().getDate() - 1);

  const { getFriendlyDate } = useGetToday();

  const { dailyExpenses, yesterdayExpenses } = useCashFlowStore(
    (state) => ({
      dailyExpenses: state.getDailyExpenses,
      yesterdayExpenses: state.getYesterdayExpenses,
    }),
    shallow
  );

  return (
    <>
      <h1>Histórico de gastos</h1>

      <ExpensesList header={getFriendlyDate()} list={dailyExpenses()} />
      <ExpensesList
        header={getFriendlyDate(yesterday)}
        list={yesterdayExpenses()}
      />
    </>
  );
}
