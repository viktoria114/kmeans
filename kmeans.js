// Generar puntos aleatorios dentro de un rango
function generarEntradasAleatorias(n = 20, minX = 0, maxX = 100, minY = 0, maxY = 10) {
  const puntos = [];
  for (let i = 0; i < n; i++) {
    const x = Math.floor(Math.random() * (maxX - minX) + minX);
    const y = Math.floor(Math.random() * (maxY - minY) + minY);
    puntos.push([x, y]);
  }
  return puntos;
}

function generarCentroideAleatorio(minX = 0, maxX = 100, minY = 0, maxY = 10) {
  const x = parseFloat((Math.random() * (maxX - minX) + minX).toFixed(2));
  const y = parseFloat((Math.random() * (maxY - minY) + minY).toFixed(2));
  return [x, y];
}


const entradas = [
  [-34.61315, -58.37723],
  [-31.4135, -64.18105],
  [-32.94682, -60.63932],
  [-38.00042, -57.5562],
  [-26.82414, -65.2226],
  [-24.7859, -65.41166],
  [-31.64881, -60.70868],
  [-27.36708, -55.89608],
  [-38.7176, -62.26545],
  [-27.46056, -58.98389],
  [-34.66536, -58.72744],
  [-34.72065, -58.25454],
  [-24.19457, -65.29712],
  [-27.79511, -64.26149],
  [-31.73271, -60.52897],
  [-38.95161, -68.0591],
  [-34.51541, -58.76813],
  [-26.18489, -58.17313],
  [-34.92145, -57.95453],
  [-34.76531, -58.21278],
  [-34.1266,-63.39111],
  [-26.7,-60.7333]
];


// Centroides iniciales(pueden ser aleatorios)
let centroide1 = [-26.37, -61.89];
let centroide2 = [-34.74, -60.33] ;

let iteracion = 0;

function mostrarMensaje(mensaje) {
  const infoPanel = document.getElementById("info");
  const nuevoParrafo = document.createElement("p");
  nuevoParrafo.textContent = mensaje;
  infoPanel.appendChild(nuevoParrafo);

  // Auto scroll hacia el final
  infoPanel.parentElement.scrollTop = infoPanel.parentElement.scrollHeight;
}

function DistanciaCentroide(cen, entr) {  //calcular distancia con pitagoras
  return Math.sqrt((entr[0] - cen[0]) ** 2 + (entr[1] - cen[1]) ** 2);
}

function asignarGrupos() {
  return entradas.map(entr => {  //para cada entrada se calcula la distancia
    const d1 = DistanciaCentroide(centroide1, entr);
    const d2 = DistanciaCentroide(centroide2, entr);
    return {   //devuelve "datos" en forma de x, y, grupo.
      x: entr[0],
      y: entr[1],
      grupo: d1 < d2 ? 1 : 2
    };
  });
}

function actualizarCentroides(datos) {  //usa los datos previos
  const grupo1 = datos.filter(entr => entr.grupo === 1);  //junta todas las entradas de grupo 1 y 2 por separado
  const grupo2 = datos.filter(entr => entr.grupo === 2);

  function promedio(grupo) {
    const totalX = grupo.reduce((count, entr) => count + entr.x, 0);  //suma con un contador por cada grupo el total en x y en y
    const totalY = grupo.reduce((count, entr) => count + entr.y, 0);
    return [
      parseFloat((totalX / grupo.length).toFixed(2)),   //divide en total en la cantidad de items en el array grupo. tmb lo acorta a 2 digitos decimales
      parseFloat((totalY / grupo.length).toFixed(2))
    ];
  }

  centroide1 = promedio(grupo1);  //asigna los nuevos valores de centroides con el promedio
  centroide2 = promedio(grupo2);

  mostrarMensaje(`🔄 Iteración ${iteracion}`);
  mostrarMensaje(`📍 Centroide 1: [${centroide1[0]}, ${centroide1[1]}]`);
  mostrarMensaje(`📍 Centroide 2: [${centroide2[0]}, ${centroide2[1]}]`);
}

function graficar(datos) {
  const grupo1 = datos.filter(p => p.grupo === 1);
  const grupo2 = datos.filter(p => p.grupo === 2);

  const ctx = document.getElementById("grafico").getContext("2d");
  if (window.grafico instanceof Chart) {
    window.grafico.destroy();
  }

  window.grafico = new Chart(ctx, {
    type: "scatter",
    data: {
      datasets: [
        {
          label: "Grupo 1",
          data: grupo1,
          backgroundColor: "lightblue",
          pointRadius: 6
        },
        {
          label: "Grupo 2",
          data: grupo2,
          backgroundColor: "pink",
          pointRadius: 6
        },
        {
          label: "Centroide 1",
          data: [{ x: centroide1[0], y: centroide1[1] }],
          backgroundColor: "blue",
          pointRadius: 8,
          pointStyle: 'rectRot'
        },
        {
          label: "Centroide 2",
          data: [{ x: centroide2[0], y: centroide2[1] }],
          backgroundColor: "red",
          pointRadius: 8,
          pointStyle: 'rectRot'
        }
      ]
    },
    options: {
      responsive: false,
      scales: {
  x: {
    title: { display: true, text: "Latitud" }
  },
  y: {
    title: { display: true, text: "Longitud" }
  }
},
      plugins: {
        legend: {
          labels: {
            color: "#000",
            font: { size: 14 }
          }
        }
      }
    }
  });
}

function iterarKMeans() {
  iteracion++;
  const datos = asignarGrupos();
  actualizarCentroides(datos);
  graficar(datos);
}

function reiniciarKMeans() {
  entradas.length = 0;
  const nuevas = generarEntradasAleatorias(20);
  nuevas.forEach(p => entradas.push(p));

  centroide1 = generarCentroideAleatorio();
  centroide2 = generarCentroideAleatorio();

  iteracion = 0;
  console.clear();
  iterarKMeans(); // primer paso automáticamente
}