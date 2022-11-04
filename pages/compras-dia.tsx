import ExpensesList from "@app/components/expenses-daily/expenses-list";
import { useGetDailyExpenses } from "@app/hooks/getDailyExpenses";

export default function DailyHistoryPage() {
  const { dailyExpenses, today, yesterday, yesterdayExpenses } =
    useGetDailyExpenses();

  return (
    <>
      <h1>Histórico de gastos</h1>

      <ExpensesList header={today} list={dailyExpenses} />
      <ExpensesList header={yesterday} list={yesterdayExpenses} />
    </>
  );
}
