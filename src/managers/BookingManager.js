import fs from "node:fs/promises";
import { generateId } from "./index.js";
import ServiceManager from "./ServiceManager.js";

export class BookingManager {

    constructor(path,servicePath){
        this.path = path;
        this.servicePath = servicePath;
    };

    async readBookings() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');

            return JSON.parse(data);
        } catch (error){
            if (error.code === "ENOENT"){
                return [];
            } else {
                return {
                    status: "ERROR",
                    message: "No se pudo leer el archivo"
                };
            }
        }
    };
    
    async writeBookings(bookings) {
        const data = JSON.stringify(bookings, null, 2);
        await fs.writeFile(this.path, data,`utf-8`);
    };

    async getBookings(){
        const bookings = await this.readBookings();

        return bookings;
    }

    async getBookingById(id){
        
        const bookings = await this.readBookings();

        const booking = bookings.find((booking) => booking.id === Number(id));

        if(!booking){
            return null;
        }
        
        return booking;
    };
        
    async createBooking(bookingData){
       const bookings = await this.readBookings();

       const newBooking = {
           id: generateId(bookings),
           ...bookingData,
           services: [],
       };

       bookings.push(newBooking);

       await this.writeBookings(bookings);

       return newBooking;
    };

    async updateBooking(id, bookingData){
        const bookings = await this.readBookings();

        const bookingIndex = bookings.map((booking) => booking.id === Number(id))

        if(bookingIndex === -1){
            return null
        }

        const updateBooking = {
            ...bookings[bookingIndex],
            ...bookingData,
            id: bookings[bookingIndex].id
        };

        bookings[bookingIndex] = updateBooking;

        await this.writeBookings(bookings);

        return updateBooking;
    };

    async addServiceToBooking(bookingId,serviceId){

        let booking = await this.getBookingById(bookingId);
        let addservice = await ServiceManager(this.servicePath).getServiceById(serviceId);

        if (!booking || !addservice){
            return null
        }

        if (booking.services.map((service) => service.id === Number(serviceId))){
            booking.services.push({
                service: addservice.id,
                quantity: Number(quantity + 1)
            })
        } else {
            booking.services.push({
                service: addservice.id,
                quantity: 1
            })
        }

        await this.updateBooking(booking);

    };
}

export default BookingManager;