import mongoose, { Schema, Types } from "mongoose";
import type { ITicket } from "../(types)/Types";

mongoose.connect(process.env.MONGODB_URI as string);
mongoose.Promise = global.Promise;

const ticketsSchema = new Schema<ITicket>(
  {
    title: String,
    description: String,
    category: String,
    priority: Number,
    progress: Number,
    status: String,
  },
  {
    timestamps: true,
  }
);

const Ticket =
  mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", ticketsSchema);

export default Ticket;
