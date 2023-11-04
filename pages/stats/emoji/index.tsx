import { getEmojiUsageRank } from "@/api/api";
import {
  Card,
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
import { useLocale } from "@/hooks/useLocale";
import Layout from "@/components/layout";

function Stats({ emojiUsageRank }: { emojiUsageRank: emojiUsageRankArray }) {
  const { t } = useLocale();
  return (
    <div className="flex flex-col min-h-screen">
      <Card
        className="max-w-xs mx-auto my-4 bg-gray-600"
        decoration="top"
        decorationColor="indigo"
      >
        <Title className="text-white">{t.EMOJI_USAGE_COUNT}</Title>
        <Table className="mt-6">
          <TableHead>
            <TableRow>
              <TableHeaderCell className="text-white">{t.RANK}</TableHeaderCell>
              <TableHeaderCell className="text-white">
                {t.EMOJI}
              </TableHeaderCell>
              <TableHeaderCell className="text-white">
                {t.COUNT}
              </TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody className="text-white">
            {emojiUsageRank.rankings.map((emojiInfo) => {
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
  const emojiUsageRank: emojiUsageRankArray = await getEmojiUsageRank();
  return {
    props: { emojiUsageRank },
  };
}

Stats.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Stats;
