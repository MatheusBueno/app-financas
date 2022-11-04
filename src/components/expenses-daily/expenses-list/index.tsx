import formatCurrency from "@app/helpers/formatCurrency";
import { memo } from "react";
import { ExpensesListProps } from "./props";
import { Cash, Description, EmptyList, HeaderList, List } from "./styles";

const ExpensesList = memo<ExpensesListProps>(({ header, list }) => {
  return (
    <>
      <HeaderList>{header}</HeaderList>

      {!list.length && (
        <EmptyList>
          🤔 <br /> Não tivemos gastos aqui
        </EmptyList>
      )}

      <List>
        {list.map((daily, index) => (
          <li key={`${daily.value}-${index}`}>
            <Cash>{formatCurrency(daily.value)}</Cash>

            <Description>{daily.description || "-"}</Description>
          </li>
        ))}
      </List>
    </>
  );
});

export default ExpensesList;
