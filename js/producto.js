/* =========================================================
   VALIENTTE JOYERÍA — Página de producto
   - Galería (deslizar en celular, miniaturas en computador)
   - Variantes (material cambia el precio, talla)
   - Cantidad, agregar al carrito, pedir por WhatsApp
   - Barra fija de compra en celular
   - Guía de tallas
   ========================================================= */
(() => {
  const { Carrito, pesos, urlWhatsApp } = window.Valientte;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const ficha = $('[data-ficha]');
  if (!ficha) return;

  /* ---------- Galería ---------- */
  const galeria = $('[data-galeria]');
  const puntos = $$('[data-puntos] span');
  const miniaturas = $$('[data-miniaturas] button');
  const fotoActual = $('[data-foto-actual]');

  function marcar(indice) {
    puntos.forEach((p, i) => p.classList.toggle('activo', i === indice));
    miniaturas.forEach((m, i) => m.setAttribute('aria-current', String(i === indice)));
    if (fotoActual) fotoActual.textContent = String(indice + 1).padStart(2, '0');
  }

  let esperando;
  galeria.addEventListener('scroll', () => {
    cancelAnimationFrame(esperando);
    esperando = requestAnimationFrame(() => {
      marcar(Math.round(galeria.scrollLeft / galeria.clientWidth));
    });
  }, { passive: true });

  miniaturas.forEach((m, i) => m.addEventListener('click', () => {
    galeria.scrollTo({ left: i * galeria.clientWidth, behavior: 'smooth' });
    marcar(i);
  }));

  // Flechas del teclado dentro de la galería
  galeria.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    galeria.scrollBy({ left: dir * galeria.clientWidth, behavior: 'smooth' });
  });

  /* ---------- Variantes, precio y cantidad ---------- */
  const form = $('[data-form-producto]');
  const precioBase = Number(ficha.dataset.precio);
  const precioMostrado = $('[data-precio-mostrado]');
  const precioBarra = $('[data-precio-barra]');
  const materialElegido = $('[data-material-elegido]');
  const salidaCantidad = $('[data-cantidad]');
  const pedirWhatsApp = $('[data-pedir-whatsapp]');
  let cantidad = 1;

  const esAnillo = ficha.dataset.tipo === 'anillos';
  function seleccion() {
    const material = $('input[name="material"]:checked', form);
    const talla = esAnillo ? $('input[name="talla"]:checked', form) : null;
    const precio = precioBase + Number(material.dataset.extra || 0);
    return {
      material: material.value,
      talla: talla ? talla.value : '',
      precio,
      variante: ficha.dataset.variante + (talla ? ` · Talla ${talla.value}` : '')
    };
  }

  function actualizar() {
    const s = seleccion();
    precioMostrado.textContent = pesos(s.precio);
    precioBarra.textContent = pesos(s.precio);
    materialElegido.textContent = s.material;
    salidaCantidad.textContent = cantidad;
    pedirWhatsApp.href = urlWhatsApp(
      `Hola Valientte ✨ Quiero pedir:\n\n• ${cantidad} x ${ficha.dataset.nombre}\n• ${ficha.dataset.variante}${s.talla ? `\n• Talla ${s.talla}` : ''}\n• Precio: ${pesos(s.precio * cantidad)}\n\n¿Está disponible?`
    );
  }

  // atajos del asistente con el nombre de la pieza
  const nombre = ficha.dataset.nombre;
  $$('[data-wa-pieza]').forEach((a) => {
    a.href = urlWhatsApp(a.dataset.waPieza === 'regalo'
      ? `Hola Valientte ✨ Quiero ver ${nombre} en persona, ¿me mandan más fotos o un video?`
      : `Hola Valientte ✨ ¿${nombre} está disponible?`);
  });

  form.addEventListener('change', actualizar);
  $('[data-mas]', form).addEventListener('click', () => { cantidad = Math.min(10, cantidad + 1); actualizar(); });
  $('[data-menos]', form).addEventListener('click', () => { cantidad = Math.max(1, cantidad - 1); actualizar(); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const s = seleccion();
    Carrito.agregar({
      id: ficha.dataset.id,
      nombre: ficha.dataset.nombre,
      variante: s.variante,
      precio: s.precio,
      img: ficha.dataset.img,
      cant: cantidad
    });
    Carrito.abrir();
  });

  actualizar();

  /* ---------- Barra fija de compra (celular) ---------- */
  const barra = $('[data-barra-compra]');
  const botonPrincipal = $('[data-boton-agregar]');
  if (barra && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entrada]) => {
      // Aparece solo cuando el botón principal quedó ARRIBA (ya lo pasaste)
      const visible = !entrada.isIntersecting && entrada.boundingClientRect.top < 0;
      barra.classList.toggle('visible', visible);
      barra.setAttribute('aria-hidden', String(!visible));
      $('[data-agregar-barra]', barra).tabIndex = visible ? 0 : -1;
    }).observe(botonPrincipal);
    $('[data-agregar-barra]', barra).addEventListener('click', () => form.requestSubmit());
    // en celular, mientras se ven los botones de compra, el WhatsApp flotante se aparta (los tapaba)
    const compra = $('.compra');
    if (compra) new IntersectionObserver(([e]) => document.body.classList.toggle('compra-visible', e.isIntersecting)).observe(compra);
  }

  /* ---------- Guía de tallas ---------- */
  const dialogo = $('#guia-tallas');
  $$('[data-abrir-tallas]').forEach((b) => b.addEventListener('click', (e) => {
    e.preventDefault();
    if (dialogo.showModal) dialogo.showModal();
  }));
  $('[data-cerrar-dialogo]', dialogo).addEventListener('click', () => dialogo.close());
  // "Guía de tallas" del footer de otras páginas llega con #tallas: se abre sola
  if (location.hash === '#tallas' && dialogo.showModal) setTimeout(() => dialogo.showModal(), 600);
  // Clic fuera de la ventana la cierra
  dialogo.addEventListener('click', (e) => { if (e.target === dialogo) dialogo.close(); });
})();
