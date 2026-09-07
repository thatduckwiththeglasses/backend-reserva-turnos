import { BookingModel } from "../../data/models/booking.model.js";

export class BookingsMongoDao {
    async getById(id){
        return BookingModel.findById(id);
    }

    async create(data){
        return BookingModel.create(data);
    }

    async edit(id, data){
        return BookingModel.findByIdAndUpdate(id,data);
    }
}