import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import Button from "@app/components/shared/button";
import { DEFAULT_ROTES } from "@app/constants/routes";
import { useCashFlowStore } from "@app/store/cacheFlow";

const MoneyCard = dynamic(import("@app/components/home/money-card"));
const ResetDebit = dynamic(import("@app/components/home/reset-debit"));

export default function Home() {
  const loadStartDaily = useCashFlowStore((state) => state.loadStartDaily);

  const [
    {
      yesterdayCash,
      dailyTotalCash,
      dailyExpenses,
      dailyInitialCash,
      cashToSpendByDay,
    },
    setState,
  ] = useState({
    yesterdayCash: 0,
    dailyTotalCash: 0,
    dailyExpenses: 0,
    dailyInitialCash: 0,
    cashToSpendByDay: 0,
  });

  useEffect(() => {
    loadStartDaily();
  }, []);

  useCashFlowStore.subscribe((state) => {
    setState({
      yesterdayCash: state.getTotalYesterdayBalance(),
      dailyTotalCash: state.getTotalDailyCash(),
      dailyExpenses: state.getTotalDailyExpenses(),
      dailyInitialCash: state.getTotalInitialDailyCash(),
      cashToSpendByDay: state.cashToSpendByDay,
    });
  });

  return (
    <>
      <h1 style={{ fontSize: "1.5rem" }}>Hoje, você pode gastar:</h1>

      <MoneyCard
        yesterdayCash={yesterdayCash}
        dailyTotalCash={dailyTotalCash}
        dailyExpenses={dailyExpenses}
        dailyInitialCash={dailyInitialCash}
      />

      <ResetDebit
        totalDailyCash={dailyTotalCash}
        shouldToSpendByDay={cashToSpendByDay}
      />

      <Link href={DEFAULT_ROTES.BUY}>
        <Button>Adicionar gasto</Button>
      </Link>

      {/* <Button>Nova entrada</Button> */}
    </>
  );
}
