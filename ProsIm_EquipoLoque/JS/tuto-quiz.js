(function() {
  // Pasos del tutorial para quiz.html
  const steps = [
    { selector: 'nav.header-navigation a[href="quiz.html"]', text: "Apartado para contestar una pequeña trivia del Mundial 2026", orientation: 'bottom' },
    { selector: '#answers', text: "Elige la respuesta para sacar la puntuación mas alta", orientation: 'top' }
  ];

  const overlay = document.getElementById('tutorial-overlay');
  const bubble = document.getElementById('tutorial-bubble');
  const textEl = document.getElementById('tutorial-text');
  const nextBtn = document.getElementById('tutorial-next');
  const arrow = document.getElementById('tutorial-arrow');

  let currentStep = 0;

  // Comprobar si ya se mostró el tutorial (opcional)
  // if (localStorage.getItem('tutorialQuizShown')) return;
  // localStorage.setItem('tutorialQuizShown', 'true');

  function getElementByStep(step) {
    return document.querySelector(step.selector);
  }

  function showStep(index) {
    if (index >= steps.length) {
      overlay.style.display = 'none';
      return;
    }

    const step = steps[index];
    const target = getElementByStep(step);
    if (!target) {
      console.warn('Elemento no encontrado:', step.selector);
      // Si no se encuentra, pasamos al siguiente automáticamente
      showStep(index + 1);
      return;
    }

    textEl.innerText = step.text;
    overlay.style.display = 'flex';

    // Obtener posición del elemento
    const rect = target.getBoundingClientRect();
    const bubbleWidth = 300; // max-width
    const bubbleHeight = bubble.offsetHeight || 150; // altura aproximada

    // Posicionar burbuja
    let top, left;
    const orientation = step.orientation;

    // Centrar horizontalmente respecto al elemento
    left = rect.left + rect.width / 2 - bubbleWidth / 2;
    // Ajustar para no salir de la pantalla
    if (left < 10) left = 10;
    if (left + bubbleWidth > window.innerWidth - 10) left = window.innerWidth - bubbleWidth - 10;

    if (orientation === 'bottom') {
      // Burbuja debajo del elemento
      top = rect.bottom + 10;
      // Flecha arriba (apunta hacia el elemento)
      arrow.style.borderWidth = '0 10px 10px 10px';
      arrow.style.borderColor = 'transparent transparent white transparent';
      arrow.style.top = '-10px';
      arrow.style.left = '50%';
      arrow.style.transform = 'translateX(-50%)';
    } else {
      // Burbuja arriba del elemento
      top = rect.top - bubbleHeight - 10;
      // Flecha abajo
      arrow.style.borderWidth = '10px 10px 0 10px';
      arrow.style.borderColor = 'white transparent transparent transparent';
      arrow.style.bottom = '-10px';
      arrow.style.left = '50%';
      arrow.style.transform = 'translateX(-50%)';
    }

    // Ajustar top si se sale de la pantalla
    if (top < 10) top = 10;
    if (top + bubbleHeight > window.innerHeight - 10) top = window.innerHeight - bubbleHeight - 10;

    bubble.style.top = top + 'px';
    bubble.style.left = left + 'px';
  }

  nextBtn.addEventListener('click', () => {
    currentStep++;
    showStep(currentStep);
  });

  // Iniciar tutorial
  showStep(0);
})();