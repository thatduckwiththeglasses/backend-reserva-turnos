import { Router } from "express";
import { bookingManager } from "../managers/index.js";

const routerBookings = Router();

routerBookings.post("/",async (req, res) =>{
    const { clientName, clientEmail, date, time, status, services } = req.body;

    if(!clientName || !clientEmail || !date || !time || !status || !services) {
        return res.status(400).json({
            status: "--ERROR--",
            message: "Faltan campos obligatorios"
        });
    }

    const newBooking = await bookingManager.createBooking({
        clientName,
        clientEmail,
        date,
        time,
        status,
        services
    });

    res.status(201).json({
        status: "success",
        payload: newBooking,
    });
})

routerBookings.get("/:id",async (req, res) => {
    const { id } = req.params;

    const booking = await bookingManager.getBookingById(id);

    if (booking === null){
        res.status(404).json({
            status: "--ERROR--",
            message: "no se encontro la reserva"
        });
    } else {
        res.status(200).json({
            status: "success",
            payload: booking
        });
    };   
});

routerBookings.post("/:id/services/:sid", async (res, req) => {
    const { id } = req.params.id;

    const { sid } = req.params.sid;

    const updateBooking = await bookingManager.addServiceToBooking(id, sid);

    if(updateBooking === null){
        return res.status(404).json({
            status: "--ERROR--",
            message: "Servicio no encontrado"
        })
    };

    res.status(200).json({
        status: "success",
        payload: updateBooking
    });
});

export default routerBookings;