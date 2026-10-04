import { ServiceModel } from "../../data/models/service.model.js";

export class ServicesMongoDao {
    async getAll(category, maxPrice, limit, page){
        return ServiceModel.paginate({
            ...( category && { category } ),
            ...( maxPrice && { price: { $lte: Number(maxPrice) } } )
        },{ limit, page, lean: true });
    };

    async getById(id){
        return ServiceModel.findById(id);
    }

    async create(data) {
        return ServiceModel.create(data);
    }

    async edit(id,data){
        return ServiceModel.findByIdAndUpdate(id,data);
    }

    async delete(id){
        return ServiceModel.findByIdAndDelete(id);
    }

    async reserveCapacity(id, quantity){
        return ServiceModel.findOneAndUpdate(
            {
                _id: id,
                available: true,
                $expr: {
                    $lte: [{ $add: ["$reserved", quantity]}, "$capacity"]
                },
            },
            { $inc: {reserved: quantity}},
            {new: true}
        )
    }

    async releaseCapacity(id, quantity){
        return ServiceModel.findOneAndUpdate(
            {
                _id: id,
                $expr: {
                    $gte: ["$reserved", quantity]
                },
            },
            { $inc: {reserved: - quantity}},
            {new: true}
        )
    }
}