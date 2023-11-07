export interface ITicket {
    title: string,
    description: string,
    priority: number,
    progress: number,
    status: TicketStatusType,
    category: string,
    createdAt?: string
};

export type TicketStatusType = 'not started' | 'started' | 'done';