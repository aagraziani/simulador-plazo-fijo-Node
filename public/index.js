window.addEventListener('load', function () {


    const formulario = document.getElementById('formulario');
    const monto = document.getElementById('monto');
    const desplegable = document.getElementById('desplegable');
    const invalidMonto = document.querySelector('div.is-invalid-monto');
    const invalidDias = document.querySelector('div.is-invalid-dias');
    const feedbackMonto = document.querySelector('p.feedback-monto');
    const feedbackBanco = document.querySelector('p.feedback-banco');
    const feedbackPlazo = document.querySelector('p.feedback-plazo');
    const dias = document.getElementById('dias');
    const reset = document.getElementById('reset');
    const texto = document.getElementById('texto');

    /* resultado */
    const resultado = document.querySelector('div.resultado');
    const capitalInvertido = document.getElementById('capital');
    const tna = document.getElementById('tna');
    const interesGanado = document.getElementById('interes-ganado');
    const capitalTotal = document.getElementById('capital-total');
    const cantidadDias = document.getElementById('cantidad-dias');


    fetch('http://localhost:3000/api/bancosTasas')

        .then(function (response) {
            return response.json();
        })

        .then(function (jsonResponse) {
            
            //console.log(jsonResponse);
            
            for (let i = 0; i < jsonResponse.data.length; i++) {
                if (jsonResponse.data[i] != '') {
                    desplegable.innerHTML += "<option value=" + jsonResponse.data.indexOf(jsonResponse.data[i]) + ">" + jsonResponse.data[i][0] + "</option>";
                }
            }


            invalidMonto.style.display = 'none';
            invalidDias.style.display = 'none';


            new AutoNumeric('#monto', {
                currencySymbol: "$",
                decimalCharacter: ",",
                digitGroupSeparator: ".",
                unformatOnSubmit: true
            });


            formulario.onsubmit = function (event) {

                event.preventDefault();

                let capital = monto.value;

                let plazo = dias.value;

                let banco = desplegable.value;

                if (desplegable.value == '') {

                    feedbackBanco.innerHTML = "Debe seleccionar un banco";
                    feedbackBanco.style.color = 'red';

                } else if (capital === '') {

                    invalidMonto.style.display = "block";
                    feedbackMonto.innerHTML = "El monto no puede estar vacío";
                    feedbackMonto.style.color = 'red';

                } else if (plazo < 30 || plazo > 365) {

                    invalidDias.style.display = "block";
                    feedbackPlazo.innerHTML = "El plazo debe ser mayor a 30 dias y menor a 365";
                    feedbackPlazo.style.color = 'red';

                } else {

                    formulario.classList.add('hide');
                    resultado.classList.remove('hide');
                    capitalInvertido.innerHTML += `$${capital}`;
                    cantidadDias.innerHTML += `${plazo} días`;
                    tna.innerHTML += jsonResponse.data[banco][2];
                    interesGanado.innerHTML += "$" + gananciaPlazoFijo(capital);
                    capitalTotal.innerHTML += "$" + gananciaTotal();
                };

                
                function interesAnual(capital) {
                    return ((parseFloat(jsonResponse.data[banco][2]) * capital) / 100).toFixed(2);
                };

                function gananciaPlazoFijo(capital) {
                    return (interesAnual(capital) / 365 * plazo).toFixed(2);
                };

                function gananciaTotal() {
                    return (+capital + +gananciaPlazoFijo(capital)).toFixed(2);
                };

            };
        });

    reset.onclick = function () {
        location.reload();
    };


});