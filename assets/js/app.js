/* =========================================================================
   JM PERSONALIZADOS — app.js
   Renderização, pedido guiado, calculadora, motion
   ========================================================================= */
(function () {
  'use strict';

  const D = window.JM;
  const C = D.config;
  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const BRL = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const WA  = txt => 'https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent(txt);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------------------------------------------------------------------
     1. PREÇOS
     --------------------------------------------------------------------- */
  /* Preço total para `qtd` unidades.
     `p.preco` é o valor do lote na quantidade-base (qtdBase).
     A curva é sublinear: dobrar a quantidade não dobra o custo. */
  function totalProduto(p, qtd) {
    if (qtd <= 0 || p.qtdBase <= 0) return 0;
    return p.preco * Math.pow(qtd / p.qtdBase, p.elasticidade);
  }

  /* Acabamentos aplicáveis a um produto, já com nome do catálogo. */
  function acabsDe(p) {
    if (!p || !p.acab) return [];
    return p.acab.map(a => {
      const cat = D.acabamentos.find(x => x.id === a.id) || {};
      return { id: a.id, nome: cat.nome || a.id, add: a.add };
    });
  }

  function estimar(prodId, qtd, acabIds) {
    const p = D.produtos.find(x => x.id === prodId);
    if (!p || qtd <= 0) return 0;
    const ids = Array.isArray(acabIds) ? acabIds : [acabIds];
    const escala = Math.pow(qtd / p.qtdBase, p.elasticidade);
    // cada acabamento é um adicional de lote, com a mesma curva do produto
    const extra = acabsDe(p).reduce(
      (sum, a) => sum + (ids.includes(a.id) ? a.add * escala : 0), 0);
    return Math.round(totalProduto(p, qtd) + extra);
  }

  /* ---------------------------------------------------------------------
     2. RENDER — PRODUTOS
     --------------------------------------------------------------------- */
  function renderProdutos() {
    const g = $('#pgrid');
    if (!g) return;
    g.innerHTML = D.produtos.map((p, i) => `
      <article class="pcard" data-reveal style="--pc:${p.cor};--rd:${i * 70}ms">
        <div class="pcard__media">
          <span class="pcard__tag">${esc(p.nome)}</span>
          <img src="${p.img}" alt="${esc(p.nome)} — ${esc(p.desc)}" loading="lazy" width="800" height="550">
        </div>
        <div class="pcard__body">
          <h3 class="pcard__title">${esc(p.nome)}</h3>
          <p class="pcard__desc">${esc(p.desc)}</p>
          <div class="pcard__foot">
            <span class="pcard__price">
              <small>A partir de</small>${BRL(p.preco)}
            </span>
            <button class="btn btn--primary" data-open-order data-produto="${p.id}">
              Pedir pelo WhatsApp
            </button>
          </div>
        </div>
      </article>`).join('');
  }

  /* ---------------------------------------------------------------------
     3. RENDER — SERVIÇOS / PASSOS / DIFERENCIAIS / PORTFÓLIO / NÚMEROS
     --------------------------------------------------------------------- */
  function renderServicos() {
    const el = $('#srv');
    if (!el) return;
    el.innerHTML = D.servicos.map((s, i) => `
      <div class="sitem" data-reveal style="--sc:${s.cor};--rd:${i * 80}ms">
        <span class="sitem__n">${s.n}</span>
        <h3>${esc(s.titulo)}</h3>
        <p>${esc(s.texto)}</p>
      </div>`).join('');
  }

  function renderPassos() {
    const el = $('#steps');
    if (!el) return;
    el.innerHTML = D.passos.map((s, i) => `
      <li class="step" data-reveal style="--sc:${s.cor};--sc-txt:${s.corTxt || s.cor};--rd:${i * 90}ms">
        <span class="step__n">${s.n}</span>
        <h3>${esc(s.titulo)}</h3>
        <p>${esc(s.texto)}</p>
      </li>`).join('');
  }

  function renderDiffs() {
    const el = $('#diffs');
    if (!el) return;
    el.innerHTML = D.diferenciais.map((d, i) => `
      <article class="diff" data-reveal
        style="--dc:${d.cor};--df:${d.corTxt || (d.claro ? '#143B4A' : '#fff')};--rd:${i * 80}ms">
        <span class="diff__n">0${i + 1}</span>
        <h3>${esc(d.titulo)}</h3>
        <p>${esc(d.texto)}</p>
      </article>`).join('');
  }

  function renderPortfolio() {
    const el = $('#masonry');
    if (!el) return;
    el.innerHTML = D.portfolio.map((f, i) => `
      <figure class="folio" tabindex="0" data-reveal
              style="--fc:${f.cor};--rd:${(i % 3) * 90}ms">
        <img class="folio__img" src="${f.img}" alt="${esc(f.titulo)} — ${esc(f.cat)}"
             loading="lazy" style="aspect-ratio:${f.ratio}">
        <figcaption class="folio__meta">
          <span class="folio__cat">${esc(f.cat)}</span>
          <span class="folio__title">${esc(f.titulo)}</span>
        </figcaption>
      </figure>`).join('');
  }

  function renderNumeros() {
    const el = $('#nums');
    if (!el) return;
    el.innerHTML = D.numeros.map(n => `
      <li><b>${n.valor}</b><span>${esc(n.label)}</span></li>`).join('');
  }

  /* ---------------------------------------------------------------------
     4. RENDER — FOOTER / CONTATO
     --------------------------------------------------------------------- */
  function renderContato() {
    $('#fWhats').href = WA('Olá! Vim pelo site da JM PERSONALIZADOS.');
    $('#fWhats').textContent = C.whatsappExibicao;
    $('#fInsta').href = C.instagramUrl;
    $('#fInsta').textContent = '@' + C.instagram;
    $('#fEnd').textContent = C.endereco;
    $('#fMapa').textContent = C.mapsUrl || C.email;
    $('#ano').textContent = new Date().getFullYear();

    const h = $('#footerHorario');
    if (h) h.innerHTML = '<h3>Horário</h3>' + C.horarios.map(d => `
      <span class="footer__row${d.fechado ? ' is-off' : ''}">
        <span>${d.dia}</span><span>${d.hora}</span>
      </span>`).join('');

    const wa = WA('Olá! Vim pelo site da JM PERSONALIZADOS.');
    $('#waFloat').href = wa;
    $('#waBar').href = wa;
  }

  /* ---------------------------------------------------------------------
     5. HEADER + NAV
     --------------------------------------------------------------------- */
  function header() {
    const hd = $('#header'), burger = $('#burger'), nav = $('#nav');
    const onScroll = () => hd.classList.toggle('is-stuck', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-on', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    nav.addEventListener('click', e => {
      if (e.target.tagName !== 'A') return;
      nav.classList.remove('is-open');
      burger.classList.remove('is-on');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  }

  /* ---------------------------------------------------------------------
     6. REVEAL + PARALLAX
     --------------------------------------------------------------------- */
  function motion() {
    const items = $$('[data-reveal]');
    if (REDUCED || !('IntersectionObserver' in window)) {
      items.forEach(i => i.classList.add('is-in'));
    } else {
      const io = new IntersectionObserver((ents) => {
        ents.forEach(e => {
          if (e.isIntersecting) {
            const d = e.target.dataset.revealDelay;
            if (d) e.target.style.setProperty('--rd', d + 'ms');
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      items.forEach(i => io.observe(i));
    }

    if (REDUCED) return;
    const layers = $$('[data-parallax]');
    if (!layers.length) return;

    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      layers.forEach(el => {
        const s = parseFloat(el.dataset.parallax) || 1;
        el.style.setProperty('translate', '0 ' + (y * 0.045 * s).toFixed(2) + 'px');
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------------------------------------------------------------------
     7. BARRAS FLUTUANTES
     --------------------------------------------------------------------- */
  function floatingBars() {
    const wa = $('#waFloat'), bar = $('.mbar');
    const check = () => {
      const past = window.scrollY > window.innerHeight * 0.55;
      wa.classList.toggle('is-in', past);
      bar.classList.toggle('is-in', past);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
  }

  /* ---------------------------------------------------------------------
     8. CALCULADORA
     --------------------------------------------------------------------- */
  function calculadora() {
    const sp = $('#calcProduto'), sq = $('#calcQtd'), sa = $('#calcAcab');
    const out = $('#calcValor'), link = $('#calcLink');
    if (!sp) return;

    sp.innerHTML = D.produtos.map(p => `<option value="${p.id}">${esc(p.pedido)}</option>`).join('');

    let acabAtual = null;
    function fillAcab() {
      const p = D.produtos.find(x => x.id === sp.value);
      const lista = acabsDe(p);
      if (!lista.some(a => a.id === acabAtual)) acabAtual = lista[0].id;
      sa.innerHTML = lista.map(a => `<option value="${a.id}">${esc(a.nome)}</option>`).join('');
      sa.value = acabAtual;
    }

    function fillQtd() {
      const p = D.produtos.find(x => x.id === sp.value);
      sq.innerHTML = p.quantidades
        .concat(p.quantidades[p.quantidades.length - 1] * 2)
        .filter((v, i, a) => a.indexOf(v) === i)
        .map(q => `<option value="${q}">${q.toLocaleString('pt-BR')}</option>`).join('');
    }

    function update() {
      acabAtual = sa.value;
      const val = estimar(sp.value, +sq.value, sa.value);
      out.textContent = BRL(val);
      const p  = D.produtos.find(x => x.id === sp.value);
      const ac = acabsDe(p).find(x => x.id === sa.value);
      const msg = [
        'Olá! Gostaria de solicitar um orçamento pelo site.',
        '',
        'Produto: ' + p.pedido,
        'Quantidade: ' + (+sq.value).toLocaleString('pt-BR'),
        'Acabamento: ' + (ac ? ac.nome : '-'),
        '',
        'Estimativa exibida no site: ' + BRL(val),
        'Podemos confirmar o valor final?'
      ].join('\n');
      link.href = WA(msg);
    }

    fillQtd();
    fillAcab();
    sp.addEventListener('change', () => { fillQtd(); fillAcab(); update(); });
    sq.addEventListener('change', update);
    sa.addEventListener('change', update);
    update();
  }

  /* ---------------------------------------------------------------------
     9. PEDIDO GUIADO (WIZARD)
     --------------------------------------------------------------------- */
  const STEPS = ['produto', 'formato', 'quantidade', 'material', 'acabamento', 'arquivo', 'dados', 'resumo'];

  const pedido = {
    produto: null, formato: null, qtd: null, qtdOutro: null,
    material: null, acab: [], arte: null, arquivos: [],
    nome: '', tel: '', obs: ''
  };
  let idx = 0;

  const wiz = $('#wiz');

  function abrirWiz(prodId) {
    idx = 0;
    if (prodId) { escolherProduto(prodId); idx = 1; }
    wiz.hidden = false;
    document.body.style.overflow = 'hidden';
    show();
    setTimeout(() => { const b = $('.wtile.is-on', wiz) || $('#wizNext'); b && b.focus(); }, 60);
  }

  function fecharWiz() {
    wiz.hidden = true;
    document.body.style.overflow = '';
  }

  function show() {
    $$('.wstep', wiz).forEach((s, i) => s.classList.toggle('is-active', i === idx));
    $('#wizBar').style.width = ((idx + 1) / STEPS.length * 100) + '%';
    $('#wizCount').textContent = 'Etapa ' + (idx + 1) + ' de ' + STEPS.length;
    $('#wizBack').disabled = idx === 0;
    $('#wizBack').style.visibility = idx === 0 ? 'hidden' : 'visible';

    const next = $('#wizNext');
    if (STEPS[idx] === 'resumo') {
      next.style.display = 'none';
      montarResumo();
    } else {
      next.style.display = '';
      next.innerHTML = idx === STEPS.length - 2
        ? 'Ver resumo <span class="btn__arrow">→</span>'
        : 'Continuar <span class="btn__arrow">→</span>';
      next.disabled = !valido();
    }
    $('#wizBody').scrollTop = 0;
  }

  function valido() {
    switch (STEPS[idx]) {
      case 'produto':    return !!pedido.produto;
      case 'formato':    return !!pedido.formato;
      case 'quantidade': return !!pedido.qtd;
      case 'material':   return !!pedido.material;
      case 'acabamento': return pedido.acab.length > 0;
      case 'arquivo':    return !!pedido.arte;
      case 'dados':      return $('#wizNome').value.trim().length > 1;
      default: return true;
    }
  }

  /* ---- passo: produtos ---- */
  function renderWizProdutos() {
    $('#wizProdutos').innerHTML = D.produtos.map(p => `
      <button type="button" class="wtile${pedido.produto === p.id ? ' is-on' : ''}" data-p="${p.id}">
        <span class="wtile__img" style="--tc:${p.cor}">
          <img src="${p.img}" alt="" loading="lazy">
        </span>
        <span class="wtile__name">${esc(p.pedido)}</span>
      </button>`).join('');
  }

  function escolherProduto(id) {
    if (pedido.produto !== id) {
      pedido.produto = id; pedido.formato = null; pedido.qtd = null;
      pedido.material = null; pedido.acab = []; pedido.qtdOutro = null;
    }
    renderWizProdutos();
    renderWizOpcoes();
    const next = $('#wizNext');
    if (next) next.disabled = !valido();
  }

  function prod() { return D.produtos.find(p => p.id === pedido.produto); }

  function renderWizOpcoes() {
    const p = prod();
    if (!p) return;

    $('#wizFormato').innerHTML = p.formatos
      .map(f => `<button type="button" class="opt${pedido.formato === f ? ' is-on' : ''}" data-f="${esc(f)}">${esc(f)}</button>`)
      .join('') +
      `<button type="button" class="opt${pedido.formato === 'Outro' ? ' is-on' : ''}" data-f="Outro">Outro formato</button>`;
    $('#wizFormatoExtra').hidden = pedido.formato !== 'Outro';

    $('#wizQtd').innerHTML = p.quantidades
      .map(q => `<button type="button" class="opt${pedido.qtd === q ? ' is-on' : ''}" data-q="${q}">${q.toLocaleString('pt-BR')}</button>`)
      .join('') +
      `<button type="button" class="opt${pedido.qtd === 'outro' ? ' is-on' : ''}" data-q="outro">Personalizado</button>`;
    $('#wizQtdExtra').hidden = pedido.qtd !== 'outro';

    $('#wizMaterial').innerHTML = p.materiais
      .map(m => `<button type="button" class="opt${pedido.material === m.nome ? ' is-on' : ''}" data-m="${esc(m.nome)}">${esc(m.nome)}</button>`)
      .join('');

    $('#wizAcab').innerHTML = acabsDe(p)
      .map(a => `<button type="button" class="opt${pedido.acab.includes(a.id) ? ' is-on' : ''}" data-a="${a.id}">${esc(a.nome)}</button>`)
      .join('');
  }

  /* ---- resumo + mensagem ---- */
  function qtdFinal() {
    if (pedido.qtd === 'outro') return +($('#wizQtdOutro').value || 0);
    return +pedido.qtd || 0;
  }

  function formatoFinal() {
    if (pedido.formato === 'Outro') return $('#wizFormatoOutro').value.trim() || 'A combinar';
    return pedido.formato;
  }

  function acabNomes() {
    return acabsDe(prod())
      .filter(a => pedido.acab.includes(a.id))
      .map(a => a.nome);
  }

  function arquivoTexto() {
    if (pedido.arte === 'ajuda')    return 'Ainda não tenho — preciso de ajuda com a arte';
    if (pedido.arte === 'conversa') return 'Envio depois pelo WhatsApp';
    if (!pedido.arquivos.length)    return 'enviado pelo site';
    if (pedido.arquivos.length === 1) return pedido.arquivos[0].name + ' (enviar pelo WhatsApp)';
    return pedido.arquivos.length + ' arquivos (enviar pelo WhatsApp)';
  }

  function montarMensagem() {
    const p = prod() || {};
    const linhas = [
      'Olá! Gostaria de fazer um pedido.',
      '',
      'Produto: ' + (p.pedido || '-'),
      'Formato: ' + (formatoFinal() || '-'),
      'Quantidade: ' + (qtdFinal() ? qtdFinal().toLocaleString('pt-BR') : '-'),
      'Material: ' + (pedido.material || '-'),
      'Acabamento: ' + (acabNomes().join(', ') || '-'),
      '',
      'Arquivo: ' + arquivoTexto()
    ];
    if (pedido.nome) linhas.push('', 'Nome: ' + pedido.nome);
    if (pedido.tel)  linhas.push('Telefone: ' + pedido.tel);
    if ($('#wizObs') && $('#wizObs').value.trim()) {
      linhas.push('', 'Obs.: ' + $('#wizObs').value.trim());
    }
    const est = estimar(pedido.produto, qtdFinal(), pedido.acab);
    if (est) linhas.push('', 'Estimativa do site: ' + BRL(est));
    return linhas.join('\n');
  }

  function montarResumo() {
    const p = prod() || {};
    const linhas = [
      ['Produto',   p.pedido],
      ['Formato',   formatoFinal()],
      ['Quantidade', qtdFinal() ? qtdFinal().toLocaleString('pt-BR') : '—'],
      ['Material',  pedido.material],
      ['Acabamento', acabNomes().join(', ')],
      ['Arquivo',   arquivoTexto()],
      ['Nome',      pedido.nome || '—'],
      ['Telefone',  pedido.tel || '—']
    ];

    // linha do resumo -> índice do passo correspondente
    const stepDaLinha = [0, 1, 2, 3, 4, 5, 6, 6];

    $('#wizRecap').innerHTML = linhas.map((l, i) => `
      <div>
        <dt>${l[0]}</dt>
        <dd>${esc(l[1] || '—')}<button type="button" data-goto="${stepDaLinha[i]}">alterar</button></dd>
      </div>`).join('');

    const msg = montarMensagem();
    $('#wizSend').href = WA(msg);
    $('#wizPreview').textContent = msg;
  }

  /* ---- eventos do wizard ---- */
  function wizardEvents() {
    $$('[data-open-order]').forEach(b => {
      b.addEventListener('click', () => abrirWiz(b.dataset.produto));
    });
    $$('[data-close-order]').forEach(b => b.addEventListener('click', fecharWiz));

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !wiz.hidden) fecharWiz();
    });

    $('#wizNext').addEventListener('click', () => {
      if (!valido()) return;
      if (STEPS[idx] === 'dados') {
        pedido.nome = $('#wizNome').value.trim();
        pedido.tel  = $('#wizTel').value.trim();
        pedido.obs  = $('#wizObs').value.trim();
      }
      if (idx < STEPS.length - 1) { idx++; show(); }
    });

    $('#wizBack').addEventListener('click', () => { if (idx > 0) { idx--; show(); } });

    $('#wizProdutos').addEventListener('click', e => {
      const b = e.target.closest('[data-p]');
      if (b) escolherProduto(b.dataset.p);
    });

    const pick = (sel, key) => $(sel).addEventListener('click', e => {
      const b = e.target.closest('.opt');
      if (!b) return;
      if (key === 'acab') {
        const id = b.dataset.a;
        if (id === 'nenhum') pedido.acab = ['nenhum'];
        else {
          pedido.acab = pedido.acab.filter(x => x !== 'nenhum');
          pedido.acab.includes(id)
            ? pedido.acab = pedido.acab.filter(x => x !== id)
            : pedido.acab.push(id);
        }
        if (!pedido.acab.length) pedido.acab = ['nenhum'];
        renderWizOpcoes();
      } else if (key === 'formato') {
        pedido.formato = b.dataset.f;
        renderWizOpcoes();
      } else if (key === 'qtd') {
        pedido.qtd = b.dataset.q === 'outro' ? 'outro' : +b.dataset.q;
        renderWizOpcoes();
      } else if (key === 'material') {
        pedido.material = b.dataset.m;
        renderWizOpcoes();
      } else if (key === 'arte') {
        pedido.arte = b.dataset.arte;
        $$('#wizArte .opt').forEach(o => o.classList.toggle('is-on', o === b));
        $('#wizUpload').hidden = pedido.arte !== 'enviar';
      }
      $('#wizNext').disabled = !valido();
    });

    pick('#wizFormato', 'formato');
    pick('#wizQtd', 'qtd');
    pick('#wizMaterial', 'material');
    pick('#wizAcab', 'acab');
    pick('#wizArte', 'arte');

    $('#wizFormatoOutro').addEventListener('input', () => { $('#wizNext').disabled = !valido(); });
    $('#wizQtdOutro').addEventListener('input', () => { $('#wizNext').disabled = !valido(); });
    $('#wizNome').addEventListener('input', () => { $('#wizNext').disabled = !valido(); });

    /* upload */
    const fi = $('#wizFiles'), list = $('#wizFileList'), drop = $('.drop');
    const paint = () => {
      list.innerHTML = pedido.arquivos.map((f, i) => `
        <li><b>${esc(f.name)}</b><span>${(f.size / 1024 / 1024).toFixed(2)} MB</span>
        <button type="button" data-rm="${i}" aria-label="Remover">✕</button></li>`).join('');
      $('#wizNext').disabled = !valido();
    };
    const add = files => {
      Array.from(files).forEach(f => { if (!pedido.arquivos.some(x => x.name === f.name)) pedido.arquivos.push(f); });
      paint();
    };
    fi.addEventListener('change', e => add(e.target.files));
    list.addEventListener('click', e => {
      const b = e.target.closest('[data-rm]');
      if (b) { pedido.arquivos.splice(+b.dataset.rm, 1); paint(); }
    });
    ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, e => {
      e.preventDefault(); drop.classList.add('is-over');
    }));
    ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, e => {
      e.preventDefault(); drop.classList.remove('is-over');
    }));
    drop.addEventListener('drop', e => { if (e.dataTransfer) add(e.dataTransfer.files); });

    /* editar do resumo */
    $('#wizRecap').addEventListener('click', e => {
      const b = e.target.closest('[data-goto]');
      if (b) { idx = +b.dataset.goto; show(); }
    });

    /* envio */
    $('#wizSend').addEventListener('click', () => {
      track('pedido_whatsapp', { produto: pedido.produto, qtd: qtdFinal() });
      setTimeout(fecharWiz, 400);
    });
  }

  /* ---------------------------------------------------------------------
     10. ANALYTICS (stub — plugue GA4/GTM)
     --------------------------------------------------------------------- */
  function track(ev, params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: ev }, params || {}));
    if (window.gtag) window.gtag('event', ev, params);
  }

  /* ---------------------------------------------------------------------
     11. BOOT
     --------------------------------------------------------------------- */
  function init() {
    renderProdutos();
    renderServicos();
    renderPassos();
    renderDiffs();
    renderPortfolio();
    renderNumeros();
    renderContato();

    header();
    calculadora();
    renderWizProdutos();
    renderWizOpcoes();
    wizardEvents();
    motion();
    floatingBars();

    document.body.classList.add('is-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
