(() => {
  const canvas = document.querySelector('.particle-canvas');
  const context = canvas?.getContext('2d');
  if (!canvas || !context) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const particles = [];
  let width = 0;
  let height = 0;
  let frame = 0;
  const count = reduceMotion ? 18 : 48;
  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    particles.length = 0;
    for (let index = 0; index < count; index += 1) particles.push({x: Math.random() * width, y: Math.random() * height, radius: Math.random() * 1.5 + .35, alpha: Math.random() * .48 + .12, drift: (Math.random() - .5) * .18, speed: Math.random() * .18 + .05});
  }
  function draw() {
    context.clearRect(0, 0, width, height);
    for (const particle of particles) {
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(246, 220, 178, ${particle.alpha})`;
      context.fill();
      if (!reduceMotion) {
        particle.y -= particle.speed;
        particle.x += particle.drift;
        if (particle.y < -4) { particle.y = height + 4; particle.x = Math.random() * width; }
        if (particle.x < -4 || particle.x > width + 4) particle.drift *= -1;
      }
    }
    if (!reduceMotion) frame = window.requestAnimationFrame(draw);
  }
  resize();
  draw();
  window.addEventListener('resize', () => { window.cancelAnimationFrame(frame); resize(); draw(); }, {passive: true});
  window.addEventListener('pagehide', () => window.cancelAnimationFrame(frame), {once: true});

  window.birthdayEffects = {
    confetti(amount = 90) {
      if (reduceMotion) return;
      const colors = ['#e2c38c', '#e7adb8', '#f8f0e8', '#bd7388', '#f1dcae'];
      for (let index = 0; index < amount; index += 1) {
        const piece = document.createElement('span');
        piece.className = 'confetti-piece';
        piece.setAttribute('aria-hidden', 'true');
        piece.style.left = `${Math.random() * 100}vw`;
        piece.style.backgroundColor = colors[index % colors.length];
        piece.style.setProperty('--drift', `${(Math.random() - .5) * 220}px`);
        piece.style.setProperty('--duration', `${2.2 + Math.random() * 2.2}s`);
        piece.style.animationDelay = `${Math.random() * .8}s`;
        document.body.append(piece);
        window.setTimeout(() => piece.remove(), 5600);
      }
    }
  };
})();
