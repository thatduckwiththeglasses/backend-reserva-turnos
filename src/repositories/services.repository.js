
export class ServicesRepository {
    constructor(dao) {
        this.dao = dao;
    };

    getAll(category, maxPrice, limit, page) {
        return this.dao.getAll(category, maxPrice, limit, page);
    };

    getById(id) {
        return this.dao.getById(id);
    };

    create(data) {
        return this.dao.create(data);
    };

    edit(id,data){
        return this.dao.edit(id,data);
    };

    delete(id) {
        return this.dao.delete(id);
    };

    reserveCapacity(id, quantity){
        return this.dao.reserveCapacity(id,quantity)
    }

    releaseCapacity(id, quantity){
        return this.dao.releaseCapacity(id,quantity)
    }
    
}