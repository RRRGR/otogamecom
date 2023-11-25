import { Header } from "./header";
import { Footer } from "./footer";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <meta
        http-equiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      />
      <main>{children}</main>
      <Footer />
    </>
  );
}
