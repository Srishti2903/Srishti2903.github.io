/*
  srishti os page runtime.
  Each page keeps its markup in <template id="page"> with {{holes}}, <sc-if> and <sc-for>,
  plus a `class Component extends DCLogic` that returns the hole values from renderVals().
  This file turns that into live DOM and re-renders whenever the component calls setState().
*/
(function () {
  const HOLE = /\{\{\s*([^}]+?)\s*\}\}/g;
  const EVENTS = { onclick: 'click', oninput: 'input', onkeydown: 'keydown', onchange: 'change', onpointerdown: 'pointerdown' };

  function lookup(scope, path) {
    return path.split('.').reduce((v, k) => (v == null ? undefined : v[k]), scope);
  }
  function resolve(scope, raw) {
    const m = /^\{\{\s*([^}]+?)\s*\}\}$/.exec(raw.trim());
    return m ? lookup(scope, m[1]) : raw;
  }
  function fill(text, scope) {
    return text.replace(HOLE, (_, p) => { const v = lookup(scope, p); return v == null ? '' : String(v); });
  }

  function build(node, scope, out) {
    if (node.nodeType === 3) { out.appendChild(document.createTextNode(fill(node.nodeValue, scope))); return; }
    if (node.nodeType !== 1) return;
    const tag = node.tagName.toLowerCase();
    if (tag === 'sc-if') {
      if (resolve(scope, node.getAttribute('value'))) node.childNodes.forEach((c) => build(c, scope, out));
      return;
    }
    // <sc-for> can't live inside <select>, so pages use <optgroup data-sc-for> there instead
    if (tag === 'sc-for' || (tag === 'optgroup' && node.hasAttribute('data-sc-for'))) {
      const list = resolve(scope, node.getAttribute('list')) || [];
      const as = node.getAttribute('as');
      list.forEach((item) => {
        const inner = Object.create(scope); inner[as] = item;
        node.childNodes.forEach((c) => build(c, inner, out));
      });
      return;
    }
    const el = document.createElementNS(node.namespaceURI, node.localName);
    for (const a of node.attributes) {
      const name = a.name.toLowerCase();
      if (name.startsWith('hint-')) continue;
      if (EVENTS[name]) {
        const fn = resolve(scope, a.value);
        if (typeof fn === 'function') el.addEventListener(EVENTS[name], fn);
        continue;
      }
      el.setAttribute(a.name, fill(a.value, scope));
    }
    const kids = tag === 'template' ? node.content.childNodes : node.childNodes;
    kids.forEach((c) => build(c, scope, el));
    out.appendChild(el);
  }

  // keep typed text, picked options and focus across re-renders
  const keyOf = (el, i) => el.getAttribute('aria-label') || el.id || el.name || 'f' + i;
  function saveForm(root) {
    const vals = {}; let focus = null;
    root.querySelectorAll('input, select, textarea').forEach((el, i) => {
      const k = keyOf(el, i); vals[k] = el.value;
      if (el === document.activeElement) focus = { k, start: el.selectionStart, end: el.selectionEnd };
    });
    return { vals, focus };
  }
  function restoreForm(root, saved) {
    root.querySelectorAll('input, select, textarea').forEach((el, i) => {
      const k = keyOf(el, i);
      if (k in saved.vals && !el.hasAttribute('value')) el.value = saved.vals[k];
      if (saved.focus && saved.focus.k === k) {
        el.focus({ preventScroll: true });
        try { if (saved.focus.start != null) el.setSelectionRange(saved.focus.start, saved.focus.end); } catch (e) {}
      }
    });
  }

  class DCLogic {
    constructor(props) { this.props = props || {}; this.state = {}; }
    setState(patch) {
      Object.assign(this.state, typeof patch === 'function' ? patch(this.state) : patch);
      if (this._render && !this._queued) { this._queued = true; queueMicrotask(() => { this._queued = false; this._render(); }); }
    }
  }
  window.DCLogic = DCLogic;

  window.addEventListener('DOMContentLoaded', () => {
    const tpl = document.getElementById('page');
    const mount = document.getElementById('app');
    // each page declares `class Component` in its own script, which lives in the shared global scope
    const comp = new Component({}); // eslint-disable-line no-undef
    comp._render = () => {
      const saved = saveForm(mount);
      const frag = document.createDocumentFragment();
      const vals = comp.renderVals();
      tpl.content.childNodes.forEach((c) => build(c, vals, frag));
      mount.replaceChildren(frag);
      restoreForm(mount, saved);
    };
    comp._render();
    setInterval(() => comp._render(), 30000); // keeps the menu bar clock current
  });
})();
