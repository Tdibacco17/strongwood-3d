import Scene from "@/components/Scene";
// import { testDbConnection } from "./actions/testDbConnection";

export default function Page() {
  return <HomePage />
}

async function HomePage() {
  // const status = await testDbConnection();
  // console.log('[status]: ', status);

  return (
    <Scene />
  )
}