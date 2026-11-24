/* =========================================================
   VALIENTTE JOYERÍA — JavaScript general
   1. Configuración          2. WhatsApp (enlaces y asistente)
   3. Header + menú          4. La ventana (hero)
   5. (la esmeralda está en js/piedra.js)
   7. Apariciones            8. Vitrina (tipo + material)
   9. Bolsa (carrito)
   Sin librerías. Respeta "reducir movimiento".
   ========================================================= */

/* ---------- 1. CONFIGURACIÓN: cambiar aquí ---------- */
const CONFIG = {
  // Número de WhatsApp con indicativo, solo dígitos (ej: '573001234567').
  // Vacío = se usa el enlace corto de la bio de Instagram (no precarga el mensaje).
  whatsappNumero: '573106990102',   // número de su catálogo (vitrinapp)
  whatsappEnlace: 'https://wa.link/c60ecp',
  envioGratisDesde: 0,                // La clienta NO hace envíos gratis ni domicilios (24-nov-2026): dejar en 0
  claveCarrito: 'valientte-carrito'
};

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const limitar = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const suave = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const mezclar = (a, b, t) => a + (b - a) * t;
const pesos = (n) => (n > 0 ? '$' + Math.round(n).toLocaleString('es-CO') : '(precio pendiente)');  // 0 = precio aún sin confirmar
const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const conMouse = window.matchMedia('(hover: hover)').matches;

function urlWhatsApp(mensaje) {
  return CONFIG.whatsappNumero
    ? `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(mensaje)}`
    : CONFIG.whatsappEnlace;
}

let tToast;
function toast(texto) {
  const el = $('[data-toast]');
  if (!el) return;
  el.textContent = texto;
  el.classList.add('visible');
  clearTimeout(tToast);
  tToast = setTimeout(() => el.classList.remove('visible'), texto.length > 40 ? 4200 : 2400);
}

/* ---------- 2. WHATSAPP ---------- */
$$('[data-whatsapp]').forEach((a) => { a.href = urlWhatsApp('Hola Valientte, quiero asesoría para escoger una joya.'); });
$$('[data-wa-msg]').forEach((a) => { a.href = urlWhatsApp(a.dataset.waMsg); });

/* Mensaje directo de Instagram: Instagram NO deja escribir el texto por enlace (WhatsApp sí).
   Por eso, al tocar el botón, el mensaje se copia solo y se avisa: en el chat basta con pegar y enviar. */
const MENSAJE_IG = 'Hola Valientte, vi su página y quiero información sobre sus joyas.';
$$('a[href*="ig.me/m/"]').forEach((a) => a.addEventListener('click', () => {
  const texto = a.dataset.igMsg || MENSAJE_IG;
  try {
    navigator.clipboard.writeText(texto).then(() => toast('Mensaje copiado: pégalo en el chat y envíalo'), () => {});
  } catch (e) { /* sin portapapeles: el chat abre igual */ }
}));

const asistente = $('[data-asistente]');
if (asistente) {
  const boton = $('[data-abrir-asistente]', asistente);
  const abrir = (si) => {
    asistente.classList.toggle('abierto', si);
    boton.setAttribute('aria-expanded', String(si));
  };
  boton.addEventListener('click', () => abrir(!asistente.classList.contains('abierto')));
  $('[data-cerrar-asistente]', asistente).addEventListener('click', () => abrir(false));
  document.addEventListener('click', (e) => { if (!asistente.contains(e.target)) abrir(false); });
  // Saluda una vez a los pocos segundos y vuelve a su forma compacta.
  // En celular no: el texto desplegado tapaba títulos y precios.
  if (window.matchMedia('(min-width: 900px)').matches && !document.body.classList.contains('con-barra')) {
    setTimeout(() => asistente.classList.add('saluda'), 2500);
    setTimeout(() => asistente.classList.remove('saluda'), 7500);
  }
  window.Asistente = { cerrar: () => abrir(false) };
}

