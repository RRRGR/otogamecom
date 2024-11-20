import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AdventIndex() {
  const router = useRouter();

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    router.push(`/advent/${currentYear}`);
  }, [router]);

  return null;
}
