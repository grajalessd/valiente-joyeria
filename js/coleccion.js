/* =========================================================
   VALIENTTE — Página de colección: el catálogo completo (sin división por género ni "para regalar")
   - Pinta todas las piezas una sola vez (main.js les conecta "agregar").
   - Filtros: para quién (portada), momento, tipo de joya y material.
   - Se carga ANTES de main.js.
   Las piezas son las del catálogo real (js/catalogo.js).
   ========================================================= */
(() => {
  // Catálogo REAL: viene de js/catalogo.js (se carga antes)
  const { CATALOGO: PIEZAS, pieza } = window.Catalogo;

  // Un solo catálogo (la clienta no quiere división por género ni por regalo)
  const PARA = {
    todo: {
      rotulo: 'Catálogo completo', palabra: 'Colección', titulo: 'Colección', frase: 'Toda nuestra colección, en un solo lugar.', color: '#0D3B2C',
      ayuda: 'Si no encuentras lo que buscas, lo conseguimos por encargo.',
      msg: 'Hola Valientte ✨ ¿Me comparten el catálogo completo?',
      grupo: () => true
    }
  };

  const MOMENTOS = {
    todo: []
  };

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const pesos = (n) => '$' + Math.round(n).toLocaleString('es-CO');

  const estante = $('[data-estante]');
  if (!estante) return;

  // ---------- pintar piezas (una sola vez) ----------
  estante.innerHTML = PIEZAS.map((p, i) => pieza(p, i, i < 4 ? 'eager' : 'lazy')).join('');

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
    PARA[estado.para].grupo(p) &&
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
    marcarBotones();
  }

  // los botones responden al instante; las piezas se van y vuelven a entrar con suavidad
  function marcarBotones() {
    $$('[data-col-tipos] [data-tipo]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tipo === estado.tipo)));
    $$('[data-col-metales] [data-metal]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.metal === estado.metal)));
    $$('[data-momento]', momentosCaja).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.momento === estado.momento)));
  }
  const cajaEstante = $('.col-estante .contenedor');
  function pintarSuave() {
    marcarBotones();
    if (window.Valientte && window.Valientte.cambioSuave) window.Valientte.cambioSuave(cajaEstante, pintarPiezas);
    else pintarPiezas();
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
      document.title = `${d.titulo} · Valientte Joyería`;
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
    pintarSuave();
  }));
  momentosCaja.addEventListener('click', (e) => {
    const b = e.target.closest('[data-momento]');
    if (!b) return;
    estado.momento = b.dataset.momento;
    pintarSuave();
  });
  $$('[data-col-tipos] [data-tipo]').forEach((b) => b.addEventListener('click', () => { estado.tipo = b.dataset.tipo; pintarSuave(); }));
  $$('[data-col-metales] [data-metal]').forEach((b) => b.addEventListener('click', () => { estado.metal = b.dataset.metal; pintarSuave(); }));

  // Header: legible sobre la portada oscura y sólido al bajar
  const header = $('#header');
  const alto = () => hero.offsetHeight - 70;
  const pintarHeader = () => {
    const abajo = window.scrollY > alto();
    header.classList.toggle('solido', abajo);
    header.classList.toggle('sobre-foto', !abajo && estado.para !== 'ti');
  };
  window.addEventListener('scroll', pintarHeader, { passive: true });
  hero.addEventListener('transitionend', pintarHeader);

  pintarPortada(false);
  pintarMomentos();
  pintarPiezas();
  pintarHeader();
  // (sin selector de portada: estos enlaces ya no existen, se deja por si vuelve)
  $$('[data-ir-para]').forEach((a) => a.addEventListener('click', () => setTimeout(pintarHeader, 460)));
})();