/* ---------- 2b. INSTAGRAM SIEMPRE A LA MANO ----------
   Burbuja tipo "historia" abajo a la izquierda en todas las páginas.
   Aparece después de la portada, se esconde donde ya está la sección de Instagram
   y el footer, y de vez en cuando dice algo para que no pase desapercibida. */
const IG_URL = 'https://www.instagram.com/joyeria.valientte/';
(() => {
  if (document.body.classList.contains('pagina-ig')) return;   // en la página de Instagram sobra
  const ig = document.createElement('a');
  ig.className = 'ig-flota';
  ig.href = IG_URL;
  ig.target = '_blank';
  ig.rel = 'noopener';
  ig.setAttribute('aria-label', 'Síguenos en Instagram: @joyeria.valientte');
  ig.innerHTML = `
    <span class="ig-flota__anillo" aria-hidden="true">
      <span class="ig-flota__cara">VL</span>
      <span class="ig-flota__insignia"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></span>
    </span>
    <span class="ig-flota__texto" aria-hidden="true"><b>@joyeria.valientte</b><span data-ig-frase>Lo nuevo sale aquí primero</span></span>`;
  document.body.appendChild(ig);

  // PENDIENTE: ajustar frases con la clienta (p. ej. si hacen sorteos o lives)
  const frases = ['Las novedades, aquí primero', 'Cada pieza, en quien la luce', 'Desde Manizales, con orgullo', 'Plata 925, esmeraldas y oro laminado'];
  const frase = $('[data-ig-frase]', ig);
  let n = 0, tHabla;
  const hablar = () => {
    if (!ig.classList.contains('visible')) return;
    if (asistente && (asistente.classList.contains('saluda') || asistente.classList.contains('abierto'))) return;
    frase.textContent = frases[n++ % frases.length];
    ig.classList.add('habla');
    clearTimeout(tHabla);
    tHabla = setTimeout(() => ig.classList.remove('habla'), 4200);
  };

  // dónde NO mostrarla: sobre la sección de Instagram y el footer
  const tapan = $$('#redes, #pedir, .footer');
  const visibles = new Set();
  let yaVista = false;
  const conVentana = !!$('[data-ventana]');
  const decidir = () => {
    const pasoPortada = window.scrollY > window.innerHeight * (conVentana ? 1.6 : 0.5);
    const mostrar = pasoPortada && visibles.size === 0;
    ig.classList.toggle('visible', mostrar);
    if (mostrar && !yaVista) { yaVista = true; setTimeout(hablar, 900); }
  };
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => (e.isIntersecting ? visibles.add(e.target) : visibles.delete(e.target)));
      decidir();
    }, { threshold: 0.15 });
    tapan.forEach((el) => obs.observe(el));
  }
  window.addEventListener('scroll', decidir, { passive: true });
  decidir();
  // Habla al aparecer y una sola vez más (antes era cada 22 s y competía con las piezas)
  setTimeout(hablar, 45000);
})();

/* ---------- 3. HEADER + MENÚ ---------- */
const header = $('#header');
const ventana = $('[data-ventana]');
let ultimoY = window.scrollY;
function estadoHeader() {
  const y = window.scrollY;
  const fin = ventana ? ventana.offsetTop + ventana.offsetHeight - 80 : 0;
  if (ventana) header.classList.toggle('solido', y > fin);
  if (y > Math.max(fin, 300) && y > ultimoY + 4) header.classList.add('oculto');
  if (y < ultimoY - 4 || y < fin) header.classList.remove('oculto');
  ultimoY = y;
}

const menu = $('#menu');
const botonMenu = $('[data-abrir-menu]');
const fondosMenu = menu ? $$('.menu__fondos img', menu) : [];
const opcionesMenu = menu ? $$('.opcion-menu', menu) : [];
let cicloMenu;
// Cada opción tiene su foto de fondo; aparece fundiéndose con el verde
const activarFondo = (i) => fondosMenu.forEach((f, j) => f.classList.toggle('activo', j === i));

