import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import interactionPlugin from "@fullcalendar/interaction";

import FullCalendar from "@fullcalendar/react";
import { Dialog, Transition } from "@headlessui/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { GetSessionParams, getSession } from "next-auth/react";
import Layout from "@/components/layout";
import {
  Button,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  TextInput,
  Title,
} from "@tremor/react";
import { Session } from "next-auth";
import { deleteAdvent, getAdventByYear, upsertAdvent } from "./api/api";
import Link from "next/link";

function Advent({
  userSession,
  adventEventsArray,
}: {
  userSession: Session;
  adventEventsArray: any;
}) {
  const [events, setEvents] = useState<any>(adventEventsArray);
  const [selectedDate, setSelectedDate] = useState("2023-12-01");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeModal = () => setIsOpen(false);
  const [titleInput, setTitleInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [isUrl, setIsUrl] = useState<boolean>(true);

  const handleDateClick = (info: any) => {
    if (!userSession) return;
    setIsOpen(true);
    setSelectedDate(info.dateStr);
  };

  const handleSubmit = async (event: any) => {
    if (urlInput !== "" && !isUrl) {
      return alert("Input a correct URL (e.g. https://google.com)");
    }
    const userId: number = parseInt(userSession.user!.id!);
    const author: string = userSession.user!.name!;
    await upsertAdvent(userId, author, titleInput, urlInput, selectedDate);
    const newEvent = {
      user_id: userId,
      author: author,
      originTitle: titleInput,
      title: `${author}: ${titleInput}`,
      start: selectedDate,
      editable: true,
      url: urlInput,
    };
    const newEvents = [
      ...events.filter(
        (e: any) => !(e.user_id === userId && e.start === selectedDate)
      ),
      newEvent,
    ];
    setEvents(newEvents);
    setIsOpen(false);
  };

  const handleDelete = async (event: any) => {
    const userId: number = parseInt(userSession.user!.id!);
    await deleteAdvent(parseInt(userSession.user!.id!), selectedDate);
    setEvents((prevEvents: any) =>
      prevEvents.filter((e: any) => {
        return e.user_id != userId || e.start != selectedDate;
      })
    );
    setIsOpen(false);
  };

  return (
    <div className="m-4">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="w-full max-w-xl transform overflow-hidden ring-tremor bg-white
                                    p-6 text-left align-middle shadow-tremor transition-all rounded-xl"
                >
                  <Flex alignItems="center" justifyContent="between">
                    <Text className="text-base text-gray-700 font-medium">
                      {selectedDate}
                    </Text>
                    <Button
                      className="mt-2 bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
                      onClick={closeModal}
                    >
                      Go back
                    </Button>
                  </Flex>
                  <div className="mt-2">
                    <Text className="text-base text-gray-700">Title</Text>
                    <TextInput
                      placeholder="Optional"
                      onValueChange={(value) => setTitleInput(value)}
                    />
                  </div>
                  <div className="mt-2">
                    <Text className="text-base text-gray-700">URL</Text>
                    <TextInput
                      type="url"
                      placeholder="Optional"
                      onValueChange={(value) => {
                        setUrlInput(value);
                        const urlRegex =
                          /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*(\?\S*)?$/;
                        setIsUrl(urlRegex.test(value));
                      }}
                    />
                  </div>
                  <Button
                    className="mt-2 w-full bg-blue-600 border-gray-200 text-gray-50 hover:bg-blue-400 hover:border-gray-300"
                    onClick={handleSubmit}
                  >
                    Register/Update
                  </Button>
                  <Button
                    className="mt-2 w-full bg-red-600 border-gray-200 text-gray-50 hover:bg-red-400 hover:border-gray-300"
                    onClick={handleDelete}
                  >
                    Delete your register (if exists)
                  </Button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Title className="flex items-center justify-center text-4xl m-4">
        𝓞𝓾𝓬𝓱𝓲 𝓞𝓽𝓸𝓰𝓪𝓶𝓮 𝓐𝓭𝓿𝓮𝓷𝓽 𝓒𝓪𝓵𝓮𝓷𝓭𝓪𝓻
      </Title>
      <div className="lg:mx-12 my-4">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          validRange={{
            start: "2023-12-01",
            end: "2023-12-26",
          }}
          headerToolbar={{
            left: "",
            center: "title",
            right: "",
          }}
          editable={true}
          dateClick={handleDateClick}
          events={events}
        />
      </div>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Author</TableHeaderCell>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell>URL</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((e: any) => (
            <TableRow key={e.user_id + e.start}>
              <TableCell>
                <Text>{e.start}</Text>
              </TableCell>
              <TableCell>
                <Text>{e.author}</Text>
              </TableCell>
              <TableCell>
                <Text className="truncate">{e.originTitle}</Text>
              </TableCell>
              <TableCell>
                <Link
                  href={e.url}
                  className="truncate text-blue-500 underline hover:text-blue-300"
                >
                  {e.url}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export async function getServerSideProps(context: GetSessionParams) {
  const userSession: Session | null = await getSession(context);
  const adventEvents = await getAdventByYear(2023);
  let adventEventsArray = [];
  for (const event of adventEvents.events) {
    const transformedEvent = {
      user_id: event.user_id,
      author: event.author,
      originTitle: event.title,
      title: `${event.author}: ${event.title}`,
      start: event.date_str,
      editable: true,
      url: event.url,
    };
    adventEventsArray.push(transformedEvent);
  }

  return {
    props: { userSession, adventEventsArray },
  };
}

Advent.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Advent;
