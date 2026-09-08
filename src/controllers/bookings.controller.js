import { bookingsService } from "../dependencies/index.js";

export const createBooking = async (req, res) =>{
    try{
        const newBooking = await bookingsService.createBooking(req.body);

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

        const booking = await bookingsService.getBooking(id);

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

        const updateBooking = await bookingsService.bookService(id, sid);

        res.status(200).json({
            status: "success",
            payload: updateBooking
        });
    } catch(error) {
        res.status(500).json({
            status: "---ERROR---",
            message: "Error al añadir el servicio a la reserva",
            });
        console.log(error);
    }
};