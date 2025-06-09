
  /* -------------------------------------------------------------
   navbar-profile.js   (solo exporta la función)
   ------------------------------------------------------------- */
export function initProfileMenu () {
  const btn   = document.getElementById('hdrProfileBtn');
  const menu  = document.getElementById('hdrProfileMenu');
  const tplIn  = document.getElementById('tpl-profile-logged-in');
  const tplOut = document.getElementById('tpl-profile-logged-out');

  /* Si aún no existe el header, sal silenciado (header_footer lo llamará
     después de inyectar el HTML) */
  if (!btn || !menu || !tplIn || !tplOut) return;

  /* ---------- estado ---------- */
  let logged = localStorage.getItem('loggedIn') === 'true';

  /* ---------- render ---------- */
  const render = () => {
    menu.innerHTML = '';
    menu.appendChild(
      (logged ? tplIn : tplOut).content.cloneNode(true)
    );

    if (logged) {
      menu.querySelector('[data-action="logout"]')
          ?.addEventListener('click', e => {
            e.preventDefault();
            localStorage.removeItem('loggedIn');
            logged = false;
            render();
            menu.classList.remove('open');
          });
    }
  };
  render();

  /* ---------- interacción ---------- */
  btn.addEventListener('click', e => {
    e.stopPropagation();
    btn.setAttribute('aria-expanded', menu.classList.toggle('open'));
  });
  window.addEventListener('click', e => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove('open');
    }
  });
}
