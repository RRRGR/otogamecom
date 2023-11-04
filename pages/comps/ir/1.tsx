import Layout from "@/components/layout";
import { GetSessionParams, getSession } from "next-auth/react";

function One() {
  return <div className="flex flex-col min-h-screen"></div>;
}

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

One.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default One;
