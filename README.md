# ModaConnect — Demo oficial

Demo comercial de **ModaConnect by Marketing Connect**, catálogo digital para tiendas de ropa.

## Estado
Esta versión reemplaza el prototipo estático inicial del repositorio.

Incluye dos demostraciones en una misma interfaz:

### Plan Básico
- Hasta 50 prendas.
- Categorías y búsqueda.
- Colores y tallas.
- Bolsa de compra.
- Cantidades limitadas por disponibilidad demostrativa.
- Pedido por WhatsApp.

### Plan Premium
- Prendas ilimitadas.
- Variantes de color.
- Inventario por color y talla.
- Productos agotados por variante.
- Categorías configurables.
- Ejemplo de categoría de exhibición (Telas) sin venta.
- Bolsa con cantidades y pedido por WhatsApp.

## Archivos actuales
- `index.html` — estructura de la demo.
- `styles.css` — diseño responsive.
- `script.js` — productos de demostración, variantes, carrito y cambio Básico/Premium.

## Importante
Los productos actuales son datos de demostración incluidos en `script.js`. El número de WhatsApp también permanece como número ficticio (`5210000000000`) para evitar enviar pedidos reales desde la demo.

## Próxima etapa
La arquitectura de producción para implementaciones reales de clientes se basará en lo ya probado con Bonny’s Collection:

- Cloudflare Worker.
- D1 para productos, variantes e inventario.
- R2 para imágenes.
- Sesión segura de administrador.
- Alta, edición y eliminación de productos.
- Carga múltiple y eliminación individual de imágenes.
- Configuración por negocio (nombre, logo, colores, categorías y WhatsApp).

El catálogo de producción de Bonny’s Collection es independiente de este repositorio de demostración y no debe modificarse al trabajar en esta demo.