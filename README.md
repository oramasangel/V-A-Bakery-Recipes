# 🍰 V&A Bakery - Recetas e Inventario

Aplicación web desarrollada con Node.js para gestionar recetas de cocina y llevar control de inventario. Ideal para panaderías, restaurantes o cualquier negocio gastronómico.

## 🌟 Características

### Módulo de Recetas
- ✅ Subir y gestionar recetas de diferentes categorías (Panadería, Postres, Comida, Bebidas, Otros)
- 📸 Soporte para imágenes de recetas
- 📝 Ingredientes e instrucciones detalladas
- ⏱️ Información de tiempo de preparación y porciones
- 🔍 Búsqueda y filtrado por categoría
- ✏️ Editar y eliminar recetas

### Módulo de Inventario
- 📦 Gestión completa de inventario
- 💰 Control de precios y proveedores
- 📊 Resumen con totales de items y valores
- 🏷️ Categorización de items (Ingredientes, Utensilios, Empaques, Otros)
- 🔍 Búsqueda y filtrado
- ✏️ Editar y eliminar items

## 🚀 Instalación

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Instalación local

1. Clonar el repositorio:
```bash
git clone https://github.com/oramasangel/V-A-Bakery-Recipes.git
cd V-A-Bakery-Recipes
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor:
```bash
npm start
```

4. Abrir en el navegador:
```
http://localhost:3000
```

## 📦 Despliegue

### Heroku

1. Crear una cuenta en [Heroku](https://www.heroku.com/)

2. Instalar Heroku CLI:
```bash
npm install -g heroku
```

3. Iniciar sesión:
```bash
heroku login
```

4. Crear una nueva aplicación:
```bash
heroku create nombre-de-tu-app
```

5. Desplegar:
```bash
git push heroku main
```

6. Abrir la aplicación:
```bash
heroku open
```

### Variables de Entorno

La aplicación utiliza las siguientes variables de entorno:
- `PORT`: Puerto del servidor (por defecto: 3000)

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js**: Entorno de ejecución
- **Express**: Framework web
- **Multer**: Manejo de archivos (imágenes)
- **Body-parser**: Procesamiento de datos
- **CORS**: Cross-Origin Resource Sharing

### Frontend
- **HTML5**: Estructura
- **CSS3**: Estilos (diseño responsivo)
- **JavaScript**: Lógica del cliente
- **Fetch API**: Comunicación con el servidor

### Almacenamiento
- **JSON Files**: Almacenamiento de datos (recipes.json, inventory.json)
- **File System**: Almacenamiento de imágenes

## 📁 Estructura del Proyecto

```
V-A-Bakery-Recipes/
├── server.js              # Servidor Express
├── package.json           # Dependencias y scripts
├── Procfile              # Configuración para Heroku
├── public/               # Archivos estáticos
│   ├── index.html       # Página principal
│   ├── css/
│   │   └── styles.css   # Estilos
│   └── js/
│       └── app.js       # Lógica del frontend
├── data/                # Datos de la aplicación (JSON)
│   ├── recipes.json     # Recetas
│   └── inventory.json   # Inventario
└── uploads/             # Imágenes subidas
```

## 🔧 API Endpoints

### Recetas

- `GET /api/recipes` - Obtener todas las recetas
- `GET /api/recipes/:id` - Obtener una receta específica
- `POST /api/recipes` - Crear nueva receta
- `PUT /api/recipes/:id` - Actualizar receta
- `DELETE /api/recipes/:id` - Eliminar receta

### Inventario

- `GET /api/inventory` - Obtener todo el inventario
- `GET /api/inventory/:id` - Obtener un item específico
- `POST /api/inventory` - Crear nuevo item
- `PUT /api/inventory/:id` - Actualizar item
- `DELETE /api/inventory/:id` - Eliminar item

## 🎨 Uso de la Aplicación

### Gestión de Recetas

1. **Agregar Receta**: 
   - Clic en "Nueva Receta"
   - Completar el formulario (nombre, categoría, ingredientes, instrucciones)
   - Opcionalmente subir una imagen
   - Guardar

2. **Ver Receta**: 
   - Clic en cualquier tarjeta de receta para ver detalles completos

3. **Editar/Eliminar**: 
   - Usar los botones de acción en cada tarjeta

### Gestión de Inventario

1. **Agregar Item**:
   - Clic en "Nuevo Item"
   - Completar información (nombre, cantidad, precio, proveedor)
   - Guardar

2. **Ver Resumen**:
   - El dashboard muestra total de items y valor del inventario

3. **Editar/Eliminar**:
   - Usar los botones de acción en cada fila

## 📱 Responsivo

La aplicación está optimizada para:
- 💻 Computadoras de escritorio
- 💻 Laptops
- 📱 Tablets
- 📱 Teléfonos móviles

## 🔒 Seguridad

- ✅ Validación de archivos (solo imágenes)
- ✅ Límite de tamaño de archivo (5MB)
- ✅ Sanitización de datos
- ✅ Uso de versiones seguras de dependencias

## 📝 Licencia

ISC

## 👥 Autor

V&A Bakery Team

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.
