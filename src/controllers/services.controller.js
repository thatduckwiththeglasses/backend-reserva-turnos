import { servicesService } from "../dependencies/index.js";

function sendError(res, error, fallbackMessage) {
    const statusCode = error.statusCode ?? 500;

    if (statusCode === 500) console.log(error)
        return res.status(statusCode).json({
            status: "ERROR",
            message: statusCode === 500 ? fallbackMessage : error.message,
        })
}

export const getAllServices = async (req, res)  => {
    try{

        const services = await servicesService.getServices(req.query);

        return res.status(200).json({
                status: "sucess",
                count: services.length,
                payload: services,
            });
    } catch(error) {
        return sendError(res,error, "no se pudieron leer los servicios")
    }
};

export const getService = async (req, res) => {
    try{
        const { id } = req.params;

        const service = await servicesService.getServiceById(Number(id));

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
        return sendError(res, error, "No se pudo obtener el servicio");
    }
};

export const createService = async (req , res) => {
    try{
        const newService = await servicesService.createService(req.body);

        res.status(201).json({
            status: "success",
            payload: newService,
        });
    } catch(error) {
        return sendError(res, error, "No se pudo crear el servicio");
    }
};

export const editService = async (req, res) => {
    try{
        const { id } = req.params;

        const updateService = await servicesService.editService(Number(id),req.body);

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
        return sendError(res, error, "No se pudo actualizar el servicio");
    }
};

export const removeService = async (req, res) => {
    try{
        const { id } = req.params;
        const deletedService = await servicesService.deleteService(Number(id));

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
       return sendError(res, error, "No se pudo eliminar el servicio")
    }
}