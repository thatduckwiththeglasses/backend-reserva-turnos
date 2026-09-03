import { Router } from "express";
import { serviceManager } from "../managers/index.js";

const routerServices = Router();

routerServices.get("/",async (req, res) => {
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
});

routerServices.get("/:id",async (req, res) => {
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
});

routerServices.post("/", async (req , res) => {
    const { name, description, duration, price, category, available } = req.body;

    if(!name || !description || !duration || !price || !category || available === undefined) {
        return res.status(400).json({
            status: "--ERROR--",
            message: "Faltan campos obligatorios"
        });
    }

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
});

routerServices.put("/:id", async (req, res) => {
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
})

routerServices.delete("/:id", async (req, res) => {
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
})

export default routerServices;
