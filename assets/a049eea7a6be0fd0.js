(function(){
  if (window.__spIcons) return; window.__spIcons = true;
  var css = "@keyframes p-slide{0%,100%{transform:translate(0,0)}50%{transform:translate(3px,-3px)}}@keyframes p-press{0%,30%,100%{transform:translateY(0)}45%,60%{transform:translateY(3px)}}@keyframes p-knob{0%,40%{transform:translateX(0)}55%,85%{transform:translateX(-7px)}100%{transform:translateX(0)}}@keyframes p-steam{0%{transform:translateY(2px);opacity:0}40%{opacity:1}100%{transform:translateY(-5px);opacity:0}}@keyframes p-panA{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}@keyframes p-panB{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}@keyframes p-swing{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}@keyframes p-spin{to{transform:rotate(360deg)}}@keyframes p-wiggle{0%,100%{transform:rotate(0)}50%{transform:rotate(-14deg)}}@keyframes p-flow{to{stroke-dashoffset:-14}}@keyframes p-flap{0%,70%,100%{transform:translateY(0)}80%{transform:translateY(-3px)}}@keyframes p-lift{0%,70%,100%{transform:translateY(0)}80%{transform:translateY(-2px)}}@keyframes p-stitch{0%,100%{transform:translate(0,0)}50%{transform:translate(-3px,3px)}}@keyframes p-bounce{0%,60%,100%{transform:translateY(0)}70%{transform:translateY(-5px)}80%{transform:translateY(0)}86%{transform:translateY(-2px)}}@keyframes p-tiltQ{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(6deg)}}@keyframes p-tickDraw{0%{stroke-dashoffset:40}25%,100%{stroke-dashoffset:0}}";
  var P = {
    'ic-shuffle': [[1,'p-slide 3.2s ease-in-out infinite']],
    'ic-tap': [[3,'p-press 2.6s ease-in-out infinite'],[2,'p-knob 2.6s ease-in-out infinite']],
    'ic-steam': [[2,'p-steam 2.4s ease-out infinite']],
    'ic-tilt': [[1,'p-panA 3s ease-in-out infinite'],[2,'p-panB 3s ease-in-out infinite']],
    'ic-swing': ['svg','p-swing 3.4s ease-in-out infinite','50% 12%'],
    'ic-tick': [[1,'p-spin 8s linear infinite','32px 34px']],
    'ic-spin': [[4,'p-wiggle 2.2s ease-in-out infinite','0% 0%'],[3,'p-flow 1.4s linear infinite',null,'4 3']],
    'ic-float': [[1,'p-flap 3s ease-in-out infinite'],[0,'p-lift 3s ease-in-out infinite']],
    'ic-sway': [[0,'p-stitch 1.8s ease-in-out infinite'],[1,'p-stitch 1.8s ease-in-out infinite'],[2,'p-flow 1.2s linear infinite',null,'4 3']],
    'ic-folder': [[2,'p-flap 3.2s ease-in-out infinite'],[1,'p-flow 1.6s linear infinite',null,'4 3']],
    'ic-bob': [[3,'p-bounce 2.4s ease-in-out infinite'],[1,'p-tiltQ 3.6s ease-in-out infinite','50% 60%'],[2,'p-tiltQ 3.6s ease-in-out infinite','50% 60%']]
  };
  var rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function setup(){
    if (!document.getElementById('spRough')) { var d = document.createElement('div'); d.innerHTML = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><filter id="spRough" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="n"></feTurbulence><feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap></filter></defs></svg>'; document.body.appendChild(d.firstChild); var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st); }
  }
  function play(s){ try { var p = P[s.getAttribute('data-ic')]; if (!p) { if (s.hasAttribute('data-tick')) s.querySelectorAll('path').forEach(function(e){ e.style.strokeDasharray='40'; e.style.animation='p-tickDraw 4.8s ease-out infinite'; }); return; }
    if (p[0]==='svg') { s.style.transformOrigin = p[2]; s.style.animation = p[1]; return; }
    var g = s.querySelector('g'); if (!g) return; var kids = Array.prototype.slice.call(g.children);
    p.forEach(function(x){ var el = kids[x[0]]; if (!el) return; el.style.transformBox = x[2] && x[2].indexOf('px')>0 ? 'view-box' : 'fill-box'; el.style.transformOrigin = x[2] || '50% 50%'; el.style.strokeDasharray = x[3] || 'none'; el.style.strokeDashoffset = '0'; el.style.animation = x[1]; }); } catch(e){} }
  var io = (!rm && 'IntersectionObserver' in window) ? new IntersectionObserver(function(es){ es.forEach(function(en){ if (!en.isIntersecting) return; var s = en.target; io.unobserve(s); play(s); }); }, { threshold:.4 }) : null;
  function scan(){ setup(); document.querySelectorAll('svg[data-ic]:not([data-sp-on])').forEach(function(s){ s.setAttribute('data-sp-on',''); if (rm || !io) return; if (s.hasAttribute('data-tick')) { play(s); return; } io.observe(s); }); }
  function start(){ scan(); new MutationObserver(function(){ clearTimeout(window.__spT); window.__spT = setTimeout(scan, 60); }).observe(document.body, { childList:true, subtree:true }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();