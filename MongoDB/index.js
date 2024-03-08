const express = require('express');
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://manutorres9312:Wwl9ejoe1FicGqTV@db-ejemplo-01.elrgq55.mongodb.net/')
const db= mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log('Connected to MongoDB');

    userSchema= mongoose.Schema({
        nombres: String,
        apellidos:String,
        empresa_id: Number //necesito especificar el campo para poder hacer la consulta que pide más abajo.
    })

    companiesSchema= mongoose.Schema({
        nombres: String,
        ciudad: String,
    })


    const User = mongoose.model('Usuarios', userSchema);
    const Company = mongoose.model('Empresas', companiesSchema);

    const app = express();
    app.use(express.json());

    /* TRaigo todos los usuarios de la bd */

    app.get('/api/usuarios',async (req, res) => {
    const users= await User.find()
    res.json(users);
    });


    /* Listo solo 10 usuarios */
    app.get('/api/usuarios/limit',async (req, res) => {
        const users= await User.find().limit(10);
        res.json(users);
        });

    /* Listado de usuarios de empreda id 5 */
    app.get('/api/usuarios/empresas/:id', async (req, res) => {
        // Obtiene el valor del parámetro 'id' de la ruta
        const empresaId = req.params.id;
    
        // Realiza la consulta con la condición de empresa
        const users = await User.find({ empresa_id: empresaId });
        res.json(users);
    });

          /* Listado de usuarios de un país específico */
          app.get('/api/usuarios/country/:country', async (req, res) => {
            // Obtiene el valor del parámetro 'country' de la ruta
                const country = req.params.country;
        
            // Realiza la consulta con la condición de país
                const users = await User.find({ pais: country });
                res.json(users);
            });

  

    /*Traigo todas las empresas de la bd  */

    app.get('/api/empresas',async (req, res) => {
        const companies= await Company.find()
        res.json(companies);
        });

    /* Listado de empresas de la ciudad de xxx */

    app.get('/api/empresas/city/:city', async (req, res) => {
        // Obtiene el valor del parámetro 'id' de la ruta
        const city = req.params.city;
    
        // Realiza la consulta con la condición de empresa
        const companies = await Company.find({ ciudad: city });
        res.json(companies);
    });

    app.listen(3000, function(){
    console.log('server arriba');
})


});

