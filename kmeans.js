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


const entradas = [ //entradas del profe
  [40, 1], [30, 2], [25, 3], [28, 2], [29, 4],
  [18, 10], [10, 1], [71, 5], [18, 4], [38, 2],
  [73, 6], [72, 3], [79, 5], [86, 2], [24, 1], [19, 5]
];

// Centroides iniciales(pueden ser aleatorios)
let centroide1 = [35, 4];
let centroide2 = [18, 10];

let iteracion = 0;

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

  console.log(`🔄 Iteración ${iteracion}`);
  console.log(`📍 Centroide 1: [${centroide1[0]}, ${centroide1[1]}]`);
  console.log(`📍 Centroide 2: [${centroide2[0]}, ${centroide2[1]}]`);
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
        x: { title: { display: true, text: "X" }, min: 0, max: 100 },
        y: { title: { display: true, text: "Y" }, min: 0, max: 12 }
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