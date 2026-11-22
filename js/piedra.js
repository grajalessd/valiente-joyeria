/* =========================================================
   VALIENTTE — "La piedra de los valientes": EL VIAJE DE LA ESMERALDA
   UNA sola pantalla con 5 capítulos que avanzan solos (o con el riel / tocando la piedra).
   No atrapa el scroll: se baja libremente (antes era un recorrido pegado de 520vh y cansaba).
     0 La roca     un cristal en bruto asoma en roca negra con vetas de calcita y pirita;
                   la luz verde se escapa por las grietas y la roca se abre en pedazos.
     1 La leyenda  caen las lágrimas de Fura y cada una enciende la piedra.
     2 La talla    el cristal hexagonal SE TRANSFORMA en talla esmeralda (saltan esquirlas).
     3 El jardín   la cámara se acerca de frente y se ven sus inclusiones por dentro.
     4 Tuya        la gema se funde en la foto real de la joya.
   La esmeralda es un modelo 3D de verdad (64 vértices, 58 caras) dibujado en <canvas> 2D,
   con luz, reflejos internos y destellos. Gira con el scroll y se inclina con el mouse.
   Ref: "Diamond Journey" de Sarine (del bruto al pulido al bajar) + Floema (gema 3D que responde).
   Sin librerías. Con "reducir movimiento" queda la versión quieta (CSS: .viaje.quieta).
   ========================================================= */
