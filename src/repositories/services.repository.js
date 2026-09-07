
export class ServicesRepository {
    constructor(dao) {
        this.dao = dao;
    };

    getAll() {
        return this.dao.getAll();
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
}