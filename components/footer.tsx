import { useLocale } from "@/hooks/useLocale";
import { Grid } from "@tremor/react";
import Link from "next/link";
import { useRouter } from "next/router";

export function Footer() {
  const { t } = useLocale();
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const handleSelectChange = (e: any) => {
    const selectedValue = e.target.value;
    if (selectedValue === t.JAPANESE) {
      router.push({ pathname, query }, asPath, { locale: "ja" });
    } else if (selectedValue === t.ENGLISH) {
      router.push({ pathname, query }, asPath, { locale: "en" });
    }
  };
  return (
    <footer className="footer w-full bg-red-300 text-gray-700 py-2 text-center flex flex-col items-center justify-center">
      <Grid numItemsSm={1}>
        <div className="">
          <label htmlFor="selectMenu">Language: </label>
          <select
            id="selectMenu"
            name="selectMenu"
            onChange={handleSelectChange}
            className="rounded-md"
          >
            <option className="hidden">Select</option>
            <option value={t.JAPANESE}>{t.JAPANESE}</option>
            <option value={t.ENGLISH}>{t.ENGLISH}</option>
          </select>
        </div>
        <div className="mt-3 text-xs">
          &copy; {new Date().getFullYear()} GrGuruto. All rights reserved.
        </div>
        <Link
          className="mt-2 text-xs underline"
          href="https://www.amazon.jp/hz/wishlist/ls/1G01ULPM8C79F?ref_=wl_share"
        >
          Support
        </Link>
      </Grid>
    </footer>
  );
}
