export interface ITicket {
  _id: string;
  title: string;
  description: string;
  priority: number;
  progress: number;
  status: TicketStatusType;
  category: string;
  createdAt?: string;
}

export type TicketStatusType = "not started" | "started" | "done";
