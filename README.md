# Parcial_1
# Sistema de Gestión de Incidencias - TechSupport S.A.

API REST desarrollada con Node.js y Express para la administración de solicitudes de soporte técnico y reporte de incidencias internas dentro de la empresa.

---

## 📋 Información de la Evaluación
* **Asignatura:** Programación Web (Ciclo 02, 2026)
* **Evaluación:** Evaluación Práctica I (20%)
* **Tecnologías:** Node.js, Express, JavaScript (ES6)
* **Persistencia:** En memoria (Arreglos nativos de JavaScript)

---

## 📁 Estructura del Proyecto

```text
proyecto/
├── app.js                          # Servidor principal, middlewares y montaje de rutas
├── routes/
│   └── incidencias.js              # Definición de endpoints y métodos HTTP
├── controllers/
│   └── incidenciasController.js    # Lógica de negocio y manejo del arreglo en memoria
├── utils/
│   └── helpers.js                  # Funciones utilitarias (validaciones, cálculos, formato)
├── package.json                    # Dependencias y scripts del proyecto
└── README.md                       # Documentación del proyecto

---
## Inicializar el proyecto
# 1. Inicializar el paquete de Node.js
npm init -y

# 2. Instalar Express (única tecnología externa permitida)
npm install express

-- Esto ya esta creado
# 3. Crear la estructura de carpetas sugerida
mkdir routes controllers utils

# 4. Crear los archivos base
touch app.js routes/incidencias.js controllers/incidenciasController.js utils/helpers.js README.md



---

## 🔀 Flujo de Trabajo Colaborativo (GitFlow)

Para asegurar la trazabilidad de los commits de cada integrante del equipo, se utiliza el modelo simplificado de GitFlow[cite: 1]. **Queda prohibido realizar commits directos sobre la rama `main`**.

### 1. Estructura de Ramas
* **`main`**: Rama de producción con código 100% estable y funcional[cite: 1].
* **`develop`**: Rama base de integración común donde confluyen las funcionalidades terminadas.
* **`feature/<nombre-funcionalidad>`**: Ramas de trabajo temporal para cada módulo o endpoint.

---

### 2. Convención de Ramas por Funcionalidad
Cada integrante del equipo debe crear su propia rama para trabajar la tarea asignada[cite: 1]:
* `feature/registro-incidencias` (POST /incidencias)
* `feature/listar-buscar` (GET /incidencias, GET /incidencias/:id)
* `feature/cambio-estado` (PUT /incidencias/:id/estado)
* `feature/eliminar-incidencia` (DELETE /incidencias/:id)
* `feature/estadisticas-clasificacion` (GET /estadisticas, GET /clasificacion)

---

### 3. Guía Paso a Paso para Integrantes

#### Paso 1: Obtener la última versión de `develop`
```bash
git checkout develop
git pull origin develop

#### Paso 2: Crear la rama para la funcionalidad asignada
git checkout -b feature/<nombre-de-tu-tarea>

#### Paso 3: Realizar cambios y registrar commits claros
git add .
git commit -m "feat: implementar validaciones con trim y switch en registro"

#### Paso 4: Subir la rama al repositorio remoto
git push origin feature/<nombre-de-tu-tarea>


##### 4. Publicación Final en main
git checkout main
git pull origin main
git merge develop
git push origin main


### Instalar el nodemon
npm install --save-dev nodemon

### Corremos el programa con
npm run dev