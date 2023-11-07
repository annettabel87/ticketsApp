import { FC } from "react";
import TicketCard from "./(components)/TicketCard";
import { BASE_URL } from "./(constants)/constants";
import type { ResponseData } from "./api/tickets/route";

const getTickets = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/tickets`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    return res.json() as ResponseData;
  } catch (error) {
    console.log("Failed to get tickets", error);
  }
};

const Dashboard: FC = async () => {
  const data = (await getTickets()) as ResponseData;

  if (!data?.tickets) {
    return <p>No tickets.</p>;
  }

  let uniqueCategories: string[];
  if (data.tickets.length) {
    const categories = data.tickets.map((item) => item.category);
    uniqueCategories = [...new Set(categories)];
  }

  return (
    <div className="p-5">
      <div>
        {data.tickets &&
          uniqueCategories!.map((category, index) => (
            <div key={index} className="mb-4">
              <h2>{category}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {data.tickets &&
                  data.tickets
                    .filter((ticket) => ticket.category === category)
                    .map((filteredTicket, _index) => (
                      <TicketCard
                        id={_index}
                        key={_index}
                        ticket={filteredTicket}
                      />
                    ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
