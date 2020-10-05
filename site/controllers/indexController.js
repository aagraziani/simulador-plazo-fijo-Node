const fetch = require('node-fetch');

let controlador = {

    index: function (req, res) {

         fetch('http://localhost:3000/api/bancosTasas')

            .then(function(response){
                return response.json();
            })

            .then(function(jsonResponse){
                return res.render('index', { jsonResponse: jsonResponse.data });
            })

            .catch(function(error){
                console.error(error);
            })
            
        }
};


module.exports = controlador;