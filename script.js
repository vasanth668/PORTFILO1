// 3D tilt for elements with .tilt
(function(){
  const tiltEls = document.querySelectorAll('.tilt');
  const damp = 18; // higher = slower
  tiltEls.forEach(el =>{
    let rx=0, ry=0;
    const rect = () => el.getBoundingClientRect();

    function onMove(e){
      const r = rect();
      const x = (e.clientX ?? (e.touches?.[0]?.clientX || 0)) - r.left;
      const y = (e.clientY ?? (e.touches?.[0]?.clientY || 0)) - r.top;
      const px = (x / r.width) - 0.5;
      const py = (y / r.height) - 0.5;
      rx += ((-py * 14) - rx) / damp; // rotateX
      ry += (( px * 16) - ry) / damp; // rotateY
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      el.style.transition = 'transform .06s linear';
    }
    function onLeave(){ el.style.transform = 'rotateX(0) rotateY(0)'; }

    el.addEventListener('mousemove', onMove);
    el.addEventListener('touchmove', onMove, {passive:true});
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('touchend', onLeave);
  });
})();

// Parallax drift of blobs
(function(){
  const blobs = document.querySelectorAll('.blob');
  window.addEventListener('mousemove', (e)=>{
    const { innerWidth: w, innerHeight: h } = window;
    const dx = (e.clientX - w/2) / w, dy = (e.clientY - h/2) / h;
    blobs.forEach((b,i)=>{
      const depth = (i+1) * 12; // different depth per blob
      b.style.transform = `translate3d(${dx*depth}px, ${dy*depth}px, 0)`;
    });
  });
})();

// Flip cards on keyboard focus
(function(){
  document.querySelectorAll('.project-card').forEach(card=>{
    card.setAttribute('tabindex','0');
    card.addEventListener('keypress', (e)=>{
      if(e.key==='Enter' || e.key===' '){
        const inner = card.querySelector('.project-inner');
        inner.style.transform = inner.style.transform ? '' : 'rotateY(180deg)';
      }
    })
  })
})();

// Reveal on scroll
(function(){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){ en.target.classList.add('visible'); }
    })
  }, { threshold: .15 });
  document.querySelectorAll('.reveal').forEach(el=> obs.observe(el));
})();

// Year in footer
(() => { document.getElementById('year').textContent = new Date().getFullYear(); })();