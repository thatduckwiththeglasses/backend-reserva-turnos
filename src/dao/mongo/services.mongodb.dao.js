import { ServiceModel } from "../../data/models/service.model.js";

export class ServicesMongoDao {
    async getAll(){
        return ServiceModel.find();
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
}