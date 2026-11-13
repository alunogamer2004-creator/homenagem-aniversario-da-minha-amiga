(() => {
  const scenes = [...document.querySelectorAll('[data-scene]')];
  const dots = [...document.querySelectorAll('[data-go]')];
  const status = document.querySelector('#status-message');
  const letter = document.querySelector('#birthday-letter');
  const letterButton = document.querySelector('[data-open-letter]');
  let current = 0;

  function showScene(index) {
    const next = Math.max(0, Math.min(index, scenes.length - 1));
    scenes.forEach((scene, sceneIndex) => {
      const active = sceneIndex === next;
      scene.hidden = !active;
      scene.classList.toggle('is-active', active);
      scene.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, dotIndex) => {
      if (dotIndex === next) dot.setAttribute('aria-current', 'step');
      else dot.removeAttribute('aria-current');
    });
    document.querySelector('[data-prev]').disabled = next === 0;
    document.querySelectorAll('[data-next]').forEach(button => { button.disabled = next === scenes.length - 1; });
    current = next;
    if (status) status.textContent = `Etapa ${next + 1} de ${scenes.length}`;
    if (window.matchMedia('(max-width: 560px)').matches) window.scrollTo({top: 0, behavior: 'smooth'});
  }
  document.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', () => showScene(current + 1)));
  document.querySelector('[data-prev]').addEventListener('click', () => showScene(current - 1));
  dots.forEach(dot => dot.addEventListener('click', () => showScene(Number(dot.dataset.go))));
  document.querySelector('[data-restart]').addEventListener('click', () => { showScene(0); window.birthdayEffects?.confetti(55); });
  document.querySelector('[data-confetti]').addEventListener('click', event => {
    window.birthdayEffects?.confetti(120);
    event.currentTarget.textContent = 'Mais alegria! ✦';
  });
  document.querySelectorAll('.wish-card').forEach(card => card.addEventListener('click', () => {
    const pressed = card.getAttribute('aria-pressed') === 'true';
    card.setAttribute('aria-pressed', String(!pressed));
  }));
  letterButton.addEventListener('click', () => {
    const opened = letter.classList.toggle('is-open');
    letterButton.setAttribute('aria-expanded', String(opened));
    letterButton.innerHTML = opened ? 'Carta aberta <span aria-hidden="true">♡</span>' : 'Abrir sua carta <span aria-hidden="true">↗</span>';
  });
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|BUTTON/.test(document.activeElement.tagName)) return;
    if (event.key === 'ArrowRight') showScene(current + 1);
    if (event.key === 'ArrowLeft') showScene(current - 1);
  });
  showScene(0);
})();
