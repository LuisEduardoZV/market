
# SimuShop | Simulador de compras en línea

SimuShop es una aplicación web que tiene como objetivo generarle al usuario una experiencia parecida que tiene al comprar en sus tiendas virtuale favoritas. SimuShop ofrece un amplio catálogo, proveniente de DummyJson, junto con multiples categorias por las que el usuario puede realizar busquedas y filtrar resultados.

Con el objetivo de generar una experiencia completa, se tiene a la disposición un carrito de compras para que el usuario ingrese sus productos favoritos y, en cualquier momento, puede ejecutar la compra.

La compra es una simulación por lo que no se ejecuta ningún cobro ni se ejecuta algún proceso con la información proporcionada.

## Despliegue

El proyecto se generó con ayuda de Vite, por lo que para ejecutar el proyecto bastará con ejecutar el siguiente comando:

```bash
  npm run dev
```

Asegurese de ejecutarlo una vez que haya intalado los paquetes necesario usando: 

```bash
  npm install
```
## Variables de Entorno

Para desplegar correctamente el proyecto sera necesario que agregues un par de variables de entorno en tu archivo `.env`, localizado al mismo nivel que el archivo `package.json`:

`VITE_KEY_API`

API KEY proporcionada por [OpenWeather](https://home.openweathermap.org/api_keys) para ejecutar consultas del clima.


`VITE_KEY_GOOGLE_API`

Tu API KEY personal de [Google Maps](https://console.cloud.google.com/) con la cual podrás hacer busquedas de clima por localización.

## Screenshots

### Inicio
![Home App Screenshot](https://github.com/LuisEduardoZV/portafolio/blob/main/src/assets/projects/MarketHome.png?raw=true)

Esta será la pantalla de bienvenida a la tienda, cuenta con una barra de navegación para hacer busquedas de productos pesonalizadas así como su carrito de compras y un menú desplegable con la categorías disponibles.

Mas abajo podrá encontrar categorías preestablecidas y un listado de prodcutos.

### Categorías

![Category App Screenshot](https://github.com/LuisEduardoZV/portafolio/blob/main/src/assets/projects/MarketCategory.png?raw=true)

Al entrar en una categoría se mostrarán todos los productos de esa sección y se tendrá un menu lateral con el que podrá filtrar por subcategorías, precio, modelos y calificación del producto.

### Productos

![Product App Screenshot](https://github.com/LuisEduardoZV/portafolio/blob/main/src/assets/projects/MarketProduct.png?raw=true)

El usuario tendrá a la disposición información valiosa del producto así como su descripción y un conjunto de fotos de muestra. Podrá leer los comentarios de otros usuarios y tendrá la opción de comprar directamente el producto o agregarlo al carrito.

### Pago

![Payment App Screenshot](https://github.com/LuisEduardoZV/portafolio/blob/main/src/assets/projects/MarketPayment.png?raw=true)

Una vez que tenga su carrito de compras seleccionado pasará al proceso de pago donde primero escribirá información de domicilio y el tipo de envio que desea; el siguiente pasó será ingresar información ficticia de pago y, como ultimo, un resumen final de la compra para verificar información y culminar la compra.

> *Nota:
> Ningún dato utilizado para el proceso de pago se almacena ni se utiliza para algún otro proceso.*
## Construido con

- **[Ant Design](https://ant.design/)**: Framework utlizado para crear la interfaz de usuario.
- **[GSAP](https://gsap.com/)**: Efectos visuales y animaciones a la página.
- **Redux**: Manejador de estado para el carrito de compras.


## Licencia

Este proyecto esta bajo la licencia [MIT](https://choosealicense.com/licenses/mit/).
