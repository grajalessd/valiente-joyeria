# Valientte Joyería — Guía del proyecto

Página web para la joyería **Valientte** (Manizales, Caldas, Colombia). Leer esto antes de tocar cualquier archivo.

## La marca
- **Nombre:** se escribe **Valientte** (doble T). Logo: monograma **VL** en serif con "VALIENTTE / JOYERÍA".
- **Lema oficial:** *"El lujo de ser tú."* Campaña: **#MujerValiente**. Línea hombre: *"Ellos también llevan la elegancia."*
- **Vende:** joyas en **plata 925** y **esmeraldas colombianas**; accesorios de moda en **rodio** y **acero**. +6 años. Productos reales vistos en su IG: Collar Aurora, Anillo Vintage, Anillo Pavé.
- **Posicionamiento:** precios accesibles, pero la web debe verse premium, atrevida y cercana.
- **Canales:** Instagram [@joyeria.valientte](https://www.instagram.com/joyeria.valientte/) · WhatsApp `https://wa.link/c60ecp` · **No tienen TikTok** (se quitó de todas las páginas; solo Instagram).
- **Tono:** español de Colombia, tuteo, cálido. **Poco texto**: el cliente es perezoso, darle lo que busca rápido.

## Lo que el cliente pidió (no repetir errores)
- **NADA de plantilla genérica** (crema + serif con una palabra cursiva de color + antetítulo con puntito + tarjetas e íconos en grilla).
- **Nada de letra "de programación" (monoespaciada)**: los rótulos van en Hanken Grotesk en mayúsculas espaciadas (clase `.rotulo`).
- **Nada de bloques largos de texto en el inicio.** "Quiénes somos" vive en `nosotros.html`.
- **Nada de imágenes flotando encima del texto** ni cambios bruscos de tipografía al pasar el mouse: todo con transición suave.
- Buen contraste y armonía de color en toda la página.
- Secciones relacionadas pero **no redundantes** (materiales ≠ vitrina).
- **NADA de arcos de media punta ni cápsulas redondas** en fotos: le parecen "mucho de lo mismo".
- Todo lo que cambia de tamaño debe ser **lento y delicado** (≥1.2 s, `--ease-suave`), nunca de golpe.
- Productos en **carrete arrastrable**, no en cuadrícula lineal.

## Dirección visual: "LA VITRINA" (v3)
Recorrido del inicio y de qué referencia sale cada idea (ver REFERENCIAS.md):
1. **La ventana** (hero): fondo naranja, "VALIENTTE" gigante y debajo *"Joyería en plata 925 y esmeraldas · Manizales"* en Bodoni cursiva (armoniza con el título). **Limpio al entrar**; al bajar nace una ventana con forma de **talla esmeralda**, crece hasta llenar la pantalla y aparece "El lujo de ser tú". *Ref: Floema/Limnia; naranja de su Instagram.*
2. **Escoge tu metal**: 5 paneles con **corte facetado de esmeralda** (colecciones por material) que se expanden lento al pasar el mouse (los demás se apagan un poco) y muestran frase + "desde $X". En celular se deslizan. Al tocar uno, la vitrina se filtra por ese material.
3. **Ella / Él**: bloques naranja y negro con palabra gigante. La foto llega **hasta el borde derecho** (el corte entre Ella y Él se nota) y solo se difumina **en línea recta hacia la izquierda** (en celular, hacia abajo), con la variable `--barrido`. Al pasar el mouse se abre y crece despacio.
   - Ojo: los elementos con `.aparecer` tienen su propia `transition`; si un elemento necesita otra transición (como los paneles de materiales), declararla con `.js ...` para que no se anule.
4. **La vitrina**: **carrete** que se arrastra (mouse con inercia, dedo, flechas y riel con manija ⟷). Las piezas del centro se ven más grandes y la foto tiene paralaje. Pestañas por **tipo de joya** + chip de material. Cada pieza con **etiqueta de papel colgando**. *Ref: Astrid & Miyu, Missoma.*
5. **La piedra de los valientes** (esmeralda): gema SVG que se inclina con el mouse/dedo, leyenda de Fura y Tena, **lupa** para ver el "jardín", significados para regalar (esperanza, amor, renacer; piedra de mayo) y 3 piezas para comprar. *Ref: simbolismo de Foundrae.*
6. **El recibo**: envíos, garantía y pagos como recibo impreso.
7. **Chats**: reseñas como conversación (marcadas **EJEMPLO**).
8. **Redes** + **footer** verde con "VALIENTTE" gigante.
- **Menú**: telón verde que se abre en curva, opciones grandes **a la izquierda, sin números**. Al acercar el mouse a una opción, su foto entra desde la derecha con un **corte en diagonal que barre** la pantalla (variable `--corte`), cubre casi todo y queda **debajo de los textos** con un velo verde para que se lean. Las demás opciones se atenúan. En celular las fotos rotan solas cada 3 s.
- **Instagram siempre presente** (la clienta quiere que nadie lo pase por alto): burbuja `.ig-flota` tipo historia (anillo con degradado de IG que gira + "VL") abajo a la izquierda en TODAS las páginas; la crea `main.js` (sección 2b), aparece después de la portada, se esconde sobre `#redes` y el footer, y cada ~22 s dice una frase corta. Además: enlace "Míralas puestas en @joyeria.valientte" en la vitrina y la sección Instagram (historias destacadas + collage + botón "Seguir") va justo después de la vitrina.
- **instagram.html** (apartado exclusivo, `js/instagram.js`): perfil con avatar de anillo IG que gira, bio y botones Seguir / Mensaje (`ig.me/m/joyeria.valientte`); **historias** tipo Instagram (barras de progreso 5 s, toque izq./der., se pausa al presionar); feed 3×3 con marca de reel; bloque naranja **#MujerValiente** que se copia al tocarlo. Se llega desde el **ícono de Instagram del header** (`.header__ig`, en las 5 páginas), la opción "Instagram" del menú (7ª, con su foto) y "Ver historias" en la sección del inicio. En esta página no sale la burbuja flotante.
- **Logo** (`.logo-vl`, sección 23 del CSS): recreado en código como su logo real — monograma VL en Bodoni Moda 800 (`opsz` 16) partido por una ranura con VALIENTTE (letras repartidas con flex) y JOYERÍA debajo. Todo en `em`: se escala con `font-size`. La portada del inicio lo usa en vez de la palabra VALIENTTE, sobre un naranja con luz cálida (oscuro arriba, claro abajo) como sus historias. Bodoni se carga hasta peso 900.
- **Pantalla de carga** (`.intro`, en las 5 páginas, justo después de `<body>`): sale SIEMPRE al entrar o recargar (~2,9 s). Las dos mitades del VL encajan desde su ranura, VALIENTTE aparece letra por letra, barra fina, y luego suben dos cortinas (naranja y verde). Espera a que cargue Bodoni (máx. 1,5 s) y tiene un seguro que la quita a los 5 s. `pointer-events:none`: nunca bloquea.
- **Inicio resumido**: ventana → metales → Ella/Él → vitrina → Instagram → esmeralda (corta: gema, lupa con leyenda en 1 frase, significados en fila, regalo) → recibo (5 líneas) → chats (4) → footer.
- **Asistente de WhatsApp**: botón flotante que saluda y se despliega con atajos (regalo, talla, catálogo, otra pregunta), cada uno con mensaje listo.
- **coleccion.html** (`?para=ella` | `?para=el` | sin parámetro = catálogo completo): portada que cambia color/palabra/foto despacio (naranja Ella, tinta Él, bosque Todo), filtros por **momento** (mamá, aniversario, grado…), tipo y material, y piezas en estante escalonado. Los productos están en `js/coleccion.js` (`PIEZAS`), que se carga ANTES de `main.js`. Ella/Él y "Ver catálogo completo" del inicio llevan aquí.
- **Celular**: Bodoni en tamaños gigantes usa `font-variation-settings: "opsz" 10` para que las líneas finas no desaparezcan. El `.asistente` tiene `pointer-events:none` (su panel cerrado tapaba los toques de media pantalla); solo el botón y el panel abierto los reciben.
- **nosotros.html**: historia, valores y CTA. **producto.html**: galería, certificado de pieza, variantes, notas.

### Paleta (`css/styles.css`, sección 1)
| Variable | Hex | Uso |
|---|---|---|
| `--naranja` | `#E0662E` | hero, "Ella", acentos y relleno de botones al pasar el mouse (texto **tinta** encima, nunca blanco) |
| `--marfil` | `#F7F3EC` | fondo principal |
| `--arena` / `--arena-2` | `#EDE4D6` / `#DCCFBC` | secciones alternas, bordes |
| `--bosque` | `#0D3B2C` | vitrina, menú, footer |
| `--noche` | `#061A12` | la piedra de los valientes |
| `--esmeralda` / `--esmeralda-viva` | `#13875F` / `#3CCB95` | acentos (la viva solo sobre oscuro) |
| `--hueso` | `#FFFDF9` | etiquetas, recibo, bolsa |
| `--tinta` / `--gris` | `#1A1714` / `#6A6159` | texto |
| `--whatsapp` | `#1F8F55` | solo WhatsApp |

### Tipografías (Google Fonts) — solo dos
- **Bodoni Moda**: titulares grandes; cursiva para la palabra clave.
- **Hanken Grotesk**: todo lo demás. Rótulos: `.rotulo` (mayúsculas, 600, `.16em`).

### Recursos de la marca
- **Foto fundida** (`.fundida`): máscara radial cuyos bordes se disuelven en el color de fondo; se anima con la variable `--velo` (registrada con `@property`). Menú, Ella/Él, leyenda, nosotros.
- **Corte facetado** (`--faceta`, `--faceta-chica`): esquinas talladas como gema. Materiales, piezas, mini piezas, bolsa.
- `.tag` (etiqueta de joyería), `.boton` (píldora con relleno naranja que barre), `#i-gema` (esmeralda SVG), `--talla` (octágono del hero), `.recibo`, `.certificado`.

### Animaciones
- Un bucle de scroll con `requestAnimationFrame` (ventana + header). Gema: `pointermove` (en celular se inclina con el scroll). Lupa: `pointer` events.
- `.aparecer` y `.revelar` con `IntersectionObserver`; retrasos con `style="--retraso:80ms"`.
- Sin librerías. Con "reducir movimiento" todo queda estático y visible.

## Estructura
```
valiente-joyeria/
├── index.html        Inicio
├── producto.html     Ficha de ejemplo (Anillo Muzo)
├── nosotros.html     Quiénes somos
├── coleccion.html    Ella / Él / catálogo completo (+ js/coleccion.js)
├── instagram.html    Apartado de Instagram (+ js/instagram.js)
├── css/styles.css    Estilos (19 secciones numeradas)
├── js/main.js        Config, WhatsApp/asistente, menú, ventana, gema, lupa, vitrina, bolsa
├── js/producto.js    Galería, variantes, barra fija, guía de tallas
├── img/              Fotos reales (ver img/LEEME.md)
├── REFERENCIAS.md · PROPUESTAS.md (historial) · CLAUDE.md
```
El header, el menú, el asistente y la bolsa están repetidos en las 5 páginas: **si se cambia uno, cambiarlo en todas**.

## Cómo funciona
- `CONFIG` en `js/main.js`: `whatsappNumero` (solo dígitos con 57), enlace corto, envío gratis. Con número, todos los botones precargan su mensaje (`data-wa-msg` en el HTML).
- **Pieza de la vitrina**: `<article class="pieza" data-tipo="anillos|collares|aretes|pulseras" data-material="plata|esmeraldas|rodio|acero|accesorios">` + botón `data-agregar data-id data-nombre data-precio data-variante data-img` + `.tag`. Los contadores de pestañas se calculan solos.
- **Arco de material**: `data-ir-material="plata"` filtra la vitrina.
- **Bolsa**: `localStorage` (`valientte-carrito`), compartida entre páginas, termina en "Finalizar pedido" por WhatsApp.

## Reglas
1. HTML + CSS + JS sin frameworks, mobile-first. Probar a 375 px y a 1440 px.
2. Toques mínimos de 44 px, contraste AA.
3. Precios `$139.900` (función `pesos()`).
4. Imágenes con `width`/`height`, `loading="lazy"` (menos la primera), < 250 KB.
5. Nada de popups al entrar ni contadores de descuento.
6. No copiar textos, fotos ni diseños de otras marcas.
7. Reseñas de ejemplo marcadas como tal hasta tener reales.
8. Lo temporal está marcado `TEMPORAL` / `PENDIENTE` en comentarios.

## Pendientes (confirmar con la clienta)
- [ ] Número de WhatsApp.
- [ ] Logo en SVG/PNG → `img/logo.svg`.
- [ ] Fotos reales (lista en `img/LEEME.md`), incluida una macro de esmeralda real para la lupa.
- [ ] Precios, nombres, tallas, medidas y "desde $X" reales.
- [ ] Envío gratis, tiempos, garantía, medios de pago, cambios.
- [ ] Historia real para `nosotros.html`.
- [ ] Chats/reseñas reales de clientas.
- [ ] `og:image` y favicon. Publicar en GitHub + Netlify.
