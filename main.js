// js/main.js
// Main UI behaviours: nav toggle, smooth scroll, preloader

document.addEventListener('DOMContentLoaded', function () {
  // Preloader
  const preloader = document.getElementById('preloader');
  if(preloader){
    setTimeout(()=>{ preloader.style.display='none'; }, 600); // small delay for UX
  }

  // Mobile nav toggle
  const toggles = document.querySelectorAll('.nav-toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', function(){
      const nav = document.getElementById('mainNav');
      if(!nav) return;
      const isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      e.preventDefault();
      const id = this.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
});
