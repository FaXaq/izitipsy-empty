import withDb from "../../utils/db";
import Ticket from "../../schemas/tickets";

export default withDb(async (req, res) => {
  Ticket.find({}, (_, tickets) => {
    res.status(200);
    res.send(tickets);
  });
});
