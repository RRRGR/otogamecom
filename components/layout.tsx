import { Header } from "./header";
import { Footer } from "./footer";
import { ReactNode } from "react";
import Head from "next/head";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
