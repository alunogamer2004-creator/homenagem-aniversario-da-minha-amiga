(() => {
  const audio = document.querySelector('#birthday-music');
  const button = document.querySelector('.music-toggle');
  const label = button?.querySelector('.music-toggle__label');
  const status = document.querySelector('#status-message');
  const musicStatus = document.querySelector('.music-status');
  if (!audio || !button) return;

  let waitingForGesture = false;

  function update(playing) {
    button.setAttribute('aria-pressed', String(playing));
    button.setAttribute('aria-label', playing ? 'Pausar música' : 'Reproduzir música');
    if (label) label.textContent = playing ? 'Tocando' : 'Música';
    if (playing && musicStatus) musicStatus.hidden = true;
  }

  function announce(message, visibleMessage = message) {
    if (status) status.textContent = message;
    if (musicStatus) {
      musicStatus.textContent = visibleMessage;
      musicStatus.hidden = false;
    }
  }

  function removeGestureListeners() {
    waitingForGesture = false;
    document.removeEventListener('pointerdown', startAfterGesture);
    document.removeEventListener('keydown', startAfterGesture);
  }

  async function startAfterGesture(event) {
    if (event.target.closest?.('.music-toggle')) return;
    removeGestureListeners();
    try {
      await audio.play();
    } catch (error) {
      handlePlaybackError(error);
    }
  }

  function handlePlaybackError(error) {
    update(false);
    if (error?.name === 'NotAllowedError') {
      waitingForGesture = true;
      document.addEventListener('pointerdown', startAfterGesture);
      document.addEventListener('keydown', startAfterGesture);
      announce('O navegador bloqueou a reprodução automática. Interaja com a página para iniciar a música.', 'Toque ou pressione uma tecla para iniciar a música.');
      return;
    }
    announce('Não foi possível reproduzir a música. Confira o arquivo assets/music/trilha.mp3.', 'Não foi possível reproduzir a trilha. Confira o arquivo assets/music/trilha.mp3.');
  }

  button.addEventListener('click', async () => {
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
    } catch (error) {
      handlePlaybackError(error);
    }
  });

  audio.addEventListener('play', () => {
    removeGestureListeners();
    update(true);
  });
  audio.addEventListener('pause', () => update(false));
  audio.addEventListener('error', () => {
    update(false);
    announce('A trilha não está disponível. Confira o arquivo assets/music/trilha.mp3.', 'A trilha não está disponível. Confira o arquivo assets/music/trilha.mp3.');
  });

  if (audio.paused) {
    audio.play().catch(handlePlaybackError);
  }
})();

