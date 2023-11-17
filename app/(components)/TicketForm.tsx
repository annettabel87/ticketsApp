"use client";

import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { ITicket } from "../(types)/Types";

interface ITicketFormProps {
  ticket: ITicket | undefined;
}

const TicketForm: FC<ITicketFormProps> = ({ ticket }) => {
  const editMode = ticket?._id === "new" ? false : true;
  const router = useRouter();

  const startingTicketData: Omit<ITicket, "_id"> = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problem",
  };

  if (editMode && ticket) {
    startingTicketData.title = ticket.title;
    startingTicketData.description = ticket.description;
    startingTicketData.priority = ticket.priority;
    startingTicketData.progress = ticket.progress;
    startingTicketData.status = ticket.status;
    startingTicketData.category = ticket.category;
  }

  const [formData, setFormData] = useState(startingTicketData);

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editMode && ticket) {
      const res = await fetch(`/api/tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to create ticket!");
      }
    } else {
      const res = await fetch("/api/tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to create ticket!");
      }
    }
    router.refresh();
    router.push("/");
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h3>{editMode ? "Update your ticket" : "Create your ticket"}</h3>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={(e) => changeHandler(e)}
          required
          value={formData.title}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          onChange={(e) => changeHandler(e)}
          required
          value={formData.description}
          rows={5}
        />
        <label htmlFor="category">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={(e) => changeHandler(e)}
        >
          <option value="Hardware problem">Hardware problem</option>
          <option value="Software problem">Software problem</option>
          <option value="Project">Project</option>
        </select>
        <label>Priority</label>
        <div>
          <input
            type="radio"
            name="priority"
            id="priority-1"
            onChange={(e) => changeHandler(e)}
            value={1}
            checked={formData.priority == 1}
          />
          <label htmlFor="priority-1">1</label>
          <input
            type="radio"
            name="priority"
            id="priority-2"
            onChange={(e) => changeHandler(e)}
            value={2}
            checked={formData.priority == 2}
          />
          <label htmlFor="priority-2">2</label>
          <input
            type="radio"
            name="priority"
            id="priority-3"
            onChange={(e) => changeHandler(e)}
            value={3}
            checked={formData.priority == 3}
          />
          <label htmlFor="priority-3">3</label>
          <input
            type="radio"
            name="priority"
            id="priority-4"
            onChange={(e) => changeHandler(e)}
            value={4}
            checked={formData.priority == 4}
          />
          <label htmlFor="priority-4">4</label>
          <input
            type="radio"
            name="priority"
            id="priority-5"
            onChange={(e) => changeHandler(e)}
            value={5}
            checked={formData.priority == 5}
          />
          <label htmlFor="priority-5">5</label>
        </div>
        <label htmlFor="progress">Progress</label>
        <input
          type="range"
          name="progress"
          id="progress"
          value={formData.progress}
          min={0}
          max={100}
          onChange={(e) => changeHandler(e)}
        />
        <label htmlFor="status">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={(e) => changeHandler(e)}
        >
          <option value="not started">Not started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>
        <input
          type="submit"
          value={editMode ? "Update ticket" : "Create ticket"}
          className="btn"
        />
      </form>
    </div>
  );
};

export default TicketForm;
