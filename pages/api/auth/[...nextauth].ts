import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

async function isInGuild(accessToken: string): Promise<boolean> {
  const res: Response = await fetch(
    "https://discordapp.com/api/users/@me/guilds",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (res.ok) {
    const guilds = await res.json();
    return guilds.some((guild: any) => guild.id === process.env.OTOGAME_ID);
  }
  return false;
}

export const authOptions: any = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: {
        params: { scope: "identify email guilds guilds.members.read" },
      },
    }),
  ],
  callbacks: {
    /**
     * sessionにaccessTokenと、user.idを追加
     */
    session: async ({ session, token }: { session: any; token: any }) => {
      session.accessToken = token.accessToken;
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },

    /**
     * jwtにaccessTokenと、profile.idを追加
     */
    jwt: async ({
      token,
      account,
      profile,
    }: {
      token: any;
      account: any;
      profile: any;
    }) => {
      if (account && account.access_token) {
        token.accessToken = account.access_token as string;
      }
      if (profile) {
        token.id = profile.id;
      }
      return token;
    },
    signIn: async ({
      account,
      user,
      profile,
    }: {
      account: any;
      user: any;
      profile: any;
    }) => {
      if (account == null || account.access_token == null) return false;
      return await isInGuild(account.access_token);
    },
  },
};

export default NextAuth(authOptions);
