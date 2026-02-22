
const contenedor = document.getElementById('container');

// Endpoints
const endpoints = [
    {id: 'conductores', nombre: 'Buscar Conductores', url: '/conductores'},
    {id: 'automoviles', nombre: 'Buscar Automóviles', url: '/automoviles'},
     {id: 'autoSinConductor', nombre: 'Conductores sin auto', url: '/conductoressinauto?edad=49'},
    {id: 'solitos', nombre: 'Buscar Solitos', url: '/solitos'},
    {id: 'auto', nombre: 'Buscar Auto por Patente', url: '/auto', input: true}
];

// Función para mostrar datos como listas con propiedades
function mostrarDatos(url, resultadoDiv, params = {}) {
    resultadoDiv.textContent = 'Cargando...';

    const qs = new URLSearchParams(params).toString();
    const fetchUrl = qs ? `${url}?${qs}` : url;

    fetch(fetchUrl)
        .then(res => res.json())
        .then(data => {
            resultadoDiv.textContent = '';

            if (Array.isArray(data)) {
                data.forEach(item => {
                    const divItem = document.createElement('div');
                    divItem.className = 'cards-item';
                    for (const key in item) {
                        const p = document.createElement('p');
                        p.textContent = `${formatoTexto(key)}: ${item[key]}`;
                        divItem.appendChild(p);
                    }
                    resultadoDiv.appendChild(divItem);
                });
            } else {
                // Objetos con arrays internos (/solitos)
                for (const key in data) {
                    const grupo = document.createElement('div');
                    const titulo = document.createElement('strong');
                    titulo.textContent = formatoTexto(key) + ':';
                    titulo.classList.add('titulo-grupo');
                    grupo.appendChild(titulo);

                    data[key].forEach(item => {
                        const divItem = document.createElement('div');
                        divItem.className = 'cards-item';
                        for (const k in item) {
                            const p = document.createElement('p');
                            p.textContent = `${formatoTexto(k)}: ${item[k]}`;
                            divItem.appendChild(p);
                        }
                        grupo.appendChild(divItem);
                    });

                    resultadoDiv.appendChild(grupo);
                }
            }
        })
        .catch(err => {
            resultadoDiv.textContent = 'Error, patente no registrada.';
            console.error(err);
        });
}

// Crear tarjetas dinámicas
endpoints.forEach(ep => {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'cards';

    const titulo = document.createElement('h2');
    titulo.textContent = ep.nombre;
    tarjeta.appendChild(titulo);

    let input;
    if (ep.input) {
        input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Ej: HLSA26 ';
        tarjeta.appendChild(input);
    }

    const boton = document.createElement('button');
    boton.textContent = ep.input ? 'Buscar' : 'Buscar';
    tarjeta.appendChild(boton);

    const resultado = document.createElement('div');
    resultado.className = 'result';
    tarjeta.appendChild(resultado);

    boton.addEventListener('click', () => {
        if (ep.input) {
            const valor = input.value.trim();
            if (!valor) {
                resultado.textContent = 'Ingresa un valor';
                return;
            }
            mostrarDatos(ep.url, resultado, {patente: valor});
        } else {
            mostrarDatos(ep.url, resultado);
        }
    });

    // Evento input para búsqueda parcial en tiempo real
    if (ep.input) {
        input.addEventListener('input', () => {
            const valor = input.value.trim();
            if (valor.length >= 2) { // al escribir 2 o más letras
                mostrarDatos(ep.url, resultado, { patente: valor });
            } else {
                resultado.textContent = ''; // limpia resultado
            }
        });
    }


    contenedor.appendChild(tarjeta);
});


function formatoTexto(texto) {
      const excepciones = [ 'sin']; //se mantiene sin mayuscula
    return texto
        .replace(/_/g, ' ')                 // reemplaza _ por espacio
        .toLowerCase()                     // todo a minúscula primero
        .split(' ')
        .map(word => excepciones.includes(word) ? word : word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

