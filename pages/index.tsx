import dynamic from "next/dynamic";
import Link from "next/link";
import shallow from "zustand/shallow";

import Button from "@app/components/shared/button";
import { DEFAULT_ROTES } from "@app/constants/routes";
import { useCashFlowStore } from "@app/store/cacheFlow";
import { useEffect } from "react";

const MoneyCard = dynamic(import("@app/components/home/money-card"));
const ResetDebit = dynamic(import("@app/components/home/reset-debit"));

export default function Home() {
  const {
    getTotalDailyExpenses,
    getTotalYesterdayBalance,
    getTotalDailyCash,
    getTotalInitialDailyCash,
    getDailyInitialCash,
    loadStartDaily,
  } = useCashFlowStore(
    (state) => ({
      getTotalDailyExpenses: state.getTotalDailyExpenses,
      getTotalYesterdayBalance: state.getTotalYesterdayBalance,
      getTotalDailyCash: state.getTotalDailyCash,
      getTotalInitialDailyCash: state.getTotalInitialDailyCash,
      getDailyInitialCash: state.getDailyInitialCash,
      loadStartDaily: state.loadStartDaily,
    }),
    shallow
  );

  useEffect(() => loadStartDaily(), []);

  return (
    <>
      <h1 style={{ fontSize: "1.5rem" }}>Hoje, você pode gastar:</h1>

      <MoneyCard
        yesterdayCash={getTotalYesterdayBalance()}
        dailyTotalCash={getTotalDailyCash()}
        dailyExpenses={getTotalDailyExpenses()}
        dailyInitialCash={getTotalInitialDailyCash()}
      />

      <ResetDebit
        dailyCash={getTotalDailyCash()}
        expenseByDay={getDailyInitialCash()}
      />

      <Link href={DEFAULT_ROTES.BUY}>
        <Button>Adicionar gasto</Button>
      </Link>

      {/* <Button>Nova entrada</Button> */}
    </>
  );
}
