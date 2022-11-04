import { DEFAULT_ROTES } from "@app/constants/routes";
import formatCurrency from "@app/helpers/formatCurrency";
import Link from "next/link";
import { memo } from "react";
import { MoneyCardProps } from "./props";
import { CustomNumber, DailyCash, List, MoneyCardContent } from "./styles";

const MoneyCard = memo<MoneyCardProps>(
  ({ dailyExpenses, dailyInitialCash, yesterdayCash, dailyTotalCash }) => {
    return (
      <>
        <MoneyCardContent>
          <DailyCash value={dailyTotalCash}>
            {formatCurrency(dailyTotalCash)}
          </DailyCash>
        </MoneyCardContent>

        <List>
          <li>
            <CustomNumber value={yesterdayCash}>
              {formatCurrency(yesterdayCash)}
            </CustomNumber>

            <small>Dia anterior</small>
          </li>
          <li>
            <CustomNumber value={dailyInitialCash}>
              {formatCurrency(dailyInitialCash)}
            </CustomNumber>
            <small>Inicio do dia</small>
          </li>

          <li>
            <Link
              href={DEFAULT_ROTES.DAILY_HISTORY}
              title='Hístorico de compras do dia'
            >
              <CustomNumber value={dailyExpenses}>
                {formatCurrency(dailyExpenses)}
              </CustomNumber>

              <small>Gastos do dia</small>
            </Link>
          </li>
        </List>
      </>
    );
  }
);

export default MoneyCard;
