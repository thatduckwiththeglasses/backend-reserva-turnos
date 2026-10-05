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
        return BookingModel.aggregate([
            {
                $unwind: "$services"
            },
            {
                $lookup: {
                    from: "services",
                    localField: "services.service",
                    foreignField: "_id",
                    as: "serviceData"
                }
            },
            {
                $project: {
                    _id: 0,
                    booking: "$_id",
                    clientName: 1,
                    serviceId: "$services.service",
                    serviceName: "$serviceData.name",
                    quantity: "$services.quantity",
                    capacity: "$serviceData.capacity",
                    reserved: "$serviceData.reserved"
                }
            },
            {
                $sort: {
                    serviceName: 1,
                    clientName: 1
                }
            }
        ])
    }
}