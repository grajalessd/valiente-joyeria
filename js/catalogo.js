/* =========================================================
   VALIENTTE — CATÁLOGO REAL (fuente: su catálogo en vitrinapp.app, nov-2026)
   Una sola lista para toda la página: vitrina del inicio, colección y ficha de producto.
   - Fotos: img/productos/NN.jpg (las de la tienda, con un retoque suave de luz y nitidez).
   - Precios, nombres y descripciones: los del catálogo. NO agregar piezas que no existan.
   - tipo: anillos | aretes | cadenas | pulseras | juegos
   - material: plata | esmeraldas
   - momentos: ti (un gusto para ti) · mama, amor, grado, cumple (para regalar)
   Se carga ANTES de main.js: pinta las piezas y main.js les conecta "agregar".
   ========================================================= */
(() => {
  const PLATA = 'Plata 925 · Circones';
  const ESM = 'Plata 925 · Esmeralda natural';
  const DESC_ESM = 'Esmeralda natural colombiana. Se entrega con garantía de por vida.';

  // [n foto, id, nombre, precio, tipo, momentos, descripción (opcional)]  — sin género: la colección es para quien la quiera
  const DATOS = [
    [1, 'dije-con-cadena', 'Dije con cadena', 90000, 'cadenas', 'mama ti'],
    [2, 'pulsera-treboles', 'Pulsera Tréboles', 139000, 'pulseras', 'amor ti', 'Tejido tenis con circones y dijes de trébol.'],
    [3, 'pulsera-espiga', 'Pulsera Espiga', 130000, 'pulseras', 'grado ti'],
    [4, 'argolla-de-colores', 'Argolla de colores', 160000, 'anillos', 'ti amor'],
    [5, 'topos-de-color', 'Topos de color', 100000, 'aretes', 'ti grado', 'Disponibles en todos los colores.'],
    [6, 'candongas-con-circones', 'Candongas con circones', 150000, 'aretes', 'ti'],
    [7, 'juego-verde-y-blanco', 'Set verde y blanco', 200000, 'juegos', 'mama grado', 'Set en plata 925 con circones verdes y blancos.'],
    [8, 'anillo-corazon-verde', 'Anillo Corazón verde', 75000, 'anillos', 'amor', 'Circón verde en forma de corazón.'],
    [9, 'topos-con-halo', 'Topos con halo', 104000, 'aretes', 'mama ti'],
    [10, 'anillo-circones-alargados', 'Anillo de circones alargados', 140000, 'anillos', 'amor'],
    [11, 'juego-con-circones', 'Set con circones', 100000, 'juegos', 'grado ti'],
    [12, 'anillo-corazon', 'Anillo Corazón', 75000, 'anillos', 'amor', 'Circón en forma de corazón.'],
    [13, 'topos-con-circones', 'Topos con circones', 100000, 'aretes', 'ti'],
    [14, 'cadena-tejido-tenis', 'Cadena tejido tenis', 350000, 'cadenas', 'amor grado'],
    [15, 'juego-corazones', 'Set Corazones', 139000, 'juegos', 'amor', 'Circones en forma de corazón.'],
    [16, 'topos-cuadrado-negro', 'Topos cuadrado negro', 75000, 'aretes', 'ti', 'Circón cuadrado negro.'],
    [17, 'anillo-con-circon', 'Anillo con circón', 74997, 'anillos', 'ti'],
    [18, 'anillo-con-circones', 'Anillo con circones', 75000, 'anillos', 'amor'],
    [19, 'argolla-fina', 'Argolla fina con circones', 75000, 'anillos', 'amor'],
    [20, 'juego-cuadrado-verde', 'Set cuadrado verde', 274000, 'juegos', 'mama'],
    [21, 'candongas-pave', 'Candongas pavé', 132000, 'aretes', 'ti'],
    [22, 'topos-flor-con-perla', 'Topos Flor con perla', 75000, 'aretes', 'grado ti', 'En forma de flor, con perla y circones.'],
    [23, 'candongas-melcocha', 'Candongas Melcocha', 100000, 'aretes', 'ti', 'Candongas en plata 925 en forma de melcocha.'],
    [24, 'topos-circon-cuadrado', 'Topos circón cuadrado', 75000, 'aretes', 'ti cumple'],
    [25, 'dije-de-esmeralda', 'Dije de esmeralda', 400000, 'cadenas', 'mama amor', DESC_ESM],
    [26, 'dije-de-esmeralda-con-halo', 'Dije de esmeralda con halo', 500000, 'cadenas', 'mama', DESC_ESM],
    [27, 'anillo-de-esmeralda', 'Anillo de esmeralda', 250000, 'anillos', 'amor', DESC_ESM],
    [28, 'anillo-de-esmeralda-con-halo', 'Anillo de esmeralda con halo', 250000, 'anillos', 'amor mama', DESC_ESM],
    [29, 'topos-de-esmeralda', 'Topos de esmeralda', 400000, 'aretes', 'mama', DESC_ESM],
    [30, 'cruz-de-esmeralda', 'Cruz de esmeralda', 500000, 'cadenas', 'mama cumple', DESC_ESM],
    [31, 'anillo-cuadrado', 'Anillo cuadrado con circones', 96987, 'anillos', 'amor'],
    [32, 'pulsera-tejido-chino', 'Pulsera tejido chino', 227000, 'pulseras', 'ti cumple'],
    [33, 'topos-nudo', 'Topos Nudo', 98986, 'aretes', 'ti'],
    [34, 'candongas-anchas', 'Candongas anchas con circones', 132000, 'aretes', 'ti'],
    [35, 'anillo-entrelazado', 'Anillo entrelazado', 96000, 'anillos', 'amor'],
    [36, 'pulsera-tejido-tenis', 'Pulsera tejido tenis', 224000, 'pulseras', 'amor grado'],
    [37, 'topos-corazon', 'Topos Corazón', 75000, 'aretes', 'amor'],
    [38, 'cruz-con-circones', 'Cruz con circones', 98000, 'cadenas', 'grado cumple', 'Incluye cadena.'],
    [39, 'anillo-marquesa', 'Anillo Marquesa con halo', 104000, 'anillos', 'amor'],
    [40, 'topos-destello', 'Topos Destello', 80000, 'aretes', 'ti'],
    [41, 'juego-de-cruces', 'Set de cruces', 134000, 'juegos', 'mama grado'],
    [42, 'pulsera-de-hombre', 'Pulsera de hombre', 266000, 'pulseras', 'ti cumple'],
    [43, 'anillo-flor', 'Anillo Flor de circones', 112000, 'anillos', 'amor'],
    [44, 'anillo-circon-azul', 'Anillo circón azul', 150000, 'anillos', 'mama amor'],
    [45, 'argolla-eternidad', 'Argolla Eternidad', 75000, 'anillos', 'amor', 'Argolla de circones en talla marquesa, delicada y luminosa.'],
    // Llegaron el 20-nov-2026 (fotos y precios enviados por la clienta)
    [46, 'juego-dorado-con-circones', 'Set dorado con circones', 180000, 'juegos', 'ti', 'Set de collar y aretes en oro laminado de 18k con circones.'],
    [47, 'juego-corazones-azules', 'Set Corazones azules', 180000, 'juegos', 'amor', 'Collar y aretes en plata 925 con corazones de circón azul.']
  ];

  const ESMERALDAS = [25, 26, 27, 28, 29, 30];
  const ORO = [46];
  const NUEVAS = [46, 47];
  // Foto "puesta" (en la mano) de algunas piezas: aparece al pasar el mouse y como 2.ª foto en la ficha
  const PUESTA = [35, 39, 45];
  const CATALOGO = DATOS.map(([n, id, nombre, precio, tipo, momentos, desc]) => {
    const esm = ESMERALDAS.includes(n);
    const oro = ORO.includes(n);
    const nn = String(n).padStart(2, '0');
    return {
      n, id, nombre, precio, tipo,
      material: esm ? 'esmeraldas' : oro ? 'oro' : 'plata',
      rotulo: esm ? ESM : oro ? 'Oro laminado 18k · Circones' : PLATA,
      variante: esm ? 'Plata 925 · Esmeralda natural' : oro ? 'Oro laminado 18k' : 'Plata 925',
      momentos: momentos.split(' '),
      desc: desc || 'Pieza en plata 925 con circones.',
      sello: esm ? 'Esmeralda natural' : NUEVAS.includes(n) ? 'Recién llegado' : '',
      foto: `img/productos/${nn}.jpg`,
      foto2x: `img/productos/${nn}-2x.jpg`,  // versión grande (limpiada con IA + original, ver CLAUDE.md)
      puesta: PUESTA.includes(n) ? `img/productos/${nn}-puesta.jpg` : ''
    };
  });

  // Orden de la vitrina del inicio: lo recién llegado primero, luego una selección variada y el resto
  const PRIMERO = [46, 47, 28, 14, 2, 25, 35, 4, 20, 7, 36, 39, 12, 21, 30, 42, 45, 22, 29, 44];
  const ORDEN_INICIO = [...PRIMERO, ...DATOS.map((d) => d[0]).filter((n) => !PRIMERO.includes(n))];

  const NOMBRE_TIPO = { anillos: 'Anillos', aretes: 'Aretes', cadenas: 'Cadenas y dijes', pulseras: 'Pulseras', juegos: 'Sets' };
  const pesos = (n) => '$' + Math.round(n).toLocaleString('es-CO');
  const porId = (id) => CATALOGO.find((p) => p.id === id);
  const desde = (filtro) => Math.min(...CATALOGO.filter(filtro).map((p) => p.precio));

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
    const html = ORDEN_INICIO.map((n, i) => pieza(CATALOGO[n - 1], i, i < 3 ? 'eager' : 'lazy')).join('');
    if (mandos) mandos.insertAdjacentHTML('beforebegin', html); else pista.insertAdjacentHTML('afterbegin', html);
  }
  /* ---------- El estuche: las seis esmeraldas del catálogo (inicio) ---------- */
  const estuche = document.querySelector('[data-estuche]');
  if (estuche) {
    estuche.innerHTML = CATALOGO.filter((p) => p.material === 'esmeraldas').map((p, i) => `
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
