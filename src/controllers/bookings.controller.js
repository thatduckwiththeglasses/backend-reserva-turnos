import { bookingManager } from "../managers/index.js";

export const createBooking = async (req, res) =>{
    const { clientName, clientEmail, date, time, status, services } = req.body;

    if(!clientName || !clientEmail || !date || !time || !status || !services) {
        return res.status(400).json({
            status: "--ERROR--",
            message: "Faltan campos obligatorios"
        });
    }

    try{
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
    } catch(error) {
        res.status(500).json({
            status: "---ERROR---",
            message: "Error al crear la reserva",
            });
    }
};

export const getBooking = async (req, res) => {
    try{
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
    } catch(error)  {
        res.status(500).json({
            status: "---ERROR---",
            message: "Error al obtener la reserva",
            });
    }
};

export const bookService = async (req, res) => {
    try{
        const { id , sid } = req.params

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
    } catch(error) {
        res.status(500).json({
            status: "---ERROR---",
            message: "Error al añadir el servicio a la reserva",
            });
    }
};