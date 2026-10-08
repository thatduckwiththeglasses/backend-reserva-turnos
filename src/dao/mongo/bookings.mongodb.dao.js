import { BookingModel } from "../../data/models/booking.model.js";

export class BookingsMongoDao {
    
    async getById(id, { populate = false } = {}){
        const query = BookingModel.findById(id);
        
        if (populate) {
            query.populate('services.service');
        }

        return query.lean();
    }

    async create(data){
        return BookingModel.create(data);
    }

    async edit(id, data){
        return BookingModel.findByIdAndUpdate(id,data);
    }

    async delete(id) {
        return BookingModel.findByIdAndDelete(id).lean();
    }

    async getReport(){
        return BookingModel.find().lean();
    }
}