function abrirMenu() {
  fondosMenu.forEach((i) => { i.loading = 'eager'; });
  menu.classList.add('abierto');
  botonMenu.setAttribute('aria-expanded', 'true');
  document.body.classList.add('sin-scroll');
  $('[data-cerrar-menu]', menu).focus();
  // En celular (sin mouse) las fotos van cambiando solas, despacio
  if (!conMouse && fondosMenu.length && !sinMovimiento) {
    let i = 0;
    activarFondo(0);
    cicloMenu = setInterval(() => { i = (i + 1) % fondosMenu.length; activarFondo(i); }, 3200);
  }
}
function cerrarMenu() {
  menu.classList.remove('abierto');
  botonMenu.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('sin-scroll');
  clearInterval(cicloMenu);
  activarFondo(-1);
}
if (menu && botonMenu) {
  botonMenu.addEventListener('click', abrirMenu);
  $$('[data-cerrar-menu]', menu).forEach((b) => b.addEventListener('click', cerrarMenu));
  opcionesMenu.forEach((o, i) => {
    o.addEventListener('mouseenter', () => activarFondo(i));
    o.addEventListener('focus', () => activarFondo(i));
  });
  const lista = $('.menu__lista', menu);
  if (lista && conMouse) lista.addEventListener('mouseleave', () => activarFondo(-1));
}

/* ---------- 4. LA VENTANA ----------
   Fase 1 (0–35 %): nace una ventana con forma de esmeralda en el centro.
   Fase 2 (35–100 %): crece hasta llenar la pantalla y aparece el lema. */
const vidrio = $('[data-vidrio]');
function pintarVentana() {
  if (!ventana || !vidrio) return;
  const W = window.innerWidth;
  const H = window.innerHeight;
  const p = limitar(-ventana.getBoundingClientRect().top / (ventana.offsetHeight - H));
  const f1 = suave(limitar(p / 0.35));
  const f2 = suave(limitar((p - 0.35) / 0.65));
  const w0 = W < 900 ? W * 0.62 : Math.min(W * 0.24, 400);
  const h0 = w0 * 1.28;
  const w = f2 > 0 ? mezclar(w0, W, f2) : w0 * f1;
  const h = f2 > 0 ? mezclar(h0, H, f2) : h0 * f1;
  const c = Math.min(w, h) * 0.16 * (1 - f2);
  vidrio.style.setProperty('--ix', (W - w) / 2 + 'px');
  vidrio.style.setProperty('--it', (H - h) / 2 + 'px');
  vidrio.style.setProperty('--ib', (H - h) / 2 + 'px');
  vidrio.style.setProperty('--c', c + 'px');
  ventana.style.setProperty('--p', p.toFixed(4));
  ventana.classList.toggle('lista', p > 0.8);
  header.classList.toggle('sobre-foto', p > 0.6 && p < 1);
}

/* ---------- 5. LA PIEDRA DE LOS VALIENTES: vive en js/piedra.js (solo en el inicio) ---------- */

/* Un solo bucle de scroll */
let pendiente = false;
function alHacerScroll() {
  if (pendiente) return;
  pendiente = true;
  requestAnimationFrame(() => {
    pendiente = false;
    if (header) estadoHeader();
    if (!sinMovimiento) pintarVentana();
  });
}
window.addEventListener('scroll', alHacerScroll, { passive: true });
window.addEventListener('resize', alHacerScroll);
alHacerScroll();

/* ---------- 7. APARICIONES AL HACER SCROLL ---------- */
const animables = $$('.aparecer, .revelar, .fundida, .dos__foto');
if ('IntersectionObserver' in window) {
  // Los .revelar y .fundida están recortados (clip-path / máscara): se vigila a su contenedor.
  const objetivos = new Map();
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      (objetivos.get(e.target) || []).forEach((el) => el.classList.add('visible'));
      obs.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  animables.forEach((el) => {
    const vigilado = el.matches('.revelar, .fundida, .dos__foto') ? el.parentElement : el;
    if (!objetivos.has(vigilado)) objetivos.set(vigilado, []);
    objetivos.get(vigilado).push(el);
    obs.observe(vigilado);
  });
} else {
  animables.forEach((el) => el.classList.add('visible'));
}