(() => {
  const viaje = document.querySelector('[data-viaje]');
  if (!viaje) return;
  const pegado = viaje.querySelector('.viaje__pegado');
  const lienzo = viaje.querySelector('.viaje__lienzo');
  const textos = [...viaje.querySelectorAll('.viaje__textos li')];
  const botones = [...viaje.querySelectorAll('[data-cap]')];
  const ctx = lienzo.getContext('2d');
  if (!ctx || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { viaje.classList.add('quieta'); return; }

  /* ---------- utilidades ---------- */
  const CAP = [0, .19, .38, .6, .8];          // dónde empieza cada capítulo (0–1)
  const IR_A = [0, .27, .49, .71, .97];       // a dónde salta cada botón del riel
  const TAU = Math.PI * 2;
  const lim = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const suave = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const mix = (a, b, t) => a + (b - a) * t;
  const tramo = (p, a, b) => suave(lim((p - a) / (b - a)));
  let semilla = 11;
  const azar = () => { semilla = (semilla * 16807) % 2147483647; return (semilla - 1) / 2147483646; };
  const entre = (a, b) => a + (b - a) * azar();

  /* ---------- 1. LA GEMA: dos formas con la misma estructura (8 anillos de 8 puntos) ----------
     Así el cristal en bruto puede transformarse punto por punto en la talla esmeralda. */
  const octo = (a, b, c) => [[-a + c, b], [a - c, b], [a, b - c], [a, -b + c], [a - c, -b], [-a + c, -b], [-a, -b + c], [-a, b - c]];
  const anillos = (def, ancho, largo, chaflan, dz) => def.flatMap(([sx, sy, z]) => {
    const a = ancho * sx, b = largo * sy;
    return octo(a, b, chaflan * Math.min(a, b)).map(([x, y]) => [x, y, z + dz]);
  });
  // talla esmeralda: mesa, 2 escalones de corona, filetín, 3 escalones de pabellón y quilla
  const TALLA = anillos([[.60, .62, .40], [.80, .81, .30], [.92, .93, .17], [1, 1, .06], [1, 1, -.02],
    [.80, .84, -.28], [.55, .66, -.52], [.14, .42, -.70]], .5, .66, .3, .15);
  // cristal de berilo: prisma hexagonal acostado, con las puntas rotas e irregulares
  const BRUTO = anillos([[.62, 1, .42], [.80, 1, .30], [.93, 1, .16], [1, 1, .04], [1, 1, -.04],
    [.92, 1, -.18], [.78, 1, -.32], [.62, 1, -.44]], .46, .8, .05, 0)
    .map(([x, y, z]) => [x + entre(-.03, .03), y + Math.sign(y) * entre(-.15, .03), z + entre(-.025, .025)]);

  const CARAS = [{ i: [0, 1, 2, 3, 4, 5, 6, 7], mesa: true }];
  for (let r = 0; r < 7; r++) for (let k = 0; k < 8; k++) {
    const k2 = (k + 1) % 8;
    CARAS.push({ i: [r * 8 + k, r * 8 + k2, (r + 1) * 8 + k2, (r + 1) * 8 + k] });
  }
  CARAS.push({ i: [63, 62, 61, 60, 59, 58, 57, 56] });

  // el jardín: inclusiones (hilos y puntitos) dentro de la piedra
  const JARDIN = Array.from({ length: 80 }, () => ({
    x: entre(-.3, .3), y: entre(-.46, .46), z: entre(-.3, .26),
    hilo: azar() < .6, dx: entre(-.09, .09), dy: entre(-.1, .1), dz: entre(-.04, .04),
    r: entre(.4, 1.6), fase: entre(0, TAU)
  }));

  /* ---------- 2. LA ROCA: 7 pedazos alrededor de un hueco irregular ---------- */
  const PIEZAS = 7;
  const grietas = Array.from({ length: PIEZAS }, (_, k) => {
    const base = (k / PIEZAS) * TAU + entre(-.22, .22);
    const rin = entre(.44, .6);
    const pts = [{ a: base, t: 0, rin }];
    let a = base;
    for (let j = 1; j <= 5; j++) { a += entre(-.14, .14); pts.push({ a, t: j / 5, rin }); }
    return pts;
  });
  const piezas = grietas.map((g, k) => {
    const sig = grietas[(k + 1) % PIEZAS];
    const vuelta = sig[0].a < g[0].a ? TAU : 0;              // la última pieza cierra el círculo
    const h = sig.map((q) => ({ ...q, a: q.a + vuelta }));
    const contorno = [
      ...g,
      { a: mix(g[5].a, h[5].a, 1 / 3), t: 1, rin: g[0].rin }, { a: mix(g[5].a, h[5].a, 2 / 3), t: 1, rin: g[0].rin },
      ...[...h].reverse(),
      { a: (g[0].a + h[0].a) / 2, t: 0, rin: entre(.46, .62) }
    ];
    return { contorno, dir: (g[0].a + h[0].a) / 2, lejos: entre(.8, 1.25), giro: entre(-.7, .7) };
  });

  /* ---------- 3. TAMAÑOS (se recalculan al cambiar la pantalla) ---------- */
  let W = 0, H = 0, dpr = 1, S0 = 100, CX = 0, CY = 0, R = 1000, escritorio = false, textura = null;
  function medir() {
    const d = Math.min(window.devicePixelRatio || 1, 2);
    if (lienzo.clientWidth === W && lienzo.clientHeight === H && d === dpr && textura) return;
    dpr = d;
    W = lienzo.clientWidth; H = lienzo.clientHeight;
    lienzo.width = Math.round(W * dpr); lienzo.height = Math.round(H * dpr);
    escritorio = W >= 900;
    S0 = escritorio ? Math.min(W * .2, H * .33) : Math.min(W * .36, H * .26);
    CX = escritorio ? W * .68 : W / 2;
    CY = escritorio ? H / 2 : H * .4;
    R = Math.hypot(W, H) * 1.6;
    textura = hacerRoca();
  }

  // textura de roca negra: manchas, grano, vetas de calcita y pirita (como la matriz real de la esmeralda)
  function hacerRoca() {
    const c = document.createElement('canvas');
    c.width = Math.max(1, Math.round(W)); c.height = Math.max(1, Math.round(H));
    const g = c.getContext('2d');
    const guardada = semilla; semilla = 29;
    g.fillStyle = '#101411'; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 46; i++) {
      const x = entre(0, W), y = entre(0, H), r = entre(40, 240);
      const gr = g.createRadialGradient(x, y, 0, x, y, r);
      gr.addColorStop(0, azar() < .5 ? 'rgba(62,72,64,.32)' : 'rgba(0,0,0,.45)');
      gr.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2);
    }
    for (let i = 0, n = (W * H) / 160; i < n; i++) {
      g.fillStyle = `rgba(${azar() < .5 ? '255,255,255' : '0,0,0'},${entre(.03, .12).toFixed(3)})`;
      g.fillRect(entre(0, W), entre(0, H), 1.3, 1.3);
    }
    g.lineCap = 'round'; g.lineJoin = 'round';
    for (let v = 0; v < 8; v++) {
      let x = entre(-.1, 1.1) * W, y = entre(-.1, 1.1) * H, ang = entre(0, TAU);
      const ancho = entre(.6, 3), paso = Math.max(W, H) / 40;
      g.strokeStyle = `rgba(232,228,214,${entre(.14, .34).toFixed(2)})`; g.lineWidth = ancho;
      g.beginPath(); g.moveTo(x, y);
      for (let s = 0; s < 46; s++) {
        ang += entre(-.32, .32); x += Math.cos(ang) * paso; y += Math.sin(ang) * paso; g.lineTo(x, y);
        if (azar() < .06) { // ramita fina
          g.moveTo(x, y); const b = ang + entre(-1.2, 1.2);
          g.lineTo(x + Math.cos(b) * paso * 2, y + Math.sin(b) * paso * 2); g.moveTo(x, y);
        }
      }
      g.stroke();
    }
    for (let i = 0; i < 70; i++) {
      g.fillStyle = `rgba(214,182,96,${entre(.3, .75).toFixed(2)})`;
      g.fillRect(entre(0, W), entre(0, H), entre(1, 2.4), entre(1, 2.4));
    }
    semilla = guardada;
    return c;
  }

  /* ---------- 4. LUZ Y COLOR ---------- */
  const RAMPA = [[1, 22, 14], [4, 64, 41], [10, 118, 78], [40, 186, 128], [205, 255, 232]];
  function rampa(t) {
    t = lim(t) * 4; const i = Math.min(3, Math.floor(t)); const f = t - i; const a = RAMPA[i], b = RAMPA[i + 1];
    return [mix(a[0], b[0], f), mix(a[1], b[1], f), mix(a[2], b[2], f)];
  }
  const norm = (v) => { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
  const LUZ = norm([-.45, .62, .64]);
  const MEDIA = norm([LUZ[0], LUZ[1], LUZ[2] + 1]);
  const rgba = (c, a) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a.toFixed(3)})`;

  /* ---------- 5. ESTADO ANIMADO ---------- */
  let t = 0, mx = 0, my = 0, mxM = 0, myM = 0, pulso = 0, mAntes = 0, oAntes = 0, talladaYa = false;
  let capActual = -1, empezado = null;
  // avance: pVal se acerca a pMeta a velocidad constante (lento y delicado). Ya NO depende del scroll.
  // Ya NO avanza solo: la historia sigue cuando la persona toca (así entiende que el toque la desarrolla).
  let pVal = 0, pMeta = 0, vel = .1, espera = 0, auto = false, visto = false, tocado = false, enMovAntes = null;
  const frase = viaje.querySelector('[data-viaje-frase]');
  const FRASES = ['Toca la piedra y descubre su historia', 'Toca para seguir · 2 de 5', 'Toca para seguir · 3 de 5', 'Toca para seguir · 4 de 5', 'Volver a empezar'];
  const PAUSA = 3.2;                                    // segundos en cada capítulo
  function irA(i, manual) {
    i = Math.max(0, Math.min(IR_A.length - 1, i));
    pMeta = IR_A[i];
    vel = Math.max(.09, Math.abs(pMeta - pVal) / 2.6);  // un salto largo tarda ~2,6 s, nunca de golpe
    if (manual) { auto = false; tocado = true; }
  }
  const chispas = [], gotas = [], ondas = [];
  let siguienteGota = 0;

  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    mxM = (e.clientX / window.innerWidth) * 2 - 1;
    myM = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  /* ---------- 6. DIBUJO ---------- */
  const P = new Array(64), Q = new Array(64);
  function pintarGema(m, S, cx, cy, rx, ry, alfa, jz, g) {
    const cy1 = Math.cos(ry), sy1 = Math.sin(ry), cx1 = Math.cos(rx), sx1 = Math.sin(rx);
    for (let i = 0; i < 64; i++) {
      const a = BRUTO[i], b = TALLA[i];
      const x = mix(a[0], b[0], m), y = mix(a[1], b[1], m), z = mix(a[2], b[2], m);
      const x1 = x * cy1 + z * sy1, z1 = -x * sy1 + z * cy1;
      const y2 = y * cx1 - z1 * sx1, z2 = y * sx1 + z1 * cx1;
      const f = 4 / (4 - z2);
      P[i] = [x1, y2, z2];
      Q[i] = [cx + x1 * f * S, cy - y2 * f * S];
    }
    const lista = [];
    for (const cara of CARAS) {
      let nx = 0, ny = 0, nz = 0, gx = 0, gy = 0, gz = 0;
      const n = cara.i.length;
      for (let k = 0; k < n; k++) {
        const a = P[cara.i[k]], b = P[cara.i[(k + 1) % n]];
        nx += (a[1] - b[1]) * (a[2] + b[2]); ny += (a[2] - b[2]) * (a[0] + b[0]); nz += (a[0] - b[0]) * (a[1] + b[1]);
        gx += a[0]; gy += a[1]; gz += a[2];
      }
      const l = Math.hypot(nx, ny, nz); if (l < 1e-6) continue;
      let nn = [nx / l, ny / l, nz / l];
      gx /= n; gy /= n; gz /= n;
      if (nn[0] * gx + nn[1] * gy + nn[2] * gz < 0) nn = [-nn[0], -nn[1], -nn[2]];
      const frente = nn[0] * -gx + nn[1] * -gy + nn[2] * (4 - gz) > 0;
      lista.push({ cara, nn, z: gz, frente });
    }
    lista.sort((a, b) => a.z - b.z);

    // halo de luz detrás de la piedra
    const rh = S * (1.5 + pulso * .7);
    const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, rh);
    halo.addColorStop(0, `rgba(60,203,149,${(.34 * g * alfa).toFixed(3)})`);
    halo.addColorStop(1, 'rgba(60,203,149,0)');
    ctx.fillStyle = halo; ctx.fillRect(cx - rh, cy - rh, rh * 2, rh * 2);

    const camino = (cara) => {
      ctx.beginPath();
      cara.i.forEach((v, k) => (k ? ctx.lineTo(Q[v][0], Q[v][1]) : ctx.moveTo(Q[v][0], Q[v][1])));
      ctx.closePath();
    };
    const bruto = 1 - m;
    // el cristal en bruto es más opaco, terroso y apagado; la talla saca el verde vivo
    const tinte = (c) => [mix(c[0], 34, .42 * bruto), mix(c[1], 72, .42 * bruto), mix(c[2], 56, .42 * bruto)];
    ctx.lineJoin = 'round'; ctx.lineWidth = 1;
    const borde = `rgba(205,255,232,${((.07 + .26 * m) * alfa).toFixed(3)})`;

    // caras de atrás: reflejos internos (lo que se ve a través de la piedra)
    for (const f of lista) {
      if (f.frente) continue;
      const dr = Math.max(0, -(f.nn[0] * LUZ[0] + f.nn[1] * LUZ[1] + f.nn[2] * LUZ[2]));
      camino(f.cara);
      ctx.fillStyle = rgba(tinte(rampa(.1 + .62 * dr * dr + .08 * g)), .92 * alfa); ctx.fill();
      ctx.strokeStyle = borde; ctx.stroke();
    }
    // el jardín (inclusiones), visible a través de las caras de adelante
    const aj = alfa * m * (.16 + .74 * jz);
    if (aj > .01) {
      ctx.lineCap = 'round';
      for (const j of JARDIN) {
        const d = Math.sin(t * .35 + j.fase) * .008;
        const pr = (x, y, z) => {
          const x1 = x * cy1 + z * sy1, z1 = -x * sy1 + z * cy1;
          const y2 = y * cx1 - z1 * sx1, z2 = y * sx1 + z1 * cx1;
          const f = 4 / (4 - z2); return [cx + x1 * f * S, cy - y2 * f * S];
        };
        const a = pr(j.x + d, j.y, j.z);
        if (j.hilo) {
          const b = pr(j.x + j.dx + d, j.y + j.dy, j.z + j.dz), c = pr(j.x + j.dx * 1.8, j.y + j.dy * .6 + .04, j.z);
          ctx.strokeStyle = `rgba(170,232,196,${(aj * .55).toFixed(3)})`; ctx.lineWidth = j.r * (S / 160);
          ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.quadraticCurveTo(b[0], b[1], c[0], c[1]); ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(236,255,244,${(aj * .8).toFixed(3)})`;
          ctx.beginPath(); ctx.arc(a[0], a[1], Math.max(.6, j.r * .8 * (S / 160)), 0, TAU); ctx.fill();
        }
      }
      ctx.lineWidth = 1;
    }
    // caras de adelante: vidrio verde con luz, y la mesa como una ventana
    const brillos = [];
    let idx = 0;
    for (const f of lista) {
      if (!f.frente) continue;
      const d = Math.max(0, f.nn[0] * LUZ[0] + f.nn[1] * LUZ[1] + f.nn[2] * LUZ[2]);
      const sp = Math.pow(Math.max(0, f.nn[0] * MEDIA[0] + f.nn[1] * MEDIA[1] + f.nn[2] * MEDIA[2]), 36) * (.35 + .65 * m);
      camino(f.cara);
      ctx.fillStyle = rgba(tinte(rampa(.14 + .6 * d * d + .06 * g)), mix(.95, .55, m) * alfa); ctx.fill();
      if (sp > .02) { ctx.fillStyle = `rgba(240,255,248,${(sp * .7 * alfa).toFixed(3)})`; ctx.fill(); }
      ctx.strokeStyle = borde; ctx.stroke();
      const tw = Math.pow(Math.max(0, Math.sin(t * 1.6 + idx * 2.3)), 30) * m;
      const fuerza = Math.max(sp, tw * .8);
      if (fuerza > .3) {
        let sx = 0, sy = 0; f.cara.i.forEach((v) => { sx += Q[v][0]; sy += Q[v][1]; });
        brillos.push([sx / f.cara.i.length, sy / f.cara.i.length, fuerza]);
      }
      idx++;
    }
    ctx.globalCompositeOperation = 'lighter';
    brillos.sort((a, b) => b[2] - a[2]).slice(0, 4).forEach(([x, y, k]) => destello(x, y, S * (.06 + .16 * k), k * alfa));
    ctx.globalCompositeOperation = 'source-over';
  }

  function destello(x, y, s, a) {
    const gr = ctx.createRadialGradient(x, y, 0, x, y, s);
    gr.addColorStop(0, `rgba(255,255,255,${a.toFixed(3)})`);
    gr.addColorStop(.3, `rgba(190,255,225,${(a * .3).toFixed(3)})`);
    gr.addColorStop(1, 'rgba(190,255,225,0)');
    ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x, y, s, 0, TAU); ctx.fill();
    ctx.strokeStyle = `rgba(255,255,255,${(a * .7).toFixed(3)})`; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x - s * 1.7, y); ctx.lineTo(x + s * 1.7, y); ctx.moveTo(x, y - s * 1.7); ctx.lineTo(x, y + s * 1.7); ctx.stroke();
  }

  const puntoRoca = (q, S) => {
    const r = mix(q.rin * S, R, Math.pow(q.t, 1.4));
    return [CX + Math.cos(q.a) * r, CY + Math.sin(q.a) * r];
  };
  function pintarRoca(o, luzGrietas, S) {
    for (const pz of piezas) {
      const lejos = Math.pow(o, 1.4) * R * .45 * pz.lejos;
      ctx.save();
      ctx.translate(Math.cos(pz.dir) * lejos, Math.sin(pz.dir) * lejos);
      ctx.translate(CX, CY); ctx.rotate(o * pz.giro); ctx.translate(-CX, -CY);
      ctx.beginPath();
      pz.contorno.forEach((q, k) => { const [x, y] = puntoRoca(q, S); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
      ctx.closePath();
      ctx.shadowColor = 'rgba(0,0,0,.8)'; ctx.shadowBlur = 26;
      ctx.fillStyle = '#101411'; ctx.fill();
      ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0;
      ctx.save(); ctx.clip(); ctx.drawImage(textura, 0, 0, W, H); ctx.restore();
      ctx.strokeStyle = 'rgba(255,255,255,.1)'; ctx.stroke();
      ctx.restore();
    }
    // antes de abrirse, la luz verde se escapa por las grietas
    if (luzGrietas > .01) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.shadowColor = 'rgba(60,203,149,.9)'; ctx.shadowBlur = 16;
      ctx.lineWidth = 1.6; ctx.lineJoin = 'round';
      for (const g of grietas) {
        ctx.strokeStyle = `rgba(120,255,200,${(luzGrietas * .75).toFixed(3)})`;
        ctx.beginPath();
        g.slice(0, 4).forEach((q, k) => { const [x, y] = puntoRoca(q, S); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  function soltarChispas(n, desde, colores, fuerza) {
    for (let i = 0; i < n && chispas.length < 420; i++) {
      const [x, y] = desde();
      const ang = Math.atan2(y - CY, x - CX) + entre(-.7, .7);
      const v = entre(.4, 1) * fuerza;
      chispas.push({ x, y, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v - entre(40, 160), r: entre(1.2, 3.6) * (S0 / 140),
        giro: entre(0, TAU), vg: entre(-8, 8), vida: 1, dura: entre(.8, 1.6), color: colores[(azar() * colores.length) | 0] });
    }
  }

  function pintar(dt) {
    const alto = pegado.offsetHeight;
    // llega al capítulo, espera y sigue con el próximo (solo mientras se está viendo)
    if (pVal !== pMeta) {
      const d = pMeta - pVal, paso = vel * dt;
      pVal = Math.abs(d) <= paso ? pMeta : pVal + Math.sign(d) * paso;
      espera = 0;
    } else if (auto && visto && capActual < IR_A.length - 1) {
      espera += dt;
      if (espera > (pVal === 0 ? 1.2 : PAUSA)) irA(capActual + 1);
    }
    const p = pVal;
    t += dt;

    // fases (todas lentas y encadenadas)
    const luzGrietas = tramo(p, .02, .09) * (1 - tramo(p, .1, .15));
    const o = tramo(p, .1, .27);
    const lg = tramo(p, .17, .22) * (1 - tramo(p, .36, .42));
    const m = tramo(p, .4, .58);
    const jz = tramo(p, .6, .68) * (1 - tramo(p, .76, .82));
    const fz = tramo(p, .82, .93);
    const g = lim(.18 + .82 * tramo(p, .18, .34) + pulso, 0, 1.6);
    mx += (mxM - mx) * Math.min(1, dt * 3); my += (myM - my) * Math.min(1, dt * 3);
    pulso *= Math.exp(-dt * 2.2);

    const S = S0 * (1 + (escritorio ? .72 : .75) * jz) * (1 - .3 * fz);
    const rx = mix(-.38 + my * .28, -.04, jz);
    const ry = TAU * lim((p - .1) / .5) + TAU * .6 * lim((p - .82) / .18) + (Math.sin(t * .5) * .22 + mx * .55) * (1 - jz * .85);

    // esquirlas cuando se talla, y polvo de roca cuando se abre
    const dm = Math.abs(m - mAntes); mAntes = m;
    if (dm > 0) soltarChispas(Math.min(70, Math.round(dm * 170)), () => [CX + entre(-.5, .5) * S, CY + entre(-.6, .6) * S],
      ['#3CCB95', '#13875F', '#E9FFF5', '#7FE3BC', '#0D5C40'], 340);
    if (!talladaYa && m > .985) { talladaYa = true; pulso += .7; }
    if (m < .5) talladaYa = false;
    const dO = Math.max(0, o - oAntes); oAntes = o;
    if (dO > 0) soltarChispas(Math.min(60, Math.round(dO * 160)), () => { const a = entre(0, TAU), r = entre(.45, .6) * S; return [CX + Math.cos(a) * r, CY + Math.sin(a) * r]; },
      ['#2A2E2A', '#3B403A', '#D9D6CC', '#1B1F1C'], 420);

    // fondo
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#030303'; ctx.fillRect(0, 0, W, H);
    const amb = ctx.createRadialGradient(CX, CY, 0, CX, CY, Math.max(W, H) * .7);
    amb.addColorStop(0, 'rgba(19,135,95,.12)'); amb.addColorStop(1, 'rgba(3,3,3,0)');
    ctx.fillStyle = amb; ctx.fillRect(0, 0, W, H);

    // la gema
    const alfa = 1 - fz;
    if (alfa > .01) pintarGema(m, S, CX, CY, rx, ry, alfa, jz, g);

    // la roca
    if (o < .999) pintarRoca(o, luzGrietas, S0);

    // las lágrimas de Fura
    if (lg > .3 && t > siguienteGota) {
      siguienteGota = t + entre(.28, .55);
      gotas.push({ x0: CX + entre(-1, 1) * S * 1.2, y0: -30, tx: CX + entre(-.22, .22) * S, ty: CY + entre(-.25, .25) * S, u: 0 });
    }
    ctx.globalCompositeOperation = 'lighter';
    for (let i = gotas.length - 1; i >= 0; i--) {
      const q = gotas[i]; q.u += dt / 1.15;
      if (q.u >= 1) { ondas.push({ x: q.tx, y: q.ty, u: 0 }); pulso = Math.min(1, pulso + .32); gotas.splice(i, 1); continue; }
      const e = q.u * q.u, x = mix(q.x0, q.tx, e), y = mix(q.y0, q.ty, e), r = Math.max(3, S0 * .034);
      const estela = ctx.createLinearGradient(x, y - r * 18 * (.3 + e), x, y);
      estela.addColorStop(0, 'rgba(120,255,200,0)'); estela.addColorStop(1, 'rgba(160,255,215,.55)');
      ctx.strokeStyle = estela; ctx.lineWidth = r * .5;
      ctx.beginPath(); ctx.moveTo(mix(q.x0, q.tx, e * .82), y - r * 18 * (.3 + e)); ctx.lineTo(x, y); ctx.stroke();
      const gr = ctx.createRadialGradient(x, y, 0, x, y, r * 2.4);
      gr.addColorStop(0, 'rgba(255,255,255,.95)'); gr.addColorStop(.45, 'rgba(110,240,180,.7)'); gr.addColorStop(1, 'rgba(60,203,149,0)');
      ctx.fillStyle = gr;
      ctx.beginPath(); ctx.moveTo(x, y - r * 2.6);
      ctx.bezierCurveTo(x + r * 1.2, y - r * .8, x + r * 1.1, y + r * .3, x, y + r);
      ctx.bezierCurveTo(x - r * 1.1, y + r * .3, x - r * 1.2, y - r * .8, x, y - r * 2.6); ctx.fill();
    }
    // ondas con forma de talla esmeralda al caer cada lágrima
    for (let i = ondas.length - 1; i >= 0; i--) {
      const w = ondas[i]; w.u += dt / 1.3;
      if (w.u >= 1) { ondas.splice(i, 1); continue; }
      const k = S0 * (.4 + 1.9 * suave(w.u));
      ctx.strokeStyle = `rgba(130,255,205,${((1 - w.u) * .45).toFixed(3)})`; ctx.lineWidth = 1.4;
      ctx.beginPath();
      octo(.5 * k, .66 * k, .3 * .5 * k).forEach(([x, y], j) => (j ? ctx.lineTo(w.x + x, w.y + y) : ctx.moveTo(w.x + x, w.y + y)));
      ctx.closePath(); ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';

    // esquirlas
    for (let i = chispas.length - 1; i >= 0; i--) {
      const c = chispas[i];
      c.vida -= dt / c.dura; if (c.vida <= 0) { chispas.splice(i, 1); continue; }
      c.vy += 520 * dt; c.x += c.vx * dt; c.y += c.vy * dt; c.giro += c.vg * dt;
      ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(c.giro); ctx.globalAlpha = Math.min(1, c.vida * 1.6);
      ctx.fillStyle = c.color; ctx.beginPath(); ctx.moveTo(0, -c.r); ctx.lineTo(c.r * .9, c.r * .7); ctx.lineTo(-c.r * .8, c.r * .5); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = 1;

    // velo bajo los textos para que siempre se lean (sobre la roca y sobre la piedra)
    const velo = escritorio ? ctx.createLinearGradient(0, 0, W * .55, 0) : ctx.createLinearGradient(0, H * .5, 0, H);
    velo.addColorStop(0, escritorio ? 'rgba(3,3,3,.82)' : 'rgba(3,3,3,0)');
    velo.addColorStop(1, escritorio ? 'rgba(3,3,3,0)' : 'rgba(3,3,3,.88)');
    ctx.fillStyle = velo; ctx.fillRect(0, 0, W, H);

    // textos, riel y avance
    let cap = 0; CAP.forEach((c, i) => { if (p >= c) cap = i; });
    if (cap !== capActual) {
      capActual = cap;
      textos.forEach((li, i) => li.classList.toggle('ver', i === cap));
      botones.forEach((b, i) => (i === cap ? b.setAttribute('aria-current', 'step') : b.removeAttribute('aria-current')));
      if (frase) frase.textContent = (cap === 0 && tocado) ? 'Toca para seguir · 1 de 5' : FRASES[cap];
      viaje.classList.toggle('final', cap === IR_A.length - 1);
    }
    // mientras la piedra se transforma, la invitación se calla; al llegar, vuelve a latir
    const enMov = pVal !== pMeta;
    if (enMov !== enMovAntes) { enMovAntes = enMov; viaje.classList.toggle('moviendo', enMov); }
    if (tocado !== empezado) { empezado = tocado; viaje.classList.toggle('empezado', tocado); }
    viaje.style.setProperty('--p', p.toFixed(4));
    viaje.style.setProperty('--f', fz.toFixed(4));
  }

  /* ---------- 7. RIEL: saltar a un capítulo · tocar la piedra = siguiente (al final vuelve a empezar) ---------- */
  botones.forEach((b) => b.addEventListener('click', () => irA(Number(b.dataset.cap), true)));
  pegado.addEventListener('click', (e) => {
    if (e.target.closest('a, button:not([data-viaje-sig])')) return;
    irA(capActual >= IR_A.length - 1 ? 0 : capActual + 1, true);
  });

  /* ---------- 8. BUCLE: solo corre mientras la sección está en pantalla ---------- */
  let activo = false, ultimo = 0;
  function cuadro(ahora) {
    if (!activo) return;
    const dt = Math.min(.05, Math.max(0, (ahora - ultimo) / 1000));
    ultimo = ahora;
    pintar(dt);
    requestAnimationFrame(cuadro);
  }
  medir();
  pintar(0);
  window.addEventListener('resize', () => { medir(); pintar(0); });
  // arranca/para según si la sección está cerca de la pantalla (se revisa al hacer scroll)
  function revisar() {
    const r = viaje.getBoundingClientRect();
    const cerca = r.bottom > -120 && r.top < window.innerHeight + 120;
    visto = r.top < window.innerHeight * .5 && r.bottom > window.innerHeight * .5; // arranca solo al estar a la vista
    if (cerca && !activo) { activo = true; ultimo = performance.now(); requestAnimationFrame(cuadro); }
    else if (!cerca) activo = false;
  }
  window.addEventListener('scroll', revisar, { passive: true });
  revisar();
})();
