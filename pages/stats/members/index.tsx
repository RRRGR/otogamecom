import { getGuildMembers } from "@/api/api";
import Layout from "@/components/layout";
import { useLocale } from "@/hooks/useLocale";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TextInput,
  Title,
} from "@tremor/react";
import { GetSessionParams, getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Members({ initMembersList }: any) {
  const { t } = useLocale();
  const [membersList, setMembersList] = useState(initMembersList);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortedMembersList, setSortedMembersList] = useState(initMembersList);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredList = sortedMembersList.filter(
      (memberInfo: any) =>
        (memberInfo.nick &&
          memberInfo.nick.toLowerCase().includes(query.toLowerCase())) ||
        (memberInfo.user.id &&
          memberInfo.user.id.toLowerCase().includes(query.toLowerCase())) ||
        (memberInfo.user.global_name &&
          memberInfo.user.global_name
            .toLowerCase()
            .includes(query.toLowerCase())) ||
        (memberInfo.user.username &&
          memberInfo.user.username.toLowerCase().includes(query.toLowerCase()))
    );
    setMembersList(filteredList);
  };
  const handleUserIdSort = () => {
    setMembersList((prevMembersList: any) => {
      return [...prevMembersList].sort((a: any, b: any) =>
        parseInt(a.user.id) > parseInt(b.user.id) ? 1 : -1
      );
    });
    setSortedMembersList((prevMembersList: any) => {
      return [...prevMembersList].sort((a: any, b: any) =>
        parseInt(a.user.id) > parseInt(b.user.id) ? 1 : -1
      );
    });
  };
  const handleUserNameSort = () => {
    setMembersList((prevMembersList: any) => {
      return [...prevMembersList].sort((a: any, b: any) =>
        a.user.username.toUpperCase() > b.user.username.toUpperCase() ? 1 : -1
      );
    });
    setSortedMembersList((prevMembersList: any) => {
      return [...prevMembersList].sort((a: any, b: any) =>
        a.user.username.toUpperCase() > b.user.username.toUpperCase() ? 1 : -1
      );
    });
  };
  const handleGlobalNameSort = () => {
    setMembersList((prevMembersList: any) => {
      return [...prevMembersList].sort((a: any, b: any) => {
        const nameA = (a.user.global_name || "").toUpperCase(); // Use an empty string if global_name is null
        const nameB = (b.user.global_name || "").toUpperCase(); // Use an empty string if global_name is null
        if (nameA === "" && nameB === "") {
          return 0; // Both are empty, no change in order
        } else if (nameA === "") {
          return 1; // Empty strings come later
        } else if (nameB === "") {
          return -1; // Empty strings come later
        } else {
          return nameA.toUpperCase() > nameB.toUpperCase() ? 1 : -1;
        }
      });
    });
    setSortedMembersList((prevMembersList: any) => {
      return [...prevMembersList].sort((a: any, b: any) => {
        const nameA = (a.user.global_name || "").toUpperCase(); // Use an empty string if global_name is null
        const nameB = (b.user.global_name || "").toUpperCase(); // Use an empty string if global_name is null
        if (nameA === "" && nameB === "") {
          return 0; // Both are empty, no change in order
        } else if (nameA === "") {
          return 1; // Empty strings come later
        } else if (nameB === "") {
          return -1; // Empty strings come later
        } else {
          return nameA.toUpperCase() > nameB.toUpperCase() ? 1 : -1;
        }
      });
    });
  };
  const handleNicknameSort = () => {
    setMembersList((prevMembersList: any) => {
      return [...prevMembersList].sort((a: any, b: any) => {
        const nameA = (a.nick || "").toUpperCase(); // Use an empty string if global_name is null
        const nameB = (b.nick || "").toUpperCase(); // Use an empty string if global_name is null
        if (nameA === "" && nameB === "") {
          return 0; // Both are empty, no change in order
        } else if (nameA === "") {
          return 1; // Empty strings come later
        } else if (nameB === "") {
          return -1; // Empty strings come later
        } else {
          return nameA.toUpperCase() > nameB.toUpperCase() ? 1 : -1;
        }
      });
    });
    setSortedMembersList((prevMembersList: any) => {
      return [...prevMembersList].sort((a: any, b: any) => {
        const nameA = (a.nick || "").toUpperCase(); // Use an empty string if global_name is null
        const nameB = (b.nick || "").toUpperCase(); // Use an empty string if global_name is null
        if (nameA === "" && nameB === "") {
          return 0; // Both are empty, no change in order
        } else if (nameA === "") {
          return 1; // Empty strings come later
        } else if (nameB === "") {
          return -1; // Empty strings come later
        } else {
          return nameA.toUpperCase() > nameB.toUpperCase() ? 1 : -1;
        }
      });
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Card
        className="max-w-2xl mx-auto bg-gray-600 mt-4"
        decoration="top"
        decorationColor="indigo"
      >
        <Flex>
          <Title className="text-white mr-4">{t.SERVER_MEMBERS}</Title>
          <button
            onClick={handleUserIdSort}
            className="text-white ms-2 hover:text-gray-200"
          >
            User ID 🔼
          </button>
          <TextInput
            icon={MagnifyingGlassIcon}
            placeholder="Search..."
            className="max-w-xs ml-4"
            value={searchQuery}
            onValueChange={handleSearch}
          />
        </Flex>
        <Table className="mt-6 table-auto">
          <TableHead>
            <TableRow>
              <TableHeaderCell className="text-white">Avatar</TableHeaderCell>
              <TableHeaderCell className="text-white hover:text-gray-200">
                <button onClick={handleUserNameSort}>User Name 🔼</button>
              </TableHeaderCell>
              <TableHeaderCell className="text-white hover:text-gray-200">
                <button onClick={handleGlobalNameSort}>Global Name 🔼</button>
              </TableHeaderCell>
              <TableHeaderCell className="text-white hover:text-gray-200">
                <button onClick={handleNicknameSort}>Nickname 🔼</button>
              </TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody className="text-white">
            {membersList.map((memberInfo: any) => {
              const nickname: string = memberInfo.nick ?? "";
              const avatar: string = memberInfo.user.avatar;
              const userId: string = memberInfo.user.id;
              const globalName: string = memberInfo.user.global_name ?? "";
              const userName: string = memberInfo.user.username ?? "";
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
                  <TableCell className="max-w-[0.5rem] truncate">
                    <Link
                      href={`/stats/members/${userId}`}
                      className="underline hover:text-blue-300"
                    >
                      {userName}
                    </Link>
                  </TableCell>
                  <TableCell className="max-w-[0.5rem] truncate">
                    <Link
                      href={`/stats/members/${userId}`}
                      className="underline hover:text-blue-300"
                    >
                      {globalName}
                    </Link>
                  </TableCell>
                  <TableCell className="max-w-[0.5rem] truncate">
                    <Link
                      href={`/stats/members/${userId}`}
                      className="underline hover:text-blue-300"
                    >
                      {nickname}
                    </Link>
                  </TableCell>
                </TableRow>
              );
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
  const initMembersList = await getGuildMembers();
  return {
    props: { initMembersList },
  };
}

Members.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Members;
