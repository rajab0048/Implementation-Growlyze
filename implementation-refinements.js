(()=>{
const qs=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];let intent='fix',timer,phase=0;
const captions=['Clean records and mapped fields','Ownership and qualification rules','Reliable follow-up and exception handling','A clear sales pipeline','A complete customer service handoff','Connected tools and monitored syncs','Reporting your team can trust'];
function animate(){clearInterval(timer);phase=0;all('.sys-node').forEach(n=>n.classList.remove('active','complete'));if(matchMedia('(prefers-reduced-motion: reduce)').matches){all('.sys-node').forEach(n=>n.classList.add('complete'));qs('#system-progress').textContent='A connected system, ready for your team';return;}step();timer=setInterval(step,1350);}
function step(){all('.sys-node').forEach(n=>{let i=+n.dataset.phase;n.classList.toggle('active',i===phase);n.classList.toggle('complete',i<phase)});qs('#system-progress').textContent=captions[phase]||'A connected system, ready for your team';if(phase++>=7){clearInterval(timer);setTimeout(animate,2500);}}
let ready=false;
function fadeSwap(fn){const els=['.hero .sub','#hero-h1','.hero-actions .js-book','#system-mode','#record-copy'].map(q=>qs(q)).filter(Boolean);if(!ready||matchMedia('(prefers-reduced-motion: reduce)').matches){fn();return;}els.forEach(e=>e.classList.add('slide-out'));setTimeout(()=>{fn();els.forEach(e=>{e.classList.remove('slide-out');e.classList.add('slide-start');void e.offsetWidth;e.classList.remove('slide-start');});},400);}
function choose(m){intent=m;all('[data-intent]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.intent===m)));const apply=()=>{if(intent!==m)return;qs('#hero-h1').innerHTML=m==='fresh'?'HubSpot, built around<br><em>how you actually work.</em>':'Your HubSpot.<br><em>Finally working together.</em>';qs('.hero .sub').textContent=m==='fresh'?'Start with a clear process, then a connected HubSpot. Our architects design, configure and test your setup, and train your team to use it.':'Untangle the data, workflows and handoffs holding your team back. Our architects keep what works, fix what doesn\u2019t and connect the whole journey.';qs('.hero-actions .js-book').textContent=m==='fresh'?'Plan my HubSpot implementation':'Get my free HubSpot health check';qs('#system-mode').textContent=m==='fresh'?'New portal, designed around your process':'Existing portal, rebuilt around your process';qs('#record-copy').textContent=m==='fresh'?'Map fields \u00b7 import clean data \u00b7 set ownership':'Merge duplicates \u00b7 map fields \u00b7 preserve history';const mode=qs('.mode-tab[data-mode="'+m+'"]');if(mode)mode.click();animate();};fadeSwap(apply);ready=true;}
all('[data-intent]').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.intent)));
// Keep the hero switch in sync when the visitor uses the lower tabs or the hero path links.
all('.mode-tab[data-mode],.path-links a[data-mode]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.mode!==intent)choose(b.dataset.mode);}));qs('#replay-system').addEventListener('click',animate);choose('fix');
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('seen')}),{threshold:.3});all('.audit-step,.steps>li').forEach(e=>observer.observe(e));
/* What you get: rows animate in on scroll */
document.documentElement.classList.add('js-anim');
const scopeObs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');scopeObs.unobserve(e.target)}}),{threshold:.2});
all('#included .scope-theme').forEach((e,i)=>{e.style.transitionDelay=(i%4)*90+'ms';scopeObs.observe(e)});
})();

// Testimonial videos: show a placeholder for any video file that is not uploaded yet.
document.querySelectorAll('.testimonial-video').forEach(card=>{const src=card.querySelector('source')?.getAttribute('src');if(!src)return;const probe=document.createElement('video');probe.preload='metadata';probe.muted=true;probe.addEventListener('error',()=>card.classList.add('is-pending'),{once:true});probe.src=src;});
/* What you get: hover opens a row on mouse devices (click still toggles) */
if(matchMedia("(hover:hover) and (pointer:fine)").matches){
  document.querySelectorAll("#included .scope-theme").forEach(d=>{
    let t;
    d.addEventListener("mouseenter",()=>{t=setTimeout(()=>{d.open=true},250)});
    d.addEventListener("mouseleave",()=>clearTimeout(t));
  });
}
