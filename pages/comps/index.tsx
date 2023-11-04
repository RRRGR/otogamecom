import { GetSessionParams, getSession } from "next-auth/react";
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
import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import Layout from "@/components/layout";
import { useLocale } from "@/hooks/useLocale";

function Comps() {
  const { t } = useLocale();

  const irs = [
    {
      title: t.FIRST,
      link: process.env.NEXT_PUBLIC_FIRST_IR_LINK,
    },
    {
      title: t.SECOND,
      link: process.env.NEXT_PUBLIC_SECOND_IR_LINK,
    },
  ];

  const aoos = [
    {
      title: t.FIRST,
      link: process.env.NEXT_PUBLIC_FIRST_AOO_LINK,
    },
    {
      title: t.SECOND,
      link: process.env.NEXT_PUBLIC_SECOND_AOO_LINK,
    },
    {
      title: t.THIRD,
      link: process.env.NEXT_PUBLIC_THIRD_AOO_LINK,
    },
  ];

  const projects = [
    { enTitle: "Internet Ranking", jpTitle: "IR", info: irs },
    { enTitle: "Arcaea Ouchi Otoge Cup", jpTitle: "AOO杯", info: aoos },
  ];

  return (
    <>
      <Grid
        numItemsSm={1}
        numItemsLg={2}
        className="flex flex-col min-h-screen"
      >
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
                        <Link href={projectInfo.link!} className="truncate">
                          {projectInfo.title}
                          <Icon icon={ArrowTopRightOnSquareIcon}></Icon>
                          <>(Google Sheets)</>
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
    </>
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

Comps.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Comps;
