import { useHealthQuery } from "./hooks/health";

export default function App() {
  const { data, isLoading, isError, error } = useHealthQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <h1>Health: {data.status}</h1>
    </div>
  );
}
