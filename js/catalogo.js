/* =========================================================
   VALIENTTE — CATÁLOGO REAL (fuente: su catálogo en vitrinapp.app, nov-2026)
   Una sola lista para toda la página: vitrina del inicio, colección y ficha de producto.
   - Fotos: img/productos/NN.jpg (las de la tienda, con un retoque suave de luz y nitidez).
   - Precios, nombres y descripciones: los del catálogo. NO agregar piezas que no existan.
   - tipo: anillos | aretes | cadenas | pulseras | juegos
   - material: plata | esmeraldas (plata con esmeraldas) | oro (oro laminado 18k). Los sets van en su material.
   - momentos: ti (un gusto para ti) · mama, amor, grado, cumple (para regalar)
   Se carga ANTES de main.js: pinta las piezas y main.js les conecta "agregar".
   ========================================================= */
(() => {
  const PLATA = 'Plata 925 · Circones';
  const ESM = 'Plata 925 · Esmeralda natural';
  const DESC_ESM = 'Esmeralda natural colombiana. Se entrega con garantía de por vida.';

  // [n foto, id, nombre, precio, tipo, momentos, descripción (opcional)]  — sin género: la colección es para quien la quiera
  // Los id NO cambian (son los enlaces de cada ficha); los nombres sí (nombres de joyería, según la foto y el material).
  const DATOS = [
    [1, 'dije-con-cadena', 'Dije Sol con cadena', 90000, 'cadenas', 'mama ti', 'Dije de circones en forma de sol, con cadena en plata 925.'],
    [2, 'pulsera-treboles', 'Pulsera Tréboles', 139000, 'pulseras', 'amor ti', 'Tejido tenis con circones y dijes de trébol.'],
    [3, 'pulsera-espiga', 'Pulsera Espiga', 130000, 'pulseras', 'grado ti', 'Hojas de circones en forma de espiga.'],
    [4, 'argolla-de-colores', 'Argolla Arcoíris', 160000, 'anillos', 'ti amor', 'Pavé de circones de colores.'],
    [6, 'candongas-con-circones', 'Candongas Azul noche', 150000, 'aretes', 'ti', 'Candongas con circones azul profundo y blancos.'],
    [7, 'juego-verde-y-blanco', 'Set Halo verde', 200000, 'juegos', 'mama grado', 'Set en plata 925 con circones verdes y blancos.'],
    [8, 'anillo-corazon-verde', 'Anillo Corazón verde', 75000, 'anillos', 'amor', 'Circón verde en forma de corazón.'],
    [10, 'anillo-circones-alargados', 'Anillo Baguette', 140000, 'anillos', 'amor', 'Circones en talla baguette, uno junto al otro.'],
    [11, 'juego-con-circones', 'Set Gota', 100000, 'juegos', 'grado ti', 'Collar y aretes con circones en forma de gota.'],
    [12, 'anillo-corazon', 'Anillo Corazón', 75000, 'anillos', 'amor', 'Circón en forma de corazón con halo.'],
    [13, 'topos-con-circones', 'Topos Doble halo fucsia', 100000, 'aretes', 'ti', 'Circón ovalado fucsia con doble halo.'],
    [14, 'cadena-tejido-tenis', 'Cadena Tenis', 350000, 'cadenas', 'amor grado', 'Una línea continua de circones.'],
    [15, 'juego-corazones', 'Set Corazones', 139000, 'juegos', 'amor', 'Circones en forma de corazón.'],
    [16, 'topos-cuadrado-negro', 'Topos Cuadrado negro', 75000, 'aretes', 'ti', 'Circón cuadrado negro.'],
    [17, 'anillo-con-circon', 'Anillo Bisel verde', 75000, 'anillos', 'ti', 'Circón verde cuadrado engastado en bisel.'],
    [18, 'anillo-con-circones', 'Anillo Solitario', 75000, 'anillos', 'amor', 'Un circón central sobre un aro de circones.'],
    [19, 'argolla-fina', 'Argolla Riviera', 75000, 'anillos', 'amor', 'Argolla fina con una hilera de circones.'],
    [20, 'juego-cuadrado-verde', 'Set Halo cuadrado verde', 274000, 'juegos', 'mama', 'Collar y aretes con circón verde cuadrado y halo de circones.'],
    [21, 'candongas-pave', 'Candongas pavé', 132000, 'aretes', 'ti'],
    [22, 'topos-flor-con-perla', 'Topos Flor con perla', 75000, 'aretes', 'grado ti', 'En forma de flor, con perla y circones.'],
    [23, 'candongas-melcocha', 'Candongas Melcocha', 100000, 'aretes', 'ti', 'Candongas en plata 925 en forma de melcocha.'],
    [24, 'topos-circon-cuadrado', 'Topos Princesa', 75000, 'aretes', 'ti cumple', 'Circón cuadrado en talla princesa.'],
    [26, 'dije-de-esmeralda-con-halo', 'Dije de esmeralda con halo', 500000, 'cadenas', 'mama', DESC_ESM],
    [27, 'anillo-de-esmeralda', 'Anillo Solitario de esmeralda', 250000, 'anillos', 'amor', DESC_ESM],
    [28, 'anillo-de-esmeralda-con-halo', 'Anillo Doble halo de esmeralda', 250000, 'anillos', 'amor mama', DESC_ESM],
    [29, 'topos-de-esmeralda', 'Topos Sol de esmeralda', 400000, 'aretes', 'mama', DESC_ESM],
    [30, 'cruz-de-esmeralda', 'Cruz de esmeralda', 500000, 'cadenas', 'mama cumple', DESC_ESM],
    [31, 'anillo-cuadrado', 'Anillo Halo cuadrado azul', 96987, 'anillos', 'amor', 'Circón azul con doble halo cuadrado.'],
    [32, 'pulsera-tejido-chino', 'Pulsera Tejido chino', 227000, 'pulseras', 'ti cumple', 'Cadena en plata 925 con tejido chino.'],
    [33, 'topos-nudo', 'Topos Nudo', 98986, 'aretes', 'ti'],
    [34, 'candongas-anchas', 'Candongas Pavé anchas', 132000, 'aretes', 'ti', 'Candongas anchas cubiertas de circones.'],
    [35, 'anillo-entrelazado', 'Anillo Entrelazado', 96000, 'anillos', 'amor', 'Dos líneas de circones que se cruzan.'],
    [36, 'pulsera-tejido-tenis', 'Pulsera Tenis', 224000, 'pulseras', 'amor grado', 'Una línea continua de circones para la muñeca.'],
    [37, 'topos-corazon', 'Topos Corazón pavé', 75000, 'aretes', 'amor', 'Corazones cubiertos de circones.'],
    [38, 'cruz-con-circones', 'Cruz Pavé', 98000, 'cadenas', 'grado cumple', 'Cruz cubierta de circones. Incluye cadena.'],
    [39, 'anillo-marquesa', 'Anillo Marquesa con halo', 104000, 'anillos', 'amor', 'Circón central con halo y aro calado.'],
    [40, 'topos-destello', 'Topos Destello', 80000, 'aretes', 'ti', 'Circón redondo con doble halo de destellos.'],
    [41, 'juego-de-cruces', 'Set Cruces', 134000, 'juegos', 'mama grado', 'Collar y aretes con cruces de circones.'],
    [42, 'pulsera-de-hombre', 'Pulsera Eslabón marino', 266000, 'pulseras', 'ti cumple', 'Cadena de eslabón marino en plata 925.'],
    [43, 'anillo-flor', 'Anillo Flor de circones', 112000, 'anillos', 'amor', 'Circón central rodeado de pétalos de circones.'],
    [44, 'anillo-circon-azul', 'Anillo Estrella azul', 150000, 'anillos', 'mama amor', 'Circón azul ovalado con halo de circones en talla baguette.'],
    [45, 'argolla-eternidad', 'Argolla Eternidad', 75000, 'anillos', 'amor', 'Argolla de circones en talla marquesa, delicada y luminosa.'],
    // Llegaron el 20-nov-2026 (fotos y precios enviados por la clienta)
    [46, 'juego-dorado-con-circones', 'Set Gota dorada', 180000, 'juegos', 'ti', 'Collar y aretes en oro laminado 18k con circones.'],
    [47, 'juego-corazones-azules', 'Set Corazones azules', 180000, 'juegos', 'amor', 'Collar y aretes en plata 925 con corazones de circón azul.'],
    // Llegaron el 22-nov-2026 (fotos de la clienta; precios confirmados por ella). El 05 "Topos Halo de color" se retiró:
    // sus aretes ahora van por color (60, 61, 62). Los topos verdes son de CIRCÓN, no de esmeralda.
    [48, 'anillo-halo-de-esmeralda', 'Anillo Halo de esmeralda', 250000, 'anillos', 'amor', 'Esmeralda natural colombiana rodeada de circones, sobre un aro liso. Se entrega con garantía de por vida.'],
    [49, 'anillo-rosa-de-esmeralda', 'Anillo Rosa de esmeralda', 250000, 'anillos', 'amor', 'Esmeralda natural colombiana en un halo de circones, delicada y luminosa. Se entrega con garantía de por vida.'],
    [50, 'anillo-aura-de-esmeralda', 'Anillo Aura de esmeralda', 250000, 'anillos', 'amor', 'Esmeralda natural colombiana dentro de un aro de circones que parece flotar. Se entrega con garantía de por vida.'],
    [51, 'anillo-corona-de-esmeralda', 'Anillo Corona de esmeralda', 250000, 'anillos', 'amor', 'Esmeralda natural colombiana con doble halo y aro de circones. Se entrega con garantía de por vida.'],
    [52, 'anillo-halo-pave-de-esmeralda', 'Anillo Halo pavé de esmeralda', 250000, 'anillos', 'amor', 'Esmeralda natural colombiana con halo y aro cubierto de circones. Se entrega con garantía de por vida.'],
    [53, 'anillo-infinito-de-esmeralda', 'Anillo Infinito de esmeralda', 250000, 'anillos', 'amor', 'Esmeralda natural colombiana sobre un lazo infinito de circones. Se entrega con garantía de por vida.'],
    [54, 'anillo-lazo-de-esmeralda', 'Anillo Lazo de esmeralda', 250000, 'anillos', 'amor', 'Esmeralda natural colombiana entre dos líneas que se entrelazan, una de ellas con circones. Se entrega con garantía de por vida.'],
    [55, 'anillo-luna-de-esmeralda', 'Anillo Luna de esmeralda', 250000, 'anillos', 'amor', 'Esmeralda natural colombiana con halo, sobre medio aro de circones. Se entrega con garantía de por vida.'],
    [56, 'anillo-ola-de-esmeralda', 'Anillo Ola de esmeralda', 250000, 'anillos', 'amor', 'Esmeralda natural colombiana sobre un aro ondulado de circones. Se entrega con garantía de por vida.'],
    [57, 'anillo-sendero-de-esmeralda', 'Anillo Sendero de esmeralda', 250000, 'anillos', 'amor', 'Esmeralda natural colombiana entre un aro liso y uno de circones. Se entrega con garantía de por vida.'],
    [58, 'anillo-trilogia-de-esmeralda', 'Anillo Trilogía de esmeralda', 250000, 'anillos', 'amor', 'Esmeralda natural colombiana entre dos circones. Se entrega con garantía de por vida.'],
    [59, 'anillo-solitario-pave-de-esmeralda', 'Anillo Solitario pavé de esmeralda', 250000, 'anillos', 'amor', 'Esmeralda natural colombiana en lo alto de un aro de circones. Se entrega con garantía de por vida.'],
    [60, 'topos-rectangulares-blancos', 'Topos Halo rectangular blanco', 100000, 'aretes', 'ti', 'Circón blanco rectangular con halo de circones.'],
    [61, 'topos-rectangulares-verdes', 'Topos Halo rectangular verde', 100000, 'aretes', 'ti', 'Circón verde rectangular con halo de circones.'],
    [62, 'topos-rectangulares-lila', 'Topos Halo rectangular lila', 100000, 'aretes', 'ti', 'Circón lila rectangular con halo de circones.'],
    [63, 'topos-ovalados-azules', 'Topos Halo ovalado azul', 100000, 'aretes', 'ti', 'Circón azul ovalado con halo de circones.'],
    [64, 'topos-ovalados-blancos', 'Topos Halo ovalado blanco', 100000, 'aretes', 'ti', 'Circón blanco ovalado con halo de circones.'],
    [65, 'topos-ovalados-pequenos', 'Topos Ovalados pequeños', 80000, 'aretes', 'ti', 'Circón ovalado con halo, en tamaño pequeño.'],
    [66, 'set-ovalo-de-plata', 'Set Óvalo', 150000, 'juegos', 'ti', 'Collar y aretes en plata 925 con circones ovalados y halo.'],
    // Precio 0 = la página muestra "(precio pendiente)". Hoy no hay ninguna pendiente (23-nov-2026).
    [67, 'candongas-pave-finas', 'Candongas Pavé finas', 134000, 'aretes', 'ti', 'Candongas delgadas cubiertas de circones.'],
    [68, 'candongas-pave-redondas', 'Candongas Pavé redondas', 140000, 'aretes', 'ti', 'Candongas abombadas cubiertas de circones.'],
    [69, 'candongas-cruces', 'Candongas Cruces', 134000, 'aretes', 'ti', 'Candongas anchas de circones con cruces caladas por dentro.'],
    [70, 'anillo-solitario-baguette', 'Anillo Solitario baguette', 75000, 'anillos', 'amor', 'Circón en talla baguette sobre un aro de circones.'],
    [71, 'topos-halo-redondos', 'Topos Halo redondo', 80000, 'aretes', 'ti', 'Circón redondo con halo de circones.'],
    [72, 'anillo-estrella-verde', 'Anillo Estrella verde', 150000, 'anillos', 'amor', 'Circón verde ovalado con halo de circones en talla baguette.'],
    [73, 'set-ovalo-azul', 'Set Óvalo azul', 150000, 'juegos', 'ti', 'Collar y aretes en plata 925 con circones azules ovalados y halo.']
  ];

  // AGOTADAS (21-nov-2026, aviso de la clienta): no se muestran en ninguna parte de la página.
  // Cuando vuelvan, basta con quitar su número de esta lista.
  // 7 Set Halo verde · 15 Set Corazones · 21 Candongas pavé · 22 Topos Flor con perla · 26 Dije de esmeralda con halo · 33 Topos Nudo
  const AGOTADAS = [7, 15, 21, 22, 26, 33];

  const ESMERALDAS = [26, 27, 28, 29, 30, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];
  // El estuche del inicio muestra seis (cabe justo en 3 columnas); el resto está en la vitrina y en la colección
  const ESTUCHE = [30, 29, 28, 48, 53, 58];
  const ORO = [46];
  const NUEVAS = [46, 47, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73];
  // Piezas sin piedra (solo metal): el rótulo no dice "circones"
  const SIN_PIEDRA = [23, 32, 42];
  // Foto "puesta" (en la mano) de algunas piezas: aparece al pasar el mouse y como 2.ª foto en la ficha
  const PUESTA = [35, 39, 45];
  const CATALOGO = DATOS.filter((d) => !AGOTADAS.includes(d[0])).map(([n, id, nombre, precio, tipo, momentos, desc]) => {
    const esm = ESMERALDAS.includes(n);
    const oro = ORO.includes(n);
    const nn = String(n).padStart(2, '0');
    return {
      n, id, nombre, precio, tipo,
      material: esm ? 'esmeraldas' : oro ? 'oro' : 'plata',
      rotulo: esm ? ESM : oro ? 'Oro laminado 18k · Circones' : SIN_PIEDRA.includes(n) ? 'Plata 925' : PLATA,
      variante: esm ? 'Plata 925 · Esmeralda natural' : oro ? 'Oro laminado 18k' : 'Plata 925',
      momentos: momentos.split(' '),
      desc: desc || (SIN_PIEDRA.includes(n) ? 'Pieza en plata 925.' : 'Pieza en plata 925 con circones.'),
      sello: esm ? 'Esmeralda natural' : NUEVAS.includes(n) ? 'Recién llegado' : '',
      foto: `img/productos/${nn}.jpg`,
      foto2x: `img/productos/${nn}-2x.jpg`,  // versión grande (limpiada con IA + original, ver CLAUDE.md)
      puesta: PUESTA.includes(n) ? `img/productos/${nn}-puesta.jpg` : ''
    };
  });

  // Orden de la vitrina del inicio: lo recién llegado primero, luego una selección variada y el resto
  const PRIMERO = [48, 46, 60, 53, 47, 63, 58, 66, 73, 28, 14, 2, 30, 35, 4, 20, 36, 39, 12, 34, 29, 42, 45, 27, 44, 11, 41];
  const porN = (n) => CATALOGO.find((p) => p.n === n);
  const ORDEN_INICIO = [...PRIMERO, ...CATALOGO.map((p) => p.n).filter((n) => !PRIMERO.includes(n))].filter(porN);

  const NOMBRE_TIPO = { anillos: 'Anillos', aretes: 'Aretes', cadenas: 'Cadenas y dijes', pulseras: 'Pulseras', juegos: 'Sets' };
  // precio 0 = aún sin confirmar por la clienta
  const pesos = (n) => (n > 0 ? '$' + Math.round(n).toLocaleString('es-CO') : '(precio pendiente)');
  const porId = (id) => CATALOGO.find((p) => p.id === id);
  const desde = (filtro) => Math.min(...CATALOGO.filter((p) => p.precio > 0 && filtro(p)).map((p) => p.precio));

  // Tarjeta de una pieza (la misma en todas las páginas)
  function pieza(p, i = 0, carga = 'lazy') {
    return `
    <article class="pieza aparecer" data-id="${p.id}" data-tipo="${p.tipo}" data-material="${p.material}">
      <div class="pieza__foto">
        ${p.sello ? `<span class="pieza__sello ${p.material === 'esmeraldas' ? 'pieza__sello--verde' : 'pieza__sello--naranja'} rotulo">${p.sello}</span>` : ''}
        <img src="${p.foto}" srcset="${p.foto} 800w, ${p.foto2x} 1600w" sizes="(min-width: 1100px) 330px, (min-width: 700px) 33vw, 70vw" width="800" height="1000" loading="${carga}" alt="${p.nombre}, ${p.rotulo.toLowerCase()}">
        ${p.puesta ? `<img class="alterna" src="${p.puesta}" width="624" height="780" loading="lazy" alt="" aria-hidden="true">` : ''}
        <button class="pieza__agregar" type="button" aria-label="Agregar ${p.nombre} a la bolsa" data-agregar data-id="${p.id}" data-nombre="${p.nombre}" data-precio="${p.precio}" data-variante="${p.variante}" data-img="${p.foto}"><svg aria-hidden="true"><use href="#i-mas"/></svg></button>
      </div>
      <div class="tag" style="--giro:${[-3, 2, -1.5][i % 3]}deg"><span class="rotulo">${p.rotulo}</span><h3 class="tag__nombre"><a href="producto.html?id=${p.id}">${p.nombre}</a></h3><span class="tag__precio">${pesos(p.precio)}</span></div>
    </article>`;
  }

  window.Catalogo = { CATALOGO, NOMBRE_TIPO, porId, pieza, pesos, desde };

  /* ---------- Vitrina del inicio ---------- */
  const pista = document.querySelector('[data-pista][data-grid-productos]');
  if (pista) {
    const mandos = pista.querySelector('.carrete__mandos');
    const html = ORDEN_INICIO.map((n, i) => pieza(porN(n), i, i < 3 ? 'eager' : 'lazy')).join('');
    if (mandos) mandos.insertAdjacentHTML('beforebegin', html); else pista.insertAdjacentHTML('afterbegin', html);
  }
  /* ---------- El estuche: las seis esmeraldas del catálogo (inicio) ---------- */
  const estuche = document.querySelector('[data-estuche]');
  if (estuche) {
    estuche.innerHTML = ESTUCHE.map(porN).filter(Boolean).map((p, i) => `
      <li class="hueco aparecer" style="--retraso:${i * 90}ms">
        <a class="hueco__enlace" href="producto.html?id=${p.id}">
          <span class="hueco__cama"><img src="${p.foto}" srcset="${p.foto} 800w, ${p.foto2x} 1600w" sizes="(min-width: 900px) 360px, 46vw" width="800" height="1000" loading="lazy" alt="${p.nombre}, ${p.rotulo.toLowerCase()}"></span>
          <span class="hueco__placa"><b>${p.nombre}</b><span>${pesos(p.precio)}</span></span>
        </a>
        <button class="hueco__agregar" type="button" aria-label="Agregar ${p.nombre} a la bolsa" data-agregar data-id="${p.id}" data-nombre="${p.nombre}" data-precio="${p.precio}" data-variante="${p.variante}" data-img="${p.foto}"><svg aria-hidden="true"><use href="#i-mas"/></svg></button>
      </li>`).join('');
  }

  document.querySelectorAll('[data-total-piezas]').forEach((el) => { el.textContent = CATALOGO.length; });

  // precios "desde" de los paneles de colecciones (se calculan del catálogo)
  document.querySelectorAll('[data-desde-material]').forEach((el) => { el.textContent = 'Desde ' + pesos(desde((p) => p.material === el.dataset.desdeMaterial)); });
  document.querySelectorAll('[data-desde-tipo]').forEach((el) => { el.textContent = 'Desde ' + pesos(desde((p) => p.tipo === el.dataset.desdeTipo)); });

  /* ---------- Ficha de producto (producto.html?id=...) ---------- */
  const ficha = document.querySelector('[data-ficha]');
  if (ficha) {
    const pedida = new URLSearchParams(location.search).get('id');
    const p = porId(pedida) || porId('anillo-de-esmeralda-con-halo');
    const esm = p.material === 'esmeraldas';
    Object.assign(ficha.dataset, { id: p.id, nombre: p.nombre, precio: p.precio, img: p.foto, variante: p.variante, tipo: p.tipo });
    document.title = `${p.nombre} · ${esm ? 'Plata 925 con esmeralda natural' : p.variante} · Valientte Joyería`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = `${p.nombre} en ${p.variante.toLowerCase()}. ${p.desc} Pídela por WhatsApp.`;
    const poner = (sel, v, attr) => document.querySelectorAll(sel).forEach((el) => { if (attr) el.setAttribute(attr, v); else el.innerHTML = v; });
    const partes = p.nombre.split(' ');
    // el nombre tal cual, recto: el precio y el botón deben verse sin bajar
    poner('[data-ficha-titulo]', p.nombre);
    poner('[data-ficha-nombre]', p.nombre);
    poner('[data-precio-mostrado]', pesos(p.precio));
    poner('[data-precio-barra]', pesos(p.precio));
    poner('[data-ficha-desc]', p.desc);
    poner('[data-ficha-volver]', `← ${NOMBRE_TIPO[p.tipo]}`);
    poner('[data-ficha-volver]', `coleccion.html#piezas`, 'href');
    poner('[data-ficha-coleccion]', esm ? 'Colección Esmeraldas' : 'Colección ' + p.variante);
    poner('[data-ficha-piedra]', esm ? 'Esmeralda natural colombiana' : 'Circones');
    poner('[data-ficha-ref]', 'VL-' + String(p.n).padStart(3, '0'));
    poner('[data-ficha-foto]', p.foto, 'src');
    poner('[data-ficha-foto]', `${p.foto} 800w, ${p.foto2x} 1600w`, 'srcset');
    poner('[data-ficha-foto]', '(min-width: 900px) 600px, 100vw', 'sizes');
    poner('[data-ficha-foto]', `${p.nombre}, ${p.rotulo.toLowerCase()}`, 'alt');
    // 2.ª foto (la pieza puesta) + dos miniaturas facetadas para cambiar entre ellas (las conecta producto.js)
    const galeria = document.querySelector('[data-galeria]');
    if (p.puesta && galeria) {
      galeria.insertAdjacentHTML('beforeend', `<figure><img src="${p.puesta}" width="624" height="780" loading="lazy" alt="${p.nombre} puesto en la mano"></figure>`);
      galeria.insertAdjacentHTML('afterend', `<div class="galeria__miniaturas" data-miniaturas>
        <button type="button" aria-label="Ver la pieza" aria-current="true"><img src="${p.foto}" alt="" width="64" height="80"></button>
        <button type="button" aria-label="Verla puesta" aria-current="false"><img src="${p.puesta}" alt="" width="64" height="80"></button></div>`);
    }
    document.querySelectorAll('[data-solo-esmeralda]').forEach((el) => { el.hidden = !esm; });
    document.querySelectorAll('input[name="material"]').forEach((el) => { el.value = p.material === 'oro' ? 'Oro laminado 18k' : 'Plata 925'; });
    document.querySelectorAll('[data-solo-plata]').forEach((el) => { el.hidden = p.material !== 'plata'; });
    document.querySelectorAll('[data-solo-anillo]').forEach((el) => { el.hidden = p.tipo !== 'anillos'; });
    // "Combínalo con": 4 piezas del mismo material, de otro tipo primero
    const rel = CATALOGO.filter((x) => x.id !== p.id && x.material === p.material)
      .sort((a, b) => (a.tipo === p.tipo) - (b.tipo === p.tipo) || a.n - b.n).slice(0, 4);
    const cajaRel = document.querySelector('[data-relacionadas]');
    if (cajaRel) cajaRel.innerHTML = rel.map((x, i) => pieza(x, i)).join('');
  }
})();
