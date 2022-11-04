import dynamic from "next/dynamic";
import Link from "next/link";

import Button from "@app/components/shared/button";
import { DEFAULT_ROTES } from "@app/constants/routes";
import { useCashFlow } from "@app/hooks/cashFlow";

const MoneyCard = dynamic(import("@app/components/home/money-card"), {
  ssr: false,
});

export default function Home() {
  const { getDailyExpenses, getDailyTotalCash, getYesterdayExpenses, dailyInitialCash } = useCashFlow();
  return (
    <>
      <h2>Hoje, você pode gastar:</h2>

      <MoneyCard
        yesterdayCash={getYesterdayExpenses()}
        dailyTotalCash={getDailyTotalCash()}
        dailyExpenses={getDailyExpenses()}
        dailyInitialCash={dailyInitialCash}
      />

      <Link href={DEFAULT_ROTES.NEW_BUY}>
        <Button>Adicionar gasto</Button>
      </Link>
      {/* <Button>Nova entrada</Button> */}
    </>
  );
}
