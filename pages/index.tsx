import dynamic from "next/dynamic";
import Link from "next/link";
import shallow from "zustand/shallow";

import Button from "@app/components/shared/button";
import { DEFAULT_ROTES } from "@app/constants/routes";
import { useCashFlowStore } from "@app/store/cacheFlow";

const MoneyCard = dynamic(import("@app/components/home/money-card"));
const ResetDebit = dynamic(import("@app/components/home/reset-debit"));

export default function Home() {
  const {
    getTotalDailyExpenses,
    getTotalYesterdayExpenses,
    getTotalDailyCash,
    getTotalInitialDailyCash,
    getDailyInitialCash,
  } = useCashFlowStore(
    (state) => ({
      getTotalDailyExpenses: state.getTotalDailyExpenses,
      getTotalYesterdayExpenses: state.getTotalYesterdayExpenses,
      getTotalDailyCash: state.getTotalDailyCash,
      getTotalInitialDailyCash: state.getTotalInitialDailyCash,
      getDailyInitialCash: state.getDailyInitialCash,
    }),
    shallow
  );

  return (
    <>
      <h1 style={{ fontSize: "1.5rem" }}>Hoje, você pode gastar:</h1>

      <MoneyCard
        yesterdayCash={getTotalYesterdayExpenses()}
        dailyTotalCash={getTotalDailyCash()}
        dailyExpenses={getTotalDailyExpenses()}
        dailyInitialCash={getTotalInitialDailyCash()}
      />

      <ResetDebit
        dailyCash={getTotalDailyCash()}
        cashByDay={getDailyInitialCash()}
      />

      <Link href={DEFAULT_ROTES.BUY}>
        <Button>Adicionar gasto</Button>
      </Link>

      {/* <Button>Nova entrada</Button> */}
    </>
  );
}
