#📌 kmeans

K‑Means es una implementación del algoritmo de agrupamiento no supervisado en JavaScript, con visualización interactiva en navegador.

- Dataset precargado: edades de clientes y entradas vendidas (visto en clase)
- Posibilidad de generar datos aleatorios
- Centroides fijos: siempre se agrupan en 2 clusters
- Visualización dinámica del agrupamiento con colores y movimiento de centroides
- Panel informativo con resultados y cálculos
- Recursos gráficos realizados con Chart.js

**Tecnologias utilizadas**
- JavaScript
- HTML5 y CSS3
- Chart.js

 **Cómo Instalar y Usar**
  
1. Clonar el repositorio: git clone https://github.com/viktoria114/kmeans.git
cd kmeans

2. Instalar dependencias: npm install

3. Abrir index.html con Live Server desde VS Code (clic derecho → Open with Live Server)

**Estructura del proyecto**
- node_modules
- .gitignore
- index.html
- kmeans.js
- package.json
- package-lock.json

**Próximos pasos**
- Permitir al usuario cargar su propio archivo CSV
- Añadir métricas como la suma de distancias intra-cluster
- Selección dinámica del número de centroides
