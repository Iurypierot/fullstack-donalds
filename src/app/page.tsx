"use client";  // marca o componente como Client Component

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/fsw-donalds");
  }, [router]);

  return null;
}
