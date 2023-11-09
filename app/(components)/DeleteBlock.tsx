"use client";

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_URL } from "../(constants)/constants";
import { FC } from "react";
import { useRouter } from "next/navigation";

interface IDeleteBlockProps {
  id: string;
}

const DeleteBlock: FC<IDeleteBlockProps> = ({ id }) => {
  const router = useRouter();

  const deleteTicket = async () => {
    const res = await fetch(`${BASE_URL}/api/tickets/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <FontAwesomeIcon
      icon={faX}
      className="text-red-400 hover: cursor-pointer hover:text-red-200"
      onClick={deleteTicket}
    />
  );
};

export default DeleteBlock;
