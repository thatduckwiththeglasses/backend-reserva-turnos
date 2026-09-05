import { serviceManager } from "../managers/index.js";

export const getAllServices = async (req, res)  => {
    try{
        const services = await serviceManager.getServices();

        const { category, price , available } = req.query;

        let filteredServices = services

        if(category) {
            filteredServices = filteredServices.filter(
                (service) => service.category.toLocaleLowerCase() === category.toLocaleLowerCase()
            );
        };

        if(price) {
            filteredServices = filteredServices.filter(
                (service) => service.price === Number(price)
            );
        };

        if(available) {
            filteredServices = filteredServices.filter(
                (service) => service.available === (available === 'true')
            );
        };

        if (filteredServices.length === 0){
            res.status(404).json({
            status: "---ERROR---",
            message: "No se encontraron resultados en base a tus filtros",
            });
        } else { 
            res.status(200).json({
                status: "sucess",
                count: filteredServices.length,
                payload: filteredServices,
            });
        }
    } catch(error) {
        console.log(error)
    }
};

export const getService = async (req, res) => {
    try{
        const { id } = req.params;

        const service = await serviceManager.getServiceById(id);

        if (service === null){
            res.status(404).json({
            status: "---ERROR---",
            message: "No se encontro el servicio",
            });
        } else { 
            res.status(200).json({
                status: "sucess",
                payload: service,
            });
        }
    } catch(error){
        res.status(500).json({
            status: "---ERROR---",
            message: "Error al obtener el servicio",
            });
    }
};

export const createService = async (req , res) => {
    const { name, description, duration, price, category, available } = req.body;

    if(!name || !description || !duration || !price || !category || available === undefined) {
        return res.status(400).json({
            status: "--ERROR--",
            message: "Faltan campos obligatorios"
        });
    }

    try{
        const newService = await serviceManager.addService({
            name,
            description,
            duration,
            price,
            category,
            available,
        });


        res.status(201).json({
            status: "success",
            payload: newService,
        });
    } catch(error) {
        res.status(500).json({
            status: "---ERROR---",
            message: "Error al crear el servicio",
            });
    }
};

export const editService = async (req, res) => {
    try{
        const { id } = req.params;
        const updateService = await serviceManager.updateService(id,req.body);

        if(updateService === null){
            return res.status(404).json({
                status: "--ERROR--",
                message: "Servicio no encontrado"
            })
        };

        res.status(200).json({
            status: "success",
            payload: updateService
        });
    } catch(error) {
        res.status(500).json({
            status: "---ERROR---",
            message: "Error al editar el servicio",
            });
    }
};

export const removeService = async (req, res) => {
    try{
        const { id } = req.params;
        const deletedService = await serviceManager.deleteService(id);

        if(deletedService === null){
            return res.status(404).json({
                status: "--ERROR--",
                message: "Servicio no encontrado"
            })
        };

        res.status(200).json({
            status: "success",
            payload: deletedService
        });
    } catch(error) {
        res.status(500).json({
            status: "---ERROR---",
            message: "Error al eliminar el servicio",
            });
    }
}