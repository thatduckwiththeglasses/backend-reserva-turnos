--- Sistema de reserva de turnos: ---

# Descripcion:
Simple sistema de reserva de turnos de diversos servicios

Se puede
    crear un servicio, ver los servicios, actualizar un servicio y eliminar un servicio, crear una reserva, reservar un servicio, actualizar una reserva y eliminar una reserva



# Instrucciones:

#1 Como instalar (en Visual Studio Code):
    se deben instalar las sig. dependencias
        -   1. Node.js:
                'npm install node'
        -   2.dotenv:
                'npm install dotenv'
        -   3.express:
                'npm install express'

#2 Como ejecutar (en VSC):
    por ahora se debe ejecutar con el sig. comando
        'npm run dev'

#3 Variables de entorno:
    hay 2 
    - PORT siendo la variable que indica que puerto se utilizara para el servidor 
    - NODE_ENV que define el tipo de entrono al ejecutar el servidor 
    
    Existe un archivo de ejemplo

#4 Descripcion de recursos:
#    1.Services:
        id: valor irrepetible para identificar los servicios; tipo int
        title: titulo del servicio; tipo string
        description: descripcion del servicio; tipo string
        duration: tiempo que dura el servicio (en horas); tipo int
        price: precio del servicio; tipo int
        available: disponibilidad del servicio; tipo boolean

#    2.Bookings:
        id: valor para identificar las reservas; tipo int
        clientName: Nombre del cliente con reserva; tipo string
        clientEmail: Email del cliente; tipo string
        date: fecha establecida de la reserva (dd/mm/aaaa); tipo string
        time: hora de la reserva; tipo string
        services: lista de servicios reservados; tipo array
            service: id del servicio reservado; tipo int
            quantity: cantidad de instancias del servicio; tipo int

    