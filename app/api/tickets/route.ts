import Ticket from "../../(models)/Ticket";
import { NextResponse } from "next/server";
import type { NextApiRequest } from "next";
import { ITicket } from "@/app/(types)/Types";

export interface IRequest extends NextApiRequest {
  json(): IRequest | PromiseLike<IRequest>;
  formData: ITicket;
}

export interface ResponseData {
  tickets?: ITicket[];
  message?: string;
}

export async function GET() {
  try {
    const tickets = await Ticket.find();
    return NextResponse.json({ tickets }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error, not found", error },
      { status: 500 }
    );
  }
}

export async function POST(req: IRequest) {
  try {
    const body = await req.json();
    const ticketData = body.formData;
    await Ticket.create(ticketData);

    return NextResponse.json({ message: "Ticket created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