/* ---------- 8a. CARRETE (vitrina que se arrastra) ---------- */
const pista = $('[data-pista]');
let pintarCarrete = () => {};
if (pista) {
  const anterior = $('[data-anterior]');
  const siguiente = $('[data-siguiente]');
  const riel = $('[data-riel]');
  const mango = $('[data-mango]');
  const maximo = () => Math.max(0, pista.scrollWidth - pista.clientWidth);

  pintarCarrete = () => {
    const max = maximo();
    const p = max > 0 ? pista.scrollLeft / max : 0;
    const anchoRiel = riel.clientWidth;
    const anchoMango = Math.max(64, Math.min(anchoRiel, anchoRiel * pista.clientWidth / pista.scrollWidth));
    mango.style.width = anchoMango + 'px';
    mango.style.left = (anchoRiel - anchoMango) * p + 'px';
    anterior.disabled = pista.scrollLeft <= 2;
    siguiente.disabled = pista.scrollLeft >= max - 2;
    // las piezas cerca del centro se ven más grandes; la foto se mueve un poco (paralaje)
    const r0 = pista.getBoundingClientRect();
    const centro = r0.left + r0.width / 2;
    $$('.pieza:not([hidden])', pista).forEach((pz) => {
      const r = pz.getBoundingClientRect();
      const dx = limitar((r.left + r.width / 2 - centro) / (r0.width / 2), -1.5, 1.5);
      pz.style.setProperty('--d', Math.min(1, Math.abs(dx)).toFixed(3));
      pz.style.setProperty('--dx', dx.toFixed(3));
    });
  };
  let esperaCarrete = false;
  const alMover = () => {
    if (esperaCarrete) return;
    esperaCarrete = true;
    requestAnimationFrame(() => { esperaCarrete = false; pintarCarrete(); });
  };
  pista.addEventListener('scroll', alMover, { passive: true });
  window.addEventListener('resize', alMover);

  // Flechas
  const paso = () => {
    const pz = $('.pieza:not([hidden])', pista);
    const ancho = pz ? pz.getBoundingClientRect().width + 18 : 300;
    return window.innerWidth >= 900 ? ancho * 2 : ancho;
  };
  // desplazamiento animado propio (el "smooth" nativo falla en algunos celulares con scroll-snap)
  let animacion;
  const irA = (destino) => {
    cancelAnimationFrame(animacion);
    cancelAnimationFrame(inercia);
    const desde = pista.scrollLeft;
    const hasta = limitar(destino, 0, maximo());
    const t0 = performance.now();
    const dur = sinMovimiento ? 1 : 650;
    pista.classList.add('arrastrando');
    const paso_ = (t) => {
      const k = limitar((t - t0) / dur);
      pista.scrollLeft = mezclar(desde, hasta, suave(k));
      if (k < 1) animacion = requestAnimationFrame(paso_);
      else pista.classList.remove('arrastrando');
    };
    animacion = requestAnimationFrame(paso_);
  };
  pista.irA = irA;
  anterior.addEventListener('click', () => irA(pista.scrollLeft - paso()));
  siguiente.addEventListener('click', () => irA(pista.scrollLeft + paso()));
  pista.addEventListener('touchstart', () => { cancelAnimationFrame(animacion); pista.classList.remove('arrastrando'); }, { passive: true });

  // Arrastrar la pista con el mouse (con inercia suave)
  let x0 = 0, s0 = 0, ultimoX = 0, vel = 0, arrastrado = false, presionado = false, inercia;
  pista.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || e.target.closest('button')) return;
    presionado = true; arrastrado = false;
    x0 = ultimoX = e.clientX; s0 = pista.scrollLeft; vel = 0;
    cancelAnimationFrame(inercia);
  });
  window.addEventListener('pointermove', (e) => {
    if (!presionado) return;
    const dx = e.clientX - x0;
    if (!arrastrado && Math.abs(dx) > 5) { arrastrado = true; pista.classList.add('arrastrando'); }
    if (!arrastrado) return;
    vel = limitar(e.clientX - ultimoX, -28, 28);
    ultimoX = e.clientX;
    pista.scrollLeft = s0 - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!presionado) return;
    presionado = false;
    if (!arrastrado) return;
    const deslizar = () => {
      vel *= 0.93;
      pista.scrollLeft -= vel;
      if (Math.abs(vel) > 0.4) inercia = requestAnimationFrame(deslizar);
      else pista.classList.remove('arrastrando');
    };
    inercia = requestAnimationFrame(deslizar);
  });
  // si se arrastró, no abrir el producto al soltar
  pista.addEventListener('click', (e) => { if (arrastrado) { e.preventDefault(); e.stopPropagation(); arrastrado = false; } }, true);

  // Riel con manija que se arrastra (también con el dedo)
  let enRiel = false;
  const moverRiel = (x) => {
    const r = riel.getBoundingClientRect();
    const m = mango.getBoundingClientRect().width;
    const p = limitar((x - r.left - m / 2) / (r.width - m));
    pista.scrollLeft = p * maximo();
  };
  riel.addEventListener('pointerdown', (e) => {
    enRiel = true;
    riel.setPointerCapture(e.pointerId);
    pista.classList.add('arrastrando');
    moverRiel(e.clientX);
  });
  riel.addEventListener('pointermove', (e) => { if (enRiel) moverRiel(e.clientX); });
  const soltarRiel = () => { enRiel = false; pista.classList.remove('arrastrando'); };
  riel.addEventListener('pointerup', soltarRiel);
  riel.addEventListener('pointercancel', soltarRiel);

  pintarCarrete();
}

