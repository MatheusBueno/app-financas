import { DEFAULT_ROTES } from "@app/constants/routes";
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
            {dailyTotalCash.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </DailyCash>
        </MoneyCardContent>

        <List>
          <li>
            <CustomNumber value={yesterdayCash}>
              {yesterdayCash.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </CustomNumber>

            <small>Dia anterior</small>
          </li>
          <li>
            <CustomNumber value={dailyInitialCash}>
              {dailyInitialCash.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </CustomNumber>
            <small>Inicio do dia</small>
          </li>

          <li>
            <Link
              href={DEFAULT_ROTES.DAILY_HISTORY}
              title='Hístorico de compras do dia'
            >
              <CustomNumber value={dailyExpenses}>
                {dailyExpenses.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
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
