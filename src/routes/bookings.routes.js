import { Router } from "express";
import { bookService, createBooking, getBooking } from "../controllers/bookings.controller.js";

const routerBookings = Router();

routerBookings.post("/",createBooking);

routerBookings.get("/:id",getBooking);

routerBookings.post("/:id/services/:sid", bookService);

export default routerBookings;