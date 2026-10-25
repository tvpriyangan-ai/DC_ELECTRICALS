// DC Electricals – website scripts
// Mobile menu
const menu=document.getElementById('menu');
document.getElementById('burger').onclick=()=>menu.classList.toggle('open');
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));

// Active nav link + back-to-top
const links=[...menu.querySelectorAll('a')];
const secs=['home','director','team','projects','services','gallery','contact'].map(id=>document.getElementById(id));
const totop=document.getElementById('totop');
addEventListener('scroll',()=>{
  totop.classList.toggle('show',scrollY>600);
  let cur='home';
  secs.forEach(s=>{ if(s.getBoundingClientRect().top<120) cur=s.id; });
  links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+cur));
},{passive:true});

// Gallery filter
document.getElementById('filters').addEventListener('click',e=>{
  const b=e.target.closest('button'); if(!b) return;
  document.querySelectorAll('#filters button').forEach(x=>x.classList.remove('on'));
  b.classList.add('on');
  const f=b.dataset.f;
  document.querySelectorAll('.g-item').forEach(g=>g.classList.toggle('hide',f!=='all'&&!g.dataset.c.split(' ').includes(f)));
});

// Lightbox
const lb=document.getElementById('lb'), lbImg=lb.querySelector('img'), lbCap=lb.querySelector('p');
let group=[], idx=0;
function show(i){ idx=(i+group.length)%group.length; lbImg.src=group[idx].src; lbCap.textContent=group[idx].cap; }
function open(items,i){ group=items; show(i); lb.classList.add('open'); document.body.style.overflow='hidden'; }
function close(){ lb.classList.remove('open'); document.body.style.overflow=''; }
document.getElementById('gal').addEventListener('click',e=>{
  const it=e.target.closest('.g-item'); if(!it) return;
  const vis=[...document.querySelectorAll('.g-item:not(.hide)')];
  open(vis.map(v=>({src:v.querySelector('img').src,cap:v.querySelector('img').alt})),vis.indexOf(it));
});
document.querySelectorAll('[data-lb]').forEach(el=>el.addEventListener('click',()=>{
  const sib=[...el.parentElement.querySelectorAll('[data-lb]')];
  open(sib.map(s=>({src:s.dataset.lb,cap:s.dataset.cap})),sib.indexOf(el));
}));
lb.querySelector('.x').onclick=close;
lb.querySelector('.prev').onclick=()=>show(idx-1);
lb.querySelector('.next').onclick=()=>show(idx+1);
lb.addEventListener('click',e=>{ if(e.target===lb) close(); });
addEventListener('keydown',e=>{
  if(!lb.classList.contains('open')) return;
  if(e.key==='Escape') close();
  if(e.key==='ArrowLeft') show(idx-1);
  if(e.key==='ArrowRight') show(idx+1);
});
