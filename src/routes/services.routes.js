import { Router } from "express";
import { services } from "../data/services.js";

const routerServices = Router();

routerServices.get("/",(req, res) => {
    
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
   
});

routerServices.get("/:id",(req, res) => {
    const { id } = req.params;

    const service = services.find((service) => service.id === Number(id));

    if (!service){
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

routerServices.post("/",(req , res) => {
    const { name, description, duration, price, category, available } = req.body;

    if(!name || !description || !duration || !price || !category) {
        return res.status(400).json({
            status: "--ERROR--",
            message: "Faltan campos obligatorios"
        });
    }

    const newService = {
        id: services.length + 1,
        name,
        description,
        price,
        category,
        available: available ?? true
    };

    services.push(newService);

    res.status(201).json({
        status: "success",
        payload: newService,
    });
});

routerServices.put("/:id",(req, res) => {
    const { id } = req.params;
    const serviceIndex = services.findIndex((service) => service.id === Number(id));

    if(serviceIndex === -1){
        return res.status(404).json({
            status: "--ERROR--",
            message: "Servicio no encontrado"
        })
    };

    const updateService = {
        ...services[serviceIndex],
        ...req.body,
        id: services[serviceIndex].id
    };

    services[serviceIndex] = updateService;

    res.status(200).json({
        status: "success",
        payload: updateService
    });
})

routerServices.delete("/:id", (req, res) => {
    const { id } = req.params;
    const serviceIndex = services.findIndex((service) => service.id === Number(id));

    if(serviceIndex === -1){
        return res.status(404).json({
            status: "--ERROR--",
            message: "Servicio no encontrado"
        })
    }

    const deletedService = services.splice(serviceIndex,1);
    res.status(200).json({
        status: "success",
        payload: deletedService[0]
    });
})

export default routerServices;