/* ---------- 8b. VITRINA: pestañas por tipo + filtro por material ---------- */
const piezas = $$('[data-grid-productos] .pieza');
const pestanas = $$('[data-pestanas] [data-tipo]');
const filtroActivo = $('[data-filtro-activo]');
const vitrinaVacia = $('[data-vitrina-vacia]');
const nombresMaterial = { plata: 'Plata 925', esmeraldas: 'Plata con esmeraldas', oro: 'Oro laminado 18k' };
const estado = { tipo: 'todo', material: null };

function pintarVitrina() {
  let visibles = 0;
  piezas.forEach((p) => {
    const ok = (estado.tipo === 'todo' || p.dataset.tipo === estado.tipo) && (!estado.material || p.dataset.material === estado.material);
    p.hidden = !ok;
    if (ok) { visibles++; p.classList.add('visible'); }
  });
  pestanas.forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tipo === estado.tipo)));
  // contadores de cada pestaña según el material elegido
  $$('[data-cuenta]').forEach((s) => {
    const t = s.dataset.cuenta;
    s.textContent = piezas.filter((p) => (t === 'todo' || p.dataset.tipo === t) && (!estado.material || p.dataset.material === estado.material)).length;
  });
  if (filtroActivo) {
    filtroActivo.innerHTML = estado.material
      ? `<span class="chip">Material: ${nombresMaterial[estado.material]}<button type="button" aria-label="Quitar filtro de material" data-quitar-material><svg width="14" height="14"><use href="#i-cerrar"/></svg></button></span>`
      : '';
  }
  if (vitrinaVacia) vitrinaVacia.hidden = visibles > 0;
  if (pista) {
    if (pista.irA) pista.irA(0); else pista.scrollLeft = 0;
    $('.carrete__mandos') && ($('.carrete__mandos').hidden = visibles === 0);
    requestAnimationFrame(pintarCarrete);
  }
}
/* Cambio suave: lo de adentro se desvanece, se cambia y las piezas vuelven a entrar
   una tras otra. Lo usan la vitrina y la colección (window.Valientte.cambioSuave). */
