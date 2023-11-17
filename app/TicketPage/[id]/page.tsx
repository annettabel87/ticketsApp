import TicketForm from "@/app/(components)/TicketForm";
import { BASE_URL } from "@/app/(constants)/constants";
import type { ITicket } from "@/app/(types)/Types";
import { FC } from "react";

interface ITicketPageProps {
  params: {
    id: string;
  };
}

const getTicketById = async (id: string): Promise<ITicket | undefined> => {
  try {
    const res = await fetch(`${BASE_URL}/api/tickets/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch ticket");
    }

    const result = await res.json();

    return result.foundTicket;
  } catch (error) {
    console.log(error);
  }
};

const TicketPage: FC<ITicketPageProps> = async ({ params }) => {
  const editMode = params.id === "new" ? false : true;

  let updateTicketData: ITicket | undefined;

  if (editMode) {
    updateTicketData = await getTicketById(params.id);

    updateTicketData = updateTicketData;
  } else {
    updateTicketData = {
      _id: "new",
      title: "",
      description: "",
      priority: 0,
      progress: 0,
      status: "not started",
      category: "",
    };
  }

  return (
    <div>
      <TicketForm ticket={updateTicketData} />
    </div>
  );
};

export default TicketPage;
