import Button from "@app/components/shared/button";
import Input from "@app/components/shared/input";
import { useToast } from "@app/hooks/toast";
import { useCashFlowStore } from "@app/store/cacheFlow";
import { useRef } from "react";
import shallow from "zustand/shallow";

export default function SettingsPage() {
  const { monthlyRent, expenses, updateMonthlyRent, updateExpenses } =
    useCashFlowStore(
      (state) => ({
        monthlyRent: state.userMonthyRent,
        expenses: state.userMonthyExpenses,
        updateExpenses: state.updateUserMonthyExpenses,
        updateMonthlyRent: state.updateUserMonthyRent,
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
    </>
  );
}
