import { NextApiRequest, NextApiResponse } from "next";

const ticketTypes = ["task", "bug"];

export default function handle(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(ticketTypes);
}
