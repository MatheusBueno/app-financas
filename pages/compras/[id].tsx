import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import shallow from "zustand/shallow";

import Button from "@app/components/shared/button";
import Input from "@app/components/shared/input";
import { DEFAULT_ROTES } from "@app/constants/routes";
import { useToast } from "@app/hooks/toast";
import { useCashFlowStore } from "@app/store/cacheFlow";

export default function UpdateExpensePage({ id }: { id: string }) {
  const inputValueRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { showSuccess, showWarning } = useToast();
  const [expense, setExpense] = useState<any>({ value: null });

  const { getExpense, updateExpense, deleteExpense } = useCashFlowStore(
    (state) => ({
      getExpense: state.getExpense,
      updateExpense: state.updateExpense,
      deleteExpense: state.deleteExpense,
    }),
    shallow
  );

  useEffect(() => {
    const currentExpense = getExpense(id as string);

    if (!currentExpense) {
      router.replace(DEFAULT_ROTES.HOME);
    }

    setExpense({
      ...currentExpense,
      value: Math.abs(currentExpense!.value),
    });
  }, [id]);

  const onSave = () => {
    const value = inputValueRef.current?.value;

    if (!value) return;

    updateExpense(router.query.id as string, {
      value: Number(value),
      description: descriptionRef.current?.value,
    });

    showSuccess();

    router.replace(DEFAULT_ROTES.DAILY_HISTORY);
  };

  const onDelete = () => {
    showWarning({ text: "Realmente quer deletar a compra?" }).then(
      ({ isDenied }) => {
        if (isDenied) {
          deleteExpense(id);
          router.replace(DEFAULT_ROTES.DAILY_HISTORY);
        }
      }
    );
  };

  return (
    <>
      <h1>Editar Compra</h1>

      <span>Descrição da compra (opcional)</span>
      <Input
        ref={descriptionRef}
        placeholder='Almoço'
        type='text'
        defaultValue={expense?.description}
      />

      <div style={{ marginTop: 8 }}>
        <span>Qual o valor da compra?</span>
        <Input
          ref={inputValueRef}
          placeholder='R$29,90'
          type='number'
          inputMode='decimal'
          defaultValue={expense?.value}
        />
      </div>

      <div style={{ marginTop: 32 }}>
        <Button onClick={onSave}>Salvar</Button>
        <Button onClick={onDelete}>Deletar</Button>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id as string;

  if (!id) {
    return { redirect: DEFAULT_ROTES.HOME, props: {} };
  }

  return {
    props: { id },
  };
};
