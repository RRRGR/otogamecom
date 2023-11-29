import Image from "next/image";
import { Inter } from "next/font/google";
import { signIn, signOut, useSession } from "next-auth/react";
import { Header } from "@/components/header";
import { Card, Grid, Text, Title } from "@tremor/react";
import { getGuildEvents, getOnlineMembers } from "@/pages/api/api";
import Link from "next/link";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ online, guildEvents }: any) {
  const { data: session } = useSession();
  return session ? (
    <>
      <div className="mb-4 flex flex-col min-h-screen">
        <Header></Header>
        <div className="text-center text-[32px] mt-4">
          𝓦𝓮𝓵𝓬𝓸𝓶𝓮 𝓽𝓸 𝓽𝓱𝓮 𝓞𝓾𝓬𝓱𝓲 𝓞𝓽𝓸𝓰𝓪𝓶𝓮 𝓢𝓮𝓻𝓿𝓮𝓻 𝓞𝓯𝓯𝓲𝓬𝓲𝓪𝓵 𝓦𝓮𝓫𝓼𝓲𝓽𝓮!
        </div>
        <div className="text-center text-[20px] mt-10">{`Upcoming Events:${
          guildEvents.message !== undefined
            ? " Failed to get events."
            : guildEvents.length > 0
            ? ""
            : " None"
        }`}</div>
        <Grid numItems={1} className="">
          {!guildEvents.message &&
            guildEvents.map((guildEvent: any) => {
              const startsAtDate: Date = new Date(
                guildEvent.scheduled_start_time
              );
              startsAtDate.setHours(startsAtDate.getHours() + 9);
              const startsAtString: string = `${startsAtDate.getFullYear()}/${startsAtDate.getMonth()}/${startsAtDate.getDate()} ${startsAtDate
                .getHours()
                .toString()
                .padStart(2, "0")}:${startsAtDate
                .getMinutes()
                .toString()
                .padStart(2, "0")}`;
              return (
                <Card
                  key={guildEvent.name}
                  className="max-w-xs mx-auto mt-4"
                  decoration="top"
                  decorationColor="indigo"
                >
                  <Title>{guildEvent.name}</Title>
                  <Text>{startsAtString}</Text>
                  <Text>{guildEvent.description}</Text>
                </Card>
              );
            })}
        </Grid>
        <Card className="max-w-md mx-auto max-h-none bg-gray-700 mt-8">
          <Image
            className="max-w-sm mx-auto mt-10"
            src="/genkotsu.PNG"
            alt="otogame"
            width={240}
            height={200}
          ></Image>
          <div className="text-white flex justify-center text-[30px] mt-10">
            𝓞𝓾𝓬𝓱𝓲 𝓞𝓽𝓸𝓰𝓪𝓶𝓮
          </div>
          <Grid numItems={2} className="mt-8 flex justify-center">
            <div className="w-32 h-7 rounded-full bg-gray-800 mr-3 flex justify-center">
              <div className="w-3 h-3 rounded-full mt-2 bg-green-500"></div>
              <p className="text-white text-sm mt-1 ml-1">{`${
                online.approximate_presence_count ?? "?"
              } Online`}</p>
            </div>
            <div className="w-32 h-7 rounded-full bg-gray-800 ml-3 flex justify-center">
              <div className="w-3 h-3 rounded-full mt-2 bg-gray-400"></div>
              <p className="text-white text-sm mt-1 ml-1">{`${
                online.approximate_member_count ?? "?"
              } Members`}</p>
            </div>
          </Grid>

          <div className="flex justify-center mt-8 mb-4">
            <Link href="https://discord.gg/TFhC2w8hgU">
              <div className="w-80 h-12 bg-blue-500 flex items-center justify-center">
                <p className="text-gray-100 text-lg">Open Discord App</p>
              </div>
            </Link>
          </div>
        </Card>
      </div>
      <Footer></Footer>
    </>
  ) : (
    <>
      <div className="flex justify-center mt-10">
        <button
          onClick={() => signIn()}
          className="text-lg text-blue-700 underline hover:text-blue-500"
        >
          Discord Sign In
        </button>
      </div>
      <p className="flex justify-center mt-4 text-gray-500">
        Some pages are not accessible to people not in the server.
      </p>
    </>
  );
}

export async function getServerSideProps() {
  const online = await getOnlineMembers();
  const guildEvents = await getGuildEvents();
  return {
    props: { online, guildEvents },
  };
}
