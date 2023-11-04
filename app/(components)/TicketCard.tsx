import { FC } from "react";
import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import ProgressDisplay from "./ProgressDisplay";
import StatusDisplay from "./StatusDisplay";

const TicketCard: FC = () => {
  return (
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md p-3 m-2 shadow-lg">
      <div className="flex mb-3">
        <PriorityDisplay />
        <div className="ml-auto">
          <DeleteBlock />
        </div>
      </div>
      <h4>Title</h4>
      <hr className="h-px border-0 bg-page mb-2" />
      <p className="whitespace-pre-wrap">description</p>
      <div className="flex-grow"></div>
      <div className="flex mt-2">
        <div className="flex flex-col">
          <p className="text-xs my-1">12/09/23 10:43PM</p>
          <ProgressDisplay />
        </div>
        <div className="ml-auto flex items-end">
            <StatusDisplay />
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
