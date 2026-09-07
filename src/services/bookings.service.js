export class BookingsService {
    constructor(repository){
        this.repository = repository;
    }

    async createBooking(data) {
        const { clientName, clientEmail, date, time, status, services } = data;

        if(!clientName || !clientEmail || !date || !time || !status || !services) {
            return res.status(400).json({
                status: "--ERROR--",
                message: "Faltan campos obligatorios"
            });
        };

        return await this.repository.create(data);
    };

    async getBooking(id) {
        const booking = await this.repository.getById(id);

        if(!booking) throw new Error("Reserva no encontrada");
               
        return booking;
    };

    async bookService(id,sid){
        const updateBooking = await this.repository.addService(id,sid);

        if(updateBooking === -1) throw new Error("Reserva no encontrada");
        
        if(!updateBooking) throw new Error("Servicio no encontrado");
        
        return updateBooking;
    }
}