import { useCashFlowStore } from "@app/store/cacheFlow";

export default function Home() {
  const state = useCashFlowStore((state) => state);

  return <>{JSON.stringify(state)}</>;
}
