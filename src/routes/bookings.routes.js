import { Router } from "express";
import { bookService, createBooking, getBooking, cancelService, deleteBooking } from "../controllers/bookings.controller.js";

const routerBookings = Router();

routerBookings.post("/",createBooking);

routerBookings.get("/:id",getBooking);

routerBookings.post("/:id/services/:sid", bookService);

routerBookings.delete("/:id", deleteBooking);

routerBookings.delete("/:id/services/:sid", cancelService);

export default routerBookings;