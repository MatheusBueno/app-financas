import Button from "@app/components/shared/button";
import Input from "@app/components/shared/input";
import { useUpdateUserConfigFinancial } from "@app/hooks/updateUserConfigFinancial";
import { useRef } from "react";

export default function SettingsPage() {
  const { getExpenses, getMonthlyRent, updateExpenses, updateMonthlyRent } =
    useUpdateUserConfigFinancial();

  const monthlyRentRef = useRef<HTMLInputElement>(null);
  const expensesRef = useRef<HTMLInputElement>(null);

  const onSave = () => {
    updateMonthlyRent(Number(monthlyRentRef.current?.value));
    updateExpenses(Number(expensesRef.current?.value));
  };

  return (
    <>
      <h1>Configurações</h1>
      <h2>Renda mensal</h2>
      <span>Qual o valor da sua renda mensal?</span>
      <Input
        ref={monthlyRentRef}
        defaultValue={getMonthlyRent()}
        type='number'
        placeholder='R$ 4000,00'
      />
      <hr />
      <h2>Gastos mensais fixos</h2>
      <span>Qual o valor dos seus gastos fixos mensais?</span>
      <Input
        ref={expensesRef}
        defaultValue={getExpenses()}
        type='number'
        placeholder='R$ 2908,90'
      />

      <div style={{ marginTop: 32 }}>
        <Button onClick={onSave}>Salvar</Button>
      </div>
    </>
  );
}
