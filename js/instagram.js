/* =========================================================
   VALIENTTE — Página de Instagram
   - Historias DESTACADAS (como las de su perfil, sin horas):
     círculos con nombre; al tocar uno se ve en el visor. Avanzan solas (5 s),
     se tocan a la izquierda/derecha, se pausan al dejar el dedo presionado
     y al terminar una destacada pasa a la siguiente.
     Se puede abrir una directo con instagram.html#esmeraldas (lo usa el inicio).
   - Hashtag #MujerValiente: se copia al tocarlo.
   ========================================================= */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Fotos reales del catálogo (número de img/productos). PENDIENTE: cambiar por sus destacadas reales (verticales 1080x1920).
  const foto = (n, w) => `img/productos/${String(n).padStart(2, '0')}${w > 300 ? '-2x' : ''}.jpg`;

  const DESTACADAS = [
    { id: 'novedades', nombre: 'Novedades', portada: 2, historias: [
      { f: 2, t: 'Las novedades,<br><i>aquí primero</i>' },
      { f: 21, t: 'Recién llegadas<br>a la <i>vitrina</i>' } ] },
    { id: 'esmeraldas', nombre: 'Esmeraldas', portada: 26, historias: [
      { f: 26, t: 'La piedra de<br>los <i>valientes</i>' },
      { f: 29, t: 'Esmeralda<br><i>colombiana</i>' } ] },
    { id: 'mujervaliente', nombre: '#MujerValiente', portada: 25, historias: [
      { f: 25, t: '<i>#MujerValiente</i><br>tu historia, en la nuestra' },
      { f: 9, t: 'Cada pieza,<br><i>en quien la luce</i>' } ] },
    { id: 'plata', nombre: 'Plata 925', portada: 36, historias: [
      { f: 36, t: 'Plata 925,<br><i>para siempre</i>' },
      { f: 14, t: 'Brillo que se queda<br><i>contigo</i>' } ] },
    { id: 'clientes', nombre: 'Clientes', portada: 8, historias: [
      { f: 8, t: 'Nuestros <i>clientes</i>,<br>nuestro orgullo' } ] }
  ];

  const lista = $('[data-destacadas]');
  const caja = $('[data-historia]');
  if (lista && caja) {
    const barrasCaja = $('[data-historia-barras]', caja);
    const slidesCaja = $('[data-historia-slides]', caja);
    const nombre = $('[data-historia-nombre]', caja);
    let d = 0, actual = 0, barras = [], slides = [];

    // círculos de las destacadas
    lista.innerHTML = DESTACADAS.map((x, i) => `
      <li><button type="button" data-destacada="${i}" aria-label="Ver la destacada ${x.nombre}">
        <span class="anillo-ig"><img src="${foto(x.portada, 200)}" width="100" height="100" alt=""></span>${x.nombre}
      </button></li>`).join('');
    const botones = $$('[data-destacada]', lista);

    function abrir(n, desdeElFinal = false) {
      d = (n + DESTACADAS.length) % DESTACADAS.length;
      const x = DESTACADAS[d];
      slidesCaja.innerHTML = x.historias.map((h, i) => `
        <figure class="ig-historia__slide">
          <img src="${foto(h.f, 700)}" width="700" height="1240" ${i ? 'loading="lazy"' : ''} alt="">
          <figcaption>${h.t}</figcaption>
        </figure>`).join('');
      barrasCaja.innerHTML = x.historias.map(() => '<span><i></i></span>').join('');
      slides = $$('.ig-historia__slide', slidesCaja);
      barras = $$('i', barrasCaja);
      barras.forEach((b) => b.addEventListener('animationend', () => mostrar(actual + 1)));
      nombre.textContent = x.nombre;
      botones.forEach((b, i) => b.setAttribute('aria-current', i === d ? 'true' : 'false'));
      // la destacada elegida queda centrada en la fila (en celular se desliza)
      const li = botones[d].parentElement;
      lista.scrollTo({ left: li.offsetLeft - (lista.clientWidth - li.offsetWidth) / 2, behavior: quieto ? 'auto' : 'smooth' });
      mostrar(desdeElFinal ? slides.length - 1 : 0);
    }

    function mostrar(n) {
      if (n >= slides.length) return abrir(d + 1);               // terminó: pasa a la siguiente destacada
      if (n < 0) return abrir(d - 1, true);                      // antes de la primera: vuelve a la anterior
      actual = n;
      slides.forEach((s, i) => s.classList.toggle('activa', i === actual));
      barras.forEach((b, i) => {
        b.classList.remove('corre');
        b.classList.toggle('llena', i < actual);
        void b.offsetWidth;                                       // reinicia la animación
        if (i === actual) b.classList.add('corre');
      });
    }

    botones.forEach((b, i) => b.addEventListener('click', () => {
      abrir(i);
      // en celular el visor queda debajo: se baja hasta él
      if (caja.getBoundingClientRect().top > window.innerHeight * .5) caja.scrollIntoView({ behavior: quieto ? 'auto' : 'smooth', block: 'center' });
    }));
    $('[data-historia-sigue]', caja).addEventListener('click', () => mostrar(actual + 1));
    $('[data-historia-atras]', caja).addEventListener('click', () => mostrar(actual - 1));

    // dejar el dedo presionado pausa (como en Instagram)
    const pausar = (si) => caja.classList.toggle('pausada', si);
    caja.addEventListener('pointerdown', () => pausar(true));
    ['pointerup', 'pointercancel', 'pointerleave'].forEach((ev) => caja.addEventListener(ev, () => pausar(false)));

    // solo corre cuando se ve en pantalla
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => caja.classList.toggle('fuera', !e.isIntersecting), { threshold: 0.3 }).observe(caja);
    }
    if (quieto) caja.classList.add('quieta');

    // abrir la destacada que pide el enlace (instagram.html#esmeraldas)
    const pedida = DESTACADAS.findIndex((x) => x.id === location.hash.slice(1));
    abrir(pedida >= 0 ? pedida : 0);
    if (pedida >= 0) setTimeout(() => caja.scrollIntoView({ behavior: 'auto', block: 'center' }), 60);
  }

  /* ---------- Copiar el hashtag ---------- */
  $$('[data-copiar]').forEach((b) => b.addEventListener('click', async () => {
    const texto = b.dataset.copiar;
    try { await navigator.clipboard.writeText(texto); }
    catch {
      const t = document.createElement('textarea');
      t.value = texto; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); } catch { /* sin permiso */ }
      t.remove();
    }
    b.classList.add('copiado');
    setTimeout(() => b.classList.remove('copiado'), 1600);
    if (window.Valientte) window.Valientte.toast(`${texto} copiado ✨ Úsalo en tu publicación`);
  }));
})();
