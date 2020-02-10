import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ticketSchema = new Schema({
  tips: Number, // Pourboire laissé
  amount: Number // Montant du billet
});
const Ticket =
  mongoose.modelNames().indexOf("Ticket") == -1
    ? mongoose.model("Ticket", ticketSchema)
    : mongoose.model("Ticket");

export default Ticket;
