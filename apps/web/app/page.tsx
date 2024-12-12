"use client";

import { Hero } from "../components/hero";
import { useFetchData } from "../utils/util";

export default function Home() {
  const data = useFetchData(
    process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT ?? ""
  );
  console.log("data", data);

  return (
    <>
      <Hero />
    </>
  );
}
