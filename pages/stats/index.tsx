import { getEmojiUsageRank, getGuildMembers } from "@/api/api";
import {
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from "@tremor/react";
import Image from "next/image";
import { GetSessionParams, getSession, useSession } from "next-auth/react";
import { emojiUsageRankArray } from "@/types";
import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";
import Layout from "@/components/layout";

function Stats({
  membersList,
  emojiUsageRank,
}: {
  membersList: any;
  emojiUsageRank: emojiUsageRankArray;
}) {
  const { t } = useLocale();
  return (
    <div className="flex flex-col min-h-screen">
      <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
        <Card
          className="max-w-xs mx-auto mt-4"
          decoration="top"
          decorationColor="indigo"
        >
          <Title>
            <Link
              href="/stats/emoji"
              className="underline text-blue-600 hover:text-blue-400"
            >
              {t.EMOJIS}
            </Link>
          </Title>
          <Table className="mt-6">
            <TableHead>
              <TableRow>
                <TableHeaderCell>{t.RANK}</TableHeaderCell>
                <TableHeaderCell>{t.EMOJI}</TableHeaderCell>
                <TableHeaderCell>{t.COUNT}</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {emojiUsageRank.rankings.slice(0, 3).map((emojiInfo) => {
                const emoji = emojiInfo.PartialEmoji_str;
                const matches = emoji.match(/\d+>/);
                if (matches === null) {
                  return (
                    <TableRow key={emoji}>
                      <TableCell>{emojiInfo.rank}</TableCell>
                      <TableCell>{emoji}</TableCell>
                      <TableCell>{emojiInfo.usage_count}</TableCell>
                    </TableRow>
                  );
                } else {
                  const discordImageURL =
                    "https://cdn.discordapp.com/emojis/" +
                    matches[0].slice(0, -1) +
                    ".png";
                  return (
                    <TableRow key={emoji}>
                      <TableCell>{emojiInfo.rank}</TableCell>
                      <TableCell>
                        <Image
                          src={discordImageURL}
                          height={25}
                          width={25}
                          alt=""
                        />
                      </TableCell>
                      <TableCell>{emojiInfo.usage_count}</TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </Card>
        <Card
          className="max-w-xs mx-auto mt-4"
          decoration="top"
          decorationColor="indigo"
        >
          <Title>
            <Link
              href="/stats/members"
              className="underline text-blue-600 hover:text-blue-400"
            >
              {t.SERVER_MEMBERS}
            </Link>
          </Title>
          <Table className="mt-6">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Avatar</TableHeaderCell>

                <TableHeaderCell>Global Name</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {membersList.slice(0, 3).map((memberInfo: any) => {
                const nickname: string = memberInfo.nick ?? "";
                const avatar: string = memberInfo.user.avatar;
                const userId: string = memberInfo.user.id;
                const globalName: string = memberInfo.user.global_name;
                const userName: string = memberInfo.user.username;
                const avatarUrl: string = `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`;
                return (
                  <TableRow key={userId}>
                    <TableCell>
                      <Image
                        src={avatarUrl}
                        alt="avatar"
                        width={30}
                        height={30}
                      ></Image>
                    </TableCell>
                    <TableCell>{globalName}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </Grid>
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
  const membersList = await getGuildMembers();
  const emojiUsageRank: emojiUsageRankArray = await getEmojiUsageRank();
  return {
    props: { membersList, emojiUsageRank },
  };
}

Stats.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Stats;
