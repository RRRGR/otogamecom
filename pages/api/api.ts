import { emojiUsageRankArray } from "@/types";

export async function getEmojiUsageRank() {
  const url: string = `${process.env.URL}emoji/usage-rank?guild_id=${process.env.OTOGAME_ID}`;
  const base64Credentials = btoa(
    `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`
  );
  const headers = new Headers({
    Authorization: `Basic ${base64Credentials}`,
    "Content-Type": "application/json",
  });
  const fetchOptions: RequestInit = {
    method: "GET",
    headers,
  };
  const res = await fetch(url, fetchOptions);
  const emojiStats: emojiUsageRankArray = await res.json();
  return emojiStats;
}

export async function getGuildMembers() {
  const url: string = `https://discordapp.com/api/guilds/${process.env.OTOGAME_ID}/members?limit=1000`;
  const headers = new Headers({
    Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
  });
  const fetchOptions: RequestInit = {
    method: "GET",
    headers,
  };
  const res: Response = await fetch(url, fetchOptions);
  const members = await res.json();
  return members;
}

export async function getUser(userId: string) {
  const url: string = `https://discordapp.com/api/guilds/${process.env.OTOGAME_ID}/members/${userId}`;
  const headers = new Headers({
    Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
  });
  const fetchOptions: RequestInit = {
    method: "GET",
    headers,
  };
  const res: Response = await fetch(url, fetchOptions);
  const user = await res.json();
  return user;
}

export async function getGuildRoles() {
  const url: string = `https://discordapp.com/api/guilds/${process.env.OTOGAME_ID}/roles`;
  const headers = new Headers({
    Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
  });
  const fetchOptions: RequestInit = {
    method: "GET",
    headers,
  };
  const res: Response = await fetch(url, fetchOptions);
  const roles = await res.json();
  return roles;
}

export async function getMemberFriendCodeById(userId: string) {
  const url: string = `${process.env.URL}friend-code?user_id=${userId}`;
  const base64Credentials = btoa(
    `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`
  );
  const headers = new Headers({
    Authorization: `Basic ${base64Credentials}`,
    "Content-Type": "application/json",
  });
  const fetchOptions: RequestInit = {
    method: "GET",
    headers,
  };
  const res = await fetch(url, fetchOptions);
  const data = await res.json();
  return data;
}

export async function getOnlineMembers() {
  const url: string = `https://discordapp.com/api/invites/${process.env.INVITE}?with_counts=true&with_expiration=true`;
  const res: Response = await fetch(url);
  if (res.status == 429) return {};
  const data = await res.json();
  return data;
}

export async function getGuildEvents() {
  const url: string = `https://discordapp.com/api/guilds/${process.env.OTOGAME_ID}/scheduled-events`;
  const headers = new Headers({
    Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
  });
  const fetchOptions: RequestInit = {
    method: "GET",
    headers,
  };
  const res: Response = await fetch(url, fetchOptions);
  const data = await res.json();
  return data;
}

export async function getMessageCountByUserId(userId: string, hours: number) {
  const url: string = `${process.env.URL}message/count?guild_id=${process.env.OTOGAME_ID}&user_id=${userId}&hours=${hours}`;
  const base64Credentials = btoa(
    `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`
  );
  const headers = new Headers({
    Authorization: `Basic ${base64Credentials}`,
    "Content-Type": "application/json",
  });
  const fetchOptions: RequestInit = {
    method: "GET",
    headers,
  };
  const res = await fetch(url, fetchOptions);
  const data = await res.json();
  return data;
}

export async function getAdventByIdAndDate(userId: string, date: string) {
  const url: string = `${process.env.URL}advent/event?user_id=${userId}&date_str=${date}`;
  const base64Credentials = btoa(
    `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`
  );
  const headers = new Headers({
    Authorization: `Basic ${base64Credentials}`,
    "Content-Type": "application/json",
  });
  const fetchOptions: RequestInit = {
    method: "GET",
    headers,
  };
  const res = await fetch(url, fetchOptions);
  const data = await res.json();
  return data;
}

export async function getAdventByYear(year: number) {
  const url: string = `${process.env.URL}advent/events?year=${year}`;
  const base64Credentials = btoa(
    `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`
  );
  const headers = new Headers({
    Authorization: `Basic ${base64Credentials}`,
    "Content-Type": "application/json",
  });
  const fetchOptions: RequestInit = {
    method: "GET",
    headers,
  };
  const res = await fetch(url, fetchOptions);
  const data = await res.json();
  return data;
}

export async function upsertAdvent(
  userId: number,
  author: string,
  title: string,
  url: string,
  date: string
): Promise<any> {
  const fetchUrl: string = `${process.env.NEXT_PUBLIC_URL}advent/event`;
  const base64Credentials = btoa(
    `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`
  );
  const data = {
    user_id: userId,
    author: author,
    title: title,
    url: url,
    date_str: date,
  };
  const requestOptions: RequestInit = {
    method: "PUT",
    headers: {
      Authorization: `Basic ${base64Credentials}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(fetchUrl, requestOptions);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseData = await response.json();
  return responseData;
}

export async function deleteAdvent(userId: number, date: string): Promise<any> {
  const url: string = `${process.env.NEXT_PUBLIC_URL}advent/event`;
  const base64Credentials = btoa(
    `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`
  );
  const data = {
    user_id: userId,
    date_str: date,
    author: null,
    title: null,
    url: null,
  };
  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: {
      Authorization: `Basic ${base64Credentials}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseData = await response.json();
  return responseData;
}
