# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a V&A Bakery! Este documento te guiará a través del proceso.

## 🚀 Comenzando

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn
- Git

### Configuración del Entorno de Desarrollo

1. **Fork el repositorio**
   - Haz clic en el botón "Fork" en GitHub

2. **Clonar tu fork**
   ```bash
   git clone https://github.com/tu-usuario/V-A-Bakery-Recipes.git
   cd V-A-Bakery-Recipes
   ```

3. **Instalar dependencias**
   ```bash
   npm install
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm start
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📝 Proceso de Contribución

### 1. Crear una Rama
```bash
git checkout -b feature/nombre-de-tu-feature
# o
git checkout -b fix/nombre-del-bug
```

### 2. Hacer Cambios
- Escribe código limpio y legible
- Sigue las convenciones de estilo del proyecto
- Comenta código complejo cuando sea necesario

### 3. Probar tus Cambios
```bash
# Iniciar el servidor
npm start

# Probar manualmente todas las funcionalidades afectadas
```

### 4. Commit
```bash
git add .
git commit -m "Descripción clara de los cambios"
```

Ejemplos de buenos mensajes de commit:
- `feat: Agregar filtro por fecha en recetas`
- `fix: Corregir error al subir imágenes grandes`
- `docs: Actualizar README con nuevas instrucciones`
- `style: Mejorar diseño responsive en móviles`

### 5. Push a tu Fork
```bash
git push origin feature/nombre-de-tu-feature
```

### 6. Crear Pull Request
1. Ve a tu fork en GitHub
2. Haz clic en "Pull Request"
3. Describe tus cambios en detalle
4. Espera la revisión

## 🎨 Estándares de Código

### JavaScript
- Usa ES6+ features
- Usa `const` y `let`, evita `var`
- Nombra funciones y variables descriptivamente
- Usa template literals para strings con variables

### CSS
- Usa nombres de clases descriptivos
- Mantén la especificidad baja
- Usa variables CSS para colores y tamaños comunes
- Asegura compatibilidad móvil

### HTML
- Usa HTML semántico
- Incluye atributos alt en imágenes
- Asegura accesibilidad (ARIA labels cuando sea necesario)

## 🐛 Reportar Bugs

### Antes de Reportar
1. Verifica que no sea un problema ya reportado
2. Intenta reproducir el bug
3. Recopila información relevante

### Al Reportar
Incluye:
- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots si es relevante
- Información del navegador/sistema

## 💡 Sugerir Mejoras

### Mejoras Bienvenidas
- Nuevas funcionalidades
- Mejoras de UI/UX
- Optimizaciones de rendimiento
- Mejoras de documentación
- Tests automatizados

### Formato de Sugerencia
```markdown
### Descripción
Descripción clara de la mejora

### Beneficio
Qué problema resuelve o qué mejora aporta

### Implementación Propuesta
Ideas sobre cómo implementarlo (opcional)
```

## 🔍 Áreas que Necesitan Contribuciones

### Alta Prioridad
- [ ] Implementar base de datos (MongoDB/PostgreSQL)
- [ ] Agregar tests automatizados
- [ ] Implementar autenticación de usuarios
- [ ] Agregar sistema de categorías personalizables

### Media Prioridad
- [ ] Mejorar búsqueda con filtros avanzados
- [ ] Agregar exportación de datos (PDF/Excel)
- [ ] Implementar sistema de notificaciones
- [ ] Agregar gráficos y estadísticas

### Baja Prioridad
- [ ] Modo oscuro
- [ ] Soporte para múltiples idiomas
- [ ] Sistema de comentarios en recetas
- [ ] Integración con redes sociales

## 🧪 Testing

Actualmente el proyecto no tiene tests automatizados. ¡Esta es una gran área para contribuir!

### Tests a Implementar
- Tests unitarios para funciones del servidor
- Tests de integración para API endpoints
- Tests E2E para flujos de usuario
- Tests de accesibilidad

### Frameworks Sugeridos
- Jest para tests unitarios
- Supertest para tests de API
- Cypress o Playwright para tests E2E

## 📚 Documentación

Siempre es bienvenida la mejora de documentación:
- Corregir errores tipográficos
- Aclarar instrucciones confusas
- Agregar ejemplos
- Traducir documentación
- Agregar diagramas o screenshots

## 🔒 Seguridad

Si encuentras una vulnerabilidad de seguridad:
1. **NO** crees un issue público
2. Envía un email a los mantenedores (si está disponible)
3. O crea un Security Advisory privado en GitHub

## 📋 Checklist Pre-Commit

Antes de hacer commit, verifica:
- [ ] El código funciona correctamente
- [ ] No hay errores en la consola
- [ ] El código está formateado correctamente
- [ ] Los archivos nuevos están incluidos en git
- [ ] El mensaje de commit es descriptivo
- [ ] No hay archivos innecesarios (node_modules, .env, etc.)

## 🎓 Recursos para Aprender

### Node.js & Express
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

### Frontend
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)

### Git & GitHub
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)

## 💬 Comunicación

### Canales
- Issues de GitHub para bugs y features
- Pull Requests para contribuciones de código
- Discussions para preguntas generales (si está habilitado)

### Código de Conducta
- Sé respetuoso y profesional
- Acepta críticas constructivas
- Enfócate en lo mejor para el proyecto
- Ayuda a otros contribuidores

## 🙏 Agradecimientos

Agradecemos a todos los contribuidores que ayudan a mejorar este proyecto. ¡Cada contribución cuenta, sin importar su tamaño!

## ❓ Preguntas

Si tienes preguntas sobre cómo contribuir:
1. Revisa este documento
2. Busca en Issues cerrados
3. Crea un nuevo Issue con la etiqueta "question"

---

¡Gracias por contribuir a V&A Bakery! 🍰
