import Button from "@app/components/shared/button";
import Input from "@app/components/shared/input";
import { DEFAULT_ROTES } from "@app/constants/routes";
import { useToast } from "@app/hooks/toast";
import { useCashFlowStore } from "@app/store/cacheFlow";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function NewExpensePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { showSuccess } = useToast();

  const addExpense = useCashFlowStore().addExpense;

  const onSave = () => {
    const value = inputRef.current?.value;

    if (!value) return;

    addExpense({
      value: Number(value),
      description: descriptionRef.current?.value,
    });

    showSuccess();

    router.replace(DEFAULT_ROTES.HOME);
  };

  return (
    <>
      <h1>Nova Compra</h1>

      <span>Descrição da compra (opcional)</span>
      <Input ref={descriptionRef} placeholder='Almoço' type='text' />

      <div style={{ marginTop: 8 }}>
        <span>Qual o valor da compra?</span>
        <Input
          ref={inputRef}
          placeholder='R$29,90'
          type='number'
          inputMode='decimal'
        />
      </div>

      <div style={{ marginTop: 32 }}>
        <Button onClick={onSave}>Salvar</Button>
      </div>
    </>
  );
}