function cambioSuave(caja, aplicar, espera = 0) {
  if (!caja || sinMovimiento) { aplicar(); return; }
  clearTimeout(caja._t0); clearTimeout(caja._t1); clearTimeout(caja._t2);
  caja._t0 = setTimeout(() => {
    caja.classList.remove('entrando');
    caja.classList.add('saliendo');
    caja._t1 = setTimeout(() => {
      aplicar();
      let n = 0;
      $$('.pieza:not([hidden])', caja).forEach((el) => el.style.setProperty('--orden', n++));
      caja.classList.remove('saliendo');
      void caja.offsetWidth;               // reinicia las animaciones de entrada
      caja.classList.add('entrando');
      caja._t2 = setTimeout(() => caja.classList.remove('entrando'), 1500);
    }, 420);
  }, espera);
}

if (piezas.length) {
  const cajaVitrina = $('#vitrina .contenedor');
  // la pestaña responde al instante; las piezas cambian con suavidad
  const marcarPestanas = () => pestanas.forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tipo === estado.tipo)));
  pestanas.forEach((b) => b.addEventListener('click', () => { estado.tipo = b.dataset.tipo; marcarPestanas(); cambioSuave(cajaVitrina, pintarVitrina); }));
  filtroActivo && filtroActivo.addEventListener('click', (e) => {
    if (e.target.closest('[data-quitar-material]')) { estado.material = null; cambioSuave(cajaVitrina, pintarVitrina); }
  });
  $$('[data-ir-material], [data-ir-tipo]').forEach((a) => a.addEventListener('click', () => {
    estado.material = a.dataset.irMaterial || null;
    estado.tipo = a.dataset.irTipo || 'todo';
    marcarPestanas();
    // si la vitrina está lejos, primero se baja con suavidad y al llegar cambian las piezas
    const lejos = Math.abs(cajaVitrina.getBoundingClientRect().top) > window.innerHeight * .6;
    cambioSuave(cajaVitrina, pintarVitrina, lejos ? 550 : 0);
  }));
  pintarVitrina();
}

/* ---------- 8c. ENTRE PÁGINAS: la página se desvanece al salir y aparece al entrar ---------- */
if (!sinMovimiento) {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) return;   // mismo lugar: solo baja suave
    e.preventDefault();
    document.documentElement.classList.add('saliendo-pagina');
    setTimeout(() => { location.href = url.href; }, 380);
  });
  // al volver con "atrás" el navegador puede mostrar la página guardada: que no quede en blanco
  window.addEventListener('pageshow', () => document.documentElement.classList.remove('saliendo-pagina'));
}

// La foto de cada pieza también lleva a su ficha
$$('.pieza').forEach((p) => {
  const enlace = $('.tag__nombre a', p);
  const foto = $('.pieza__foto', p);
  if (!enlace || !foto) return;
  const a = document.createElement('a');
  a.className = 'pieza__enlace';
  a.href = enlace.href;
  a.tabIndex = -1;
  a.setAttribute('aria-hidden', 'true');
  foto.prepend(a);
});

/* =========================================================
   9. BOLSA (CARRITO)
   ========================================================= */
