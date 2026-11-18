/* =========================================================
   VALIENTTE — Página de colección (Ella / Él / Todo)
   - Pinta todas las piezas una sola vez (main.js les conecta "agregar").
   - Filtros: para quién (portada), momento, tipo de joya y material.
   - Se carga ANTES de main.js.
   PENDIENTE: productos, fotos y precios reales de la clienta.
   ========================================================= */
(() => {
  const foto = (id, w = 600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

  // para: ella | el (una pieza puede servir para los dos)
  // momentos: ver MOMENTOS más abajo
  const PIEZAS = [
    { id: 'collar-aurora', nombre: 'Collar Aurora', tipo: 'collares', material: 'plata', rotulo: 'Plata 925 · Circones', precio: 139900, variante: 'Plata 925', f1: 'photo-1573408301185-9146fe634ad0', f2: 'photo-1608613381851-6a058de0dc11', para: ['ella'], momentos: ['mama', 'ti'], sello: 'Favorito' },
    { id: 'anillo-muzo', nombre: 'Anillo Muzo', tipo: 'anillos', material: 'esmeraldas', rotulo: 'Plata 925 · Esmeralda', precio: 189900, variante: 'Plata 925 · Talla 7', f1: 'photo-1685970730959-eb22c7b2bcd9', f2: 'photo-1685970732254-d2d1f43ddc7c', para: ['ella'], momentos: ['amor', 'mama'], sello: 'Novedad', verde: true },
    { id: 'aretes-gota-verde', nombre: 'Aretes Gota Verde', tipo: 'aretes', material: 'esmeraldas', rotulo: 'Plata 925 · Esmeralda', precio: 159900, variante: 'Plata 925', f1: 'photo-1731929315875-3ab60c006577', f2: 'photo-1655328723829-3140909b335b', para: ['ella'], momentos: ['mama', 'grado'] },
    { id: 'anillo-vintage', nombre: 'Anillo Vintage', tipo: 'anillos', material: 'rodio', rotulo: 'Rodio · Circones', precio: 69900, variante: 'Rodio · Talla 7', f1: 'photo-1591209608777-fb022eac7112', f2: 'photo-1612239396116-4da3087f8f79', para: ['ella'], momentos: ['ti'] },
    { id: 'anillo-pave', nombre: 'Anillo Pavé', tipo: 'anillos', material: 'rodio', rotulo: 'Rodio · Circones', precio: 79900, variante: 'Rodio · Talla 7', f1: 'photo-1550368566-f9cc32d7392d', f2: 'photo-1762505464529-1a37df13674f', para: ['ella'], momentos: ['amor', 'ti'], sello: '−15%' },
    { id: 'collar-corazon', nombre: 'Collar Corazón', tipo: 'collares', material: 'plata', rotulo: 'Plata 925', precio: 99900, variante: 'Plata 925', f1: 'photo-1588444968576-f8fe92ce56fd', f2: 'photo-1621939745912-aad97fd3a34d', para: ['ella'], momentos: ['amor', 'mama'] },
    { id: 'aretes-luna', nombre: 'Aretes Luna', tipo: 'aretes', material: 'plata', rotulo: 'Plata 925', precio: 89900, variante: 'Plata 925', f1: 'photo-1573717008136-5a9f0820e8bf', f2: 'photo-1553018561-d068dedd80b0', para: ['ella'], momentos: ['ti', 'grado'] },
    { id: 'pulsera-riviera', nombre: 'Pulsera Riviera', tipo: 'pulseras', material: 'rodio', rotulo: 'Rodio · Circones', precio: 99900, variante: 'Rodio', f1: 'photo-1763029513623-37d488cb97b1', f2: 'photo-1762505464779-17f78cbfa8b4', para: ['ella'], momentos: ['grado', 'amor'] },
    { id: 'collar-jardin', nombre: 'Collar Jardín', tipo: 'collares', material: 'esmeraldas', rotulo: 'Plata 925 · Esmeralda', precio: 119900, variante: 'Plata 925', f1: 'photo-1676329945867-01c9975aa9d1', f2: 'photo-1685970732254-d2d1f43ddc7c', para: ['ella'], momentos: ['mama', 'grado'], sello: 'Piedra de mayo', verde: true },
    { id: 'aretes-argolla', nombre: 'Argollas Finas', tipo: 'aretes', material: 'acero', rotulo: 'Acero inoxidable', precio: 39900, variante: 'Acero', f1: 'photo-1553018561-d068dedd80b0', f2: 'photo-1573717008136-5a9f0820e8bf', para: ['ella'], momentos: ['ti'] },
    // Línea hombre (y piezas que sirven para los dos)
    { id: 'pulsera-eslabon', nombre: 'Pulsera Eslabón', tipo: 'pulseras', material: 'acero', rotulo: 'Acero inoxidable', precio: 59900, variante: 'Acero', f1: 'photo-1605884878538-6468614df578', f2: 'photo-1761222101900-9c9e34fac2ce', para: ['el', 'ella'], momentos: ['diario', 'cumple'], sello: 'Favorito' },
    { id: 'collar-arbol', nombre: 'Collar Árbol de la Vida', tipo: 'collares', material: 'acero', rotulo: 'Acero inoxidable', precio: 54900, variante: 'Acero', f1: 'photo-1636103952204-0b738c225264', f2: 'photo-1585053736987-f817dc225fc5', para: ['el', 'ella'], momentos: ['primera', 'ti'] },
    { id: 'pulsera-noche', nombre: 'Pulsera Noche', tipo: 'pulseras', material: 'acero', rotulo: 'Acero · Cuero', precio: 49900, variante: 'Acero negro', f1: 'photo-1639065643006-e217c4fee12e', f2: 'photo-1605884878538-6468614df578', para: ['el'], momentos: ['diario', 'primera'], sello: 'Novedad', verde: true },
    { id: 'cadena-barbada', nombre: 'Cadena Barbada', tipo: 'collares', material: 'plata', rotulo: 'Plata 925 · 60 cm', precio: 169900, variante: 'Plata 925', f1: 'photo-1761222101900-9c9e34fac2ce', f2: 'photo-1636103952204-0b738c225264', para: ['el'], momentos: ['cumple', 'amor'] },
    { id: 'anillo-sello-muzo', nombre: 'Sello Muzo', tipo: 'anillos', material: 'esmeraldas', rotulo: 'Plata 925 · Esmeralda', precio: 229900, variante: 'Plata 925 · Talla 10', f1: 'photo-1685970732254-d2d1f43ddc7c', f2: 'photo-1685970730959-eb22c7b2bcd9', para: ['el'], momentos: ['amor', 'cumple'], verde: true },
    { id: 'anillo-banda', nombre: 'Anillo Banda', tipo: 'anillos', material: 'acero', rotulo: 'Acero inoxidable', precio: 44900, variante: 'Acero · Talla 10', f1: 'photo-1612239396116-4da3087f8f79', f2: 'photo-1591209608777-fb022eac7112', para: ['el'], momentos: ['diario', 'primera'] },
    { id: 'collar-placa', nombre: 'Collar Placa', tipo: 'collares', material: 'acero', rotulo: 'Acero · Grabado gratis', precio: 64900, variante: 'Acero', f1: 'photo-1585053736987-f817dc225fc5', f2: 'photo-1636103952204-0b738c225264', para: ['el'], momentos: ['cumple', 'primera'] },
    { id: 'topos-plata', nombre: 'Topos Punto', tipo: 'aretes', material: 'plata', rotulo: 'Plata 925', precio: 49900, variante: 'Plata 925', f1: 'photo-1621939745912-aad97fd3a34d', f2: 'photo-1553018561-d068dedd80b0', para: ['el', 'ella'], momentos: ['diario', 'ti'] }
  ];

  const PARA = {
    ella: {
      rotulo: '#MujerValiente', palabra: 'Ella', frase: 'Para la que se atreve a brillar sin pedir permiso.', color: '#E0662E',
      ayuda: 'Cuéntanos para quién es y te proponemos tres piezas pensadas para esa persona.',
      msg: 'Hola Valientte ✨ Busco una joya para ella, ¿me ayudas a escoger?'
    },
    el: {
      rotulo: 'Línea hombre', palabra: 'Él', frase: 'Porque ellos también llevan la elegancia.', color: '#1A1714',
      ayuda: '¿Su primera joya? Te guiamos con la medida de la pulsera o del anillo.',
      msg: 'Hola Valientte ✨ Busco una joya para él, ¿me ayudas a escoger?'
    },
    todo: {
      rotulo: 'Catálogo completo', palabra: 'Todo', frase: 'Toda nuestra colección, en un solo lugar.', color: '#0D3B2C',
      ayuda: 'Si no encuentras lo que buscas, lo conseguimos por encargo.',
      msg: 'Hola Valientte ✨ ¿Me compartes el catálogo completo?'
    }
  };

  const MOMENTOS = {
    ella: [['', 'Todo'], ['mama', 'Para mamá'], ['amor', 'Aniversario'], ['grado', 'Grado'], ['ti', 'Un gusto para mí']],
    el: [['', 'Todo'], ['diario', 'Para el día a día'], ['primera', 'Su primera joya'], ['cumple', 'Cumpleaños'], ['amor', 'Aniversario']],
    todo: []
  };

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const pesos = (n) => '$' + Math.round(n).toLocaleString('es-CO');

  const estante = $('[data-estante]');
  if (!estante) return;

  // ---------- pintar piezas (una sola vez) ----------
  estante.innerHTML = PIEZAS.map((p, i) => `
    <article class="pieza aparecer" data-id="${p.id}" data-tipo="${p.tipo}" data-material="${p.material}">
      <div class="pieza__foto">
        ${p.sello ? `<span class="pieza__sello ${p.verde ? 'pieza__sello--verde' : 'pieza__sello--naranja'} rotulo">${p.sello}</span>` : ''}
        <img src="${foto(p.f1)}" width="480" height="600" loading="${i < 4 ? 'eager' : 'lazy'}" alt="${p.nombre} en ${p.rotulo.toLowerCase()}">
        <img class="alterna" src="${foto(p.f2)}" width="480" height="600" loading="lazy" alt="">
        <button class="pieza__agregar" type="button" aria-label="Agregar ${p.nombre} a la bolsa" data-agregar data-id="${p.id}" data-nombre="${p.nombre}" data-precio="${p.precio}" data-variante="${p.variante}" data-img="${foto(p.f1, 200)}"><svg aria-hidden="true"><use href="#i-mas"/></svg></button>
      </div>
      <div class="tag" style="--giro:${i % 3 === 1 ? 2 : i % 3 === 2 ? -1.5 : -3}deg"><span class="rotulo">${p.rotulo}</span><h3 class="tag__nombre"><a href="producto.html">${p.nombre}</a></h3><span class="tag__precio">${pesos(p.precio)}</span></div>
    </article>`).join('');

  const fichas = $$('.pieza', estante);
  const datos = new Map(PIEZAS.map((p) => [p.id, p]));

  // ---------- estado ----------
  const params = new URLSearchParams(location.search);
  const estado = {
    para: PARA[params.get('para')] ? params.get('para') : 'todo',
    momento: '',
    tipo: 'todo',
    metal: ''
  };

  const hero = $('[data-col-hero]');
  const momentosCaja = $('[data-momentos]');
  const cuenta = $('[data-col-cuenta]');
  const vacia = $('[data-col-vacia]');
  const meta = $('meta[name="theme-color"]');

  const cumple = (p, sin = {}) =>
    (estado.para === 'todo' || p.para.includes(estado.para)) &&
    (sin.momento || !estado.momento || p.momentos.includes(estado.momento)) &&
    (sin.tipo || estado.tipo === 'todo' || p.tipo === estado.tipo) &&
    (sin.metal || !estado.metal || p.material === estado.metal);

  // escalonado por columnas: las columnas pares bajan un poco (solo cuenta las piezas visibles)
  function escalonar() {
    const cols = getComputedStyle(estante).gridTemplateColumns.split(' ').length;
    fichas.filter((f) => !f.hidden).forEach((f, i) => {
      const c = i % cols;
      f.classList.toggle('baja', cols === 3 ? c === 1 : c % 2 === 1);
    });
  }
  window.addEventListener('resize', escalonar);

  function pintarPiezas() {
    let n = 0;
    fichas.forEach((f) => {
      const ok = cumple(datos.get(f.dataset.id));
      f.hidden = !ok;
      f.classList.remove('baja');
      if (ok) { f.classList.add('visible'); f.style.setProperty('--orden', n); n++; }
    });
    escalonar();
    cuenta.textContent = n === 1 ? '1 pieza' : `${n} piezas`;
    vacia.hidden = n > 0;
    $$('[data-cuenta-col]').forEach((s) => {
      const t = s.dataset.cuentaCol;
      s.textContent = PIEZAS.filter((p) => cumple(p, { tipo: true }) && (t === 'todo' || p.tipo === t)).length;
    });
    $$('[data-col-tipos] [data-tipo]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tipo === estado.tipo)));
    $$('[data-col-metales] [data-metal]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.metal === estado.metal)));
    $$('[data-momento]', momentosCaja).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.momento === estado.momento)));
  }

  function pintarMomentos() {
    const lista = MOMENTOS[estado.para];
    momentosCaja.hidden = !lista.length;
    momentosCaja.innerHTML = lista.length
      ? `<span class="rotulo">¿Para qué momento?</span><div class="momentos__lista">${lista.map(([k, t]) => `<button type="button" class="momento" data-momento="${k}" aria-pressed="${k === estado.momento}">${t}</button>`).join('')}</div>`
      : '';
  }

  function pintarPortada(animar) {
    const d = PARA[estado.para];
    const cambiar = () => {
      hero.dataset.para = estado.para;
      $('[data-col-rotulo]').textContent = d.rotulo;
      $('[data-col-palabra]').textContent = d.palabra;
      $('[data-col-frase]').textContent = d.frase;
      $$('[data-foto]', hero).forEach((img) => img.classList.toggle('activa', img.dataset.foto === estado.para));
      $$('[data-ir-para]').forEach((a) => a.setAttribute('aria-current', a.dataset.irPara === estado.para ? 'true' : 'false'));
      document.title = `${estado.para === 'todo' ? 'Catálogo' : 'Para ' + d.palabra.toLowerCase()} · Valientte Joyería`;
      if (meta) meta.content = d.color;
      document.body.dataset.para = estado.para;
      // texto y mensaje de ayuda
      $('[data-col-ayuda-texto]').textContent = d.ayuda;
      const ayuda = $('[data-col-ayuda]');
      ayuda.dataset.waMsg = d.msg;
      if (window.Valientte) ayuda.href = window.Valientte.urlWhatsApp(d.msg);
      hero.classList.remove('cambiando');
    };
    if (!animar) return cambiar();
    hero.classList.add('cambiando');            // la palabra se desvanece...
    setTimeout(cambiar, 450);                   // ...cambia y vuelve a aparecer
  }

  // ---------- eventos ----------
  $$('[data-ir-para]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    const nuevo = a.dataset.irPara;
    if (nuevo === estado.para) return;
    estado.para = nuevo;
    estado.momento = '';
    history.replaceState(null, '', nuevo === 'todo' ? 'coleccion.html' : `coleccion.html?para=${nuevo}`);
    pintarPortada(true);
    pintarMomentos();
    pintarPiezas();
  }));
  momentosCaja.addEventListener('click', (e) => {
    const b = e.target.closest('[data-momento]');
    if (!b) return;
    estado.momento = b.dataset.momento;
    pintarPiezas();
  });
  $$('[data-col-tipos] [data-tipo]').forEach((b) => b.addEventListener('click', () => { estado.tipo = b.dataset.tipo; pintarPiezas(); }));
  $$('[data-col-metales] [data-metal]').forEach((b) => b.addEventListener('click', () => { estado.metal = b.dataset.metal; pintarPiezas(); }));

  // Header: legible sobre la portada oscura y sólido al bajar
  const header = $('#header');
  const alto = () => hero.offsetHeight - 70;
  const pintarHeader = () => {
    const abajo = window.scrollY > alto();
    header.classList.toggle('solido', abajo);
    header.classList.toggle('sobre-foto', !abajo && estado.para !== 'ella');
  };
  window.addEventListener('scroll', pintarHeader, { passive: true });
  hero.addEventListener('transitionend', pintarHeader);

  pintarPortada(false);
  pintarMomentos();
  pintarPiezas();
  pintarHeader();
  // al cambiar Ella/Él el header debe cambiar de color también
  $$('[data-ir-para]').forEach((a) => a.addEventListener('click', () => setTimeout(pintarHeader, 460)));
})();
