export default (value: number): string => {
  if (value === null || value === undefined) return "-";

  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};