const Carrito = (() => {
  let items = leer();
  const panel = $('#carrito');
  const velo = $('[data-velo]');
  const lista = $('[data-carrito-items]');
  const vacio = $('[data-carrito-vacio]');
  const pie = $('[data-carrito-pie]');
  const total = $('[data-carrito-total]');
  const contador = $('[data-contador]');
  const envioTexto = $('[data-envio-texto]');
  const envioBarra = $('[data-envio-barra]');
  const finalizar = $('[data-finalizar]');
  let ultimoFoco = null;

  // La bolsa guardada se revisa contra el catálogo de HOY: precio y nombre actuales, fuera las piezas agotadas
  // o retiradas, y el texto se limpia (nadie puede meter código ni cambiar precios editando el navegador).
  function limpio(s) { return String(s ?? '').replace(/[<>"'&]/g, '').slice(0, 120); }
  function validar(lista) {
    if (!Array.isArray(lista)) return [];
    const cat = window.Catalogo;
    return lista.map((i) => {
      if (!i || typeof i !== 'object') return null;
      const p = cat ? cat.porId(i.id) : null;
      if (cat && !p) return null;
      const cant = Math.min(20, Math.max(1, Math.floor(Number(i.cant)) || 1));
      const variante = limpio(i.variante);
      return {
        clave: `${limpio(i.id)}|${variante}`, id: limpio(i.id), variante, cant,
        nombre: p ? p.nombre : limpio(i.nombre),
        precio: p ? p.precio : Math.max(0, Number(i.precio) || 0),
        img: p ? p.foto : (/^img\/[\w\/.-]+$/.test(i.img) ? i.img : '')
      };
    }).filter(Boolean);
  }
  function leer() { try { return validar(JSON.parse(localStorage.getItem(CONFIG.claveCarrito))); } catch { return []; } }
  function guardar() { try { localStorage.setItem(CONFIG.claveCarrito, JSON.stringify(items)); } catch { /* modo privado */ } }
  const subtotal = () => items.reduce((s, i) => s + i.precio * i.cant, 0);
  // si alguna pieza aún no tiene precio, el total lo dice (no se muestra una suma incompleta como si fuera la final)
  const totalTexto = () => { const t = subtotal(); const falta = items.some((i) => !(i.precio > 0)); return falta ? (t > 0 ? `${pesos(t)} + (precio pendiente)` : pesos(0)) : pesos(t); };
  const unidades = () => items.reduce((s, i) => s + i.cant, 0);

  function mensajePedido() {
    // UNA línea por pieza: nombre · material · precio (si son varias del mismo, "2 × ")
    const lineas = items.map((i) => `• ${i.cant > 1 ? `${i.cant} × ` : ''}${i.nombre} · ${i.variante} · ${pesos(i.precio * i.cant)}`);
    const total = items.length > 1 || (items[0] && items[0].cant > 1) ? `\n\nTotal: ${totalTexto()}` : '';
    return `Hola Valientte, quiero hacer este pedido:\n\n${lineas.join('\n')}${total}\n\n¿Me confirman disponibilidad, entrega y pago?`;
  }

  function render() {
    if (!panel) return;
    const n = unidades();
    contador.textContent = n;
    lista.innerHTML = items.map((i) => `
      <li class="item">
        <img src="${i.img}" alt="" width="70" height="88" loading="lazy">
        <div>
          <p class="item__nombre">${i.nombre}</p>
          <p class="item__var">${i.variante}</p>
          <div class="cantidad" role="group" aria-label="Cantidad de ${i.nombre}">
            <button type="button" data-accion="menos" data-clave="${i.clave}" aria-label="Quitar una">−</button>
            <output>${i.cant}</output>
            <button type="button" data-accion="mas" data-clave="${i.clave}" aria-label="Agregar una">+</button>
          </div>
        </div>
        <div style="display:grid;gap:.4rem;justify-items:end;align-content:start">
          <span class="item__precio">${pesos(i.precio * i.cant)}</span>
          <button type="button" class="item__quitar" data-accion="quitar" data-clave="${i.clave}">Quitar</button>
        </div>
      </li>`).join('');
    vacio.hidden = n > 0;
    pie.hidden = n === 0;
    lista.hidden = n === 0;
    total.textContent = totalTexto();
    // Barra de envío gratis: solo si la clienta confirma un monto (CONFIG.envioGratisDesde > 0)
    const cajaEnvio = envioTexto && envioTexto.closest('.envio');
    if (cajaEnvio) cajaEnvio.hidden = !CONFIG.envioGratisDesde;
    if (CONFIG.envioGratisDesde) {
      const falta = CONFIG.envioGratisDesde - subtotal();
      envioBarra.style.width = Math.min(100, (subtotal() / CONFIG.envioGratisDesde) * 100) + '%';
      envioTexto.innerHTML = falta > 0 ? `A <strong>${pesos(falta)}</strong> de tu envío sin costo` : '<strong>Tu envío es cortesía de la casa</strong>';
    }
    finalizar.href = urlWhatsApp(mensajePedido());
    pintarChat();
  }

  // "Así se pide" (inicio): el teléfono muestra el mensaje REAL de la bolsa, o el ejemplo si está vacía
  const chatPedido = $('[data-chat-pedido]');
  const chatEtiqueta = $('[data-chat-etiqueta]');
  const chatEnviar = $('[data-chat-enviar]');
  const chatEjemplo = chatPedido ? chatPedido.innerHTML : '';
  const escapar = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function pintarChat() {
    if (!chatPedido) return;
    const hay = items.length > 0;
    chatPedido.innerHTML = hay ? escapar(mensajePedido()).replace(/\n/g, '<br>') : chatEjemplo;
    if (chatEtiqueta) chatEtiqueta.textContent = hay ? 'Tu pedido, listo para enviar' : 'Así se ve tu mensaje';
    if (chatEnviar) {
      chatEnviar.href = hay ? urlWhatsApp(mensajePedido()) : urlWhatsApp('Hola Valientte, quiero asesoría para escoger una joya.');
      chatEnviar.querySelector('span').textContent = hay ? 'Enviar mi pedido' : 'Escribirnos ahora';
    }
  }

  function agregar({ id, nombre, variante, precio, img, cant = 1 }) {
    const clave = `${id}|${variante}`;
    const ya = items.find((i) => i.clave === clave);
    if (ya) ya.cant = Math.min(20, ya.cant + cant);
    else items.push({ clave, id, nombre, variante, precio: Number(precio), img, cant });
    guardar();
    render();
    contador.classList.remove('salto');
    void contador.offsetWidth;
    contador.classList.add('salto');
    toast(`${nombre} ya está en tu bolsa`);
  }

  function cambiar(clave, accion) {
    const it = items.find((i) => i.clave === clave);
    if (!it) return;
    if (accion === 'mas') it.cant = Math.min(20, it.cant + 1);
    if (accion === 'menos') it.cant--;
    if (accion === 'quitar' || it.cant <= 0) items = items.filter((i) => i.clave !== clave);
    guardar();
    render();
  }

  function abrir() {
    ultimoFoco = document.activeElement;
    if (window.Asistente) window.Asistente.cerrar();
    panel.classList.add('abierto');
    velo.classList.add('visible');
    document.body.classList.add('sin-scroll');
    $('[data-cerrar-carrito]', panel).focus();
  }
  function cerrar() {
    panel.classList.remove('abierto');
    velo.classList.remove('visible');
    document.body.classList.remove('sin-scroll');
    if (ultimoFoco) ultimoFoco.focus();
  }

  if (panel) {
    $$('[data-abrir-carrito]').forEach((b) => b.addEventListener('click', abrir));
    $$('[data-cerrar-carrito]').forEach((b) => b.addEventListener('click', cerrar));
    velo.addEventListener('click', cerrar);
    lista.addEventListener('click', (e) => {
      const b = e.target.closest('[data-accion]');
      if (b) cambiar(b.dataset.clave, b.dataset.accion);
    });
    panel.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const f = $$('a[href], button:not([disabled])', panel).filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    });
    render();
    // Varias pestañas abiertas: si en una se agrega o quita algo, las demás se ponen al día
    window.addEventListener('storage', (e) => { if (e.key === CONFIG.claveCarrito) { items = leer(); render(); } });
  }
  return { agregar, abrir, cerrar, estaAbierto: () => !!panel && panel.classList.contains('abierto') };
})();

$$('[data-agregar]').forEach((b) => {
  b.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const d = b.dataset;
    Carrito.agregar({ id: d.id, nombre: d.nombre, variante: d.variante, precio: d.precio, img: d.img });
    const uso = $('use', b);
    b.classList.add('listo');
    uso.setAttribute('href', '#i-check');
    setTimeout(() => { b.classList.remove('listo'); uso.setAttribute('href', '#i-mas'); }, 1400);
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (Carrito.estaAbierto()) Carrito.cerrar();
  if (menu && menu.classList.contains('abierto')) cerrarMenu();
  if (window.Asistente) window.Asistente.cerrar();
});

window.Valientte = { Carrito, CONFIG, pesos, urlWhatsApp, toast, cambioSuave };
