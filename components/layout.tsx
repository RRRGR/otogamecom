import { Header } from "./header";
import { Footer } from "./footer";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <meta
        http-equiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
