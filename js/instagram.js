/* =========================================================
   VALIENTTE — Página de Instagram
   - Historias: avanzan solas (5 s), se tocan a la izquierda/derecha,
     se pausan al dejar el dedo presionado o cuando no se ven.
   - Hashtag #MujerValiente: se copia al tocarlo.
   ========================================================= */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Historias ---------- */
  const caja = $('[data-historia]');
  if (caja) {
    const slides = $$('.ig-historia__slide', caja);
    const barras = $$('.ig-historia__barras i', caja);
    const hora = $('[data-historia-hora]', caja);
    let actual = 0;

    const mostrar = (n) => {
      actual = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('activa', i === actual));
      barras.forEach((b, i) => {
        b.classList.remove('corre');
        b.classList.toggle('llena', i < actual);
        void b.offsetWidth;                 // reinicia la animación
        if (i === actual) b.classList.add('corre');
      });
      if (hora) hora.textContent = slides[actual].dataset.hora || '';
    };

    barras.forEach((b) => b.addEventListener('animationend', () => mostrar(actual + 1)));
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
    mostrar(0);
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
    if (window.Valientte) window.Valientte.toast(`${texto} copiado: pégalo en tu foto ✨`);
  }));
})();
