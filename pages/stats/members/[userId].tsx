import {
  getGuildRoles,
  getMemberFriendCodeById,
  getMessageCountByUserId,
  getUser,
} from "@/pages/api/api";
import Layout from "@/components/layout";
import { useLocale } from "@/hooks/useLocale";
import {
  AreaChart,
  Card,
  Grid,
  Metric,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

function User({ user, guildRoles, memberFriendCode, messageCountArray }: any) {
  const { t } = useLocale();
  const nickname: string | null = user.nick;
  const avatar: string = user.user.avatar;
  const userId: string = user.user.id;
  const globalName: string | null = user.user.global_name;
  const userName: string | null = user.user.username;
  const name: string = nickname ?? globalName ?? userName ?? userId;
  const avatarUrl: string = `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`;
  const joinedAt: Date = new Date(user.joined_at);
  const joinedOn: string = `${joinedAt.getFullYear()}/${joinedAt.getMonth()}/${joinedAt.getDate()}`;
  const roles: string[] = user.roles;
  const rolesInfo = guildRoles.filter((role: any) => roles.includes(role.id));
  return (
    <div className="my-4 flex flex-col min-h-screen">
      <Link
        href="/stats/members"
        className="flex justify-center mb-4 underline hover:text-blue-400"
      >
        {t.BACK}
      </Link>
      <Card className="max-w-md mx-auto">
        <Grid numItems={2} className="gap-6">
          <div>
            <Card>
              <Image
                src={avatarUrl}
                alt="avatar"
                width={77}
                height={77}
              ></Image>
              <Title>{name}</Title>
            </Card>
          </div>
          <div>
            <Card>
              <Text className="text-xs">User Name</Text>
              <Metric className="text-xs">{userName}</Metric>

              <Text className="text-xs mt-1">Global Name</Text>
              <Metric className="text-xs">{globalName}</Metric>

              <Text className="text-xs mt-1">Nickname</Text>
              <Metric className="text-xs">{nickname}</Metric>
            </Card>
          </div>
          {/* <Card>
            <Text>Joined On</Text>
            <Metric>{joinedOn}</Metric>
          </Card> */}
        </Grid>
        <Card className="mt-4">
          <Title>{t.RECENT_SENT_MESSAGES}</Title>
          <AreaChart
            className="h-32"
            data={messageCountArray}
            index="date"
            categories={["count"]}
            colors={["blue"]}
            yAxisWidth={30}
            showYAxis={false}
          />
        </Card>
        <Card className="mt-4">
          <Title>{t.FRIEND_CODE}</Title>
          <Table className="mt-6">
            <TableHead>
              <TableRow>
                <TableHeaderCell>{t.KISHU}</TableHeaderCell>
                <TableHeaderCell>{t.CODE}</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {memberFriendCode.friend_codes.map((fc: any) => {
                return (
                  <TableRow key={fc.game_title}>
                    <TableCell>{fc.game_title}</TableCell>
                    <TableCell>{fc.friend_code}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
        <Card className="mt-4">
          <Title>{t.ROLES}</Title>
          {rolesInfo.map((role: any) => {
            return <Text key={role.id}>{role.name}</Text>;
          })}
        </Card>
      </Card>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const userId = context.params.userId;
  const user = await getUser(userId);
  const guildRoles = await getGuildRoles();
  const memberFriendCode = await getMemberFriendCodeById(userId);
  const messageCount = await getMessageCountByUserId(userId, 720);
  const messageCountArray = messageCount.message_count.map((item: any) => ({
    date: item.date.substring(5).replace("-", "/"),
    count: item.count,
  }));
  return { props: { user, guildRoles, memberFriendCode, messageCountArray } };
}

User.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default User;
