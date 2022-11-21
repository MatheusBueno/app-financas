import Button from "@app/components/shared/button";
import Input from "@app/components/shared/input";
import { useToast } from "@app/hooks/toast";
import { useCashFlowStore } from "@app/store/cacheFlow";
import Link from "next/link";
import { useRef } from "react";
import shallow from "zustand/shallow";
import formatCurrency from "@app/helpers/formatCurrency";

export default function SettingsPage() {
  const {
    monthlyRent,
    expenses,
    updateMonthlyRent,
    updateExpenses,
    cashToSpendByDay,
  } = useCashFlowStore(
    (state) => ({
      monthlyRent: state.userMonthyRent,
      expenses: state.userMonthyExpenses,
      updateExpenses: state.updateUserMonthyExpenses,
      updateMonthlyRent: state.updateUserMonthyRent,
      cashToSpendByDay: state.cashToSpendByDay,
    }),
    shallow
  );

  const { showSuccess } = useToast();

  const monthlyRentRef = useRef<HTMLInputElement>(null);
  const expensesRef = useRef<HTMLInputElement>(null);

  const onSave = () => {
    updateMonthlyRent(Number(monthlyRentRef.current?.value));
    updateExpenses(Number(expensesRef.current?.value));

    showSuccess();
  };

  return (
    <>
      <h1>Configurações</h1>
      <h2>Renda mensal</h2>
      <span>Qual o valor da sua renda mensal?</span>
      <Input
        ref={monthlyRentRef}
        defaultValue={monthlyRent}
        type='number'
        placeholder='R$ 4000,00'
        inputMode='decimal'
      />
      <hr />
      <h2>Gastos mensais fixos</h2>
      <span>Qual o valor dos seus gastos fixos mensais?</span>
      <Input
        ref={expensesRef}
        defaultValue={expenses}
        type='number'
        placeholder='R$ 2908,90'
        inputMode='decimal'
      />

      <div style={{ marginTop: 32 }}>
        <Button onClick={onSave}>Salvar</Button>
      </div>

      {cashToSpendByDay > 0 && (
        <div style={{ marginTop: 32 }}>
          Você pode gastar <strong> {formatCurrency(cashToSpendByDay)} </strong>
          por dia!
        </div>
      )}

      <br />

      <Link style={{ fontSize: "0.8rem" }} href='/debug'>
        Debug
      </Link>
    </>
  );
}
