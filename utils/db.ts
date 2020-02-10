import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default (
  handler: (req: NextApiRequest, res: NextApiResponse) => {}
) => async (req: NextApiRequest, res: NextApiResponse) => {
  if (!process.env.DB_CREDENTIALS) {
    console.error(
      "No DB_CREDENTIALS en variable. Please check your next.config.js file."
    );
    return;
  }

  const db = mongoose.connection;

  console.log("db.readyState", db.readyState);

  if (db.readyState == 1) return handler(req, res);

  mongoose.connect(process.env.DB_CREDENTIALS, {
    useNewUrlParser: true
  });

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    console.log("We are connected to the DB");
    return handler(req, res);
  });
};
