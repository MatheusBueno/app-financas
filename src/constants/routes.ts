export const DEFAULT_ROTES = {
  HOME: "/",
  CONFIG: "/configuracao",
  BUY: "/compras",
  DAILY_HISTORY: "/compras-dia",
  UPDATE_BUY: (id: string) => `${DEFAULT_ROTES.BUY}/${id}`,
};
