import {
  Card,
  Flex,
  Grid,
  Icon,
  List,
  ListItem,
  Metric,
  Text,
} from "@tremor/react";
import { GetSessionParams, getSession } from "next-auth/react";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import Layout from "@/components/layout";
import { useLocale } from "@/hooks/useLocale";

function Resources() {
  const { t } = useLocale();

  const genshinAthlons = [
    {
      title: t.FIRST,
      link: "discord://-/channels/839086789150638111/982255124212744212/1046050087442317352",
    },
    {
      title: t.SECOND,
      link: "discord://-/channels/839086789150638111/982255124212744212/1053314026152665188",
    },
    {
      title: t.THIRD,
      link: "discord://-/channels/839086789150638111/982255124212744212/1083080770735853619",
    },
    {
      title: t.FOURTH,
      link: "discord://-/channels/839086789150638111/982255124212744212/1165631479401951302",
    },
  ];

  const genshinCerts = [
    {
      title: t.FIRST,
      link: "discord://-/channels/839086789150638111/982255124212744212/1062342514243272714",
    },
    {
      title: t.SECOND,
      link: "discord://-/channels/839086789150638111/982255124212744212/1073576307578912768",
    },
    {
      title: t.THIRD,
      link: "discord://-/channels/839086789150638111/982255124212744212/1077564147836919870",
    },
    {
      title: t.FOURTH,
      link: "discord://-/channels/839086789150638111/982255124212744212/1140256202874425344",
    },
    {
      title: t.FIFTH,
      link: "discord://-/channels/839086789150638111/982255124212744212/1151488760329019402",
    },
  ];

  const diffTableGames = [
    {
      title: "Arcaea",
      link: "discord://-/channels/839086789150638111/982255124212744212/982256377768583210",
    },
    {
      title: "プロセカ",
      link: "discord://-/channels/839086789150638111/982255124212744212/988416462576312400",
    },
    {
      title: "ONGEKI",
      link: "discord://-/channels/839086789150638111/982255124212744212/1059806067523080263",
    },
    {
      title: "Arcaea Lv.10 Tier",
      link: "discord://-/channels839086789150638111/982255124212744212/1111988690202406922",
    },
    {
      title: "SDVX",
      link: "discord://-/channels/839086789150638111/982255124212744212/1120687647313109052",
    },
  ];

  const others = [
    {
      title: "雑学王",
      link: "discord://-/channels/839086789150638111/982255124212744212/1119653293233279037",
    },
    {
      title: "Aru-R対戦",
      link: "discord://-/channels/839086789150638111/982255124212744212/1132210171364507689",
    },
    {
      title: "闇鍋パニック",
      link: "discord://-/channels/839086789150638111/982255124212744212/1142048641176043652",
    },
    {
      title: "追いガチオシ！",
      link: "discord://-/channels/839086789150638111/982255124212744212/1155836595421839432",
    },
  ];

  const projects = [
    {
      enTitle: "Genshin Athlon",
      jpTitle: "原神アスロン",
      info: genshinAthlons,
    },
    { enTitle: "Genshin Certificate", jpTitle: "原神検定", info: genshinCerts },
    {
      enTitle: "Difficulty Table Game",
      jpTitle: "難易度表ゲーム",
      info: diffTableGames,
    },
    { enTitle: "Others", jpTitle: "その他", info: others },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Grid numItemsSm={1} numItemsMd={2} numItemsLg={3} className="">
        <Card
          className="max-w-xs mx-auto mt-4"
          decoration="top"
          decorationColor="indigo"
        >
          <Text>Advent Calendar</Text>
          <Metric>
            <Link href="advent">Advent Calendar</Link>
            <Icon icon={ArrowTopRightOnSquareIcon}></Icon>
          </Metric>
        </Card>
        {projects.map((project) => {
          return (
            <Card
              key={project.enTitle}
              className="max-w-xs mx-auto mt-4"
              decoration="top"
              decorationColor="indigo"
            >
              <Text>{project.enTitle}</Text>
              <Metric>{project.jpTitle}</Metric>
              <List className="mt-1">
                {project.info.map((projectInfo) => {
                  return (
                    <ListItem key={projectInfo.title}>
                      <Flex
                        justifyContent="start"
                        className="truncate space-x-2.5"
                      >
                        <Link href={projectInfo.link} className="truncate">
                          {projectInfo.title}
                          <Icon icon={ArrowTopRightOnSquareIcon}></Icon>
                          <>(Discord)</>
                        </Link>
                      </Flex>
                    </ListItem>
                  );
                })}
              </List>
            </Card>
          );
        })}
      </Grid>
      <div className="mb-4"></div>
    </div>
  );
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

Resources.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Resources;
