import fs from "node:fs/promises";
import crypto from "crypto";

export class BookingDao {

    constructor(path, servicePath) {
        this.path = path;
        this.servicePath = servicePath;
    }

    async #readAll() {
                try {
                    const data = await fs.readFile(this.path, 'utf-8');
        
                    return JSON.parse(data);
                } catch (error){
                    return [];
                }
    };
    
    async #writeAll(bookingsData) {
            const data = JSON.stringify(bookingsData, null, 2)
            await fs.writeFile(this.path, data,`utf-8`);
    };

    async getAll(){
        return this.#readAll();
    };
    
    async create(data) {
        const bookings = await this.getAll();
        const ids = bookings.map((bookings) => bookings.id);

        const newBooking = {
            id: ids.length ? Math.max(...ids) + 1 : 1,
            ...data,
        };

        bookings.push(newBooking);

        await this.#writeAll(bookings);

        return newBooking;
    };
    
    async getById(bookingId) {
        const data = await this.getAll();
        return data.find((booking) => booking.id === Number(bookingId));
    };

    async edit(id, data) {
        const bookings = await this.getAll();

        const bookingIndex = bookings.findIndex((booking) => booking.id === id);

        if(bookingIndex === -1){
            return null
        };

        const updateService = {
                ...bookings[bookingIndex],
                ...data,
                id: bookings[bookingIndex].id
        };

        bookings[bookingIndex] = updateService;

        await this.#writeAll(bookings);

        return updateService;
    };
}