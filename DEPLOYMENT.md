# 🚀 Guía de Despliegue - V&A Bakery

## Despliegue en Heroku

### Prerrequisitos
1. Cuenta en [Heroku](https://www.heroku.com/)
2. [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) instalado
3. Git instalado

### Pasos para Desplegar

#### 1. Preparar el Repositorio
```bash
# Clonar el repositorio
git clone https://github.com/oramasangel/V-A-Bakery-Recipes.git
cd V-A-Bakery-Recipes

# Instalar dependencias localmente (opcional, para probar)
npm install
npm start
```

#### 2. Iniciar Sesión en Heroku
```bash
heroku login
```

#### 3. Crear Aplicación en Heroku
```bash
# Crear nueva aplicación (el nombre debe ser único)
heroku create v-a-bakery-recipes

# O con un nombre personalizado
heroku create tu-nombre-personalizado
```

#### 4. Desplegar a Heroku
```bash
# Asegurarse de estar en la rama principal
git checkout main

# Desplegar
git push heroku main

# O si estás en una rama diferente
git push heroku your-branch:main
```

#### 5. Abrir la Aplicación
```bash
heroku open
```

### Verificar el Despliegue

```bash
# Ver logs en tiempo real
heroku logs --tail

# Ver estado de la aplicación
heroku ps

# Reiniciar la aplicación
heroku restart
```

## Despliegue en Otros Servicios

### Railway.app

1. Visita [Railway.app](https://railway.app/)
2. Conecta tu cuenta de GitHub
3. Selecciona el repositorio V-A-Bakery-Recipes
4. Railway detectará automáticamente que es una app Node.js
5. La aplicación se desplegará automáticamente

### Render.com

1. Visita [Render.com](https://render.com/)
2. Crea una nueva "Web Service"
3. Conecta tu repositorio de GitHub
4. Configuración:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Haz clic en "Create Web Service"

### Fly.io

1. Instala Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Inicia sesión: `fly auth login`
3. En el directorio del proyecto: `fly launch`
4. Sigue las instrucciones en pantalla
5. Despliega: `fly deploy`

## Variables de Entorno

La aplicación utiliza las siguientes variables de entorno opcionales:

- `PORT`: Puerto del servidor (Heroku lo asigna automáticamente)

Para configurar en Heroku:
```bash
heroku config:set VARIABLE_NAME=value
```

## Almacenamiento de Datos

⚠️ **IMPORTANTE**: La aplicación actualmente usa almacenamiento en archivos JSON. En Heroku y servicios similares, el sistema de archivos es efímero (se reinicia al hacer redeploy).

### Soluciones para Producción:

#### Opción 1: Usar un Add-on de Base de Datos
- MongoDB Atlas (recomendado)
- PostgreSQL
- MySQL

#### Opción 2: Usar Almacenamiento Externo
- Amazon S3 para imágenes
- Base de datos externa para datos

#### Opción 3: Mantener Datos en GitHub
- Commit automático de cambios
- No recomendado para alta frecuencia de cambios

## Solución de Problemas

### Error: "Application error"
```bash
# Ver logs
heroku logs --tail

# Verificar que las dependencias estén instaladas
heroku run npm install
```

### Error: "Port already in use"
```bash
# Heroku asigna el puerto automáticamente
# Asegúrate de usar: process.env.PORT || 3000
```

### Los datos se pierden al reiniciar
- Implementar una base de datos (ver sección de Almacenamiento de Datos)
- O usar un sistema de archivos persistente

## Monitoreo

### Heroku
```bash
# Ver métricas
heroku metrics

# Ver logs
heroku logs --tail

# Ver estado
heroku ps
```

### Configurar Alertas
1. En el dashboard de Heroku
2. Ve a la pestaña "Metrics"
3. Configura alertas para uso de memoria y tiempo de respuesta

## Escalamiento

### Heroku
```bash
# Ver dynos actuales
heroku ps

# Escalar horizontalmente
heroku ps:scale web=2

# Cambiar tipo de dyno
heroku ps:resize web=standard-1x
```

## Mantenimiento

### Actualizar la Aplicación
```bash
# Hacer cambios en el código
git add .
git commit -m "Descripción de cambios"
git push heroku main
```

### Backup de Datos
```bash
# Descargar archivos de datos
heroku run cat data/recipes.json > backup_recipes.json
heroku run cat data/inventory.json > backup_inventory.json
```

### Restaurar Datos
Para aplicaciones con almacenamiento persistente, implementar un sistema de backup automático o usar una base de datos con backups integrados.

## Costos

### Heroku
- **Hobby Dyno**: ~$7/mes
- **Professional Dyno**: Desde $25/mes
- **Free Tier**: Eliminado en 2022

### Alternativas Gratuitas
- **Render.com**: Plan gratuito con limitaciones
- **Railway.app**: $5 de crédito gratis mensual
- **Fly.io**: Allowance gratuito generoso

## Soporte

Para problemas específicos:
1. Revisa los logs: `heroku logs --tail`
2. Verifica el estado: `heroku status`
3. Consulta la documentación de Heroku

## Recursos Adicionales

- [Documentación de Heroku Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku CLI Reference](https://devcenter.heroku.com/articles/heroku-cli-commands)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
