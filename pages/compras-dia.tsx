import ExpensesList from "@app/components/expenses-daily/expenses-list";
import { useCashFlowStore } from "@app/store/cacheFlow";
import shallow from "zustand/shallow";

export default function DailyHistoryPage() {
  const { getExpensesHistory } = useCashFlowStore(
    (state) => ({ getExpensesHistory: state.getExpensesHistory }),
    shallow
  );

  console.log(getExpensesHistory());
  

  return (
    <>
      <h1>Histórico de gastos</h1>

      {getExpensesHistory().map((item) => (
        <ExpensesList header={item.day} list={item.expenses} />
      ))}
    </>
  );
}
